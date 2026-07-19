export interface DivisionDetails {
  id: string;
  name: string;
  slug: string;
  type: "retail" | "hospital" | "wholesale" | "logistics";
  heroImage: string;
  overview: string;
  aboutText: string;
  address: string;
  phone: string;
  workingHours: string;
  googleMapsLink: string;
  servicesAvailable: string[];
  productsAvailable: string[];
  highlights?: { title: string; description: string }[];
  galleryImages: string[];
  addressLines?: string[];
  showcaseImage?: string;
  googleMapsEmbedUrl?: string;
  rating?: string;
  reviewCount?: string;
  description?: string;
}

export const divisionsData: DivisionDetails[] = [
  {
    id: "garden-area",
    name: "Manasa Vet Pharma",
    slug: "garden-area",
    type: "retail",
    heroImage: "/gallery/pharma/IMG_8034.JPG",
    overview: "Licensed retail companion medicine pharmacy supplying Garden Area and surrounding local sectors.",
    aboutText: "Manasa Vet Pharma represents our flagship local pharmacy branch. We stock a wide catalog of critical vet medications, specific kidney and heart formulations, recovery pastes, and dermatological anti-parasitic shampoos. Our companion-care pharmacists are ready to guide you on prescription schedules.",
    address: "Garden Area Main Road, Shivamogga, Karnataka 577201",
    phone: "+91 98765 43211",
    workingHours: "9:00 AM - 9:00 PM (Daily)",
    googleMapsLink: "https://maps.google.com/?q=Garden+Area+Shivamogga",
    servicesAvailable: [
      "Prescription Dispensing",
      "Medication Consultation",
      "Cold-chain Vaccine Storage",
      "Dermatology Product Selection"
    ],
    productsAvailable: [
      "Cardiology & Renal Therapeutics",
      "Medicated Grooming washes",
      "Veterinary Supplements & Multi-vitamins",
      "Therapeutic Kibble & wet nutrition"
    ],
    galleryImages: [
      "/gallery/pharma/IMG_8034.JPG",
      "/gallery/pharma/IMG_8015.JPG",
      "/gallery/pharma/IMG_8008.JPG",
      "/gallery/pharma/IMG_8010.JPG",
      "/gallery/pharma/IMG_8006.JPG",
      "/gallery/pharma/IMG_8028.JPG",
      "/gallery/pharma/IMG_8029.JPG",
      "/gallery/pharma/IMG_8017.JPG"
    ],
    showcaseImage: "/gallery/pharma/IMG_8034.JPG"
  },
  {
    id: "police-chowki",
    name: "Manasa Pets Mart",
    slug: "police-chowki",
    type: "retail",
    heroImage: "/gallery/mart/hero-banner.jpg",
    overview: "Specialized companion retail division serving the Police Chowki and outer Shivamogga networks.",
    aboutText: "At Manasa Pets Mart, we believe every pet deserves the very best. From nutritious pet food and comfortable bedding to grooming essentials, toys, travel accessories, and daily care products, we offer everything you need under one roof. Our carefully selected products ensure quality, safety, and comfort for your beloved companions.",
    address: "Police Chowki Junction, Shivamogga, Karnataka 577201",
    phone: "+91 98765 43212",
    workingHours: "9:00 AM - 9:00 PM (Daily)",
    googleMapsLink: "https://maps.google.com/?q=Police+Chowki+Shivamogga",
    servicesAvailable: [
      "Prescription Verification",
      "Therapeutic Diet Consulting",
      "Vaccine Delivery Point",
      "Wound Care Supplies Setup"
    ],
    productsAvailable: [
      "Broad-Spectrum Antibiotics",
      "Allergen & Medicated Shampoos",
      "Mobility & Joint Pastes",
      "Clinical Diagnostics & Strip Tests"
    ],
    highlights: [],
    galleryImages: [
      "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=800"
    ],
    showcaseImage: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "buddy-kitty",
    name: "Buddy & Kitty – Multispeciality Pet Hospital and Grooming",
    slug: "buddy-kitty",
    type: "hospital",
    heroImage: "/gallery/hospital/hero-banner.jpg",
    overview: "State-of-the-art Multi-Speciality Veterinary Hospital with sterile surgery, in-house lab, and diagnostics.",
    aboutText: "Buddy & Kitty – Multispeciality Pet Hospital and Grooming represents our clinical care center. We host advanced physical therapy rooms, diagnostic digital radiology, soft-tissue surgical suites, and dedicated vaccination lines. We consolidate senior veterinary surgeons and clinical specialists to deliver trusted treatment profiles.",
    address: "100 Ft Road, near Kariyanna Building, Shivamogga, Karnataka 577201",
    phone: "+91 98765 43213",
    workingHours: "9:00 AM - 8:00 PM (Monday - Saturday), 9:00 AM - 1:00 PM (Sunday)",
    googleMapsLink: "https://maps.app.goo.gl/K3VJkNzQ4meeELsX8",
    servicesAvailable: [
      "Veterinary Consultation",
      "Digital X-Ray & Ultrasound Diagnostics",
      "Sterile Surgical Care",
      "Immunization & Vaccination Schedules",
      "Wellness Checks & Senior Audits",
      "Apothecary Dispensary",
      "Emergency Stabilization"
    ],
    productsAvailable: [
      "Medicated Shampoos & Cleansers",
      "Prescription Renal/Urinary Feeds",
      "Diagnostics Strip tests",
      "Surgical Recovery Collars & Harnesses"
    ],
    highlights: [
      {
        title: "Sterile Operating Theatre",
        description: "Class-100 clean rooms for sterile soft-tissue and orthopedic procedures."
      },
      {
        title: "Advanced Lab Analysis",
        description: "In-house blood panels and microscope diagnostics processed within 30 minutes."
      },
      {
        title: "Emergency Fluids Setup",
        description: "Instant access to critical recovery oxygen, intravenous systems, and temperature control."
      }
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1541599540903-216a46ca1ad0?auto=format&fit=crop&q=80&w=800"
    ],
    showcaseImage: "/gallery/hospital/reception-showcase.jpg"
  },
  {
    id: "wholesale",
    name: "Manasa Vet Pharma – Wholesale",
    slug: "wholesale",
    type: "wholesale",
    heroImage: "/gallery/wholesale/hero-banner.jpg",
    overview: "Centralized B2B pharmaceutical supply division serving veterinary clinics and trade partners across the region.",
    aboutText: "Our B2B Apothecary division handles trade distribution of core companion medicines, bulk surgical equipment, diagnostic sets, and vaccines. We support licensed veterinary pharmacies, private companion animal clinics, and regional animal health depots.",
    address: "1st Floor, 'Abhijnana, Dr CL Ramanna Rd, beside Kote Police Quarters, KR Puram, Shivamogga, Karnataka 577202",
    addressLines: [
      "1st Floor,",
      "'Abhijnana',",
      "Dr. C L Ramanna Road,",
      "Beside Kote Police Quarters,",
      "KR Puram,",
      "Shivamogga – 577202"
    ],
    phone: "+91 98869 54762",
    workingHours: "Monday – Saturday\n10:00 AM – 7:30 PM\nSunday Closed",
    googleMapsLink: "https://maps.app.goo.gl/iZGSxt4Bbf5e87rDA",
    rating: "4.8",
    reviewCount: "189+",
    servicesAvailable: [
      "Delivery",
      "On-site Services"
    ],
    productsAvailable: [
      "Veterinary Medicines",
      "Bulk Pharmacy Distribution",
      "Vaccines & Biologicals",
      "Nutritional Supplements",
      "Clinical Consumables",
      "Veterinary Healthcare Supplies"
    ],
    highlights: [
      {
        title: "Regulatory Compliance",
        description: "Registered trade credentials with licensed pharmacists supervising logistics."
      },
      {
        title: "Bulk Supply Support",
        description: "Steady procurement contracts for clinics, diagnostics labs, and secondary depots."
      }
    ],
    galleryImages: [
      "/gallery/wholesale/01.jpg",
      "/gallery/wholesale/02.jpg",
      "/gallery/wholesale/03.jpg",
      "/gallery/wholesale/04.jpg",
      "/gallery/wholesale/05.jpg",
      "/gallery/wholesale/06.jpg",
      "/gallery/wholesale/07.jpg",
      "/gallery/wholesale/08.jpg"
    ],
    showcaseImage: "/gallery/wholesale/about-division.jpg",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7744.9393883971825!2d75.57023837546133!3d13.930615911580954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbba93eaf8e7113%3A0xeee0e5bf472c898b!2sManasa%20Vet%20Pharma%20-%20Wholesale!5e0!3m2!1sen!2sin!4v1783838617087!5m2!1sen!2sin",
    description: "Visit our wholesale veterinary pharmacy and distribution centre supplying high-quality medicines, vaccines, supplements, and healthcare products across the region."
  },
  {
    id: "petstep",
    name: "Petstep Logistics Network",
    slug: "petstep",
    type: "logistics",
    heroImage: "https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?auto=format&fit=crop&q=80&w=1200",
    overview: "Regional cold-chain logistics and distribution network for vaccines and critical diagnostics.",
    aboutText: "Petstep Logistics handles the transportation and cold-chain integrity of vital animal health supplies. We bridge international diagnostic manufacturers and clinical pharmacies, ensuring that vaccines and temperature-critical medicines remain within mandatory limits.",
    address: "GSKM Road, Shivamogga, Karnataka 577201",
    phone: "+91 98765 43215",
    workingHours: "9:00 AM - 7:00 PM (Monday - Saturday)",
    googleMapsLink: "https://maps.google.com/?q=GSKM+Road+Shivamogga",
    servicesAvailable: [
      "Cold-chain Vaccine Logistics",
      "Medical Supply Chain Operations",
      "Regional Pharmacy Distribution",
      "Diagnostic Kits Logistics"
    ],
    productsAvailable: [
      "Prescription vaccines transport packs",
      "Insulated thermal transport cells",
      "Logistics temperature logs setups",
      "Clinical consumable packs"
    ],
    highlights: [
      {
        title: "Thermal Cold-Chain",
        description: "Active digital temperature monitoring during regional delivery phases."
      },
      {
        title: "Broad Regional Reach",
        description: "Connected route coverage across Shivamogga, Bhadravathi, and Malnad sectors."
      }
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=800"
    ]
  }
];
