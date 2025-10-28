/**
 * Purchase-to-Entries Integration
 * Automatically creates giveaway entries from purchases
 */

import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface PurchaseEntry {
  orderId: string;
  userId: string;
  orderTotal: number;
  giveawayId: string;
  entriesEarned: number;
  entryNumbers: {
    start: number;
    end: number;
  };
}

/**
 * Create giveaway entries from a purchase
 * Rule: 1 entry per $25 spent (rounded down)
 */
export async function createEntriesFromPurchase(
  orderId: string,
  userId: string,
  orderTotal: number,
  giveawayId: string,
  orderDetails: any
): Promise<PurchaseEntry | null> {
  try {
    // Calculate entries (1 per $25, rounded down)
    const baseEntries = Math.floor(orderTotal / 25);

    if (baseEntries === 0) {
      return null;
    }

    // Check for bonus multipliers
    let bonusMultiplier = 1.0;
    const now = new Date();
    const dayOfWeek = now.getDay();

    // 2x entries on Fridays
    if (dayOfWeek === 5) {
      bonusMultiplier = 2.0;
    }

    // Calculate final entries
    const finalEntries = Math.floor(baseEntries * bonusMultiplier);

    // Get current entry count for this giveaway
    const { data: giveaway } = await supabase
      .from('giveaways')
      .select('total_entries')
      .eq('id', giveawayId)
      .single();

    const currentTotal = giveaway?.total_entries || 0;
    const entryNumberStart = currentTotal + 1;
    const entryNumberEnd = currentTotal + finalEntries;

    // Create purchase entry record
    const { error: purchaseError } = await supabase
      .from('purchase_giveaway_entries')
      .insert({
        order_id: orderId,
        user_id: userId,
        giveaway_id: giveawayId,
        order_total: orderTotal,
        entries_earned: baseEntries,
        bonus_multiplier: bonusMultiplier,
        final_entries: finalEntries,
        entry_number_start: entryNumberStart,
        entry_number_end: entryNumberEnd,
        purchase_date: now.toISOString(),
        purchase_items: orderDetails,
        delivery_borough: orderDetails.borough,
        status: 'active'
      });

    if (purchaseError) {
      console.error('Failed to create purchase entry:', purchaseError);
      return null;
    }

    // Update giveaway total entries
    await supabase.rpc('increment_giveaway_entries', {
      p_giveaway_id: giveawayId,
      p_entries_to_add: finalEntries
    });

    // Update or create user's entry in giveaway_entries table
    const { data: existingEntry } = await supabase
      .from('giveaway_entries')
      .select('*')
      .eq('user_id', userId)
      .eq('giveaway_id', giveawayId)
      .single();

    if (existingEntry) {
      // Add to existing entry
      await supabase
        .from('giveaway_entries')
        .update({
          total_entries: existingEntry.total_entries + finalEntries,
          updated_at: now.toISOString()
        })
        .eq('id', existingEntry.id);
    } else {
      // Create new entry
      await supabase
        .from('giveaway_entries')
        .insert({
          giveaway_id: giveawayId,
          user_id: userId,
          base_entries: 0,
          referral_entries: 0,
          total_entries: finalEntries,
          entry_number_start: entryNumberStart,
          entry_number_end: entryNumberEnd,
          status: 'verified',
          entered_at: now.toISOString()
        });
    }

    // Show success message
    if (bonusMultiplier > 1) {
      toast.success(`🎉 ${finalEntries} entries earned (2x Friday bonus!)`);
    } else {
      toast.success(`🎉 ${finalEntries} entry${finalEntries > 1 ? 's' : ''} earned from your purchase!`);
    }

    return {
      orderId,
      userId,
      orderTotal,
      giveawayId,
      entriesEarned: finalEntries,
      entryNumbers: {
        start: entryNumberStart,
        end: entryNumberEnd
      }
    };
  } catch (error) {
    console.error('Error creating purchase entries:', error);
    return null;
  }
}

/**
 * Handle refunded orders - remove entries
 */
export async function removeEntriesFromRefund(orderId: string): Promise<void> {
  try {
    const { data: purchaseEntry } = await supabase
      .from('purchase_giveaway_entries')
      .select('*')
      .eq('order_id', orderId)
      .single();

    if (!purchaseEntry) return;

    // Mark purchase entry as refunded
    await supabase
      .from('purchase_giveaway_entries')
      .update({ status: 'refunded' })
      .eq('order_id', orderId);

    // Subtract entries from giveaway total
    await supabase.rpc('decrement_giveaway_entries', {
      p_giveaway_id: purchaseEntry.giveaway_id,
      p_entries_to_remove: purchaseEntry.final_entries
    });

    // Update user's entry
    const { data: userEntry } = await supabase
      .from('giveaway_entries')
      .select('*')
      .eq('user_id', purchaseEntry.user_id)
      .eq('giveaway_id', purchaseEntry.giveaway_id)
      .single();

    if (userEntry) {
      const newTotal = Math.max(0, userEntry.total_entries - purchaseEntry.final_entries);

      if (newTotal === 0) {
        // Remove entry entirely if no entries left
        await supabase
          .from('giveaway_entries')
          .delete()
          .eq('id', userEntry.id);
      } else {
        // Update entry count
        await supabase
          .from('giveaway_entries')
          .update({ total_entries: newTotal })
          .eq('id', userEntry.id);
      }
    }

    toast.info(`Entries removed from refunded order`);
  } catch (error) {
    console.error('Error removing entries from refund:', error);
  }
}

/**
 * Get user's purchase entries for a giveaway
 */
export async function getUserPurchaseEntries(
  userId: string,
  giveawayId: string
): Promise<any[]> {
  const { data } = await supabase
    .from('purchase_giveaway_entries')
    .select('*')
    .eq('user_id', userId)
    .eq('giveaway_id', giveawayId)
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  return data || [];
}

