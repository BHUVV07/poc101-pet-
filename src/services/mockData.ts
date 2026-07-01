import { Blog, Banner, Branch } from '../types';

export const MOCK_BLOGS: Blog[] = [
  {
    "id": "blog-1",
    "title": "The Art of Veterinary Medicine: A Modern Guide",
    "slug": "art-of-veterinary-medicine",
    "summary": "Explore the fundamental principles of clinical pet health, focusing on precision pharmacy, vaccine schedules, and diagnostic care.",
    "content": "Veterinary medicine requires an understanding of clinical precision. Providing your companion with a healthy, vibrant life starts with systematic diagnostic monitoring.\n\n    ### 1. Precision Pharmaceutical Care\n    Always ensure medications are sourced from verified chains maintaining strict thermal profiles. Vaccine integrity depends directly on cold-chain logistics.\n    \n    ### 2. Routine Diagnostic Screens\n    Early detection of organ stress (kidney and liver function) is key to managing geriatric symptoms in dogs and cats.\n    \n    ### 3. Therapeutic Nutrition\n    Prescription diets differ significantly from retail kibble. Incorporating veterinary-directed specific low-glycemic or organic proteins under clinical advisement can prevent chronic digestive disease.",
    "featuredImage": "https://images.unsplash.com/photo-1541599540903-216a46ca1ad0?auto=format&fit=crop&q=80&w=800",
    "authorId": "auth-1",
    "authorName": "Dr. Evelyn Sterling, DVM",
    "isPublished": true,
    "publishedAt": "2026-06-08T07:24:10.021Z",
    "createdAt": "2026-06-08T07:24:10.021Z",
    "updatedAt": "2026-06-08T07:24:10.021Z"
  },
  {
    "id": "blog-2",
    "title": "Understanding Pet Allergies & Immunotherapy",
    "slug": "understanding-pet-allergies-immunotherapy",
    "summary": "How to manage chronic hot spots, seasonal pollen allergies, and clinical immunotherapy treatments for household companion pets.",
    "content": "Chronic itching and hot spots are often secondary symptoms of underlying allergen sensitivities.\n\n    ### Environmental Triggers\n    Pollen, house dust mites, and synthetic chemical exposure can trigger severe dermatitis. Keeping a clean, botanically washed space helps mitigate these exposures.\n    \n    ### Clinical Allergen Panels\n    A standard DVM process includes blood or saliva antibody panels to narrow down the specific pollen or protein trigger.",
    "featuredImage": "https://images.unsplash.com/photo-1513360309081-36f20c3803db?auto=format&fit=crop&q=80&w=800",
    "authorId": "auth-1",
    "authorName": "Dr. Ramesh Kumar, DVM",
    "isPublished": true,
    "publishedAt": "2026-06-08T07:24:10.021Z",
    "createdAt": "2026-06-08T07:24:10.021Z",
    "updatedAt": "2026-06-08T07:24:10.021Z"
  }
];

export const MOCK_BANNERS: Banner[] = [
  {
    "id": "banner-1",
    "title": "Veterinary Pharmaceuticals & Wholesale Supplies",
    "subtitle": "Direct distribution hub supplying certified clinics, pharmacies, and veterinary care centers.",
    "imageUrl": "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=1200",
    "linkUrl": "/wholesale",
    "isActive": true,
    "displayOrder": 1,
    "createdAt": "2026-06-08T07:24:10.021Z"
  },
  {
    "id": "banner-2",
    "title": "Compassionate Multi-Speciality Vet Hospital",
    "subtitle": "Schedule virtual consultations or check-in at Buddy & Kitty Hospital on 100 Ft Road.",
    "imageUrl": "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=1200",
    "linkUrl": "/consultation",
    "isActive": true,
    "displayOrder": 2,
    "createdAt": "2026-06-08T07:24:10.021Z"
  }
];

export const MOCK_BRANCHES: Branch[] = [
  {
    "id": "garden-area",
    "name": "Garden Area Pharmacy",
    "slug": "garden-area",
    "type": "retail",
    "address": "Garden Area Main Road, Shivamogga, KA",
    "phone": "+919876543211",
    "whatsappNumber": "+919876543211",
    "upiId": "manasavet.garden@ybl",
    "bankName": "HDFC Bank Ltd",
    "accountNumber": "50200062391032",
    "ifscCode": "HDFC0000104",
    "accountName": "Manasa Vet Pharma Garden Area",
    "createdAt": "2026-06-08T07:24:10.021Z"
  },
  {
    "id": "police-chowki",
    "name": "Police Chowki Pharmacy",
    "slug": "police-chowki",
    "type": "retail",
    "address": "Police Chowki Junction, Shivamogga, KA",
    "phone": "+919876543212",
    "whatsappNumber": "+919876543212",
    "upiId": "manasavet.chowki@ybl",
    "bankName": "ICICI Bank Ltd",
    "accountNumber": "901239084712",
    "ifscCode": "ICIC0000204",
    "accountName": "Manasa Vet Pharma Police Chowki",
    "createdAt": "2026-06-08T07:24:10.021Z"
  },
  {
    "id": "buddy-kitty",
    "name": "Buddy & Kitty Multi Speciality Pet Hospital",
    "slug": "buddy-kitty",
    "type": "hospital",
    "address": "100 Ft Road near Kariyanna Building, Shivamogga, KA",
    "phone": "+919876543213",
    "whatsappNumber": "+919876543213",
    "upiId": "buddykitty@ybl",
    "bankName": "Axis Bank Ltd",
    "accountNumber": "49012384729103",
    "ifscCode": "UTIB0000456",
    "accountName": "Buddy Kitty Hospital",
    "createdAt": "2026-06-08T07:24:10.021Z"
  },
  {
    "id": "wholesale",
    "name": "Veterinary Wholesale Division",
    "slug": "wholesale",
    "type": "wholesale",
    "address": "Old Barline Road near Kote, Shivamogga, KA",
    "phone": "+919876543214",
    "whatsappNumber": "+919876543214",
    "upiId": "manasavet.wholesale@ybl",
    "bankName": "HDFC Bank Ltd",
    "accountNumber": "50200062391222",
    "ifscCode": "HDFC0000104",
    "accountName": "Manasa Vet Pharma Wholesale",
    "createdAt": "2026-06-08T07:24:10.021Z"
  },
  {
    "id": "petstep",
    "name": "Petstep Integrated Service Pvt. Ltd. Distribution Division",
    "slug": "petstep",
    "type": "distribution",
    "address": "GSKM Road beside Royal Orchid Hotel, Shivamogga, KA",
    "phone": "+919876543215",
    "whatsappNumber": "+919876543215",
    "upiId": "petstep@ybl",
    "bankName": "HDFC Bank Ltd",
    "accountNumber": "50200062391333",
    "ifscCode": "HDFC0000104",
    "accountName": "Petstep Integrated Service Pvt Ltd",
    "createdAt": "2026-06-08T07:24:10.021Z"
  }
];
