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
  highlights: { title: string; description: string }[];
  galleryImages: string[];
}

export const divisionsData: DivisionDetails[] = [
  {
    id: "garden-area",
    name: "Garden Area Pharmacy",
    slug: "garden-area",
    type: "retail",
    heroImage: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=1200",
    overview: "Licensed retail companion medicine pharmacy supplying Garden Area and surrounding local sectors.",
    aboutText: "Garden Area Pharmacy represents our flagship local pharmacy branch. We stock a wide catalog of critical vet medications, specific kidney and heart formulations, recovery pastes, and dermatological anti-parasitic shampoos. Our companion-care pharmacists are ready to guide you on prescription schedules.",
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
    highlights: [
      {
        title: "Cold Chain Storage",
        description: "Equipped with diagnostic medical refrigerators to maintain exact vaccine safety."
      },
      {
        title: "DVM Support Desk",
        description: "Registered companion pharmacists to cross-verify all medical scripts."
      }
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: "police-chowki",
    name: "Police Chowki Pharmacy",
    slug: "police-chowki",
    type: "retail",
    heroImage: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=1200",
    overview: "Specialized companion pharmacy division serving the Police Chowki and outer Shivamogga networks.",
    aboutText: "Serving as a vital pharmaceutical point, our Police Chowki branch focuses on immediate availability of companion pet therapeutics. We house specialized prescription lines, gastrointestinal formulations, cardiac treatments, and wellness products under constant quality verification.",
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
    highlights: [
      {
        title: "Instant Verification",
        description: "Fast script processing backed by digital inventory connection."
      },
      {
        title: "Allergen Support",
        description: "Extensive inventory of skin barrier and immunotherapeutic formulas."
      }
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: "buddy-kitty",
    name: "Buddy & Kitty Pet Hospital",
    slug: "buddy-kitty",
    type: "hospital",
    heroImage: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=1200",
    overview: "State-of-the-art Multi-Speciality Veterinary Hospital with sterile surgery, in-house lab, and diagnostics.",
    aboutText: "Buddy & Kitty Pet Hospital represents our clinical care center. We host advanced physical therapy rooms, diagnostic digital radiology, soft-tissue surgical suites, and dedicated vaccination lines. We consolidate senior veterinary surgeons and clinical specialists to deliver trusted treatment profiles.",
    address: "100 Ft Road, near Kariyanna Building, Shivamogga, Karnataka 577201",
    phone: "+91 98765 43213",
    workingHours: "9:00 AM - 8:00 PM (Monday - Saturday), 9:00 AM - 1:00 PM (Sunday)",
    googleMapsLink: "https://maps.google.com/?q=100+Ft+Road+Shivamogga",
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
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1541599540903-216a46ca1ad0?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: "wholesale",
    name: "Apothecary B2B Wholesale",
    slug: "wholesale",
    type: "wholesale",
    heroImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200",
    overview: "Centralized B2B pharmaceutical supply division serving veterinary clinics and trade partners.",
    aboutText: "Our B2B Apothecary division handles trade distribution of core companion medicines, bulk surgical equipment, diagnostic sets, and vaccines. We support licensed veterinary pharmacies, private companion animal clinics, and regional animal health depots.",
    address: "Old Barline Road, Shivamogga, Karnataka 577201",
    phone: "+91 98765 43214",
    workingHours: "10:00 AM - 6:00 PM (Monday - Saturday)",
    googleMapsLink: "https://maps.google.com/?q=Old+Barline+Road+Shivamogga",
    servicesAvailable: [
      "Bulk Trade Inquiries",
      "Apothecary Supply Contracts",
      "Clinic Supply Distribution",
      "DVM Trade Registration Verification"
    ],
    productsAvailable: [
      "Bulk Veterinary Pharmaceuticals",
      "Diagnostics & Lab Strip Tests",
      "Infusion systems & Venous Catheters",
      "Clinic Disinfectants & Aseptic Concentrates"
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
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?auto=format&fit=crop&q=80&w=800"
    ]
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
