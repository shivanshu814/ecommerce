// @ts-nocheck
import { convertUsdCentsToInrPaise, STRIPE_CURRENCY } from '../../constants/currency'

export type CatalogCategory = {
  name: string
  imageKey: string
  brands: string[]
  productTypes: string[]
  modifiers: string[]
  priceMin: number
  priceMax: number
}

export const CATALOG_ASSETS: Array<{ key: string; file: string; alt: string }> = [
  { key: 'fashion', file: 'fashion.jpg', alt: 'Fashion and apparel' },
  { key: 'electronics', file: 'electronics.jpg', alt: 'Electronics and gadgets' },
  { key: 'beauty', file: 'beauty.jpg', alt: 'Beauty products' },
  { key: 'home', file: 'home.jpg', alt: 'Home decor' },
  { key: 'fitness', file: 'fitness.jpg', alt: 'Fitness equipment' },
  { key: 'books', file: 'books.jpg', alt: 'Books and reading' },
  { key: 'tech', file: 'tech.jpg', alt: 'Technology workspace' },
  { key: 'audio', file: 'audio.jpg', alt: 'Headphones and audio' },
  { key: 'watches', file: 'watches.jpg', alt: 'Watches and accessories' },
  { key: 'shoes', file: 'shoes.jpg', alt: 'Footwear collection' },
  { key: 'kitchen', file: 'kitchen.jpg', alt: 'Kitchen essentials' },
  { key: 'jewelry', file: 'jewelry.jpg', alt: 'Jewelry collection' },
  { key: 'pets', file: 'pets.jpg', alt: 'Pet supplies' },
  { key: 'outdoor', file: 'outdoor.jpg', alt: 'Outdoor adventure' },
  { key: 'groceries', file: 'groceries.jpg', alt: 'Groceries and pantry' },
  { key: 'office', file: 'office.jpg', alt: 'Office supplies' },
  { key: 'baby', file: 'baby.jpg', alt: 'Baby and nursery' },
  { key: 'art', file: 'art.jpg', alt: 'Art and crafts' },
  { key: 'gaming', file: 'gaming.jpg', alt: 'Gaming setup' },
  { key: 'travel', file: 'travel.jpg', alt: 'Travel gear' },
  { key: 'automotive', file: 'automotive.jpg', alt: 'Automotive accessories' },
  { key: 'furniture', file: 'furniture.jpg', alt: 'Furniture and seating' },
  { key: 'skincare', file: 'skincare.jpg', alt: 'Skincare products' },
  { key: 'bags', file: 'bags.jpg', alt: 'Bags and luggage' },
  { key: 'food', file: 'food.jpg', alt: 'Gourmet food' },
]

export const DEMO_CATEGORY_MEDIA: Record<string, string> = {
  Apparel: 'fashion',
  'E-books': 'books',
  'Online courses': 'tech',
}

export const DEMO_MEDIA_BY_ALT: Record<string, string> = {
  Shirts: 'fashion',
  'E-Book': 'books',
  'Online Course': 'tech',
}

export const getCatalogExternalImageUrl = (key: string): string =>
  `https://picsum.photos/seed/megamart-${key}/800/600`

export const CATALOG_CATEGORIES: CatalogCategory[] = [
  { name: 'Smartphones', imageKey: 'electronics', brands: ['Apple', 'Samsung', 'Google', 'OnePlus'], productTypes: ['iPhone 15 Pro', 'Galaxy S24', 'Pixel 8', 'Nord 4'], modifiers: ['128GB', '256GB', '512GB', 'Unlocked'], priceMin: 69900, priceMax: 129900 },
  { name: 'Laptops', imageKey: 'tech', brands: ['Apple', 'Dell', 'Lenovo', 'ASUS'], productTypes: ['MacBook Air', 'XPS 13', 'ThinkPad X1', 'ZenBook'], modifiers: ['M3', 'Intel i7', '16GB RAM', '512GB SSD'], priceMin: 89900, priceMax: 249900 },
  { name: 'Headphones', imageKey: 'audio', brands: ['Sony', 'Bose', 'Apple', 'Sennheiser'], productTypes: ['WH-1000XM5', 'QuietComfort Ultra', 'AirPods Max', 'Momentum 4'], modifiers: ['Black', 'Silver', 'Wireless', 'Noise Cancelling'], priceMin: 24900, priceMax: 54900 },
  { name: 'Men\'s Clothing', imageKey: 'fashion', brands: ['Levi\'s', 'Nike', 'Patagonia', 'Uniqlo'], productTypes: ['Denim Jacket', 'Hoodie', 'Fleece Pullover', 'Oxford Shirt'], modifiers: ['Slim Fit', 'Regular Fit', 'Navy', 'Charcoal'], priceMin: 3900, priceMax: 18900 },
  { name: 'Women\'s Clothing', imageKey: 'fashion', brands: ['Zara', 'H&M', 'Madewell', 'Everlane'], productTypes: ['Midi Dress', 'Cashmere Sweater', 'Wide-Leg Trousers', 'Silk Blouse'], modifiers: ['XS', 'S', 'M', 'L'], priceMin: 4900, priceMax: 22900 },
  { name: 'Running Shoes', imageKey: 'shoes', brands: ['Nike', 'Adidas', 'Brooks', 'Hoka'], productTypes: ['Pegasus 41', 'Ultraboost Light', 'Ghost 16', 'Clifton 9'], modifiers: ['Men\'s', 'Women\'s', 'Wide', 'Size 10'], priceMin: 9900, priceMax: 17900 },
  { name: 'Skincare', imageKey: 'skincare', brands: ['CeraVe', 'The Ordinary', 'La Roche-Posay', 'Paula\'s Choice'], productTypes: ['Hydrating Cleanser', 'Retinol Serum', 'SPF 50 Moisturizer', 'Niacinamide Serum'], modifiers: ['Dry Skin', 'Oily Skin', 'Sensitive', 'Travel Size'], priceMin: 1200, priceMax: 8900 },
  { name: 'Makeup', imageKey: 'beauty', brands: ['Fenty Beauty', 'NARS', 'MAC', 'Charlotte Tilbury'], productTypes: ['Soft Matte Foundation', 'Radiant Concealer', 'Powder Blush', 'Lipstick'], modifiers: ['Shade 120', 'Shade 240', 'Matte', 'Satin'], priceMin: 1800, priceMax: 6900 },
  { name: 'Home Decor', imageKey: 'home', brands: ['West Elm', 'CB2', 'Article', 'Crate & Barrel'], productTypes: ['Ceramic Vase', 'Throw Pillow', 'Wall Mirror', 'Area Rug'], modifiers: ['Neutral', 'Terracotta', '24"', '5x7 ft'], priceMin: 2900, priceMax: 49900 },
  { name: 'Kitchen Appliances', imageKey: 'kitchen', brands: ['KitchenAid', 'Ninja', 'Breville', 'Instant Pot'], productTypes: ['Stand Mixer', 'Air Fryer Max', 'Espresso Machine', 'Multi-Cooker'], modifiers: ['Stainless Steel', '5-Quart', 'Pro', 'XL'], priceMin: 7900, priceMax: 89900 },
  { name: 'Fitness Equipment', imageKey: 'fitness', brands: ['Peloton', 'Bowflex', 'Rogue', 'TRX'], productTypes: ['Adjustable Dumbbells', 'Resistance Bands', 'Yoga Mat Pro', 'Kettlebell Set'], modifiers: ['25 lb', '50 lb', 'Black', 'Home Gym'], priceMin: 2900, priceMax: 149900 },
  { name: 'Watches', imageKey: 'watches', brands: ['Seiko', 'Citizen', 'Tissot', 'Casio'], productTypes: ['Presage Automatic', 'Eco-Drive Classic', 'PRX Powermatic', 'G-Shock'], modifiers: ['Silver', 'Black Dial', 'Leather Strap', 'Chronograph'], priceMin: 12900, priceMax: 89900 },
  { name: 'Jewelry', imageKey: 'jewelry', brands: ['Pandora', 'Mejuri', 'Tiffany & Co.', 'Catbird'], productTypes: ['Sterling Ring', 'Gold Hoop Earrings', 'Pearl Necklace', 'Chain Bracelet'], modifiers: ['14K Gold', 'Silver', 'Minimal', 'Gift Box'], priceMin: 4900, priceMax: 299900 },
  { name: 'Handbags', imageKey: 'bags', brands: ['Coach', 'Kate Spade', 'Michael Kors', 'Longchamp'], productTypes: ['Leather Tote', 'Crossbody Bag', 'Satchel', 'Backpack'], modifiers: ['Black', 'Tan', 'Mini', 'Medium'], priceMin: 12900, priceMax: 49900 },
  { name: 'Books', imageKey: 'books', brands: ['Penguin', 'HarperCollins', 'Simon & Schuster', 'Macmillan'], productTypes: ['Atomic Habits', 'The Midnight Library', 'Project Hail Mary', 'Deep Work'], modifiers: ['Hardcover', 'Paperback', 'Audiobook', 'Bestseller'], priceMin: 999, priceMax: 3499 },
  { name: 'Video Games', imageKey: 'gaming', brands: ['Nintendo', 'Sony', 'Microsoft', 'EA'], productTypes: ['Zelda: Tears of the Kingdom', 'Spider-Man 2', 'Starfield', 'FC 25'], modifiers: ['PS5', 'Xbox', 'Switch', 'Deluxe Edition'], priceMin: 4999, priceMax: 7999 },
  { name: 'Gaming Consoles', imageKey: 'gaming', brands: ['Sony', 'Microsoft', 'Nintendo', 'Valve'], productTypes: ['PlayStation 5', 'Xbox Series X', 'Switch OLED', 'Steam Deck'], modifiers: ['Digital Edition', 'Disc Edition', '512GB', 'Bundle'], priceMin: 34900, priceMax: 59900 },
  { name: 'Cameras', imageKey: 'tech', brands: ['Canon', 'Sony', 'Fujifilm', 'Nikon'], productTypes: ['EOS R8', 'Alpha a7 IV', 'X-T5', 'Z6 III'], modifiers: ['Body Only', 'Kit Lens', 'Mirrorless', 'Full Frame'], priceMin: 99900, priceMax: 349900 },
  { name: 'Smart Home', imageKey: 'electronics', brands: ['Amazon', 'Google', 'Philips Hue', 'Ring'], productTypes: ['Echo Show', 'Nest Hub Max', 'Smart Bulb Starter Kit', 'Video Doorbell'], modifiers: ['2nd Gen', 'Pro', 'White', 'Bundle'], priceMin: 2900, priceMax: 29900 },
  { name: 'TV & Streaming', imageKey: 'electronics', brands: ['Samsung', 'LG', 'Sony', 'Roku'], productTypes: ['OLED C4 55"', 'QN90C Neo QLED', 'Bravia XR A80L', 'Streaming Stick 4K'], modifiers: ['55"', '65"', 'Dolby Vision', '2024 Model'], priceMin: 4999, priceMax: 249900 },
  { name: 'Office Supplies', imageKey: 'office', brands: ['Moleskine', 'Pilot', 'Herman Miller', 'Logitech'], productTypes: ['Hardcover Notebook', 'G2 Pen Pack', 'Aeron Chair', 'MX Master 3S'], modifiers: ['Black', 'A5', 'Ergonomic', 'Wireless'], priceMin: 899, priceMax: 149900 },
  { name: 'Pet Supplies', imageKey: 'pets', brands: ['Purina', 'Blue Buffalo', 'Kong', 'FURminator'], productTypes: ['Adult Dog Food', 'Indoor Cat Food', 'Classic Dog Toy', 'Deshedding Tool'], modifiers: ['30 lb Bag', '15 lb Bag', 'Large', 'Medium Breed'], priceMin: 1299, priceMax: 8999 },
  { name: 'Baby & Nursery', imageKey: 'baby', brands: ['UPPAbaby', 'Graco', 'Fisher-Price', 'Hatch'], productTypes: ['Vista V2 Stroller', '4Ever Car Seat', 'Jumperoo', 'Rest Sound Machine'], modifiers: ['Grey', 'Black', 'Newborn', 'Convertible'], priceMin: 4900, priceMax: 99900 },
  { name: 'Outdoor & Camping', imageKey: 'outdoor', brands: ['The North Face', 'Patagonia', 'Coleman', 'Osprey'], productTypes: ['Down Sleeping Bag', 'Camping Tent', 'Hiking Backpack', 'Camp Stove'], modifiers: ['2-Person', '20°F', '65L', 'Compact'], priceMin: 4900, priceMax: 49900 },
  { name: 'Travel Luggage', imageKey: 'travel', brands: ['Away', 'Samsonite', 'Tumi', 'Monos'], productTypes: ['Carry-On Spinner', 'Checked Luggage', 'Weekender Duffel', 'Packing Cubes Set'], modifiers: ['Aluminum', 'Hard Shell', 'Expandable', 'Set of 3'], priceMin: 3900, priceMax: 89900 },
  { name: 'Groceries', imageKey: 'groceries', brands: ['Kerrygold', 'Barilla', 'Lavazza', 'Nature Valley'], productTypes: ['Irish Butter', 'Penne Pasta', 'Espresso Beans', 'Granola Bars'], modifiers: ['Organic', 'Family Pack', 'Dark Roast', '12 Count'], priceMin: 399, priceMax: 2999 },
  { name: 'Gourmet Food', imageKey: 'food', brands: ['Veuve Clicquot', 'Godiva', 'La Colombe', 'Bon Appetit Box'], productTypes: ['Extra Brut Champagne', 'Assorted Truffles', 'Draft Latte Variety', 'Artisan Snack Box'], modifiers: ['Gift Set', '750ml', '12-Pack', 'Seasonal'], priceMin: 1499, priceMax: 19999 },
  { name: 'Automotive', imageKey: 'automotive', brands: ['Michelin', 'Garmin', 'WeatherTech', 'Anker'], productTypes: ['All-Season Tires', 'Dash Cam', 'Floor Liners', 'Car Charger 100W'], modifiers: ['Set of 4', '1080p', 'Front Pair', 'USB-C'], priceMin: 1999, priceMax: 89900 },
  { name: 'Furniture', imageKey: 'furniture', brands: ['IKEA', 'West Elm', 'Article', 'Pottery Barn'], productTypes: ['Sectional Sofa', 'Dining Table', 'Platform Bed', 'Bookshelf'], modifiers: ['Gray Fabric', 'Oak', 'Queen', '5-Tier'], priceMin: 19900, priceMax: 299900 },
  { name: 'Art & Crafts', imageKey: 'art', brands: ['Winsor & Newton', 'Cricut', 'Faber-Castell', 'Arteza'], productTypes: ['Acrylic Paint Set', 'Maker 3 Bundle', 'Colored Pencil Set', 'Canvas Pack'], modifiers: ['24 Colors', 'Beginner', 'Professional', 'Multi-Pack'], priceMin: 1499, priceMax: 39900 },
  { name: 'Supplements', imageKey: 'fitness', brands: ['Optimum Nutrition', 'Garden of Life', 'Nordic Naturals', 'Thorne'], productTypes: ['Gold Standard Whey', 'Organic Protein', 'Omega-3 Fish Oil', 'Vitamin D3 + K2'], modifiers: ['Vanilla', 'Chocolate', '90 Count', '180 Count'], priceMin: 1999, priceMax: 7999 },
  { name: 'Sunglasses', imageKey: 'fashion', brands: ['Ray-Ban', 'Oakley', 'Warby Parker', 'Persol'], productTypes: ['Aviator Classic', 'Holbrook', 'Percey', 'PO0649'], modifiers: ['Polarized', 'Gold Frame', 'Tortoise', 'Gradient Lens'], priceMin: 9900, priceMax: 39900 },
  { name: 'Fragrances', imageKey: 'beauty', brands: ['Dior', 'Chanel', 'Tom Ford', 'Maison Margiela'], productTypes: ['Sauvage Eau de Parfum', 'Bleu de Chanel', 'Oud Wood', 'Replica Jazz Club'], modifiers: ['100ml', '50ml', 'Gift Set', 'Travel Spray'], priceMin: 8900, priceMax: 39900 },
  { name: 'Coffee & Tea', imageKey: 'kitchen', brands: ['Nespresso', 'Starbucks', 'Harney & Sons', 'Blue Bottle'], productTypes: ['Vertuo Pods Variety', 'Pike Place Roast', 'Hot Cinnamon Spice Tea', 'Three Africas Blend'], modifiers: ['40 Count', '1 lb Bag', '50 Sachets', 'Whole Bean'], priceMin: 999, priceMax: 4999 },
  { name: 'Bedding', imageKey: 'home', brands: ['Brooklinen', 'Parachute', 'Casper', 'Boll & Branch'], productTypes: ['Luxury Sheet Set', 'Linen Duvet Cover', 'Cooling Pillow', 'Organic Quilt'], modifiers: ['Queen', 'King', 'White', 'Slate'], priceMin: 4900, priceMax: 39900 },
  { name: 'Bath & Body', imageKey: 'beauty', brands: ['Aesop', 'Bath & Body Works', 'Dove', 'Sol de Janeiro'], productTypes: ['Resurrection Hand Wash', 'Japanese Cherry Blossom Lotion', 'Deep Moisture Body Wash', 'Brazilian Bum Bum Cream'], modifiers: ['500ml', '8 oz', 'Pump Bottle', 'Travel Size'], priceMin: 899, priceMax: 6900 },
  { name: 'Men\'s Grooming', imageKey: 'beauty', brands: ['Gillette', 'Beardbrand', 'Harry\'s', 'Jack Black'], productTypes: ['Labs Razor Kit', 'Beard Oil', 'Shave Gel', 'Face Buff'], modifiers: ['Sensitive Skin', 'Citrus', 'Travel Kit', 'Refill Pack'], priceMin: 999, priceMax: 8900 },
  { name: 'Women\'s Activewear', imageKey: 'fitness', brands: ['Lululemon', 'Alo Yoga', 'Girlfriend Collective', 'Outdoor Voices'], productTypes: ['Align Leggings', 'Airlift Bra', 'Compressive Short', 'Exercise Dress'], modifiers: ['25"', 'Black', 'XS', 'High Rise'], priceMin: 4800, priceMax: 12800 },
  { name: 'Cycling', imageKey: 'outdoor', brands: ['Specialized', 'Shimano', 'Garmin', 'Giro'], productTypes: ['Allez Road Bike', '105 Groupset', 'Edge 540 GPS', 'Helmet MIPS'], modifiers: ['Medium', 'Black', 'Bundle', '2024 Model'], priceMin: 8900, priceMax: 349900 },
  { name: 'Photography', imageKey: 'tech', brands: ['Peak Design', 'Manfrotto', 'SanDisk', 'Godox'], productTypes: ['Everyday Backpack', 'Carbon Tripod', 'Extreme PRO SD Card', 'V1 Flash'], modifiers: ['20L', '128GB', 'Sony Mount', 'Pro Kit'], priceMin: 1999, priceMax: 29900 },
  { name: 'Musical Instruments', imageKey: 'audio', brands: ['Fender', 'Yamaha', 'Roland', 'Shure'], productTypes: ['Player Stratocaster', 'P-125 Digital Piano', 'SP-404 MKII', 'SM58 Microphone'], modifiers: ['Sunburst', '88-Key', 'Sampler', 'Dynamic'], priceMin: 9900, priceMax: 149900 },
  { name: 'Board Games', imageKey: 'gaming', brands: ['Hasbro', 'Catan Studio', 'Stonemaier', 'Exploding Kittens'], productTypes: ['Monopoly Classic', 'Catan Base Game', 'Wingspan', 'Party Pack'], modifiers: ['Family Edition', 'Expansion Ready', 'Strategy', '2-8 Players'], priceMin: 1999, priceMax: 6999 },
  { name: 'Collectibles', imageKey: 'art', brands: ['Funko', 'LEGO', 'Hot Toys', 'Bandai'], productTypes: ['Pop! Vinyl Figure', 'Architecture Set', '1/6 Scale Figure', 'Gundam Model Kit'], modifiers: ['Limited Edition', 'Exclusive', 'Display Case', 'Pre-Order'], priceMin: 999, priceMax: 49900 },
  { name: 'Wine & Spirits', imageKey: 'food', brands: ['Moët & Chandon', 'Grey Goose', 'Patrón', 'WhistlePig'], productTypes: ['Impérial Brut', 'Vodka', 'Reposado Tequila', 'Piggyback Rye'], modifiers: ['750ml', 'Gift Box', 'Aged 10 Years', 'Limited Release'], priceMin: 2999, priceMax: 89999 },
  { name: 'Stationery', imageKey: 'office', brands: ['Rhodia', 'Leuchtturm1917', 'Tombow', 'Staedtler'], productTypes: ['Dot Grid Notebook', 'Bullet Journal', 'Dual Brush Pens', 'Mechanical Pencil Set'], modifiers: ['A5', 'Hardcover', 'Pastel Pack', '0.5mm'], priceMin: 699, priceMax: 3900 },
  { name: 'Kids\' Toys', imageKey: 'baby', brands: ['LEGO', 'Melissa & Doug', 'Hot Wheels', 'Barbie'], productTypes: ['City Fire Station', 'Wooden Block Set', 'Track Builder Set', 'Dreamhouse'], modifiers: ['Ages 6+', 'Ages 3+', 'Collector', 'Deluxe'], priceMin: 1499, priceMax: 29900 },
  { name: 'School Supplies', imageKey: 'office', brands: ['Crayola', 'Texas Instruments', 'JanSport', 'Five Star'], productTypes: ['Super Tips Markers', 'TI-84 Plus CE', 'Big Student Backpack', 'Spiral Notebook 5-Pack'], modifiers: ['50 Count', 'Graphing', 'Black', 'College Ruled'], priceMin: 499, priceMax: 14900 },
  { name: 'Garden & Outdoor Living', imageKey: 'outdoor', brands: ['Fiskars', 'Weber', 'Miracle-Gro', 'Sun Joe'], productTypes: ['Pruning Shears', 'Spirit II Gas Grill', 'All Purpose Plant Food', 'Electric Pressure Washer'], modifiers: ['Steel', '3-Burner', '5 lb', '1800 PSI'], priceMin: 999, priceMax: 89900 },
  { name: 'Tools & Hardware', imageKey: 'automotive', brands: ['DeWalt', 'Milwaukee', 'Black+Decker', 'Craftsman'], productTypes: ['20V Drill Driver Kit', 'M12 Impact Driver', 'Mouse Sander', 'Mechanics Tool Set'], modifiers: ['Brushless', '102 Piece', 'Cordless', 'Home Kit'], priceMin: 3900, priceMax: 49900 },
  { name: 'Lighting', imageKey: 'home', brands: ['Philips Hue', 'LIFX', 'West Elm', 'IKEA'], productTypes: ['Gradient Lightstrip', 'Color Bulb 4-Pack', 'Sculptural Table Lamp', 'Floor Lamp Arc'], modifiers: ['White & Color', 'E26', 'Brass', 'Smart Enabled'], priceMin: 2900, priceMax: 29900 },
  { name: 'Storage & Organization', imageKey: 'home', brands: ['The Container Store', 'Rubbermaid', 'Simplehuman', 'IKEA'], productTypes: ['Modular Closet Kit', 'Clear Storage Totes', 'Rectangular Step Can', 'KALLAX Shelf Unit'], modifiers: ['8-Cube', '66 Qt', '50L', 'White'], priceMin: 1999, priceMax: 29900 },
  { name: 'Health Monitors', imageKey: 'fitness', brands: ['Withings', 'Omron', 'Fitbit', 'Apple'], productTypes: ['Body Comp Scale', 'Blood Pressure Monitor', 'Charge 6', 'Watch Series 9'], modifiers: ['Wi-Fi', 'Upper Arm', 'GPS', '41mm'], priceMin: 4900, priceMax: 49900 },
  { name: 'Dental Care', imageKey: 'beauty', brands: ['Oral-B', 'Philips Sonicare', 'Crest', 'Waterpik'], productTypes: ['iO Series 9', 'ProtectiveClean 6100', '3D White Strips', 'Cordless Water Flosser'], modifiers: ['Black', 'Rechargeable', '14 Treatments', 'Travel Case'], priceMin: 1999, priceMax: 34900 },
  { name: 'Hair Care', imageKey: 'beauty', brands: ['Dyson', 'Olaplex', 'Kérastase', 'Revlon'], productTypes: ['Airwrap Multi-Styler', 'No.3 Hair Perfector', 'Nutritive Mask', 'One-Step Volumizer'], modifiers: ['Complete Long', '100ml', 'Damaged Hair', 'Plus'], priceMin: 2800, priceMax: 59900 },
  { name: 'Eyewear', imageKey: 'fashion', brands: ['Ray-Ban', 'Oakley', 'Warby Parker', 'Gentle Monster'], productTypes: ['Wayfarer Optical', 'Holbrook RX', 'Percey Blue Light', 'Maison Margiela Frame'], modifiers: ['Progressive', 'Anti-Glare', 'Tortoise', 'Titanium'], priceMin: 9900, priceMax: 49900 },
  { name: 'Swimwear', imageKey: 'fashion', brands: ['Speedo', 'Summersalt', 'Andie', 'Aerie'], productTypes: ['Endurance+ Jammer', 'Sidestroke One-Piece', 'The Tidal Bikini', 'Crossover One Piece'], modifiers: ['Size M', 'Black', 'High Leg', 'Reversible'], priceMin: 2900, priceMax: 14900 },
  { name: 'Outerwear', imageKey: 'fashion', brands: ['Canada Goose', 'Arc\'teryx', 'The North Face', 'Carhartt'], productTypes: ['Expedition Parka', 'Beta AR Jacket', 'Nuptse Puffer', 'Detroit Jacket'], modifiers: ['Black', 'Waterproof', '700 Fill', 'Insulated'], priceMin: 9900, priceMax: 149900 },
  { name: 'Denim', imageKey: 'fashion', brands: ['Levi\'s', 'AG Jeans', 'Madewell', 'Wrangler'], productTypes: ['501 Original Fit', 'Everett Slim Straight', 'Perfect Vintage Jean', 'Authentics Relaxed'], modifiers: ['Dark Wash', 'Light Wash', '32x32', 'Stretch'], priceMin: 4900, priceMax: 22800 },
  { name: 'Sneakers', imageKey: 'shoes', brands: ['New Balance', 'Converse', 'Vans', 'On Running'], productTypes: ['990v6 Made in USA', 'Chuck 70 High', 'Old Skool Pro', 'Cloudmonster'], modifiers: ['Grey', 'White', 'Black/White', 'Wide'], priceMin: 6500, priceMax: 22000 },
  { name: 'Boots', imageKey: 'shoes', brands: ['Dr. Martens', 'Timberland', 'UGG', 'Red Wing'], productTypes: ['1460 Smooth Leather', 'Premium 6-Inch', 'Classic Mini II', 'Iron Ranger'], modifiers: ['Black', 'Wheat', 'Chelsea', 'Size 9'], priceMin: 12900, priceMax: 39900 },
  { name: 'Sandals', imageKey: 'shoes', brands: ['Birkenstock', 'Teva', 'Hoka', 'Crocs'], productTypes: ['Arizona Soft Footbed', 'Original Universal', 'Ora Recovery Slide', 'Classic Clog'], modifiers: ['Mocha', 'Black', 'Unisex', 'LiteRide'], priceMin: 3900, priceMax: 14900 },
  { name: 'Luxury Fashion', imageKey: 'fashion', brands: ['Gucci', 'Prada', 'Saint Laurent', 'Balenciaga'], productTypes: ['Ace Sneaker', 'Re-Edition Bag', 'Court Classic Sneaker', 'Triple S Sneaker'], modifiers: ['White', 'Black Leather', 'Monogram', 'Limited'], priceMin: 79000, priceMax: 129900 },
  { name: 'Vintage Clothing', imageKey: 'fashion', brands: ['Levi\'s Vintage', 'Carhartt WIP', 'Stussy', 'Champion Reverse Weave'], productTypes: ['Trucker Jacket', 'OG Active Hoodie', 'Basic Logo Tee', 'Crewneck Sweatshirt'], modifiers: ['1990s Cut', 'Faded Blue', 'Large', 'Archive'], priceMin: 4500, priceMax: 34900 },
  { name: 'Ethical Fashion', imageKey: 'fashion', brands: ['Patagonia', 'Everlane', 'Reformation', 'Allbirds'], productTypes: ['Better Sweater', 'Cashmere Crew', 'Juliette Dress', 'Tree Runners'], modifiers: ['Recycled', 'Fair Trade', 'Organic Cotton', 'Carbon Neutral'], priceMin: 9800, priceMax: 29800 },
  { name: 'Maternity', imageKey: 'fashion', brands: ['Seraphine', 'Hatch', 'Kindred Bravely', 'Blanqi'], productTypes: ['Wrap Dress', 'Everyday Legging', 'Nursing Bra', 'Support Belly Band'], modifiers: ['Trimester 2', 'Black', 'Soft Support', 'Postpartum'], priceMin: 3900, priceMax: 16800 },
  { name: 'Workwear', imageKey: 'fashion', brands: ['Carhartt', 'Dickies', 'Filson', 'Red Kap'], productTypes: ['Duck Active Jacket', '874 Work Pant', 'Tin Cloth Briefcase', 'Industrial Shirt'], modifiers: ['Brown', 'Navy', 'Insulated', 'Relaxed Fit'], priceMin: 2900, priceMax: 18900 },
  { name: 'Luxury Beauty', imageKey: 'beauty', brands: ['La Mer', 'SK-II', 'Estée Lauder', 'Clé de Peau'], productTypes: ['Crème de la Mer', 'Facial Treatment Essence', 'Advanced Night Repair', 'The Cream'], modifiers: ['30ml', '100ml', 'Limited Edition', 'Gift Set'], priceMin: 8900, priceMax: 39900 },
  { name: 'K-Beauty', imageKey: 'skincare', brands: ['COSRX', 'Innisfree', 'Laneige', 'Beauty of Joseon'], productTypes: ['Snail Mucin Essence', 'Green Tea Seed Serum', 'Lip Sleeping Mask', 'Relief Sun SPF50+'], modifiers: ['100ml', 'Hydrating', 'Best Seller', 'Sensitive Safe'], priceMin: 1200, priceMax: 8900 },
  { name: 'Clean Beauty', imageKey: 'skincare', brands: ['Ilia', 'RMS Beauty', 'Kosas', 'Tower 28'], productTypes: ['Super Serum Skin Tint', 'Un Cover-Up Concealer', 'Revealer Concealer', 'SOS Spray'], modifiers: ['Shade 3', 'Cream', 'Vegan', 'Fragrance Free'], priceMin: 2200, priceMax: 9800 },
  { name: 'Men\'s Watches', imageKey: 'watches', brands: ['Hamilton', 'Orient', 'Bulova', 'Timex'], productTypes: ['Khaki Field Mechanical', 'Bambino Open Heart', 'Precisionist Chrono', 'Q Timex Reissue'], modifiers: ['NATO Strap', 'Blue Dial', 'Automatic', 'Limited'], priceMin: 14900, priceMax: 89900 },
  { name: 'Luxury Watches', imageKey: 'watches', brands: ['Omega', 'TAG Heuer', 'Breitling', 'Longines'], productTypes: ['Seamaster Diver 300M', 'Carrera Chronograph', 'Navitimer B01', 'Master Collection'], modifiers: ['Steel Bracelet', 'Blue Bezel', 'Automatic', 'Box & Papers'], priceMin: 299900, priceMax: 899900 },
  { name: 'Smartwatches', imageKey: 'watches', brands: ['Apple', 'Garmin', 'Samsung', 'Fitbit'], productTypes: ['Watch Ultra 2', 'Fenix 7 Pro', 'Galaxy Watch 7', 'Sense 2'], modifiers: ['GPS', 'Titanium', 'LTE', 'Health Bundle'], priceMin: 19900, priceMax: 89900 },
  { name: 'Designer Handbags', imageKey: 'bags', brands: ['Louis Vuitton', 'Gucci', 'Prada', 'Bottega Veneta'], productTypes: ['Neverfull MM', 'Dionysus Shoulder Bag', 'Re-Edition 2005', 'Cassette Bag'], modifiers: ['Monogram', 'Black Leather', 'Mini', 'Auth Card'], priceMin: 129900, priceMax: 349900 },
  { name: 'Backpacks', imageKey: 'bags', brands: ['Herschel', 'Fjällräven', 'Tumi', 'Peak Design'], productTypes: ['Little America', 'Kånken Classic', 'Alpha Bravo Search', 'Everyday Backpack Zip'], modifiers: ['20L', 'Black', 'Laptop Sleeve', 'Weatherproof'], priceMin: 6900, priceMax: 39900 },
  { name: 'Travel Accessories', imageKey: 'travel', brands: ['Bellroy', 'Calpak', 'Away', 'Eagle Creek'], productTypes: ['Tech Kit Compact', 'Luka Duffel', 'Compression Packing Cubes', 'Pack-It Reveal Cube Set'], modifiers: ['Black', 'Water Resistant', 'Set of 4', 'Carry-On Size'], priceMin: 2900, priceMax: 19800 },
  { name: 'Luxury Home', imageKey: 'home', brands: ['Restoration Hardware', 'Serena & Lily', 'Pottery Barn', 'RH'], productTypes: ['Belgian Linen Duvet', 'Capistrano Rug', 'Cloud Sectional', 'Chandelier Brass'], modifiers: ['King', '8x10', 'Performance Fabric', 'Antique Brass'], priceMin: 29900, priceMax: 499900 },
  { name: 'Small Appliances', imageKey: 'kitchen', brands: ['Dyson', 'Vitamix', 'KitchenAid', 'Cuisinart'], productTypes: ['V15 Detect Vacuum', 'A3500 Blender', 'Artisan Mini', 'Food Processor 14-Cup'], modifiers: ['Cordless', 'Self-Cleaning', 'Empire Red', 'Stainless'], priceMin: 9900, priceMax: 79900 },
  { name: 'Cookware', imageKey: 'kitchen', brands: ['All-Clad', 'Le Creuset', 'Lodge', 'Caraway'], productTypes: ['D3 Stainless Set', 'Dutch Oven 5.5 Qt', 'Cast Iron Skillet 12"', 'Ceramic Set 4-Piece'], modifiers: ['10-Piece', 'Flame', 'Pre-Seasoned', 'Sage'], priceMin: 2900, priceMax: 89900 },
  { name: 'Bar & Wine', imageKey: 'kitchen', brands: ['Riedel', 'Coravin', 'Yeti', 'Stanley'], productTypes: ['Ouverture Wine Glass Set', 'Model Three Preservation', 'Rambler 26 oz', 'Classic Legendary Bottle'], modifiers: ['8 Glasses', 'Red Wine', 'Navy', '1.2L'], priceMin: 3900, priceMax: 39900 },
  { name: 'Plant Care', imageKey: 'home', brands: ['The Sill', 'Bloomscape', 'Miracle-Gro', 'Lechuza'], productTypes: ['Monstera Deliciosa', 'Snake Plant', 'Indoor Plant Food', 'Self-Watering Planter'], modifiers: ['Medium Pot', 'Low Light', 'Organic', 'White'], priceMin: 2900, priceMax: 14900 },
  { name: 'Smart Fitness', imageKey: 'fitness', brands: ['Whoop', 'Oura', 'Therabody', 'Hyperice'], productTypes: ['Whoop 4.0 Band', 'Ring Gen3 Heritage', 'Theragun Elite', 'Hypervolt 2 Pro'], modifiers: ['Onyx', 'Silver', 'QuietForce', 'Bluetooth'], priceMin: 19900, priceMax: 59900 },
  { name: 'Yoga & Pilates', imageKey: 'fitness', brands: ['Manduka', 'Alo Yoga', 'Balanced Body', 'Gaiam'], productTypes: ['PRO Yoga Mat', 'Alosoft Mat', 'Reformer Accessories Kit', 'Essential Thick Mat'], modifiers: ['68"', '5mm', 'Studio Quality', 'Midnight'], priceMin: 2900, priceMax: 39900 },
  { name: 'Team Sports', imageKey: 'fitness', brands: ['Wilson', 'Spalding', 'Rawlings', 'Mizuno'], productTypes: ['NBA Official Game Ball', 'TF-1000 Legacy', 'Heart of the Hide Glove', 'Wave Momentum Shoes'], modifiers: ['Size 7', 'Indoor', '11.75"', 'Size 10.5'], priceMin: 2900, priceMax: 39900 },
  { name: 'Water Sports', imageKey: 'outdoor', brands: ['O\'Neill', 'Roxy', 'Speedo', 'Hydro Flask'], productTypes: ['Reactor Wetsuit', 'Syncro Series Spring Suit', 'Fastskin Goggles', 'Wide Mouth 32 oz'], modifiers: ['3/2mm', 'Women\'s M', 'Mirror Lens', 'Pacific'], priceMin: 2900, priceMax: 29900 },
  { name: 'Winter Sports', imageKey: 'outdoor', brands: ['Burton', 'Salomon', 'Smith', 'Patagonia'], productTypes: ['Custom X Snowboard', 'QST 98 Skis', 'I/O Mag Goggles', 'Powder Bowl Jacket'], modifiers: ['158cm', '172cm', 'ChromaPop', 'Insulated'], priceMin: 9900, priceMax: 89900 },
  { name: 'Hiking Gear', imageKey: 'outdoor', brands: ['Arc\'teryx', 'Salomon', 'Black Diamond', 'MSR'], productTypes: ['Beta LT Jacket', 'X Ultra 4 GTX', 'Distance Carbon Z Poles', 'PocketRocket 2 Stove'], modifiers: ['Men\'s M', 'Waterproof', '120cm', 'Ultralight'], priceMin: 4900, priceMax: 59900 },
  { name: 'Fishing', imageKey: 'outdoor', brands: ['Shimano', 'Orvis', 'Rapala', 'Yeti'], productTypes: ['Stradic Spinning Reel', 'Clearwater Fly Rod', 'Original Floating Lure', 'Hopper Flip 8 Soft Cooler'], modifiers: ['2500', '5wt', '7cm', 'Tan'], priceMin: 990, priceMax: 49900 },
  { name: 'Drones', imageKey: 'electronics', brands: ['DJI', 'Autel', 'GoPro', 'Skydio'], productTypes: ['Mini 4 Pro Fly More Combo', 'EVO Lite+', 'Hero 12 Black', 'X10D Enterprise'], modifiers: ['RC 2', '4K HDR', 'Creator Edition', 'Bundle'], priceMin: 39900, priceMax: 199900 },
  { name: 'Computer Accessories', imageKey: 'tech', brands: ['Apple', 'CalDigit', 'Keychron', 'LG'], productTypes: ['Magic Keyboard', 'TS4 Thunderbolt Dock', 'Q1 Pro Mechanical Keyboard', 'UltraFine 5K Display'], modifiers: ['Touch ID', '18 Ports', 'Hot-Swap', '27"'], priceMin: 9900, priceMax: 129900 },
  { name: 'Networking', imageKey: 'electronics', brands: ['Ubiquiti', 'Netgear', 'Eero', 'TP-Link'], productTypes: ['Dream Router', 'Orbi 970 Mesh', 'Pro 6E 3-Pack', 'Deco XE75 Pro'], modifiers: ['Wi-Fi 7', 'Tri-Band', 'Whole Home', 'Gigabit'], priceMin: 9900, priceMax: 89900 },
  { name: 'Printers & Scanners', imageKey: 'office', brands: ['HP', 'Canon', 'Epson', 'Brother'], productTypes: ['LaserJet Pro M404dn', 'imageCLASS MF445dw', 'EcoTank ET-4850', 'MFC-L8900CDW'], modifiers: ['Duplex', 'Wireless', 'Supertank', 'Color'], priceMin: 19900, priceMax: 69900 },
  { name: 'Security & Surveillance', imageKey: 'electronics', brands: ['Ring', 'Arlo', 'Nest', 'Wyze'], productTypes: ['Battery Doorbell Plus', 'Pro 5 Spotlight Camera', 'Cam Indoor Wired', 'Cam v3 Pro'], modifiers: ['2K', 'Color Night Vision', 'Cloud Storage', '2-Pack'], priceMin: 3900, priceMax: 39900 },
  { name: 'Electric Mobility', imageKey: 'automotive', brands: ['Segway', 'Razor', 'Boosted', 'VanMoof'], productTypes: ['Ninebot KickScooter MAX', 'E300 Electric Scooter', 'Stealth Electric Skateboard', 'S5 E-Bike'], modifiers: ['40 Mile Range', 'Commuter', 'Extended Battery', 'Smart Lock'], priceMin: 29900, priceMax: 399900 },
  { name: 'Car Care', imageKey: 'automotive', brands: ['Chemical Guys', 'Meguiar\'s', 'Rain-X', 'Armor All'], productTypes: ['Complete Detailing Kit', 'Ultimate Liquid Wax', 'Latitude Water Repellent', 'Original Protectant'], modifiers: ['16 Piece', '16 oz', '2-Pack', 'Gallon Refill'], priceMin: 999, priceMax: 19900 },
  { name: 'Motorcycle Gear', imageKey: 'automotive', brands: ['Shoei', 'Alpinestars', 'Rev\'it', 'Bell'], productTypes: ['RF-1400 Helmet', 'GP Plus R Gloves', 'Sand 4 Jacket', 'Qualifier DLX MIPS'], modifiers: ['Medium', 'Black/Red', 'Textile', 'Shield Included'], priceMin: 9900, priceMax: 79900 },
  { name: 'Luxury Travel', imageKey: 'travel', brands: ['Rimowa', 'Tumi', 'Globe-Trotter', 'Zero Halliburton'], productTypes: ['Original Cabin', 'Alpha 3 Continental', 'Centenary Carry-On', 'Aluminum Attaché'], modifiers: ['Silver', 'Polycarbonate', 'Handmade', 'Limited Edition'], priceMin: 79900, priceMax: 249900 },
  { name: 'Digital Courses', imageKey: 'tech', brands: ['MasterClass', 'Coursera Plus', 'Udemy', 'Skillshare'], productTypes: ['Creative Writing Annual Pass', 'Google Data Analytics Certificate', 'Complete Web Developer Bootcamp', 'Premium Membership Yearly'], modifiers: ['All-Access', 'Self-Paced', 'Lifetime Access', 'Gift Code'], priceMin: 9900, priceMax: 39900 },
  { name: 'E-Readers', imageKey: 'books', brands: ['Kindle', 'Kobo', 'Boox', 'reMarkable'], productTypes: ['Paperwhite Signature', 'Libra 2', 'Palma 2', 'Paper Pro'], modifiers: ['32GB', 'Warm Light', 'E Ink', 'With Pen'], priceMin: 12900, priceMax: 69900 },
  { name: 'Audiobooks', imageKey: 'books', brands: ['Audible', 'Libro.fm', 'Spotify Audiobooks', 'Google Play Books'], productTypes: ['Premium Plus Annual', 'Monthly Credit Plan', 'Included with Premium', 'Best Seller Bundle'], modifiers: ['12 Credits', 'Gift Membership', 'Bestseller', 'Nonfiction'], priceMin: 999, priceMax: 14900 },
  { name: 'Comics & Manga', imageKey: 'books', brands: ['Marvel', 'VIZ Media', 'Dark Horse', 'Image Comics'], productTypes: ['Spider-Man Omnibus', 'One Piece Box Set 1', 'Hellboy Library Edition', 'Saga Compendium One'], modifiers: ['Hardcover', 'Vol 1-23', 'Deluxe', 'Collector\'s'], priceMin: 1499, priceMax: 19900 },
  { name: 'Magazines', imageKey: 'books', brands: ['Condé Nast', 'Hearst', 'Time Inc.', 'Mercedes-Benz'], productTypes: ['Vogue Annual', 'Architectural Digest', 'Wired Yearly', 'Monocle 24 Issues'], modifiers: ['Print + Digital', 'International', 'Gift Subscription', 'Back Issues'], priceMin: 1999, priceMax: 9900 },
  { name: 'Sheet Music', imageKey: 'books', brands: ['Hal Leonard', 'Alfred Music', 'Faber Piano', 'Guitar Center'], productTypes: ['Adult Piano Adventures', 'Essential Elements Band Method', 'Premier Piano Course', 'Complete Tab Anthology'], modifiers: ['Level 1', 'Trumpet', 'Book + CD', 'Rock Classics'], priceMin: 999, priceMax: 4900 },
  { name: 'Language Learning', imageKey: 'books', brands: ['Rosetta Stone', 'Duolingo', 'Pimsleur', 'Babbel'], productTypes: ['Lifetime Unlimited Languages', 'Super Duolingo Annual', 'Premium Spanish Level 1', 'Live Classes 3 Months'], modifiers: ['All Languages', 'Family Plan', 'Audio Only', 'Gift Card'], priceMin: 7900, priceMax: 29900 },
  { name: 'Business & Finance Books', imageKey: 'books', brands: ['Penguin Business', 'Harvard Business Review', 'McGraw Hill', 'Wiley'], productTypes: ['The Lean Startup', 'Good to Great', 'Principles for Dealing with the Changing World Order', 'Thinking, Fast and Slow'], modifiers: ['Hardcover', 'Updated Edition', 'Audiobook', 'Box Set'], priceMin: 1299, priceMax: 8900 },
  { name: 'Cookbooks', imageKey: 'food', brands: ['Phaidon', 'Chronicle Books', 'Ten Speed Press', 'America\'s Test Kitchen'], productTypes: ['Salt Fat Acid Heat', 'The Food Lab', 'Plenty', 'Complete Cookbook 2024'], modifiers: ['Hardcover', 'Vegetarian', 'Gift Edition', 'Spiral Bound'], priceMin: 1999, priceMax: 6500 },
  { name: 'Vinyl Records', imageKey: 'audio', brands: ['Atlantic', 'Columbia', 'Blue Note', 'Sub Pop'], productTypes: ['Random Access Memories', 'Kind of Blue', 'Blonde on Blonde', 'Ten Reissue'], modifiers: ['180g', 'Limited Color', 'Remastered', 'Gatefold'], priceMin: 2499, priceMax: 8900 },
  { name: 'Streaming Devices', imageKey: 'electronics', brands: ['Apple', 'Amazon', 'Google', 'NVIDIA'], productTypes: ['Apple TV 4K', 'Fire TV Stick 4K Max', 'Chromecast with Google TV', 'SHIELD TV Pro'], modifiers: ['128GB', 'Wi-Fi 6E', 'Dolby Vision', 'AI Upscaling'], priceMin: 4900, priceMax: 19900 },
  { name: 'Projectors', imageKey: 'electronics', brands: ['Epson', 'BenQ', 'XGIMI', 'Anker Nebula'], productTypes: ['Home Cinema 3800', 'X3000i 4K Gaming', 'Horizon Pro', 'Cosmos Laser 4K'], modifiers: ['3000 Lumens', 'Low Latency', 'Portable', 'Android TV'], priceMin: 39900, priceMax: 249900 },
  { name: 'Microphones', imageKey: 'audio', brands: ['Shure', 'Audio-Technica', 'Rode', 'Blue'], productTypes: ['SM7B', 'AT2020', 'NT1 5th Generation', 'Yeti X'], modifiers: ['Studio', 'USB-C', 'Shock Mount', 'Podcasting Kit'], priceMin: 9900, priceMax: 49900 },
  { name: 'Studio Monitors', imageKey: 'audio', brands: ['KRK', 'Yamaha', 'Adam Audio', 'Genelec'], productTypes: ['Rokit 5 G4', 'HS5 Pair', 'T5V Pair', '8020DWM Pair'], modifiers: ['Bi-Amped', 'Nearfield', 'Room Calibration', 'Stands Included'], priceMin: 29900, priceMax: 149900 },
  { name: 'DJ Equipment', imageKey: 'audio', brands: ['Pioneer DJ', 'Native Instruments', 'Denon DJ', 'Rane'], productTypes: ['DDJ-FLX10', 'Traktor Kontrol S4 MK3', 'Prime 4+', 'Seventy-Two MKII'], modifiers: ['4-Channel', 'Serato', 'Standalone', 'Club Grade'], priceMin: 29900, priceMax: 249900 },
  { name: 'Luxury Skincare Devices', imageKey: 'skincare', brands: ['NuFace', 'Foreo', 'CurrentBody', 'Dr. Dennis Gross'], productTypes: ['Trinity+ Facial Toning Device', 'Luna 4', 'LED Light Therapy Mask', 'DRx SpectraLite FaceWare Pro'], modifiers: ['Rose Gold', 'Sensitive', 'Anti-Aging', 'FDA Cleared'], priceMin: 19900, priceMax: 89900 },
]

export const formatSlug = (value: string): string =>
  value
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()

export const getCatalogCategory = (index: number): CatalogCategory =>
  CATALOG_CATEGORIES[(index - 1) % CATALOG_CATEGORIES.length]

export const buildProductName = (category: CatalogCategory, index: number): string => {
  const brand = category.brands[index % category.brands.length]
  const typeIndex = Math.floor(index / category.brands.length) % category.productTypes.length
  const productType = category.productTypes[typeIndex]
  const modifier = category.modifiers[(index * 7 + typeIndex) % category.modifiers.length]

  return `${brand} ${productType} ${modifier}`.replace(/\s+/g, ' ').trim()
}

export const buildProductDescription = (title: string, categoryName: string): string =>
  `${title} from our ${categoryName} collection. Premium quality with fast shipping, easy returns, and authentic brand assurance.`

export const buildPriceJSON = (index: number, category: CatalogCategory): string => {
  const range = category.priceMax - category.priceMin
  const unitAmount = convertUsdCentsToInrPaise(
    category.priceMin + ((index * 7919) % (range || 1)),
  )

  return JSON.stringify({
    object: 'list',
    data: [
      {
        id: `price_catalog_${index}`,
        object: 'price',
        active: true,
        billing_scheme: 'per_unit',
        currency: STRIPE_CURRENCY,
        type: 'one_time',
        unit_amount: unitAmount,
        unit_amount_decimal: String(unitAmount),
      },
    ],
    has_more: false,
    url: '/v1/prices',
  })
}

export const buildProductLayout = (title: string, categoryName: string) => [
  {
    blockType: 'content',
    columns: [
      {
        size: 'twoThirds',
        richText: [
          {
            children: [
              {
                text: buildProductDescription(title, categoryName),
              },
            ],
          },
        ],
        link: {
          reference: null,
          url: '',
          label: '',
        },
      },
    ],
  },
]
