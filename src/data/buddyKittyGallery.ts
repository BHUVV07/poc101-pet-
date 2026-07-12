export interface GalleryItem {
  id: string;
  image: string;
  title: string;
  description: string;
}

export const buddyKittyGalleryTitle = "Hospital Gallery";

export const buddyKittyGallerySubtitle = "Take a virtual tour of our modern facilities and experience our world-class veterinary care.";

export const buddyKittyGalleryItems: GalleryItem[] = [
  {
    id: "hospital-exterior",
    image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&q=80&w=1200",
    title: "Hospital Exterior",
    description: "Modern facility exterior and dedicated visitor parking slots."
  },
  {
    id: "reception",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200",
    title: "Reception",
    description: "Our welcoming reception desk and comfortable client waiting area."
  },
  {
    id: "doctor-consultation-room",
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=1200",
    title: "Doctor Consultation Room",
    description: "Equipped for comprehensive primary exams and consultation."
  },
  {
    id: "treatment-area",
    image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=1200",
    title: "Treatment Area",
    description: "Central triage and treatment desk for routine preparation."
  },
  {
    id: "laboratory",
    image: "https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?auto=format&fit=crop&q=80&w=1200",
    title: "Laboratory",
    description: "In-house advanced diagnostic blood analyzers and microscopes."
  },
  {
    id: "operation-theatre",
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80&w=1200",
    title: "Operation Theatre",
    description: "Sterile surgical suite for soft-tissue and orthopedic procedures."
  },
  {
    id: "pet-grooming",
    image: "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=1200",
    title: "Pet Grooming",
    description: "Dedicated hydrotherapy and styling stations for therapeutic grooming."
  },
  {
    id: "recovery-area",
    image: "https://images.unsplash.com/photo-1541599540903-216a46ca1ad0?auto=format&fit=crop&q=80&w=1200",
    title: "Recovery Area",
    description: "Warm, temperature-controlled enclosures for post-operative recovery."
  }
];
