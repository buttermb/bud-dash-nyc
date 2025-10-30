-- Force types regeneration by adding a helpful comment
COMMENT ON TABLE public.products IS 'Product catalog with inventory and pricing information';
COMMENT ON TABLE public.profiles IS 'User profiles with personal and behavioral data';
COMMENT ON TABLE public.age_verifications IS 'Age verification records with ID documents';
COMMENT ON TABLE public.couriers IS 'Courier information and status';
COMMENT ON TABLE public.orders IS 'Customer orders with delivery details';