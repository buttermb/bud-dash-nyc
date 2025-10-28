/**
 * User Referral Dashboard
 * Shows referral stats, link, and rewards
 */

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Copy, Share2, Users, TrendingUp, DollarSign, Gift, Check } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  getUserReferralCode, 
  getUserReferralStats, 
  generateReferralLink, 
  copyReferralLink,
  type ReferralStats 
} from '@/lib/referral';
import { toast } from 'sonner';

export default function ReferralDashboard() {
  const { user } = useAuth();
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [stats, setStats] = useState<ReferralStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (user) {
      loadReferralData();
    }
  }, [user]);

  const loadReferralData = async () => {
    if (!user) return;
    setLoading(true);
    
    const code = await getUserReferralCode(user.id);
    const statsData = await getUserReferralStats(user.id);
    
    setReferralCode(code);
    setStats(statsData);
    setLoading(false);
  };

  const handleCopyLink = async () => {
    if (!user) return;
    const success = await copyReferralLink(user.id);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    if (!referralCode) return;
    
    const shareData = {
      title: 'Join me on Bud Dash NYC',
      text: `Use my referral code ${referralCode} and get $5 off your first order!`,
      url: `${window.location.origin}/signup?ref=${referralCode}`
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        toast.success('Referral link copied!');
      }
    } catch (err) {
      console.error('Share failed:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!referralCode) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Unable to load referral code</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Referral Code Card */}
      <Card>
        <CardHeader>
          <CardTitle>Your Referral Code</CardTitle>
          <CardDescription>
            Share this code with friends and earn rewards
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Code Display */}
          <div className="flex items-center gap-3">
            <Input
              value={referralCode}
              readOnly
              className="text-center text-2xl font-bold font-mono tracking-wider"
            />
            <Button
              size="icon"
              variant="outline"
              onClick={handleCopyLink}
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          {copied && (
            <div className="flex items-center gap-2 text-sm text-green-600">
              <Check className="h-4 w-4" />
              <span>Copied to clipboard!</span>
            </div>
          )}

          <Separator />

          {/* How it works */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">How it works:</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Gift className="h-4 w-4 text-green-600 mt-0.5" />
                <span>Your friend gets <strong>$5</strong> credit when they sign up</span>
              </li>
              <li className="flex items-start gap-2">
                <DollarSign className="h-4 w-4 text-green-600 mt-0.5" />
                <span>You get <strong>$10</strong> credit when they make their first purchase</span>
              </li>
              <li className="flex items-start gap-2">
                <Users className="h-4 w-4 text-green-600 mt-0.5" />
                <span>You get <strong>3 bonus entries</strong> when they enter giveaways</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Total Referrals</span>
              </div>
              <p className="text-2xl font-bold">{stats.totalReferrals}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Signups</span>
              </div>
              <p className="text-2xl font-bold text-blue-600">{stats.totalSignups}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Check className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Conversions</span>
              </div>
              <p className="text-2xl font-bold text-green-600">{stats.totalConversions}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Earned</span>
              </div>
              <p className="text-2xl font-bold text-green-600">${stats.totalEarnings.toFixed(2)}</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Recent Referrals */}
      {stats && stats.referrals.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Referrals</CardTitle>
            <CardDescription>
              Track your referral activity and conversions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.referrals.slice(0, 5).map((referral) => (
                <div
                  key={referral.id}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold">{referral.referral_code}</span>
                      <Badge 
                        variant={
                          referral.status === 'converted' ? 'default' :
                          referral.status === 'signed_up' ? 'secondary' :
                          referral.status === 'clicked' ? 'outline' :
                          'outline'
                        }
                      >
                        {referral.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {referral.source_type}
                    </p>
                  </div>
                  <div className="text-right">
                    {referral.reward_value && (
                      <p className="text-sm font-semibold text-green-600">
                        ${referral.reward_value.toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

