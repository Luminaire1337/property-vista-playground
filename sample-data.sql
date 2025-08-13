-- Sample Data for PropertyVista
-- Run this AFTER you've created your first user account and logged in

-- Replace 'YOUR_USER_ID_HERE' with the actual UUID of your authenticated user
-- You can find this in the Supabase Auth dashboard or by checking auth.users table

-- First, create some sample properties
-- IMPORTANT: Replace the user_id with your actual user UUID from auth.users
INSERT INTO public.properties (
  title, description, location, price, price_per_m2, area, rooms, bathrooms, parking,
  property_type, transaction_type, featured, rating, reviews_count, user_id
) VALUES
  (
    'Nowoczesne mieszkanie w centrum Warszawy',
    'Piękne, w pełni wyposażone mieszkanie o powierzchni 65m² w sercu Warszawy. Wysoki standard wykończenia, klimatyzacja, oraz dostęp do tarasu. Idealne dla młodej pary lub singla.',
    'Warszawa, Śródmieście',
    850000.00,
    13076.92,
    65.00,
    3,
    1,
    1,
    'mieszkanie',
    'sprzedaż',
    true,
    4.8,
    24,
    'YOUR_USER_ID_HERE'  -- Replace with your actual user ID
  ),
  (
    'Dom wolnostojący z ogrodem',
    'Przestronny dom o powierzchni 150m² z pięknym ogrodem 500m². Doskonała lokalizacja w spokojnej dzielnicy, blisko szkół i komunikacji publicznej.',
    'Kraków, Bronowice',
    1200000.00,
    8000.00,
    150.00,
    5,
    2,
    2,
    'dom',
    'sprzedaż',
    true,
    4.9,
    18,
    'YOUR_USER_ID_HERE'  -- Replace with your actual user ID
  ),
  (
    'Mieszkanie do wynajęcia w Gdańsku',
    'Komfortowe mieszkanie 2-pokojowe w nowym budownictwie. W pełni umeblowane, z balkonem i miejscem parkingowym w garażu podziemnym.',
    'Gdańsk, Wrzeszcz',
    3200.00,
    71.11,
    45.00,
    2,
    1,
    1,
    'mieszkanie',
    'wynajem',
    false,
    4.6,
    12,
    'YOUR_USER_ID_HERE'  -- Replace with your actual user ID
  ),
  (
    'Luksusowy penthouse z widokiem na morze',
    'Ekskluzywny penthouse na ostatnim piętrze z niesamowitym widokiem na morze. Przestronna terasa, jacuzzi i prywatny parking.',
    'Sopot, Centrum',
    2500000.00,
    25000.00,
    100.00,
    4,
    2,
    2,
    'mieszkanie',
    'sprzedaż',
    true,
    5.0,
    8,
    'YOUR_USER_ID_HERE'  -- Replace with your actual user ID
  ),
  (
    'Przytulne mieszkanie dla studentów',
    'Małe ale funkcjonalne mieszkanie idealne dla studentów. W pełni umeblowane, blisko uniwersytetu i komunikacji.',
    'Wrocław, Plac Grunwaldzki',
    2000.00,
    66.67,
    30.00,
    1,
    1,
    0,
    'mieszkanie',
    'wynajem',
    false,
    4.2,
    15,
    'YOUR_USER_ID_HERE'  -- Replace with your actual user ID
  ),
  (
    'Dom rodzinny z dużym ogrodem',
    'Idealny dom dla rodziny z dziećmi. Duży ogród, spokojna okolica, garaż na 2 samochody i dużo przestrzeni.',
    'Poznań, Jeżyce',
    950000.00,
    6333.33,
    150.00,
    6,
    3,
    2,
    'dom',
    'sprzedaż',
    false,
    4.7,
    11,
    'YOUR_USER_ID_HERE'  -- Replace with your actual user ID
  ),
  (
    'Nowoczesny loft w centrum',
    'Stylowy loft w rewitalizowanej kamienicy. Wysokie sufity, cegła na ścianie, nowoczesne wykończenia.',
    'Łódź, Manufaktura',
    3800.00,
    76.00,
    50.00,
    2,
    1,
    1,
    'mieszkanie',
    'wynajem',
    true,
    4.9,
    6,
    'YOUR_USER_ID_HERE'  -- Replace with your actual user ID
  ),
  (
    'Działka budowlana z pozwoleniem',
    'Atrakcyjna działka budowlana z wydanym pozwoleniem na budowę. Wszystkie media w granicy działki.',
    'Warszawa, Wilanów',
    450000.00,
    900.00,
    500.00,
    0,
    0,
    0,
    'działka',
    'sprzedaż',
    false,
    0.0,
    0,
    'YOUR_USER_ID_HERE'  -- Replace with your actual user ID
  );

-- Add images for the properties
-- This will add a primary image for each property
INSERT INTO public.property_images (property_id, url, alt_text, is_primary) VALUES
  ((SELECT id FROM public.properties WHERE title = 'Nowoczesne mieszkanie w centrum Warszawy' LIMIT 1), 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800', 'Salon z nowoczesnym wystrojem', true),
  ((SELECT id FROM public.properties WHERE title = 'Dom wolnostojący z ogrodem' LIMIT 1), 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800', 'Fasada domu z ogrodem', true),
  ((SELECT id FROM public.properties WHERE title = 'Mieszkanie do wynajęcia w Gdańsku' LIMIT 1), 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800', 'Przytulny salon z balkonem', true),
  ((SELECT id FROM public.properties WHERE title = 'Luksusowy penthouse z widokiem na morze' LIMIT 1), 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800', 'Penthouse z widokiem na morze', true),
  ((SELECT id FROM public.properties WHERE title = 'Przytulne mieszkanie dla studentów' LIMIT 1), 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800', 'Małe ale funkcjonalne mieszkanie', true),
  ((SELECT id FROM public.properties WHERE title = 'Dom rodzinny z dużym ogrodem' LIMIT 1), 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800', 'Dom rodzinny z ogrodem', true),
  ((SELECT id FROM public.properties WHERE title = 'Nowoczesny loft w centrum' LIMIT 1), 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800', 'Stylowy loft industrialny', true),
  ((SELECT id FROM public.properties WHERE title = 'Działka budowlana z pozwoleniem' LIMIT 1), 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800', 'Działka z pozwoleniem na budowę', true);

-- Instructions:
-- 1. First create a user account through your application
-- 2. Find your user ID in Supabase dashboard (Authentication > Users)
-- 3. Replace all instances of 'YOUR_USER_ID_HERE' with your actual UUID
-- 4. Run this script in Supabase SQL editor