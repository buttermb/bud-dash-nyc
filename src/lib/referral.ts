/**
 * Referral System for Bud Dash NYC
 * Complete referral tracking, conversion, and rewards management
 */

import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface ReferralLink {
  link: string;
  shortCode: string;
  fullUrl: string;
}

export interface Referral {
  id: string;
  referral_code: string;
  referrer_id: string;
  referred_user_id?: string;
  source_type: 'direct_link' | 'giveaway' | 'social_share';
  status: 'pending' | 'clicked' | 'signed_up' | 'converted' | 'rewarded';
  clicked_at?: string;
  signed_up_at?: string;
  converted_at?: string;
  reward_value?: number;
  created_at: string;
}

export interface ReferralStats {
  totalReferrals: number;
  totalClicks: number;
  totalSignups: number;
  totalConversions: number;
  conversionRate: number;
  totalEarnings: number;
  referrals: Referral[];
}

/**
 * Get user's referral code
 */
export async function getUserReferralCode(userId: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('referral_code')
    .eq('user_id', userId)
    .single();

  if (error || !data) return null;
  return data.referral_code;
}

/**
 * Get user's referral stats
 */
export async function getUserReferralStats(userId: string): Promise<ReferralStats> {
  const { data: stats } = await supabase
    .from('referrals')
    .select('*')
    .eq('referrer_id', userId);

  const referrals = stats || [];

  const totalClicks = referrals.filter((r: any) => r.clicked_at).length;
  const totalSignups = referrals.filter((r: any) => r.signed_up_at).length;
  const totalConversions = referrals.filter((r: any) => r.converted).length;
  const totalRewards = referrals.reduce((sum, r: any) => sum + (r.reward_value || 0), 0);
  const conversionRate = totalClicks > 0 ? (totalConversions / totalClicks * 100) : 0;

  return {
    totalReferrals: referrals.length,
    totalClicks,
    totalSignups,
    totalConversions,
    conversionRate: Number(conversionRate.toFixed(1)),
    totalEarnings: totalRewards,
    referrals
  };
}

/**
 * Generate referral link
 */
export async function generateReferralLink(
  userId: string,
  sourceType: 'direct_link' | 'giveaway' | 'social_share' = 'direct_link',
  giveawayId?: string
): Promise<ReferralLink | null> {
  // Get user's referral code
  const code = await getUserReferralCode(userId);
  if (!code) return null;

  // Generate short tracking code
  const shortCode = generateShortCode();

  // Build the referral URL
  const baseUrl = window.location.origin;
  let path = '';

  if (sourceType === 'giveaway' && giveawayId) {
    path = `/giveaway?ref=${code}&src=giveaway&gid=${giveawayId}`;
  } else {
    path = `/signup?ref=${code}`;
  }

  const fullUrl = `${baseUrl}${path}&s=${shortCode}`;

  // Create referral tracking entry
  const { error } = await supabase.from('referrals').insert({
    referral_code: code,
    referrer_id: userId,
    source_type: sourceType,
    source_giveaway_id: giveawayId || null,
    referral_link: fullUrl,
    short_link: shortCode,
    status: 'pending'
  });

  if (error) {
    console.error('Failed to create referral tracking:', error);
    return null;
  }

  return {
    link: `${baseUrl}${path}`,
    shortCode,
    fullUrl
  };
}

/**
 * Track referral click
 */
export async function trackReferralClick(
  referralCode: string,
  shortCode: string,
  metadata: {
    ipAddress?: string;
    userAgent?: string;
    deviceType?: string;
    browser?: string;
    os?: string;
    city?: string;
    state?: string;
  }
): Promise<void> {
  await supabase
    .from('referrals')
    .update({
      clicked_at: new Date().toISOString(),
      click_ip_address: metadata.ipAddress,
      click_user_agent: metadata.userAgent,
      click_device_type: metadata.deviceType,
      click_browser: metadata.browser,
      click_os: metadata.os,
      click_location_city: metadata.city,
      click_location_state: metadata.state,
      status: 'clicked',
      updated_at: new Date().toISOString()
    })
    .match({ referral_code: referralCode, short_link: shortCode });
}

/**
 * Process referral signup
 */
export async function processReferralSignup(
  referralCode: string,
  newUserId: string,
  ipAddress: string
): Promise<{ success: boolean; referrerId?: string }> {
  // Find the referrer
  const { data: referrer } = await supabase
    .from('profiles')
    .select('user_id')
    .eq('referral_code', referralCode)
    .single();

  if (!referrer) {
    return { success: false };
  }

  // Update referral record
  const { data: referral } = await supabase
    .from('referrals')
    .update({
      referred_user_id: newUserId,
      signed_up_at: new Date().toISOString(),
      signup_ip_address: ipAddress,
      signup_completed: true,
      status: 'signed_up',
      updated_at: new Date().toISOString()
    })
    .match({ referral_code: referralCode })
    .is('referred_user_id', null)
    .select()
    .single();

  if (!referral) {
    return { success: false };
  }

  // Update referred user's profile
  await supabase
    .from('profiles')
    .update({
      referred_by_user_id: referrer.user_id,
      referred_by_code: referralCode,
      referral_conversion_date: new Date().toISOString()
    })
    .eq('user_id', newUserId);

  // Increment referrer's count
  await supabase.rpc('increment_user_referrals', {
    p_user_id: referrer.user_id
  });

  return { success: true, referrerId: referrer.user_id };
}

/**
 * Process referral conversion (first purchase)
 */
export async function processReferralConversion(
  referredUserId: string,
  conversionType: 'first_purchase' | 'giveaway_entry',
  conversionValue: number = 0,
  orderId?: string
): Promise<{ rewards: any[] }> {
  // Get referral record
  const { data: referral } = await supabase
    .from('referrals')
    .select('*, profiles!referrer_id(*)')
    .eq('referred_user_id', referredUserId)
    .single();

  if (!referral || referral.converted) {
    return { rewards: [] };
  }

  // Mark as converted
  await supabase
    .from('referrals')
    .update({
      converted: true,
      converted_at: new Date().toISOString(),
      conversion_type: conversionType,
      conversion_value: conversionValue,
      status: 'converted',
      updated_at: new Date().toISOString()
    })
    .eq('id', referral.id);

  const rewards = [];

  if (conversionType === 'first_purchase') {
    // Give $10 credit to referrer
    const { data: creditReward } = await supabase
      .from('referral_rewards')
      .insert({
        referral_id: referral.id,
        referrer_id: referral.referrer_id,
        referred_user_id: referredUserId,
        reward_type: 'store_credit',
        reward_title: 'Referral Bonus',
        reward_description: `$10 credit for referring a friend who made their first purchase`,
        reward_amount: 10.00,
        status: 'active'
      })
      .select()
      .single();

    if (creditReward) rewards.push(creditReward);

    // Give $5 credit to referred user
    const { data: welcomeReward } = await supabase
      .from('referral_rewards')
      .insert({
        referral_id: referral.id,
        referrer_id: referral.referrer_id,
        referred_user_id: referredUserId,
        reward_type: 'store_credit',
        reward_title: 'Welcome Bonus',
        reward_description: `$5 credit for signing up with a referral code`,
        reward_amount: 5.00,
        status: 'active',
        redeemed: false
      })
      .select()
      .single();

    if (welcomeReward) rewards.push(welcomeReward);
  }

  if (conversionType === 'giveaway_entry') {
    // Give 3 bonus entries to referrer
    const { data: entryReward } = await supabase
      .from('referral_rewards')
      .insert({
        referral_id: referral.id,
        referrer_id: referral.referrer_id,
        referred_user_id: referredUserId,
        reward_type: 'bonus_entries',
        reward_title: 'Referral Entries',
        reward_description: `3 bonus giveaway entries for referring a friend`,
        reward_amount: 3,
        entries_awarded: 3,
        status: 'active'
      })
      .select()
      .single();

    if (entryReward) rewards.push(entryReward);

    // Update referral record
    await supabase
      .from('referrals')
      .update({
        entries_awarded: 3,
        reward_given: true,
        reward_given_at: new Date().toISOString()
      })
      .eq('id', referral.id);
  }

  // Update referrer's successful referrals count
  await supabase.rpc('increment_successful_referrals', {
    p_user_id: referral.referrer_id
  });

  toast.success(conversionType === 'first_purchase' 
    ? 'Referral rewards earned! $5 credit added to your account.' 
    : '3 bonus entries added for referring a friend!');

  return { rewards };
}

/**
 * Helper: Generate short tracking code
 */
function generateShortCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * Copy referral link to clipboard
 */
export async function copyReferralLink(userId: string): Promise<boolean> {
  const linkData = await generateReferralLink(userId);
  if (!linkData) return false;

  try {
    await navigator.clipboard.writeText(linkData.fullUrl);
    toast.success('Referral link copied to clipboard!');
    return true;
  } catch (err) {
    toast.error('Failed to copy link');
    return false;
  }
}

/**
 * Check if referral code exists
 */
export async function isReferralCodeValid(code: string): Promise<boolean> {
  const { data } = await supabase
    .from('profiles')
    .select('referral_code')
    .eq('referral_code', code)
    .single();

  return !!data;
}

