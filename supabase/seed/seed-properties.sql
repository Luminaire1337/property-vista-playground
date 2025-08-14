-- PropertyVista Sample Data - Creates test user and properties
-- This seed file creates sample data for development

-- Create a test user and profile
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  aud,
  role
) VALUES (
  '550e8400-e29b-41d4-a716-446655440000',
  '00000000-0000-0000-0000-000000000000',
  'test@propertyvistadev.com',
  crypt('testpassword123', gen_salt('bf')),
  now(),
  now(),
  now(),
  'authenticated',
  'authenticated'
) ON CONFLICT (id) DO NOTHING;

-- Create corresponding profile
INSERT INTO public.profiles (
  id,
  email,
  full_name,
  phone
) VALUES (
  '550e8400-e29b-41d4-a716-446655440000',
  'test@propertyvistadev.com',
  'Test User',
  '+48123456789'
) ON CONFLICT (id) DO NOTHING;

-- Insert sample properties using the test user
WITH test_user AS (
  SELECT '550e8400-e29b-41d4-a716-446655440000'::uuid as id
)
INSERT INTO public.properties (
  title, slug, description, location, price, price_per_m2, area, rooms, bathrooms, parking,
  property_type, transaction_type, featured, user_id
)
SELECT 
  title, slug, description, location, price, price_per_m2, area, rooms, bathrooms, parking,
  property_type::property_type, transaction_type::transaction_type, featured, test_user.id
FROM (VALUES
  ('Nowoczesne mieszkanie w centrum Warszawy', 'nowoczesne-mieszkanie-w-centrum-warszawy', 'Piękne, w pełni wyposażone mieszkanie o powierzchni 65m² w sercu Warszawy. Wysoki standard wykończenia, klimatyzacja, oraz dostęp do tarasu. Idealne dla młodej pary lub singla.', 'Warszawa, Śródmieście', 850000.00, 13076.92, 65.00, 3, 1, 1, 'mieszkanie', 'sprzedaż', true),
  ('Dom wolnostojący z ogrodem', 'dom-wolnostojacy-z-ogrodem', 'Przestronny dom o powierzchni 150m² z pięknym ogrodem 500m². Doskonała lokalizacja w spokojnej dzielnicy, blisko szkół i komunikacji publicznej.', 'Kraków, Bronowice', 1200000.00, 8000.00, 150.00, 5, 2, 2, 'dom', 'sprzedaż', true),
  ('Mieszkanie do wynajęcia w Gdańsku', 'mieszkanie-do-wynajecia-w-gdansku', 'Komfortowe mieszkanie 2-pokojowe w nowym budownictwie. W pełni umeblowane, z balkonem i miejscem parkingowym w garażu podziemnym.', 'Gdańsk, Wrzeszcz', 3200.00, 71.11, 45.00, 2, 1, 1, 'mieszkanie', 'wynajem', false),
  ('Luksusowy penthouse z widokiem na morze', 'luksusowy-penthouse-z-widokiem-na-morze', 'Ekskluzywny penthouse na ostatnim piętrze z niesamowitym widokiem na morze. Przestronna terasa, jacuzzi i prywatny parking.', 'Sopot, Centrum', 2500000.00, 25000.00, 100.00, 4, 2, 2, 'mieszkanie', 'sprzedaż', true),
  ('Przytulne mieszkanie dla studentów', 'przytulne-mieszkanie-dla-studentow', 'Małe ale funkcjonalne mieszkanie idealne dla studentów. W pełni umeblowane, blisko uniwersytetu i komunikacji.', 'Wrocław, Plac Grunwaldzki', 2000.00, 66.67, 30.00, 1, 1, 0, 'mieszkanie', 'wynajem', false),
  ('Dom rodzinny z dużym ogrodem', 'dom-rodzinny-z-duzym-ogrodem', 'Idealny dom dla rodziny z dziećmi. Duży ogród, spokojna okolica, garaż na 2 samochody i dużo przestrzeni.', 'Poznań, Jeżyce', 950000.00, 6333.33, 150.00, 6, 3, 2, 'dom', 'sprzedaż', false),
  ('Nowoczesny loft w centrum', 'nowoczesny-loft-w-centrum', 'Stylowy loft w rewitalizowanej kamienicy. Wysokie sufity, cegła na ścianie, nowoczesne wykończenia.', 'Łódź, Manufaktura', 3800.00, 76.00, 50.00, 2, 1, 1, 'mieszkanie', 'wynajem', true),
  ('Działka budowlana z pozwoleniem', 'dzialka-budowlana-z-pozwoleniem', 'Atrakcyjna działka budowlana z wydanym pozwoleniem na budowę. Wszystkie media w granicy działki.', 'Warszawa, Wilanów', 450000.00, 900.00, 500.00, 0, 0, 0, 'działka', 'sprzedaż', false),
  ('Studio w sercu Krakowa', 'studio-w-sercu-krakowa', 'Małe ale klimatyczne studio w zabytkowej kamienicy. Idealne dla singla lub studenta.', 'Kraków, Stare Miasto', 2800.00, 100.00, 28.00, 1, 1, 0, 'mieszkanie', 'wynajem', true),
  ('Apartament z tarasem', 'apartament-z-tarasem', 'Przestronny apartament z dużym tarasem i widokiem na park. Wysoki standard, garaż podziemny.', 'Warszawa, Mokotów', 1300000.00, 16250.00, 80.00, 4, 2, 1, 'mieszkanie', 'sprzedaż', true)
) AS sample_data(title, slug, description, location, price, price_per_m2, area, rooms, bathrooms, parking, property_type, transaction_type, featured),
test_user;

-- Add multiple images for each property
INSERT INTO public.property_images (property_id, url, alt_text, is_primary) 
SELECT p.id, images.url, images.alt_text, images.is_primary
FROM public.properties p
JOIN (VALUES
  -- Nowoczesne mieszkanie w centrum Warszawy (4 images)
  ('Nowoczesne mieszkanie w centrum Warszawy', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop', 'Salon z nowoczesnym wystrojem', true),
  ('Nowoczesne mieszkanie w centrum Warszawy', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop', 'Nowoczesna kuchnia z wyspą', false),
  ('Nowoczesne mieszkanie w centrum Warszawy', 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop', 'Elegancka sypialnia', false),
  ('Nowoczesne mieszkanie w centrum Warszawy', 'https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=800&h=600&fit=crop', 'Łazienka z wanną wolnostojącą', false),
  
  -- Dom wolnostojący z ogrodem (5 images)
  ('Dom wolnostojący z ogrodem', 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop', 'Fasada domu z ogrodem', true),
  ('Dom wolnostojący z ogrodem', 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&h=600&fit=crop', 'Przestronny salon z kominkiem', false),
  ('Dom wolnostojący z ogrodem', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop', 'Kuchnia z jadalnią', false),
  ('Dom wolnostojący z ogrodem', 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop', 'Ogród z tarasem', false),
  ('Dom wolnostojący z ogrodem', 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop', 'Garaż dla dwóch samochodów', false),
  
  -- Mieszkanie do wynajęcia w Gdańsku (3 images)
  ('Mieszkanie do wynajęcia w Gdańsku', 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop', 'Przytulny salon z balkonem', true),
  ('Mieszkanie do wynajęcia w Gdańsku', 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800&h=600&fit=crop', 'Sypialnia z dużym oknem', false),
  ('Mieszkanie do wynajęcia w Gdańsku', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop', 'Balkon z widokiem na miasto', false),
  
  -- Luksusowy penthouse z widokiem na morze (6 images)
  ('Luksusowy penthouse z widokiem na morze', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop', 'Penthouse z widokiem na morze', true),
  ('Luksusowy penthouse z widokiem na morze', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop', 'Luksusowa kuchnia z wyspą', false),
  ('Luksusowy penthouse z widokiem na morze', 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop', 'Główna sypialnia z garderobą', false),
  ('Luksusowy penthouse z widokiem na morze', 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&h=600&fit=crop', 'Przestronny taras z jacuzzi', false),
  ('Luksusowy penthouse z widokiem na morze', 'https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=800&h=600&fit=crop', 'Marmurowa łazienka', false),
  ('Luksusowy penthouse z widokiem na morze', 'https://images.unsplash.com/photo-1506377295352-e3154d43ea9e?w=800&h=600&fit=crop', 'Widok na morze z salonu', false),
  
  -- Przytulne mieszkanie dla studentów (2 images)
  ('Przytulne mieszkanie dla studentów', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop', 'Małe ale funkcjonalne mieszkanie', true),
  ('Przytulne mieszkanie dla studentów', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop', 'Aneks kuchenny', false),
  
  -- Dom rodzinny z dużym ogrodem (4 images)
  ('Dom rodzinny z dużym ogrodem', 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop', 'Dom rodzinny z ogrodem', true),
  ('Dom rodzinny z dużym ogrodem', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop', 'Duży salon rodzinny', false),
  ('Dom rodzinny z dużym ogrodem', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop', 'Kuchnia z miejscem na całą rodzinę', false),
  ('Dom rodzinny z dużym ogrodem', 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=800&h=600&fit=crop', 'Duży ogród dla dzieci', false),
  
  -- Nowoczesny loft w centrum (3 images)
  ('Nowoczesny loft w centrum', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop', 'Stylowy loft industrialny', true),
  ('Nowoczesny loft w centrum', 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800&h=600&fit=crop', 'Wysokie sufity z belkami', false),
  ('Nowoczesny loft w centrum', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop', 'Otwarta kuchnia w stylu loft', false),
  
  -- Działka budowlana z pozwoleniem (2 images)
  ('Działka budowlana z pozwoleniem', 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop', 'Działka z pozwoleniem na budowę', true),
  ('Działka budowlana z pozwoleniem', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop', 'Widok na okolicę z działki', false),
  
  -- Studio w sercu Krakowa (3 images)
  ('Studio w sercu Krakowa', 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&h=600&fit=crop', 'Klimatyczne studio w kamienicy', true),
  ('Studio w sercu Krakowa', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop', 'Kompaktowa przestrzeń mieszkalna', false),
  ('Studio w sercu Krakowa', 'https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=800&h=600&fit=crop', 'Mała ale elegancka łazienka', false),
  
  -- Apartament z tarasem (4 images)
  ('Apartament z tarasem', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop', 'Apartament z widokiem na park', true),
  ('Apartament z tarasem', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop', 'Nowoczesna kuchnia apartamentu', false),
  ('Apartament z tarasem', 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&h=600&fit=crop', 'Duży taras z meblami ogrodowymi', false),
  ('Apartament z tarasem', 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop', 'Elegancka sypialnia z garderobą', false)
) AS images(title, url, alt_text, is_primary) ON p.title = images.title;

-- Display success message with detailed counts
SELECT 
  (SELECT COUNT(*) FROM public.properties) as properties_created,
  (SELECT COUNT(*) FROM public.property_images) as total_images_created,
  (SELECT COUNT(*) FROM public.property_images WHERE is_primary = true) as primary_images_created,
  'Properties with multiple images successfully created!' as message;