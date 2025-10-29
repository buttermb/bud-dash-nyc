-- Seed initial reviews for the review section
-- Note: product_id is set to NULL for general platform reviews

-- Insert realistic reviews (will only work if profiles exist)
INSERT INTO reviews (user_id, product_id, rating, comment, created_at)
SELECT 
  p.user_id,
  NULL,
  rating,
  comment,
  NOW() - (random() * INTERVAL '30 days')
FROM (VALUES
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
  (5, 'Best delivery service in the city. Been using for a year now. Fast, discreet, and always top quality product.')
) AS reviews(rating, comment)
CROSS JOIN profiles p
WHERE p.user_id IS NOT NULL
LIMIT 11;

