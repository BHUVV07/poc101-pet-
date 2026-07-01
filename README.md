# 🧪 Manasa Vet Pharma — Companion Health & Veterinary Logistics Ecosystem

**Manasa Vet Pharma** is a high-performance Next.js corporate informational website representing an integrated network of physical veterinary locations, specialty hospitals, B2B apothecary wholesale, and medical supply chain logistics across Shivamogga, Karnataka, India.

---

## 🏢 Our Ecosystem & Divisions

The website presents four key business divisions:

1. **Retail Pharmacies**:
   - Flagship outlets located at **Garden Area** and **Police Chowki**, Shivamogga.
   - Provides instant availability of companion diagnostics, skin care elixirs, specific cardiac/renal preparations, and clinical feeds.
2. **Buddy & Kitty Pet Hospital**:
   - State-of-the-art multi-speciality veterinary facility located at **100 Ft Road**, Shivamogga.
   - Offers digital radiography, laboratory diagnostics, sterile soft-tissue surgeries, and recovery guidance.
3. **B2B Apothecary Wholesale**:
   - Regional B2B pharmaceutical depot located at **Old Barline Road (near Kote)**.
   - Supplies registered veterinary clinics and trade partners with bulk pharmaceuticals, medical systems, and diagnostic kits.
4. **Petstep Logistics Network**:
   - Cold-chain distribution network located at **GSKM Road (beside Royal Orchid Hotel)**.
   - Manages temperature-controlled transportation (+2°C to +8°C) for vaccines and biologicals.

---

## 🛠️ Architecture & Technology Stack

The project has been refactored into a **fully static, informational website** to ensure speed, SEO optimization, and ease of maintenance:

* **Static Data Layer (`src/data/`)**: All business content is isolated from presentation components:
  - `company.ts`: Corporate values, mission, and global contact details.
  - `divisions.ts`: Branch locations, address details, hours, maps, services, and galleries.
  - `services.ts`: Clinic capabilities directory.
  - `products.ts`: Informational catalog of medicine and supplement categories.
  - `gallery.ts`: Shared visual media records.
* **Next.js Dynamic Segments**: Uses `/divisions/[slug]` App Router dynamic rendering to serve all division pages from a single template.
* **Frameworks**: Next.js 16.2.6 (Turbopack) & React 19.
* **Styles & Motion**: Tailwind CSS v4, PostCSS, Framer Motion (for premium animations).
* **Decoupled Backend**: Stripped of active databases (Supabase), Zustand global stores, dynamic auth checks, and admin dashboard panels for flat-file generation.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js installed (v18+ recommended).

### Installation

Install the project dependencies:
```bash
npm install
```

### Running the Development Server

Start the local development server with Turbopack:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

Compile a clean, static production build of the application:
```bash
npm run build
```
