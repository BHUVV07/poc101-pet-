export interface CompanyDetails {
  name: string;
  tagline: string;
  globalEmail: string;
  globalPhone: string;
  headquarters: string;
  aboutOverview: string;
  mission: string;
  vision: string;
  values: { title: string; description: string }[];
}

export const companyDetails: CompanyDetails = {
  name: "Manasa Vet Pharma",
  tagline: "Precision Veterinary Pharmaceuticals & Companion Medical Care",
  globalEmail: "contact@manasavetpharma.com",
  globalPhone: "+91 98765 43210",
  headquarters: "GSKM Road, Shivamogga, Karnataka, India",
  aboutOverview: "Manasa Vet Pharma is the leading animal healthcare network in Shivamogga, managing integrated retail pharmacies, a state-of-the-art veterinary hospital, bulk apothecary distribution, and reliable cold-chain vaccine logistics. We are committed to supplying certified diagnostics and therapeutic treatments for your loyal companions and professional veterinary clinics.",
  mission: "To advance the standard of veterinary healthcare by delivering certified therapeutic solutions, clinical excellence, and high-fidelity cold-chain logistics across the region.",
  vision: "To be the primary trusted ecosystem for clinical diagnostics, specialized pet pharmaceuticals, and wholesale veterinarian supplies.",
  values: [
    {
      title: "Clinical Accuracy",
      description: "Maintaining strict therapeutic safety, diagnostic integrity, and professional standards across all pharmacy and hospital facilities."
    },
    {
      title: "Logistics Fidelity",
      description: "Ensuring exact vaccine potency and medication stability through specialized medical refrigeration and supply chain infrastructure."
    },
    {
      title: "Compassionate Care",
      description: "Providing companion animal styling, diagnostics, soft-tissue surgeries, and recovery guidance under expert veterinarian supervision."
    }
  ]
};
