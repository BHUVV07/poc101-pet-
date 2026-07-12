export interface PharmaCategory {
  id: string;
  name: string;
  description: string;
  iconName: string;
}

export const pharmaCategoriesTitle = "Products & Medical Categories";
export const pharmaCategoriesSubtitle = "Explore our premium vet pharma catalog, housing state-of-the-art biologicals, dewormers, prescriptions, and therapeutic essentials.";

export const pharmaCategories: PharmaCategory[] = [
  {
    id: "prescription-medicines",
    name: "Veterinary Prescription Medicines",
    description: "Prescription cardiovascular drugs, renal compounds, gastrointestinal therapies, and broad-spectrum antibiotics verified by registered companion pharmacists.",
    iconName: "Pill"
  },
  {
    id: "vaccines-biologicals",
    name: "Vaccines & Biologicals",
    description: "Strictly monitored cold-chain immunization stocks protecting against rabies, parvovirus, DHPP, and other critical pet pathogens.",
    iconName: "Syringe"
  },
  {
    id: "nutritional-supplements",
    name: "Nutritional Supplements",
    description: "Premium joint rejuvenators, omega fatty acids, multivitamin pastes, hepatic support, and digestive probiotics for wellness.",
    iconName: "Heart"
  },
  {
    id: "dewormers-preventive",
    name: "Dewormers & Preventive Care",
    description: "Broad-spectrum oral dewormers, spot-on treatments, tick/flea collars, and preventative products for comprehensive protection.",
    iconName: "Shield"
  },
  {
    id: "grooming-hygiene",
    name: "Grooming & Hygiene Products",
    description: "Clinical skin washes, antifungal shampoos, cerumen-dissolving ear cleansers, and hypoallergenic soothing barrier sprays.",
    iconName: "Droplet"
  },
  {
    id: "health-essentials",
    name: "Pet Health Essentials",
    description: "Everyday clinical care kits, sterile wound dressings, digital thermometers, recovery collars, and diagnostic strip tests.",
    iconName: "Briefcase"
  }
];
