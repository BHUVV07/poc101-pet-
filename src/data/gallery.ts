export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  category: "retail" | "hospital" | "wholesale" | "logistics";
}

export const galleryData: GalleryImage[] = [
  {
    id: "gal-1",
    url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800",
    caption: "Buddy & Kitty Hospital - Advanced sterile surgery room",
    category: "hospital"
  },
  {
    id: "gal-2",
    url: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800",
    caption: "Manasa Vet Pharma - Monitored companion nutrition stock",
    category: "retail"
  },
  {
    id: "gal-3",
    url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    caption: "Apothecary Wholesale - Sterile logistics diagnostic kits load",
    category: "wholesale"
  },
  {
    id: "gal-4",
    url: "https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?auto=format&fit=crop&q=80&w=800",
    caption: "Petstep Logistics - Cold-chain refrigeration units load",
    category: "logistics"
  },
  {
    id: "gal-5",
    url: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=800",
    caption: "Police Chowki Pharmacy - Medication dispense counter",
    category: "retail"
  },
  {
    id: "gal-6",
    url: "https://images.unsplash.com/photo-1541599540903-216a46ca1ad0?auto=format&fit=crop&q=80&w=800",
    caption: "Buddy & Kitty Hospital - Veterinarian triage console room",
    category: "hospital"
  }
];
