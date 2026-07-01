export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  detailedInfo: string;
  iconName: string; // Used to pick icons dynamically in display components
}

export const servicesData: ServiceItem[] = [
  {
    id: "consultation",
    name: "Veterinary Consultation",
    description: "Expert diagnostic analysis and companion assessments by board-certified veterinarians.",
    detailedInfo: "Our clinical consultation division offers detailed physical examinations, triage assessments, and therapeutic prescriptions for domestic companion animals. Scheduled sessions include comprehensive health score audits, nutritional profiling, and customized wellness roadmaps.",
    iconName: "Stethoscope"
  },
  {
    id: "vaccination",
    name: "Vaccination Programs",
    description: "Systematic immunization plans backed by reliable medical cold-chain logistics.",
    detailedInfo: "We maintain certified immunization registry compliance. All core canine and feline vaccines (rabies, DHPP, FVRCP) are transported and stored under strict temperature controls (+2°C to +8°C) to ensure exact biological potency and clinical safety.",
    iconName: "ShieldCheck"
  },
  {
    id: "diagnostics",
    name: "Advanced Diagnostics",
    description: "In-house lab screens, blood chemistry profiles, and high-resolution imaging.",
    detailedInfo: "Our hospital includes high-resolution ultrasound, digital radiology, and complete hematological screening tools. These enable rapid cellular evaluations, allergen mapping, and early screening for renal or metabolic conditions.",
    iconName: "Activity"
  },
  {
    id: "surgery",
    name: "Surgical Care",
    description: "Advanced sterile surgery theatres for soft-tissue and orthopedic procedures.",
    detailedInfo: "Led by senior veterinary surgeons, our surgical division executes sterile procedures including neutering, abdominal surgeries, orthopedic stabilization, and post-operative tissue management. Constant cardiopulmonary monitoring is maintained throughout.",
    iconName: "Heart"
  },
  {
    id: "grooming",
    name: "Pet Styling & Hygiene",
    description: "Clinical skin therapy, grooming, and sanitary washes using botanical elixirs.",
    detailedInfo: "More than standard washing, our pet styling division addresses dermatological health. Using pH-balanced, natural botanical elixirs, our stylists handle medicated baths, dematting, sanitary trims, and claw treatments under sterile parameters.",
    iconName: "User"
  },
  {
    id: "pharmacy",
    name: "Specialized Apothecary",
    description: "Direct access to companion therapeutics, cardiac medicines, and vaccines.",
    detailedInfo: "Our retail pharmacies stock an extensive list of specialized veterinary drugs, gastrointestinal compounds, cardiac therapies, and diagnostic consumables. All prescriptions are verified by licensed companion-care pharmacists.",
    iconName: "Clock"
  },
  {
    id: "emergency",
    name: "Emergency Stabilization",
    description: "Trauma control, medical fluid therapy, and critical response daily support.",
    detailedInfo: "During operational hours, our critical care unit stands ready to stabilize poisonings, acute trauma, respiratory issues, and severe illnesses. We provide high-fidelity fluid therapy, supplemental oxygen, and shock management.",
    iconName: "Activity"
  },
  {
    id: "wellness",
    name: "Geriatric & Wellness Audits",
    description: "Structured wellness checkups tailored to your companion's life stage.",
    detailedInfo: "Preventative checks are crucial as pets mature. We conduct detailed life-stage audits, screening joints for mobility degradation, testing blood parameters for early organ stress, and advising on diet modifications for senior pets.",
    iconName: "Calendar"
  }
];
