export interface ContactInfo {
  title: string;
  subtitle: string;
  addressLines: string[];
  phone: string;
  workingHours: string;
  rating: number;
  reviewCount: number;
  website: string;
  googleMapsEmbedUrl: string;
  actionLinks: {
    call: string;
    whatsapp: string;
    directions: string;
    website: string;
  };
}

export const buddyKittyContactData: ContactInfo = {
  title: "Contact & Location",
  subtitle: "Visit Buddy & Kitty – Multispeciality Pet Hospital and Grooming or get in touch with our team for appointments, emergency care, pet grooming, and veterinary consultations.",
  addressLines: [
    "100 Feet Road, Near Kariyanna Building",
    "Vinoba Nagar, Shivamogga, Karnataka 577204"
  ],
  phone: "+91 83108 81168",
  workingHours: "Monday – Saturday: 10:00 AM – 8:30 PM\nSunday: 10:00 AM – 12:00 PM",
  rating: 4.8,
  reviewCount: 247,
  website: "www.buddyandkitty.com",
  googleMapsEmbedUrl: "https://maps.google.com/maps?q=Buddy%20%26%20Kitty%20–%20Multispeciality%20Pet%20Hospital%20and%20Grooming,%20Shivamogga,%20Karnataka&t=&z=15&ie=UTF8&iwloc=&output=embed",
  actionLinks: {
    call: "tel:+918310881168",
    whatsapp: "https://wa.me/918310881168",
    directions: "https://maps.app.goo.gl/K3VJkNzQ4meeELsX8",
    website: "https://www.buddyandkitty.com/"
  }
};
