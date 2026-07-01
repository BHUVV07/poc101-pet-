export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  details: string[];
  imageUrl: string;
}

export const productsData: ProductCategory[] = [
  {
    id: "vet-medicines",
    name: "Veterinary Medicines",
    description: "Prescription cardiovascular drugs, renal compounds, gastrointestinal therapies, and broad-spectrum antibiotics.",
    details: [
      "Therapeutic antibiotic preparations",
      "Gastrointestinal stabilizers and anti-emetics",
      "Licensed cardiac support formulas",
      "Ophthalmic and otic clinical solutions"
    ],
    imageUrl: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "supplements",
    name: "Therapeutic Supplements",
    description: "Multivitamins, joint rejuvenators (glucosamine/chondroitin), hepatic stabilizers, and skin omega-3 supplements.",
    details: [
      "High-absorption joint mobility compounds",
      "Dermatology omega-3/6 cold-pressed oils",
      "Lactation and growth multivitamin pastes",
      "Hepatic detoxification and renal support pastes"
    ],
    imageUrl: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "pet-food",
    name: "Clinical Nutrition & Pet Food",
    description: "Prescription kibble, high-protein specialized wet feeds, hypo-allergenic diets, and recovery nutrition.",
    details: [
      "Urinary and renal therapeutic diets",
      "Grain-free, single-protein allergy solutions",
      "Critical recovery wet food formulas",
      "Active breed metabolic control nutrition"
    ],
    imageUrl: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "clinical-supplies",
    name: "Clinical & Diagnostic Supplies",
    description: "Surgical consumables, diagnostic test kits, laboratory screening assets, and clinic disinfectants.",
    details: [
      "Rapid antigen diagnostic strip tests",
      "Surgical sutures and sterile drapes",
      "Infusion systems and venous catheters",
      "High-grade clinic aseptic sterilization concentrates"
    ],
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "grooming-products",
    name: "Medicated Grooming Products",
    description: "Clinical anti-parasitic shampoos, calming botanical washes, ear cleansers, and skin barrier reconstructs.",
    details: [
      "Antifungal and antibacterial dermatological shampoos",
      "Calming lavender & oatmeal hypoallergenic cleansers",
      "Cerumen-dissolving sterile ear drops",
      "Skin barrier moisturizing sprays"
    ],
    imageUrl: "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "pet-accessories",
    name: "Safety & Pet Accessories",
    description: "Orthopedic memory foam beds, veterinary recovery collars, safety harness systems, and clinic travel gear.",
    details: [
      "Orthopedic high-density joint protection beds",
      "Soft surgical recovery cones (E-collars)",
      "Anatomical chest-support walking harnesses",
      "Sterile travel and carrier equipment"
    ],
    imageUrl: "https://images.unsplash.com/photo-1541599540903-216a46ca1ad0?auto=format&fit=crop&q=80&w=600"
  }
];
