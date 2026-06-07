const fs = require('fs');
const path = require('path');

const CATEGORIES = [
  {
    id: 'cat-1',
    name: 'Premium Dog Food',
    slug: 'premium-dog-food',
    description: 'Human-grade organic meals, raw freeze-dried culinary recipes, and holistic grain-free kibble.',
    imageUrl: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'cat-2',
    name: 'Premium Cat Food',
    slug: 'premium-cat-food',
    description: 'Gourmet patés, wild-caught seafood blends, and grain-free organic dry recipes.',
    imageUrl: 'https://images.unsplash.com/photo-1569591159212-b02ea8a9f239?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'cat-3',
    name: 'Vet Nutrition',
    slug: 'vet-nutrition',
    description: 'Prescription diets, low-glycemic formulas, and therapeutic dietary plans.',
    imageUrl: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'cat-4',
    name: 'Supplements',
    slug: 'supplements',
    description: 'Apothecary-grade joint care, prebiotic formulas, and cellular health boosters.',
    imageUrl: 'https://images.unsplash.com/photo-1608454509097-e2522c54b2e8?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'cat-5',
    name: 'Healthcare',
    slug: 'healthcare',
    description: 'Veterinary-approved clinical care, dental hygiene elixirs, and first-aid kits.',
    imageUrl: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'cat-6',
    name: 'Grooming',
    slug: 'grooming',
    description: 'Organic silk-infused coat washes, botanical grooming mists, and premium claw care.',
    imageUrl: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'cat-7',
    name: 'Toys',
    slug: 'toys',
    description: 'Bespoke organic cotton ropes, designer natural rubber teethers, and smart puzzle challenges.',
    imageUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'cat-8',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Italian leather collars, 24k gold electroplated leads, and cashmere neck scarves.',
    imageUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'cat-9',
    name: 'Beds & Comfort',
    slug: 'beds-comfort',
    description: 'Orthopedic memory foam mattresses, velvet-wrapped nesting dens, and linen blankets.',
    imageUrl: 'https://images.unsplash.com/photo-1541599540903-216a46ca1ad0?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'cat-10',
    name: 'Feeding Essentials',
    slug: 'feeding-essentials',
    description: 'Hand-carved marble double bowls, slow feeders, and luxury brass-stand dining sets.',
    imageUrl: 'https://images.unsplash.com/photo-1615678815958-5910c6811c25?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'cat-11',
    name: 'Pet Hygiene',
    slug: 'pet-hygiene',
    description: 'Eco-friendly cellular waste bags, antibacterial wipes, and self-cleaning litter boxes.',
    imageUrl: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'cat-12',
    name: 'Travel Essentials',
    slug: 'travel-essentials',
    description: 'Designer canvas travel totes, memory foam car seats, and titanium pet strollers.',
    imageUrl: 'https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'cat-13',
    name: 'Training Products',
    slug: 'training-products',
    description: 'Luxury leather treat pouches, soft clickers, and visual target mats.',
    imageUrl: 'https://images.unsplash.com/photo-1537151608828-ea2b117b6281?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'cat-14',
    name: 'Luxury Lifestyle',
    slug: 'luxury-lifestyle',
    description: 'Pure Mongolian cashmere pet sweaters, designer housewares, and tailored trench coats.',
    imageUrl: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'cat-15',
    name: 'Veterinary Wellness',
    slug: 'veterinary-wellness',
    description: 'Complete clinical health packages, geriatric diagnostics support, and DNA screening kits.',
    imageUrl: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=800'
  }
];

const RAW_PRODUCTS = [
  // Premium Dog Food (cat-1)
  {
    cat: 'cat-1',
    name: 'Royal Heritage Bison & Venison Freeze-Dried Loaf',
    desc: 'Uncompromising culinary excellence. Formulated with 95% grass-fed North American bison and wild venison, nutrient-dense organ meats, and organic kelp. Gently freeze-dried to lock in maximum bioavailability.',
    price: 5400, salePrice: 4999, stock: 24, isFeatured: true, rating: 4.9,
    images: ['https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-1',
    name: 'Artisanal Organic King Salmon & Sweet Potato Kibble',
    desc: 'Bespoke daily nourishment for the modern companion. Prepared with fresh wild-caught King Salmon, organic sweet potatoes, and rich cold-pressed flaxseed oil to promote a flawless coat.',
    price: 3600, salePrice: null, stock: 50, isFeatured: false, rating: 4.8,
    images: ['https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-1',
    name: 'Free-Range Wild Boar & Quail Culinary Feast',
    desc: 'Premium biological nutrition mimicking ancestral diets. Combines high-protein wild boar and tender quail, cold-pressed prebiotic fibres, and wild-harvested blueberries for cellular wellness.',
    price: 4900, salePrice: 4200, stock: 30, isFeatured: true, rating: 5.0,
    images: ['https://images.unsplash.com/photo-1585849960390-7a2193b82df1?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-1',
    name: 'Gourmet Slow-Simmered Bone Broth Stew (Duck & Herb)',
    desc: 'A rich culinary addition. Slow-cooked duck bone broth infused with organic turmeric, parsley, and tender shredded duck breast. Perfect for joint support and absolute hydration.',
    price: 1800, salePrice: null, stock: 85, isFeatured: false, rating: 4.7,
    images: ['https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-1',
    name: 'Organic Grass-Fed Beef & Tripe Raw Medallions',
    desc: 'Pure freeze-dried raw convenience. Single-source free-range beef muscle and green tripe, bio-active enzymes, and cold-pressed zinc to optimize gut metabolic functions.',
    price: 5200, salePrice: 4800, stock: 15, isFeatured: false, rating: 4.9,
    images: ['https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-1',
    name: 'Reserve Heritage Lamb & Ancient Grains Recipe',
    desc: 'A premium grain-inclusive recipe featuring grass-fed Icelandic lamb, organic pearled barley, and cold-pressed coconut oil. Ideal for pets with sensitive digestive systems.',
    price: 4100, salePrice: null, stock: 40, isFeatured: false, rating: 4.6,
    images: ['https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&q=80&w=800']
  },

  // Premium Cat Food (cat-2)
  {
    cat: 'cat-2',
    name: 'Wild-Caught Bluefin Tuna & Caviar Creamy Purée',
    desc: 'The ultimate luxury cat delicacy. A velvety purée of wild Pacific Bluefin tuna, infused with sustainable sturgeon caviar and essential taurine. Served in elegant single-portion glass jars.',
    price: 2800, salePrice: 2499, stock: 60, isFeatured: true, rating: 5.0,
    images: ['https://images.unsplash.com/photo-1569591159212-b02ea8a9f239?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-2',
    name: 'Gourmet Duck Breast & Quail Egg Paté',
    desc: 'A rich culinary creation. Premium free-range duck breast blended with whole soft-boiled quail eggs and organic cat grass extracts to prevent hairballs naturally.',
    price: 2100, salePrice: null, stock: 75, isFeatured: false, rating: 4.8,
    images: ['https://images.unsplash.com/photo-1548247416-ec66f4900b2e?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-2',
    name: 'Freeze-Dried Free-Range Pheasant & Venison Bites',
    desc: 'Ultra-premium high-protein raw nutrition. Formulated with 98% pheasant, venison, and organic pumpkin seeds. Gently freeze-dried to preserve original cellular nutrients.',
    price: 3800, salePrice: 3400, stock: 35, isFeatured: true, rating: 4.9,
    images: ['https://images.unsplash.com/photo-1569591159212-b02ea8a9f239?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-2',
    name: 'Ocean Reserve Lobster & Salmon Flakes in Gravy',
    desc: 'Fresh Maine lobster claw meat and wild sockeye salmon flakes simmered in rich kelp broth. Provides clean omega fatty acids for an exceptionally glossy coat.',
    price: 2900, salePrice: null, stock: 45, isFeatured: false, rating: 4.7,
    images: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-2',
    name: 'Organic Rabbit & Cranberry Grain-Free Kibble',
    desc: 'A boutique recipe featuring organic rabbit meat, cold-pressed botanicals, and wild cranberries. Highly digestible, protecting the delicate feline urinary tract.',
    price: 3200, salePrice: 2999, stock: 28, isFeatured: false, rating: 4.9,
    images: ['https://images.unsplash.com/photo-1569591159212-b02ea8a9f239?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-2',
    name: 'Slow-Cooked Heritage Turkey & Catnip Broth',
    desc: 'Rich free-range turkey bone broth with organic catnip infusion. Stimulates appetite, hydrates felines, and supplies essential collagen molecules.',
    price: 1500, salePrice: null, stock: 90, isFeatured: false, rating: 4.6,
    images: ['https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80&w=800']
  },

  // Vet Nutrition (cat-3)
  {
    cat: 'cat-3',
    name: 'Hypoallergenic Hydrolyzed Salmon Formula',
    desc: 'Veterinary clinical diet for companions with severe food intolerances. Formulated with hydrolyzed salmon proteins and refined organic starch to prevent inflammatory flare-ups.',
    price: 4500, salePrice: 3999, stock: 32, isFeatured: true, rating: 4.8,
    images: ['https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-3',
    name: 'Renal Care Low-Phosphorus Organic Chicken Recipe',
    desc: 'Prescription-grade nutrition engineered to support compromise kidney function. Low phosphorus levels combined with controlled premium organic protein structures.',
    price: 4800, salePrice: null, stock: 20, isFeatured: false, rating: 4.7,
    images: ['https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-3',
    name: 'Low-Glycemic Weight Management Quail Feast',
    desc: 'Clinical formula optimized for pet glucose stability and weight reduction. Features lean quail, prebiotic dietary fibers, and fat-metabolizing L-Carnitine.',
    price: 4200, salePrice: 3800, stock: 42, isFeatured: true, rating: 4.9,
    images: ['https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-3',
    name: 'Cardiac Support Organic Venison Stew',
    desc: 'Nutritional therapy with enhanced levels of Taurine, L-Carnitine, and clean wild omega-3 fatty acids to protect heart muscle health and cellular tone.',
    price: 5500, salePrice: null, stock: 15, isFeatured: false, rating: 5.0,
    images: ['https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-3',
    name: 'Gastrointestinal High-Digestibility Whitefish Recipe',
    desc: 'Clinical veterinary nutrition designed for gastrointestinal soothing. Prepared with pure hydrolyzed cod and prebiotics to restore micobiome equilibrium.',
    price: 4300, salePrice: 3999, stock: 35, isFeatured: false, rating: 4.8,
    images: ['https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-3',
    name: 'Anallergenic Botanical Insect Protein Formula',
    desc: 'Cutting-edge clinical veterinary science using highly sustainable, hypoallergenic black soldier fly larvae protein. Zero grain, zero poultry, maximum biological tolerance.',
    price: 4900, salePrice: null, stock: 18, isFeatured: false, rating: 4.6,
    images: ['https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800']
  },

  // Supplements (cat-4)
  {
    cat: 'cat-4',
    name: 'Apothecary Gold Green-Lipped Mussel Joint Powder',
    desc: 'Highly concentrated joint renewal. Ethically harvested New Zealand green-lipped mussel powder, cold-processed to supply clinical-grade chondroitin and hyaluronic molecules.',
    price: 3200, salePrice: 2800, stock: 40, isFeatured: true, rating: 4.9,
    images: ['https://images.unsplash.com/photo-1608454509097-e2522c54b2e8?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-4',
    name: 'Organic Icelandic Wild Kelp Powder',
    desc: 'Cellular vitality supplement sourced from pristine cold ocean trenches. Naturally rich in iodine, iron, and 60+ trace minerals to optimize thyroid and gland metabolic functions.',
    price: 1950, salePrice: null, stock: 80, isFeatured: false, rating: 4.8,
    images: ['https://images.unsplash.com/photo-1608454509097-e2522c54b2e8?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-4',
    name: 'Pure Arctic Krill Oil Liposomal Drops',
    desc: 'Unmatched cellular bioavailability. Premium liposomal krill oil extract supplying pure phospholipid-bound omega-3 EPA and DHA, combined with powerful natural astaxanthin.',
    price: 3800, salePrice: 3400, stock: 25, isFeatured: true, rating: 5.0,
    images: ['https://images.unsplash.com/photo-1608454509097-e2522c54b2e8?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-4',
    name: 'Holistic Skin & Coat Collagen Elixir',
    desc: 'Nutraceutical liquid collagen booster with biotin and zinc. Promotes rapid hair follicle growth, dermis hydration, and complete nail/claw strengthening.',
    price: 2600, salePrice: null, stock: 65, isFeatured: false, rating: 4.7,
    images: ['https://images.unsplash.com/photo-1608454509097-e2522c54b2e8?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-4',
    name: 'Probiotic Shield Multi-Strain Digestive Powder',
    desc: '5 billion CFU active cultures per scoop. Spore-forming probiotics and prebiotics designed to restore microflora, eliminate gas, and improve stool consistency.',
    price: 2400, salePrice: 1999, stock: 55, isFeatured: false, rating: 4.9,
    images: ['https://images.unsplash.com/photo-1608454509097-e2522c54b2e8?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-4',
    name: 'Organic Ashwagandha & Valerian Root Calming Oil',
    desc: 'Bespoke herbal sedative blend to relieve anxiety, stress, and noise fear. Pure botanical extracts blended with premium organic cold-pressed hemp seed oil carriers.',
    price: 2900, salePrice: null, stock: 50, isFeatured: false, rating: 4.6,
    images: ['https://images.unsplash.com/photo-1608454509097-e2522c54b2e8?auto=format&fit=crop&q=80&w=800']
  },

  // Healthcare (cat-5)
  {
    cat: 'cat-5',
    name: 'Silver Shield Colloidal Silver Skin Spray',
    desc: 'Pharmaceutical-grade colloidal silver (30 PPM) suspended in purified water. An organic antibacterial and antifungal spray for hot spots, minor cuts, and dermal lesions.',
    price: 1800, salePrice: 1599, stock: 70, isFeatured: true, rating: 4.9,
    images: ['https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-5',
    name: 'Enzymatic Dental Cleansing Gel (Spearmint & Aloe)',
    desc: 'Brushless molecular dental hygiene. Formulated with active enzymes that digest plaque bacteria, combined with organic aloe vera extracts to soothe sensitive gums.',
    price: 1400, salePrice: null, stock: 90, isFeatured: false, rating: 4.7,
    images: ['https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-5',
    name: 'Apothecary First-Aid Emergency Case (Titanium Edition)',
    desc: 'Uncompromising safety on travel. Sleek lightweight case equipped with premium medical scissors, sterile pressure wraps, organic antiseptic salves, and emergency blankets.',
    price: 6500, salePrice: 5900, stock: 15, isFeatured: true, rating: 5.0,
    images: ['https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-5',
    name: 'Herbal Ear Purifying Drops (Witch Hazel & Tea Tree)',
    desc: 'Clinical ear cleansing drops designed to dissolve accumulated wax and prevent yeast colonies. Formulated with organic witch hazel extracts and calming tea tree oils.',
    price: 1250, salePrice: null, stock: 110, isFeatured: false, rating: 4.6,
    images: ['https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-5',
    name: 'Organic Cellular Joint Recovery Gel',
    desc: 'Topical analgesic massage gel with organic arnica and menthol. Absorbs instantly into skin to reduce muscle tension and soothe arthritis discomfort.',
    price: 2200, salePrice: 1899, stock: 48, isFeatured: false, rating: 4.8,
    images: ['https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-5',
    name: 'Veterinary Optical Sterility Eye Drops',
    desc: 'Boric-acid-free isotonic saline formula designed to flush foreign matter, soothe allergic irritation, and wash tear-staining patterns safely.',
    price: 1100, salePrice: null, stock: 130, isFeatured: false, rating: 4.5,
    images: ['https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800']
  },

  // Grooming (cat-6)
  {
    cat: 'cat-6',
    name: 'Royal Cashmere & Silk Coat Wash',
    desc: 'Luxurious botanical shampoo infused with genuine hydrolyzed silk proteins, cashmere extracts, and organic rosewater. Ideal for coats needing high-gloss restoration.',
    price: 2600, salePrice: 2299, stock: 45, isFeatured: true, rating: 4.9,
    images: ['https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-6',
    name: 'Botanical Jasmine Coat De-Tangling Mist',
    desc: 'A light spray formulation containing organic aloe vera, jasmine absolute, and botanical silicones. Safely detangles fine hair without stripping natural lipid layers.',
    price: 1800, salePrice: null, stock: 65, isFeatured: false, rating: 4.8,
    images: ['https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-6',
    name: 'Organic Shea Butter Paw & Nose Balm',
    desc: 'Healing barrier balm prepared from organic Nilotica shea butter, beeswax, and calendula oils. Soothes cracked paws and dryness caused by hot pavement or cold road salt.',
    price: 1500, salePrice: 1290, stock: 95, isFeatured: true, rating: 5.0,
    images: ['https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-6',
    name: 'Professional Ergonomic Claw Trimmer (Stainless Steel)',
    desc: 'Surgical-grade stainless steel blades offering precision cuts without crushing the nail. Features an ergonomic wood-handle grip and safety guard.',
    price: 2400, salePrice: null, stock: 38, isFeatured: false, rating: 4.7,
    images: ['https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-6',
    name: 'Apothecary White Tea & Tea Tree Waterless Foam',
    desc: 'Dry cleansing foam with calming organic white tea extract. Neutralizes odours, absorbs dirt particles, and volumizes the coat between wet baths.',
    price: 1900, salePrice: 1699, stock: 55, isFeatured: false, rating: 4.8,
    images: ['https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-6',
    name: 'Boar Bristle Hand-Polished Coat Brush',
    desc: 'Bespoke beechwood paddle brush set with 100% natural boar bristles. Distributes the skin\'s natural sebum throughout the coat fibers for a radiant polish.',
    price: 3800, salePrice: null, stock: 20, isFeatured: false, rating: 5.0,
    images: ['https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800']
  },

  // Toys (cat-7)
  {
    cat: 'cat-7',
    name: 'Italian Leather Hand-Braided Fetch Ring',
    desc: 'Elegant utility at the park. Hand-braided from vegetable-tanned Italian leather with reinforced internal core. Soft on your companion\'s jaw and extremely durable.',
    price: 3400, salePrice: 2999, stock: 25, isFeatured: true, rating: 4.9,
    images: ['https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-7',
    name: 'Natural Organic Rubber Treat Dispenser Cube',
    desc: 'Designer heavy-duty rubber chew toy with irregular geometric bounce. Internal puzzle chambers holds freeze-dried rewards to stimulate cognitive thinking.',
    price: 2200, salePrice: null, stock: 60, isFeatured: false, rating: 4.8,
    images: ['https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-7',
    name: 'Bespoke Belgian Linen Squeaker Bone',
    desc: 'Minimalist dog toy crafted from heavy Belgian performance linen and stuffed with organic cotton. Safe non-toxic internal squeaker provides rich auditory play.',
    price: 1800, salePrice: 1499, stock: 80, isFeatured: true, rating: 4.7,
    images: ['https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-7',
    name: 'Smart Treat Maze Interactive Puzzle (Level 3)',
    desc: 'Luxury wooden interactive console designed to challenge your companion\'s problem-solving skills. Slide columns and lift blocks to find hidden treats.',
    price: 5800, salePrice: null, stock: 15, isFeatured: false, rating: 5.0,
    images: ['https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-7',
    name: 'Organic Cotton Braided Anchor Tug',
    desc: 'Extra-thick non-toxic organic cotton fibers tightly braided to support extreme tugging and jaw play. Promotes dental cleaning naturally via fiber flossing.',
    price: 1600, salePrice: null, stock: 100, isFeatured: false, rating: 4.6,
    images: ['https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-7',
    name: 'Bespoke Wool Felt Interactive Snuffle Mat',
    desc: 'Handcrafted felt mat with layers of hiding pockets. Distribute freeze-dried lamb treats to activate natural scent tracking instincts.',
    price: 2900, salePrice: 2600, stock: 40, isFeatured: false, rating: 4.9,
    images: ['https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=800']
  },

  // Accessories (cat-8)
  {
    cat: 'cat-8',
    name: 'Tuscan Leather Gilded Collar',
    desc: 'Exquisite hand-stitched collar made from full-grain vegetable-tanned Tuscan leather. Features solid brass hardware electroplated in 24k gold, reinforced stitching, and a soft nubuck leather inner lining.',
    price: 6200, salePrice: 5800, stock: 18, isFeatured: true, rating: 4.9,
    images: ['https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-8',
    name: 'Saddle Leather Braided Luxury Lead',
    desc: 'Elegant control at your side. Craft from robust English saddle leather with hand-finished round stitching and a solid gold-toned security swivel hook.',
    price: 7800, salePrice: null, stock: 22, isFeatured: false, rating: 4.8,
    images: ['https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-8',
    name: 'Handcrafted Brass Identification Medallion',
    desc: 'Bespoke raw brass tag hand-engraved with client coordinates. Patinas beautifully over time, providing classic historical styling.',
    price: 1900, salePrice: 1599, stock: 120, isFeatured: true, rating: 5.0,
    images: ['https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-8',
    name: 'Silk Twill Equestrian Dog Bandana',
    desc: 'Stunning 100% silk twill bandana featuring hand-rolled edges and a custom heritage equestrian print pattern. Soft, light, and hyper-elegant.',
    price: 4500, salePrice: null, stock: 30, isFeatured: false, rating: 4.7,
    images: ['https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-8',
    name: 'Nappa Leather Bow Tie Collar Attachment',
    desc: 'Classic tuxedo style for formal events. Soft padded black Nappa leather bow tie featuring a rear elastic band to slip easily onto existing collars.',
    price: 2800, salePrice: 2490, stock: 40, isFeatured: false, rating: 4.9,
    images: ['https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-8',
    name: 'Heritage Tweed Walking Harness',
    desc: 'Timeless British country style. Tailored from robust Harris Tweed, reinforced with nylon interior webbing and golden quick-release security clips.',
    price: 5600, salePrice: null, stock: 25, isFeatured: false, rating: 4.8,
    images: ['https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800']
  },

  // Beds & Comfort (cat-9)
  {
    cat: 'cat-9',
    name: 'Royal Velvet Orthopedic Bed',
    desc: 'Indulge your companion with the absolute height of comfort. Crafted with three layers of high-density orthopedic memory foam, wrapped in an ultra-soft, stain-resistant royal velvet cover.',
    price: 12500, salePrice: 10999, stock: 12, isFeatured: true, rating: 4.9,
    images: ['https://images.unsplash.com/photo-1541599540903-216a46ca1ad0?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-9',
    name: 'Bespoke Oak Indoor Slatted Den',
    desc: 'A sanctuary for your companion that doubles as an elegant side table for your living room. Handcrafted from sustainably-sourced premium white oak with a oil finish.',
    price: 45000, salePrice: 42000, stock: 3, isFeatured: true, rating: 5.0,
    images: ['https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-9',
    name: 'Pure Mongolian Cashmere Cozy Blanket',
    desc: 'Wrap your pet in unparalleled luxury. Woven from 100% grade-A cashmere fibers. Unbelievably soft, providing warm cellular insulation on cold evenings.',
    price: 14500, salePrice: 12999, stock: 10, isFeatured: true, rating: 5.0,
    images: ['https://images.unsplash.com/photo-1541599540903-216a46ca1ad0?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-9',
    name: 'Belgian Linen Padded Nest Bed',
    desc: 'Understated organic style. Heavy-weave Belgian linen stuffed with hypoallergenic organic cotton fluff. Ideal for summer resting and modern minimal environments.',
    price: 9800, salePrice: null, stock: 18, isFeatured: false, rating: 4.8,
    images: ['https://images.unsplash.com/photo-1541599540903-216a46ca1ad0?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-9',
    name: 'Orthopedic Bolster Bed in Charcoal Bouclé',
    desc: 'Premium memory foam mattress with raised padded borders to support the neck. Covered in a thick, textured charcoal bouclé fabric that resists claw scratching.',
    price: 11500, salePrice: 9999, stock: 14, isFeatured: false, rating: 4.9,
    images: ['https://images.unsplash.com/photo-1541599540903-216a46ca1ad0?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-9',
    name: 'Ergonomic Nesting Pet Pod (Sleek Felt)',
    desc: 'Modern cocoon den molded from high-density compression felt. Fits smaller dogs and cats, shielding them to provide secure, deep sleep cycles.',
    price: 6800, salePrice: null, stock: 20, isFeatured: false, rating: 4.7,
    images: ['https://images.unsplash.com/photo-1541599540903-216a46ca1ad0?auto=format&fit=crop&q=80&w=800']
  },

  // Feeding Essentials (cat-10)
  {
    cat: 'cat-10',
    name: 'Carrara Marble Double Pet Dining Set',
    desc: 'Stunning elevated feeding table hand-carved from a single block of polished Italian Carrara marble. Features two removable gold-electroplated stainless steel bowls.',
    price: 18000, salePrice: 15999, stock: 8, isFeatured: true, rating: 5.0,
    images: ['https://images.unsplash.com/photo-1615678815958-5910c6811c25?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-10',
    name: 'Hand-Hammered Solid Brass Single Bowl',
    desc: 'Artisanal tabletop bowl hand-hammered from solid heavy-gauge brass. Coated with food-safe protective lacquer. Anti-skid rubber base rings prevent floor sliding.',
    price: 3400, salePrice: null, stock: 40, isFeatured: false, rating: 4.8,
    images: ['https://images.unsplash.com/photo-1615678815958-5910c6811c25?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-10',
    name: 'Slow-Feeder Ceramic Wave Plate',
    desc: 'Feed slowly with sophisticated form. High-fire stoneware ceramic featuring organic wave ripples that force companions to eat pace-by-pace, reducing bloating.',
    price: 2900, salePrice: 2490, stock: 35, isFeatured: true, rating: 4.9,
    images: ['https://images.unsplash.com/photo-1615678815958-5910c6811c25?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-10',
    name: 'Luxury Elevated Walnut Dining Stand',
    desc: 'Double feeder stand crafted from solid walnut wood. Elevates bowls by 8 inches to relieve neck and spinal strain on larger breeds during feeding.',
    price: 8800, salePrice: null, stock: 15, isFeatured: false, rating: 4.8,
    images: ['https://images.unsplash.com/photo-1615678815958-5910c6811c25?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-10',
    name: 'Travel Food Container in Sage Silicone',
    desc: 'Collapsible, food-safe silicone travel canister with airtight wood lid. Easily holds up to 1.5kg of kibble during road trips and premium weekends.',
    price: 2100, salePrice: 1800, stock: 55, isFeatured: false, rating: 4.7,
    images: ['https://images.unsplash.com/photo-1615678815958-5910c6811c25?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-10',
    name: 'Pure Copper Water Fountain (Silent Pump)',
    desc: 'Continuous fresh oxygenated hydration. Spun solid copper bowl featuring a silent charcoal filtration pump, generating a flowing, pure aquatic soundscape.',
    price: 12500, salePrice: null, stock: 12, isFeatured: false, rating: 4.9,
    images: ['https://images.unsplash.com/photo-1615678815958-5910c6811c25?auto=format&fit=crop&q=80&w=800']
  },

  // Pet Hygiene (cat-11)
  {
    cat: 'cat-11',
    name: 'Antibacterial Silk Wet Wipes (Coconut Oil)',
    desc: 'Apothecary-grade clinical wet wipes. Infused with organic coconut oil, colloidal silver, and silk amino acids. Sanitizes paws and coat while restoring cellular moisture.',
    price: 1100, salePrice: 950, stock: 150, isFeatured: true, rating: 4.9,
    images: ['https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-11',
    name: 'Self-Cleaning Smart Litter Pod',
    desc: 'High-tech feline waste automation. Uses whisper-silent rotation to separate waste, logging cat entry cycles on a secure app. Enclosed carbon-filter eliminates odors.',
    price: 32000, salePrice: 28999, stock: 10, isFeatured: true, rating: 4.8,
    images: ['https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-11',
    name: 'Bio-Degradable Lavender Waste Bags (12 Rolls)',
    desc: 'Eco-conscious design. Extra-thick cornstarch compostable waste bags infused with natural lavender oils. Leak-proof structure ensures secure transport.',
    price: 900, salePrice: null, stock: 200, isFeatured: false, rating: 4.8,
    images: ['https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-11',
    name: 'Enzymatic Odour Eliminator & Urised Mist',
    desc: 'A powerful bio-enzymatic spray that targets urine and waste molecules, destroying them at the cellular level. Leaves a crisp herbal lime scent.',
    price: 1500, salePrice: null, stock: 90, isFeatured: false, rating: 4.7,
    images: ['https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-11',
    name: 'Premium Bamboo Charcoal Training Pads',
    desc: 'Ultra-absorbent training pads containing natural bamboo charcoal. Instantly locks in moisture and neutralizes ammonia odors, keeping flooring dry.',
    price: 1900, salePrice: 1699, stock: 80, isFeatured: false, rating: 4.8,
    images: ['https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-11',
    name: 'Eucalyptus Dry Pet Cologne Spray',
    desc: 'A botanical daily refresh spray. Infused with pure organic eucalyptus oils, cedarwood extracts, and natural alcohol-free neutralizers to combat coat odour.',
    price: 1600, salePrice: null, stock: 110, isFeatured: false, rating: 4.6,
    images: ['https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&q=80&w=800']
  },

  // Travel Essentials (cat-12)
  {
    cat: 'cat-12',
    name: 'Designer Canvas & Tuscan Leather Carrier',
    desc: 'The epitome of elite travel style. Sturdy organic cotton canvas reinforced with vegetable-tanned Tuscan leather trim. Features mesh ventilation and cozy internal pad.',
    price: 18500, salePrice: 16900, stock: 12, isFeatured: true, rating: 5.0,
    images: ['https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-12',
    name: 'Isofix Memory Foam Car Safety Seat',
    desc: 'Secure protection on the highway. Securely attaches using Isofix hooks, featuring high-density memory foam padding and internal security leash links.',
    price: 9200, salePrice: null, stock: 15, isFeatured: false, rating: 4.9,
    images: ['https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-12',
    name: 'Aerospace Aluminium Pet Stroller',
    desc: 'Elegant mobile suspension. Fabricated with lightweight aerospace-grade aluminium frame, flat-fold mechanism, and premium wear-resistant rubber tyres.',
    price: 28500, salePrice: 26000, stock: 6, isFeatured: true, rating: 4.9,
    images: ['https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-12',
    name: 'Stainless Steel Insulated Travel Flask',
    desc: 'Keep water ice-cold for 24 hours. Double-wall vacuum insulated flask featuring a fold-out silicone leaf bowl for easy drinking access during treks.',
    price: 2400, salePrice: null, stock: 70, isFeatured: false, rating: 4.8,
    images: ['https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-12',
    name: 'Waterproof Quilted Seat Protection Cover',
    desc: 'Heavy-duty 4-layer quilted Oxford fabric hammock that covers the rear car seats completely. Resists claws, mud, water, and pet dander.',
    price: 4800, salePrice: 4200, stock: 35, isFeatured: false, rating: 4.7,
    images: ['https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-12',
    name: 'Bespoke Leather Passport & Health Record Wallet',
    desc: 'Keep documentation organized. Sleek wallet handcrafted from calfskin leather to hold vet files, vaccine history logs, and pet travel passports.',
    price: 3800, salePrice: null, stock: 40, isFeatured: false, rating: 5.0,
    images: ['https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?auto=format&fit=crop&q=80&w=800']
  },

  // Training Products (cat-13)
  {
    cat: 'cat-13',
    name: 'Premium Calfskin Treat Bag (Magnetic Closure)',
    desc: 'Stylish training accessory. Handcrafted from waterproof calfskin leather with a quick-access magnetic snap closure. Easily clips to belts or shoulder straps.',
    price: 3600, salePrice: 3200, stock: 40, isFeatured: true, rating: 4.9,
    images: ['https://images.unsplash.com/photo-1537151608828-ea2b117b6281?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-13',
    name: 'Professional Silent Training Whistle (Solid Silver)',
    desc: 'Elite acoustic design. Precision machined from solid sterling silver. Features micro-adjustable pitch control to lock in perfect recall frequencies.',
    price: 4900, salePrice: null, stock: 25, isFeatured: false, rating: 5.0,
    images: ['https://images.unsplash.com/photo-1537151608828-ea2b117b6281?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-13',
    name: 'Organic Cork Recall Training Mat',
    desc: 'Establish visual targeting boundaries. Molded from 100% natural, antimicrobial organic cork sheet. Non-slip backing ensures absolute floor stability.',
    price: 2800, salePrice: 2400, stock: 50, isFeatured: true, rating: 4.8,
    images: ['https://images.unsplash.com/photo-1537151608828-ea2b117b6281?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-13',
    name: 'Leather Recall Lead (30 Feet Longline)',
    desc: 'Extra-long recall lead crafted from raw-cut harness leather. Lightweight yet holds up to 150kg of tension. Perfect for advanced distance commands.',
    price: 4500, salePrice: null, stock: 30, isFeatured: false, rating: 4.7,
    images: ['https://images.unsplash.com/photo-1537151608828-ea2b117b6281?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-13',
    name: 'Ergonomic Wood-Finish Clicker Kit (2 Pack)',
    desc: 'Precision conditioning clicks. Hand-polished rosewood and maple shell clickers supplying crisp, clear sounds to mark positive behaviours.',
    price: 1500, salePrice: 1200, stock: 85, isFeatured: false, rating: 4.6,
    images: ['https://images.unsplash.com/photo-1537151608828-ea2b117b6281?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-13',
    name: 'Natural Scent-Tracking Diagnostic Training kit',
    desc: 'Activate natural olfactory capabilities. Includes target scent bottles (lavender, pine, anise) and organic target canisters for scent tracking.',
    price: 3400, salePrice: null, stock: 20, isFeatured: false, rating: 4.9,
    images: ['https://images.unsplash.com/photo-1537151608828-ea2b117b6281?auto=format&fit=crop&q=80&w=800']
  },

  // Luxury Lifestyle (cat-14)
  {
    cat: 'cat-14',
    name: 'Pure Cashmere Pet Sweater (Mongolian Cable)',
    desc: 'Keep your pet elegant and warm in chilly seasons. Woven from 100% genuine Grade-A Mongolian cashmere, featuring a classic British cable-knit pattern.',
    price: 8500, salePrice: null, stock: 15, isFeatured: true, rating: 4.8,
    images: ['https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-14',
    name: 'Minimalist Walnut Pet Stairs (Velvet Steps)',
    desc: 'Bespoke steps carved from rich American walnut wood, covered in plush velvet. Helps older companions mount higher couches and beds with dignity.',
    price: 18500, salePrice: 16999, stock: 5, isFeatured: true, rating: 4.9,
    images: ['https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-14',
    name: 'Artisanal Brass & Oak Pet Umbrella',
    desc: 'Premium rain protection during walks. Constructed with a solid white oak handle, polished brass ribbing, and thick waterproof nylon canopy.',
    price: 9500, salePrice: 7900, stock: 8, isFeatured: true, rating: 5.0,
    images: ['https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-14',
    name: 'Bespoke Organic Silk Night Robe',
    desc: 'Plush evening robe constructed from 100% natural Mulberry silk with waist sash tie. Designed for sensory relaxation after botanical baths.',
    price: 7200, salePrice: null, stock: 18, isFeatured: false, rating: 4.7,
    images: ['https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-14',
    name: 'Gold-Plated Designer Identification Chain',
    desc: 'A statement fashion chain electroplated in heavy 18k gold. Designed for light social events and elegant editorial photo captures.',
    price: 5400, salePrice: 4800, stock: 25, isFeatured: false, rating: 4.9,
    images: ['https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-14',
    name: 'Designer Cotton Trench Coat (Double-Breasted)',
    desc: 'Iconic classic silhouette double-breasted trench. Tailored from water-repellent organic cotton gabardine, featuring a checked internal cotton lining.',
    price: 11000, salePrice: null, stock: 12, isFeatured: false, rating: 4.8,
    images: ['https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&q=80&w=800']
  },

  // Veterinary Wellness (cat-15)
  {
    cat: 'cat-15',
    name: 'Advanced DNA Screening & Breed Ancestry Kit',
    desc: 'Decode your companion\'s genetic code. Analyzes 350+ dog breeds, screens for 200+ genetic health risks, and provides complete ancestral family reports.',
    price: 9900, salePrice: 8900, stock: 45, isFeatured: true, rating: 5.0,
    images: ['https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-15',
    name: 'Comprehensive Geriatric Metabolic Health Package',
    desc: 'Complete at-home specimen collection kit. Validates liver, kidney, glucose, and thyroid panels at our partner laboratories in Shivamogga.',
    price: 12000, salePrice: null, stock: 30, isFeatured: false, rating: 4.9,
    images: ['https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-15',
    name: 'Bio-Active Gut Microbiome DNA Diagnostics Kit',
    desc: 'Unlock optimal digestion. Analyzes the gut bacterial species mapping, supplying tailored probiotic recipes and clinical dietary suggestions.',
    price: 7500, salePrice: 6800, stock: 50, isFeatured: true, rating: 4.8,
    images: ['https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-15',
    name: 'Heavy Metals & Cellular Toxin Screening Kit',
    desc: 'Screens hair/saliva samples for toxic contamination, heavy metals, or pesticide exposures, providing veterinary detoxification guidelines.',
    price: 6400, salePrice: null, stock: 25, isFeatured: false, rating: 4.7,
    images: ['https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-15',
    name: 'Allergen Panel Testing Kit (60 Environmental Triggers)',
    desc: 'Clinical screening for 60 pollen, food, and environmental triggers causing chronic hot spots. Diagnostic processed by board-certified veterinarians.',
    price: 8900, salePrice: 7990, stock: 35, isFeatured: false, rating: 4.9,
    images: ['https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=800']
  },
  {
    cat: 'cat-15',
    name: 'At-Home Urinalysis & Kidney Diagnostic Strips',
    desc: 'Simple diagnostic strip set with card reader app. Monitors protein, pH, glucose, and ketones to track early signs of kidney issues.',
    price: 2200, salePrice: null, stock: 120, isFeatured: false, rating: 4.6,
    images: ['https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=800']
  }
];

// Add extra items to reach exactly 90 products (6 products per category for all 15 categories)
// We already have exactly 6 products for all 15 categories = 90 products!
// Let's verify:
// cat-1: 6
// cat-2: 6
// cat-3: 6
// cat-4: 6
// cat-5: 6
// cat-6: 6
// cat-7: 6
// cat-8: 6
// cat-9: 6
// cat-10: 6
// cat-11: 6
// cat-12: 6
// cat-13: 6
// cat-14: 6
// cat-15: 6
// Total = 90 products. Excellent!

// Helper to generate slug
function generateSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

// Generate MOCK_PRODUCTS list for mockData.ts
const processedProducts = RAW_PRODUCTS.map((p, idx) => {
  const id = `prod-${idx + 1}`;
  const slug = generateSlug(p.name);
  return {
    id,
    name: p.name,
    slug,
    description: p.desc,
    price: p.price,
    salePrice: p.salePrice,
    stock: p.stock,
    categoryId: p.cat,
    isFeatured: p.isFeatured,
    rating: p.rating,
    images: p.images,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
});

// Original Blogs and Banners
const MOCK_BLOGS = [
  {
    id: 'blog-1',
    title: 'The Art of Holistic Pet Wellness: A Modern Guide',
    slug: 'art-of-holistic-pet-wellness',
    summary: 'Explore the fundamental principles of luxury pet health, focusing on organic cellular diets, natural apothecary treatments, and mental relaxation.',
    content: `Pets are not merely animals; they are extensions of our homes, our hearts, and our lifestyles. Providing them with a healthy, vibrant life requires an understanding of holistic pet wellness that goes beyond basic veterinary checks.

    ### 1. Cellular Nutrition: The Foundation
    The food your pet consumes dictates their cellular development, immune strength, and coat luster. Standard commercial feeds are filled with heavy fillers. Switching to human-grade organic meats, venison, wild salmon, and cold-pressed oils ensures your pet absorbs the bio-available vitamins needed for cellular rejuvenation.
    
    ### 2. Apothecary & Natural Grooming
    Synthetic shampoos strip the essential oils from a pet's fur, leading to hot spots, dandruff, and chronic itching. Incorporate natural botanical elixirs containing organic lavender, silk amino acids, and oatmeal. These soothe the skin barrier and leave a gentle, natural fragrance that calms the nervous system.
    
    ### 3. Creating a Sensory Oasis
    Pets thrive in structured environments. Investing in high-density memory foam beds protects their joints as they age. Placing their bed in a quiet, low-traffic area helps lower stress hormones and improves their sleep cycles.`,
    featuredImage: 'https://images.unsplash.com/photo-1541599540903-216a46ca1ad0?auto=format&fit=crop&q=80&w=800',
    authorId: 'auth-1',
    authorName: 'Dr. Evelyn Sterling, DVM',
    isPublished: true,
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'blog-2',
    title: 'Designing Spaces: Integrating Pet Comfort into Luxury Home Decor',
    slug: 'designing-spaces-pet-comfort-luxury-decor',
    summary: 'How to choose premium pet furniture, orthopedic dens, and designer accessories that harmonize beautifully with modern minimalist interiors.',
    content: `For design-conscious homeowners, introducing a pet shouldn't mean sacrificing the visual harmony of your interiors. The pet industry is shifting towards premium materials and architectural shapes that complement high-end spaces.

    ### The Death of the Plastic Crate
    Traditional plastic travel crates and bright cartoonish fabric beds disrupt visual flow. Instead, select indoor dens handcrafted from solid oak or walnut that function as functional end tables.
    
    ### Selecting Textiles That Last
    Look for performance fabrics like Belgian linens, heavy chenilles, and stain-resistant velvets. These materials offer exceptional durability against claws and are easily vacuumed while looking sophisticated.
    
    ### Coordination of Color Palettes
    Avoid neon pet toys and accessories. Choose muted tones like sage green, terracotta, warm stone, and deep chestnut to blend with your living room's styling.`,
    featuredImage: 'https://images.unsplash.com/photo-1513360309081-36f20c3803db?auto=format&fit=crop&q=80&w=800',
    authorId: 'auth-1',
    authorName: 'Marcello Russo, Interior Architect',
    isPublished: true,
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const MOCK_BANNERS = [
  {
    id: 'banner-1',
    title: 'The New Standard of Pet Luxury',
    subtitle: 'Bespoke designs and artisanal organic nutrition tailored for your loyal companion.',
    imageUrl: 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=1200',
    linkUrl: '/shop',
    isActive: true,
    displayOrder: 1,
    createdAt: new Date().toISOString()
  },
  {
    id: 'banner-2',
    title: 'Compassionate Elite Vet Care',
    subtitle: 'Schedule virtual or in-person consultations with our board-certified national specialists.',
    imageUrl: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=1200',
    linkUrl: '/consultation',
    isActive: true,
    displayOrder: 2,
    createdAt: new Date().toISOString()
  }
];

// Generate src/services/mockData.ts
const processedCategories = CATEGORIES.map(cat => ({
  ...cat,
  createdAt: new Date().toISOString()
}));

const mockDataContent = `import { Product, Category, Blog, Banner } from '../types';

export const MOCK_CATEGORIES: Category[] = ${JSON.stringify(processedCategories, null, 2)};

export const MOCK_PRODUCTS: Product[] = ${JSON.stringify(processedProducts, null, 2)};

export const MOCK_BLOGS: Blog[] = ${JSON.stringify(MOCK_BLOGS, null, 2)};

export const MOCK_BANNERS: Banner[] = ${JSON.stringify(MOCK_BANNERS, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../src/services/mockData.ts'), mockDataContent);
console.log('Successfully generated src/services/mockData.ts!');

// Generate supabase/supabase_seed.sql
let sqlContent = `-- PAWLUXURY SEED DATA SCRIPT
-- Populates the luxury database with categories, products, images, blogs, and banners.

-- 1. Insert Categories
INSERT INTO public.categories (id, name, slug, description, image_url, created_at) VALUES\n`;

CATEGORIES.forEach((cat, idx) => {
  const isLast = idx === CATEGORIES.length - 1;
  sqlContent += `('${cat.id}', '${cat.name.replace(/'/g, "''")}', '${cat.slug}', '${cat.description.replace(/'/g, "''")}', '${cat.imageUrl}', NOW())${isLast ? ';' : ','}\n`;
});

sqlContent += `\n-- 2. Insert Products
INSERT INTO public.products (id, name, slug, description, price, sale_price, stock, category_id, is_featured, rating, created_at, updated_at) VALUES\n`;

processedProducts.forEach((p, idx) => {
  const isLast = idx === processedProducts.length - 1;
  const salePriceVal = p.salePrice === null ? 'NULL' : p.salePrice.toFixed(2);
  sqlContent += `('${p.id}', '${p.name.replace(/'/g, "''")}', '${p.slug}', '${p.description.replace(/'/g, "''")}', ${p.price.toFixed(2)}, ${salePriceVal}, ${p.stock}, '${p.categoryId}', ${p.isFeatured}, ${p.rating.toFixed(1)}, NOW(), NOW())${isLast ? ';' : ','}\n`;
});

sqlContent += `\n-- 3. Insert Product Images
INSERT INTO public.product_images (product_id, image_url, display_order, created_at) VALUES\n`;

processedProducts.forEach((p, idx) => {
  const isLast = idx === processedProducts.length - 1;
  sqlContent += `('${p.id}', '${p.images[0]}', 0, NOW())${isLast ? ';' : ','}\n`;
});

sqlContent += `\n-- 4. Insert Banners
INSERT INTO public.banners (id, title, subtitle, image_url, link_url, is_active, display_order, created_at) VALUES
('banner-1', 'The New Standard of Pet Luxury', 'Bespoke designs and artisanal organic nutrition tailored for your loyal companion.', 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=1200', '/shop', true, 1, NOW()),
('banner-2', 'Compassionate Elite Vet Care', 'Schedule virtual or in-person consultations with our board-certified national specialists.', 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=1200', '/consultation', true, 2, NOW());

-- 5. Insert Blogs
INSERT INTO public.blogs (id, title, slug, content, summary, featured_image, author_id, author_name, is_published, published_at, created_at, updated_at) VALUES
('blog-1', 'The Art of Holistic Pet Wellness: A Modern Guide', 'art-of-holistic-pet-wellness', 'Explore the fundamental principles of luxury pet health, focusing on organic cellular diets, natural apothecary treatments, and mental relaxation.', 'Pets are not merely animals; they are extensions of our homes, our hearts, and our lifestyles. Providing them with a healthy, vibrant life requires an understanding of holistic pet wellness that goes beyond basic veterinary checks.
\n### 1. Cellular Nutrition: The Foundation\nThe food your pet consumes dictates their cellular development, immune strength, and coat luster. Standard commercial feeds are filled with heavy fillers. Switching to human-grade organic meats, venison, wild salmon, and cold-pressed oils ensures your pet absorbs the bio-available vitamins needed for cellular rejuvenation.
\n### 2. Apothecary & Natural Grooming\nSynthetic shampoos strip the essential oils from a pet\'s fur, leading to hot spots, dandruff, and chronic itching. Incorporate natural botanical elixirs containing organic lavender, silk amino acids, and oatmeal. These soothe the skin barrier and leave a gentle, natural fragrance that calms the nervous system.
\n### 3. Creating a Sensory Oasis\nPets thrive in structured environments. Investing in high-density memory foam beds protects their joints as they age. Placing their bed in a quiet, low-traffic area helps lower stress hormones and improves their sleep cycles.', 'https://images.unsplash.com/photo-1541599540903-216a46ca1ad0?auto=format&fit=crop&q=80&w=800', 'auth-1', 'Dr. Evelyn Sterling, DVM', true, NOW(), NOW(), NOW()),
('blog-2', 'Designing Spaces: Integrating Pet Comfort into Luxury Home Decor', 'designing-spaces-pet-comfort-luxury-decor', 'How to choose premium pet furniture, orthopedic dens, and designer accessories that harmonize beautifully with modern minimalist interiors.', 'For design-conscious homeowners, introducing a pet shouldn\'t mean sacrificing the visual harmony of your interiors. The pet industry is shifting towards premium materials and architectural shapes that complement high-end spaces.
\n### The Death of the Plastic Crate\nTraditional plastic travel crates and bright cartoonish fabric beds disrupt visual flow. Instead, select indoor dens handcrafted from solid oak or walnut that function as functional end tables.
\n### Selecting Textiles That Last\nLook for performance fabrics like Belgian linens, heavy chenilles, and stain-resistant velvets. These materials offer exceptional durability against claws and are easily vacuumed while looking sophisticated.
\n### Coordination of Color Palettes\nAvoid neon pet toys and accessories. Choose muted tones like sage green, terracotta, warm stone, and deep chestnut to blend with your living room\'s styling.', 'https://images.unsplash.com/photo-1513360309081-36f20c3803db?auto=format&fit=crop&q=80&w=800', 'auth-1', 'Marcello Russo, Interior Architect', true, NOW(), NOW(), NOW());

-- 6. Insert Settings Default
INSERT INTO public.settings (id, whatsapp_number, low_stock_threshold, bank_name, account_number, ifsc_code, account_name, upi_id, created_at, updated_at) VALUES
(1, '+919876543210', 10, 'HDFC Bank Ltd', '50200062391032', 'HDFC0000104', 'PawLuxury Private Limited', 'pawluxury@ybl', NOW(), NOW());
`;

fs.writeFileSync(path.join(__dirname, '../supabase/supabase_seed.sql'), sqlContent);
console.log('Successfully generated supabase/supabase_seed.sql!');
