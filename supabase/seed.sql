-- Seed Data for Health Quiz

-- Insert Categories
INSERT INTO categories (name, slug, description) VALUES
('Energy Support', 'energy-support', 'Supplements designed to boost daily energy levels and fight fatigue.'),
('Testosterone Support', 'testosterone-support', 'Natural support for masculine health and vitality.'),
('Weight Management', 'weight-management', 'Support for metabolism and healthy weight loss goals.'),
('Hormone Balance', 'hormone-balance', 'Targeted nutrients for female hormonal health and wellness.'),
('Sleep Support', 'sleep-support', 'Promotes restful sleep and relaxation.'),
('Gut Health', 'gut-health', 'Probiotics and digestive support.'),
('Hair & Skin Health', 'hair-skin-health', 'Nutrients for radiant skin and strong hair.');

-- Insert Products (Examples)
-- Note: Replace UUIDs with actual category IDs if running manually, 
-- or use subqueries as shown below.

-- Male Energy Products
INSERT INTO products (product_name, slug, gender_target, category, description, benefits, ingredients, trustpilot_rating, trustpilot_reviews, affiliate_link)
VALUES
('Energy Max Gold', 'energy-max-gold', 'male', (SELECT id FROM categories WHERE slug = 'energy-support'), 
'A powerful blend of B-vitamins and adaptogens for sustained energy.', 
'Boosts Metabolism, Reduces Fatigue, Sharpens Focus', 'B12, Rhodiola, Ginseng', 4.8, 1250, 'https://example.com/buy-energy-max'),
('MitoCharge Male', 'mitocharge-male', 'male', (SELECT id FROM categories WHERE slug = 'energy-support'), 
'Mitochondrial support specifically formulated for the active man.', 
'Cellular Energy, ATP Support, Fast Recovery', 'CoQ10, Magnesium, L-Carnitine', 4.5, 840, 'https://example.com/buy-mitocharge');

-- Male Testosterone Products
INSERT INTO products (product_name, slug, gender_target, category, description, benefits, ingredients, trustpilot_rating, trustpilot_reviews, affiliate_link)
VALUES
('T-Boost Pro', 't-boost-pro', 'male', (SELECT id FROM categories WHERE slug = 'testosterone-support'), 
'Clinical-strength natural testosterone support.', 
'Muscle Mass, Male Vitality, Libido Support', 'Zinc, D-Aspartic Acid, Fenugreek', 4.7, 3100, 'https://example.com/buy-tboost'),
('Alpha Shield', 'alpha-shield', 'male', (SELECT id FROM categories WHERE slug = 'testosterone-support'), 
'Daily vitality supplement for men over 40.', 
'Hormone Health, Vitality, Stress Control', 'Ashwagandha, Vitamin D3, Magnesium', 4.6, 1200, 'https://example.com/buy-alpha-shield');

-- Female Hormone Products
INSERT INTO products (product_name, slug, gender_target, category, description, benefits, ingredients, trustpilot_rating, trustpilot_reviews, affiliate_link)
VALUES
('HerBalance Bloom', 'herbalance-bloom', 'female', (SELECT id FROM categories WHERE slug = 'hormone-balance'), 
'Gentle support for natural female cycles.', 
'Mood Support, Cycle Comfort, Skin Clarity', 'Evening Primrose, Vitamin B6, Magnesium', 4.9, 1800, 'https://example.com/buy-herbalance'),
('Cycle Calm', 'cycle-calm', 'female', (SELECT id FROM categories WHERE slug = 'hormone-balance'), 
'Focused relief for hormonal fluctuations.', 
'Reduces Bloating, Eases Stress, Better Sleep', 'Chasteberry, Zinc, Ashwagandha', 4.4, 650, 'https://example.com/buy-cycle-calm');

-- Female Weight Loss
INSERT INTO products (product_name, slug, gender_target, category, description, benefits, ingredients, trustpilot_rating, trustpilot_reviews, affiliate_link)
VALUES
('LeanShe Pro', 'leanshe-pro', 'female', (SELECT id FROM categories WHERE slug = 'weight-management'), 
'Natural metabolism booster for active women.', 
'Fat Burn, Appetite Control, Energy Boost', 'Green Tea, Chromium, L-Theanine', 4.5, 2100, 'https://example.com/buy-leanshe');

-- Unisex Sleep (using unisex or adding both)
INSERT INTO products (product_name, slug, gender_target, category, description, benefits, ingredients, trustpilot_rating, trustpilot_reviews, affiliate_link)
VALUES
('Night Rest Plus (Male)', 'night-rest-male', 'male', (SELECT id FROM categories WHERE slug = 'sleep-support'), 
'Deep sleep support for optimal recovery.', 
'Fall Asleep Faster, Stay Asleep, No Morning Grogginess', 'Melatonin, Magnesium, Valerian', 4.7, 950, 'https://example.com/buy-nightrest-m'),
('Night Rest Plus (Female)', 'night-rest-female', 'female', (SELECT id FROM categories WHERE slug = 'sleep-support'), 
'Beauty sleep and hormonal night support.', 
'Restorative Sleep, Wake Up Refreshed, Skin Repair', 'Melatonin, 5-HTP, Glycine', 4.8, 1100, 'https://example.com/buy-nightrest-f');
