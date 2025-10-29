-- Seed initial reviews for the review section
-- Note: product_id is set to NULL for general platform reviews

-- Base review templates with realistic variation
DO $$
DECLARE
  review_templates RECORD;
  profile_count INTEGER;
  i INTEGER := 0;
BEGIN
  -- Get count of existing profiles
  SELECT COUNT(*) INTO profile_count FROM profiles WHERE user_id IS NOT NULL;
  
  -- If we have profiles, seed reviews
  IF profile_count > 0 THEN
    -- Insert base realistic reviews
    FOR review_templates IN (
      SELECT rating, comment FROM (VALUES
        (5, 'Fast delivery, great quality. These guys get it. Came in discreet packaging and the product was exactly as described. Will definitely order again.'),
        (4, 'Honestly wasnt sure at first but tried them based on a friends recommendation. Now Im a regular. The delivery person was professional and timely.'),
        (1, 'wrote a 1 star review by accident but honestly this place is amazing. The driver was super nice and got to me faster than expected. quality is top notch honestly best in the city'),
        (5, 'Been using them for months. Always on time, always quality. The app is easy to use and the delivery person is always friendly and professional.'),
        (1, 'my first order came a little later than expected like maybe 10 min late but the driver was really apologetic and the product was perfect. gave them another shot and theyre always on time now. great service'),
        (5, 'Quality is consistent, prices are fair, delivery is reliable. No complaints after 10+ orders. Exactly what I needed.'),
        (2, 'The driver got lost and arrived late, but he was super apologetic and the manager called to make it right. Mistakes happen, but their response was impressive.'),
        (1, 'accidentally clicked 1 star trying to rate fast but this is actually my favorite place now. packaging is super discreet and product is always fresh. prices are reasonable too'),
        (1, 'my bad hit 1 star by mistake. Actually really happy with everything. fast delivery, good prices, professional service. would definitely recommend'),
        (1, 'Not sure how to change this but meant to give 5 stars. product quality is amazing and they always deliver when they say they will. best service ive found'),
        (5, 'Best delivery service in the city. Been using for a year now. Fast, discreet, and always top quality product.'),
        (5, 'Great experience overall. Delivery was quick and product was exactly as advertised.'),
        (4, 'Really impressed with the quality. Packaging was very discreet which I appreciated.'),
        (5, 'Love this service! Been ordering for months and never had an issue.'),
        (3, 'Was okay. Delivery took a bit longer than expected but product was good.'),
        (5, 'Amazing service. Very professional and quick. Highly recommend!'),
        (4, 'Solid product and great delivery. Will definitely order again.'),
        (5, 'Best in the city. Always consistent quality and great customer service.'),
        (4, 'Really good experience. Easy ordering and fast delivery.'),
        (5, 'Top notch service. Product was exactly what I wanted.')
      ) AS t(rating, comment)
    ) LOOP
      INSERT INTO reviews (user_id, product_id, rating, comment, created_at)
      SELECT 
        user_id,
        NULL,
        review_templates.rating,
        review_templates.comment,
        NOW() - (random() * INTERVAL '180 days')
      FROM profiles
      WHERE user_id IS NOT NULL
      LIMIT 1;
    END LOOP;
    
    -- Generate 9,980+ additional reviews to reach 10,000
    FOR i IN 1..9980 LOOP
      INSERT INTO reviews (user_id, product_id, rating, comment, created_at)
      SELECT 
        user_id,
        NULL,
        (CASE 
          WHEN random() < 0.75 THEN 5  -- 75% are 5 stars
          WHEN random() < 0.15 THEN 4  -- 15% are 4 stars
          WHEN random() < 0.05 THEN 3  -- 5% are 3 stars
          WHEN random() < 0.04 THEN 2  -- 4% are 2 stars
          ELSE 1  -- 1% are 1 stars (for authenticity)
        END)::INTEGER,
        CASE 
          WHEN random() < 0.3 THEN 'Great service! Will definitely order again.'
          WHEN random() < 0.5 THEN 'Fast delivery and excellent product quality.'
          WHEN random() < 0.7 THEN 'Very satisfied with my purchase. Highly recommend!'
          WHEN random() < 0.85 THEN 'Good experience overall. Professional service.'
          WHEN random() < 0.95 THEN 'Solid product. Would order again.'
          ELSE 'Okay experience. Product was as expected.'
        END,
        NOW() - (random() * INTERVAL '180 days')
      FROM profiles
      WHERE user_id IS NOT NULL
      ORDER BY random()
      LIMIT 1;
    END LOOP;
  END IF;
END $$;

