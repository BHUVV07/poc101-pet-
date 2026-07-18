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
    description: "Prescription cardiovascular drugs, renal compounds, gastrointestinal therapies, and broad-spectrum antibiotics.",
    iconName: "Pill"
  },
  {
    id: "vaccines-biologicals",
    name: "Vaccines & Biologicals",
    description: "Strictly monitored cold-chain immunization stocks protecting against rabies, parvovirus, and other critical pet pathogens.",
    iconName: "Syringe"
  },
  {
    id: "nutritional-supplements",
    name: "Nutritional Supplements",
    description: "Premium joint rejuvenators, omega fatty acids, multivitamin pastes, hepatic support, and digestive probiotics.",
    iconName: "Heart"
  },
  {
    id: "dewormers-preventive",
    name: "Dewormers & Preventive Care",
    description: "Broad-spectrum oral dewormers, spot-on treatments, tick/flea collars, and comprehensive preventive care.",
    iconName: "Shield"
  },
  {
    id: "wound-care",
    name: "Wound Care & Recovery",
    description: "Professional wound management and recovery products to support faster healing and post-operative care.",
    iconName: "Droplet"
  },
  {
    id: "health-essentials",
    name: "Pet Health Essentials",
    description: "Everyday clinical care kits, sterile dressings, digital thermometers, recovery collars, and diagnostic strip tests.",
    iconName: "Briefcase"
  }
];
