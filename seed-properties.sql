-- PropertyVista Sample Data - Auto-detects first user
-- Run this in your Supabase SQL Editor after creating your first user account

-- First, let's create sample properties using the first user in the system
WITH first_user AS (
  SELECT id FROM auth.users ORDER BY created_at LIMIT 1
)
INSERT INTO public.properties (
  title, description, location, price, price_per_m2, area, rooms, bathrooms, parking,
  property_type, transaction_type, featured, rating, reviews_count, user_id
)
SELECT 
  title, description, location, price, price_per_m2, area, rooms, bathrooms, parking,
  property_type, transaction_type, featured, rating, reviews_count, first_user.id
FROM (VALUES
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
    24
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
    18
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
    12
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
    8
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
    15
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
    11
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
    6
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
    0
  ),
  (
    'Studio w sercu Krakowa',
    'Małe ale klimatyczne studio w zabytkowej kamienicy. Idealne dla singla lub studenta.',
    'Kraków, Stare Miasto',
    2800.00,
    100.00,
    28.00,
    1,
    1,
    0,
    'mieszkanie',
    'wynajem',
    true,
    4.5,
    9
  ),
  (
    'Apartament z tarasem',
    'Przestronny apartament z dużym tarasem i widokiem na park. Wysoki standard, garaż podziemny.',
    'Warszawa, Mokotów',
    1300000.00,
    16250.00,
    80.00,
    4,
    2,
    1,
    'mieszkanie',
    'sprzedaż',
    true,
    4.8,
    16
  )
) AS sample_data(title, description, location, price, price_per_m2, area, rooms, bathrooms, parking, property_type, transaction_type, featured, rating, reviews_count),
first_user;

-- Add images for the properties
INSERT INTO public.property_images (property_id, url, alt_text, is_primary) 
SELECT p.id, images.url, images.alt_text, images.is_primary
FROM public.properties p
JOIN (VALUES
  ('Nowoczesne mieszkanie w centrum Warszawy', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800', 'Salon z nowoczesnym wystrojem', true),
  ('Dom wolnostojący z ogrodem', 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800', 'Fasada domu z ogrodem', true),
  ('Mieszkanie do wynajęcia w Gdańsku', 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800', 'Przytulny salon z balkonem', true),
  ('Luksusowy penthouse z widokiem na morze', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800', 'Penthouse z widokiem na morze', true),
  ('Przytulne mieszkanie dla studentów', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800', 'Małe ale funkcjonalne mieszkanie', true),
  ('Dom rodzinny z dużym ogrodem', 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800', 'Dom rodzinny z ogrodem', true),
  ('Nowoczesny loft w centrum', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800', 'Stylowy loft industrialny', true),
  ('Działka budowlana z pozwoleniem', 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800', 'Działka z pozwoleniem na budowę', true),
  ('Studio w sercu Krakowa', 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800', 'Klimatyczne studio w kamienicy', true),
  ('Apartament z tarasem', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', 'Apartament z widokiem na park', true)
) AS images(title, url, alt_text, is_primary) ON p.title = images.title;

-- Display success message
SELECT 
  COUNT(*) as properties_created,
  'Properties and images successfully created!' as message
FROM public.properties;