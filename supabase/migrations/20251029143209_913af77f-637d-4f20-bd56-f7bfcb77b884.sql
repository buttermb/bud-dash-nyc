-- Force types regeneration by updating table comments
-- This will trigger Supabase to regenerate the types file

COMMENT ON TABLE public.cart_items IS 'Shopping cart items for users';
COMMENT ON TABLE public.products IS 'Product catalog with pricing and inventory';
COMMENT ON TABLE public.orders IS 'Customer orders with delivery information';
COMMENT ON TABLE public.inventory IS 'Product inventory tracking';
