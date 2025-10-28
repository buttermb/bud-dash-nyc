-- ==============================================
-- COMPLETE REFERRAL SYSTEM FOR BUD DASH NYC
-- ==============================================
-- This migration creates the complete referral system including:
-- 1. Referral code generation for users
-- 2. Referral tracking and analytics
-- 3. Purchase-to-entries integration
-- 4. Admin management capabilities
-- ==============================================

-- ==============================================
-- 1. ADD REFERRAL COLUMNS TO PROFILES TABLE
-- ==============================================

-- Add referral code column
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS referral_code VARCHAR(12) UNIQUE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS referral_code_generated_at TIMESTAMPTZ;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS referred_by_user_id UUID REFERENCES profiles(user_id);
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS referred_by_code VARCHAR(12);
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS referral_conversion_date TIMESTAMPTZ;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS total_referrals INT DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS successful_referrals INT DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS referral_earnings DECIMAL(10,2) DEFAULT 0;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_profiles_referral_code ON profiles(referral_code);
CREATE INDEX IF NOT EXISTS idx_profiles_referred_by ON profiles(referred_by_user_id);

-- ==============================================
-- 2. CREATE REFERRALS TRACKING TABLE
-- ==============================================

CREATE TABLE IF NOT EXISTS referrals (
  -- Primary identification
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referral_code VARCHAR(12) NOT NULL,
  
  -- User relationships
  referrer_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  referred_user_id UUID REFERENCES profiles(user_id) ON DELETE SET NULL,
  
  -- Source tracking
  source_type VARCHAR(50) DEFAULT 'direct_link',
  source_giveaway_id UUID REFERENCES giveaways(id) ON DELETE SET NULL,
  source_campaign VARCHAR(100),
  
  -- Link and tracking
  referral_link TEXT,
  short_link VARCHAR(50) UNIQUE,
  
  -- Click tracking
  clicked_at TIMESTAMPTZ,
  click_ip_address INET,
  click_user_agent TEXT,
  click_device_type VARCHAR(50),
  click_browser VARCHAR(50),
  click_os VARCHAR(50),
  click_location_city VARCHAR(100),
  click_location_state VARCHAR(50),
  
  -- Signup tracking
  signed_up_at TIMESTAMPTZ,
  signup_ip_address INET,
  signup_completed BOOLEAN DEFAULT false,
  
  -- Conversion tracking
  converted_at TIMESTAMPTZ,
  converted BOOLEAN DEFAULT false,
  conversion_type VARCHAR(50),
  conversion_value DECIMAL(10,2),
  
  -- Reward tracking
  reward_type VARCHAR(50),
  reward_value DECIMAL(10,2),
  reward_given BOOLEAN DEFAULT false,
  reward_given_at TIMESTAMPTZ,
  entries_awarded INT DEFAULT 0,
  credit_awarded DECIMAL(10,2) DEFAULT 0,
  
  -- Status
  status VARCHAR(50) DEFAULT 'pending',
  is_fraudulent BOOLEAN DEFAULT false,
  fraud_reason TEXT,
  
  -- Metadata
  metadata JSONB DEFAULT '{}',
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '90 days'
);

-- Constraints
ALTER TABLE referrals ADD CONSTRAINT IF NOT EXISTS unique_referred_user 
  UNIQUE(referred_user_id) WHERE referred_user_id IS NOT NULL;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_referrals_referrer ON referrals(referrer_id);
CREATE INDEX IF NOT EXISTS idx_referrals_code ON referrals(referral_code);
CREATE INDEX IF NOT EXISTS idx_referrals_status ON referrals(status);
CREATE INDEX IF NOT EXISTS idx_referrals_converted ON referrals(converted);
CREATE INDEX IF NOT EXISTS idx_referrals_created ON referrals(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_referrals_short_link ON referrals(short_link);

-- ==============================================
-- 3. CREATE REFERRAL REWARDS TABLE
-- ==============================================

CREATE TABLE IF NOT EXISTS referral_rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referral_id UUID NOT NULL REFERENCES referrals(id) ON DELETE CASCADE,
  referrer_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  referred_user_id UUID REFERENCES profiles(user_id) ON DELETE SET NULL,
  
  -- Reward details
  reward_type VARCHAR(50) NOT NULL,
  reward_title VARCHAR(255),
  reward_description TEXT,
  reward_amount DECIMAL(10,2),
  
  -- Redemption
  redeemed BOOLEAN DEFAULT false,
  redeemed_at TIMESTAMPTZ,
  redemption_order_id UUID,
  redemption_value DECIMAL(10,2),
  
  -- Expiration
  expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '90 days',
  expired BOOLEAN DEFAULT false,
  
  -- Discount code
  discount_code VARCHAR(50) UNIQUE,
  discount_percentage INT,
  discount_max_value DECIMAL(10,2),
  
  -- Status
  status VARCHAR(50) DEFAULT 'pending',
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_rewards_referral ON referral_rewards(referral_id);
CREATE INDEX IF NOT EXISTS idx_rewards_referrer ON referral_rewards(referrer_id);
CREATE INDEX IF NOT EXISTS idx_rewards_status ON referral_rewards(status);
CREATE INDEX IF NOT EXISTS idx_rewards_discount_code ON referral_rewards(discount_code);

-- ==============================================
-- 4. CREATE PURCHASE GIVEAWAY ENTRIES TABLE
-- ==============================================

CREATE TABLE IF NOT EXISTS purchase_giveaway_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Order linkage
  order_id UUID NOT NULL,
  user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  giveaway_id UUID NOT NULL REFERENCES giveaways(id) ON DELETE CASCADE,
  
  -- Entry details
  order_total DECIMAL(10,2) NOT NULL,
  entries_earned INT NOT NULL,
  bonus_multiplier DECIMAL(3,2) DEFAULT 1.00,
  final_entries INT NOT NULL,
  
  -- Entry numbers
  entry_number_start INT,
  entry_number_end INT,
  
  -- Purchase details
  purchase_date TIMESTAMPTZ NOT NULL,
  purchase_items JSONB,
  delivery_borough VARCHAR(50),
  
  -- Referral credit
  used_referral_code VARCHAR(12),
  referral_discount_applied DECIMAL(10,2) DEFAULT 0,
  
  -- Status
  status VARCHAR(50) DEFAULT 'active',
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_purchase_entries_user ON purchase_giveaway_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_purchase_entries_giveaway ON purchase_giveaway_entries(giveaway_id);
CREATE INDEX IF NOT EXISTS idx_purchase_entries_order ON purchase_giveaway_entries(order_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_purchase_entries_order_unique ON purchase_giveaway_entries(order_id);

-- ==============================================
-- 5. CREATE REFERRAL STATS TABLE
-- ==============================================

CREATE TABLE IF NOT EXISTS referral_stats_daily (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL UNIQUE,
  
  -- Overall metrics
  total_links_created INT DEFAULT 0,
  total_clicks INT DEFAULT 0,
  total_signups INT DEFAULT 0,
  total_conversions INT DEFAULT 0,
  conversion_rate DECIMAL(5,2),
  
  -- Revenue metrics
  total_revenue DECIMAL(10,2) DEFAULT 0,
  average_order_value DECIMAL(10,2),
  
  -- Reward metrics
  total_rewards_given INT DEFAULT 0,
  total_rewards_value DECIMAL(10,2) DEFAULT 0,
  total_entries_awarded INT DEFAULT 0,
  total_credits_awarded DECIMAL(10,2) DEFAULT 0,
  
  -- Top performers
  top_referrer_id UUID REFERENCES profiles(user_id),
  top_referrer_conversions INT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_stats_date ON referral_stats_daily(date DESC);

-- ==============================================
-- 6. CREATE FUNCTIONS
-- ==============================================

-- Generate unique referral code
CREATE OR REPLACE FUNCTION generate_referral_code() RETURNS TEXT AS $$
DECLARE
  new_code TEXT;
  code_exists BOOLEAN;
BEGIN
  LOOP
    -- Generate 8 character alphanumeric code
    new_code := UPPER(
      REPLACE(
        REPLACE(
          ENCODE(gen_random_bytes(6), 'base64'),
          '/', ''
        ),
        '+', ''
      )
    );
    new_code := SUBSTRING(new_code FROM 1 FOR 8);
    
    -- Remove confusing characters
    new_code := REPLACE(new_code, 'O', 'X');
    new_code := REPLACE(new_code, '0', 'Z');
    new_code := REPLACE(new_code, 'I', 'Y');
    new_code := REPLACE(new_code, 'l', 'W');
    new_code := REPLACE(new_code, '1', 'V');
    
    -- Check if code exists
    SELECT EXISTS(SELECT 1 FROM profiles WHERE referral_code = new_code) INTO code_exists;
    
    EXIT WHEN NOT code_exists;
  END LOOP;
  
  RETURN new_code;
END;
$$ LANGUAGE plpgsql;

-- Auto-generate referral codes for new users
CREATE OR REPLACE FUNCTION auto_generate_referral_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.referral_code IS NULL THEN
    NEW.referral_code := generate_referral_code();
    NEW.referral_code_generated_at := NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for auto-generating codes
DROP TRIGGER IF EXISTS ensure_referral_code ON profiles;
CREATE TRIGGER ensure_referral_code
BEFORE INSERT ON profiles
FOR EACH ROW
EXECUTE FUNCTION auto_generate_referral_code();

-- Increment user referral count
CREATE OR REPLACE FUNCTION increment_user_referrals(p_user_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE profiles
  SET total_referrals = total_referrals + 1
  WHERE user_id = p_user_id;
END;
$$ LANGUAGE plpgsql;

-- Increment successful referrals
CREATE OR REPLACE FUNCTION increment_successful_referrals(p_user_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE profiles
  SET successful_referrals = successful_referrals + 1
  WHERE user_id = p_user_id;
END;
$$ LANGUAGE plpgsql;

-- Increment giveaway entries
CREATE OR REPLACE FUNCTION increment_giveaway_entries(
  p_giveaway_id UUID,
  p_entries_to_add INT
)
RETURNS VOID AS $$
BEGIN
  UPDATE giveaways
  SET total_entries = total_entries + p_entries_to_add,
      updated_at = NOW()
  WHERE id = p_giveaway_id;
END;
$$ LANGUAGE plpgsql;

-- Decrement giveaway entries (for refunds)
CREATE OR REPLACE FUNCTION decrement_giveaway_entries(
  p_giveaway_id UUID,
  p_entries_to_remove INT
)
RETURNS VOID AS $$
BEGIN
  UPDATE giveaways
  SET total_entries = GREATEST(0, total_entries - p_entries_to_remove),
      updated_at = NOW()
  WHERE id = p_giveaway_id;
END;
$$ LANGUAGE plpgsql;

-- Add referral earnings
CREATE OR REPLACE FUNCTION add_referral_earnings(
  p_user_id UUID,
  p_amount DECIMAL
)
RETURNS VOID AS $$
BEGIN
  UPDATE profiles
  SET referral_earnings = referral_earnings + p_amount
  WHERE user_id = p_user_id;
END;
$$ LANGUAGE plpgsql;

-- ==============================================
-- 7. UPDATE EXISTING USERS WITH REFERRAL CODES
-- ==============================================

-- Generate codes for existing users
UPDATE profiles 
SET referral_code = generate_referral_code(),
    referral_code_generated_at = NOW()
WHERE referral_code IS NULL;

-- ==============================================
-- SUCCESS MESSAGE
-- ==============================================

DO $$ 
BEGIN 
  RAISE NOTICE 'Referral system created successfully!';
END $$;

