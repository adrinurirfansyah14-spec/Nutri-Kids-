/**
 * ==============================================================================
 * MOCK DATA SERVICES
 * Folder: src/services/mockData.js
 * 
 * Penjelasan untuk Pemula:
 * File ini berisi data tiruan (dummy data) yang seolah-olah diambil dari server / database.
 * Di masa depan, data ini bisa Anda ganti dengan panggilan fetch() atau axios ke Backend API!
 * ==============================================================================
 */

export const mockInvestors = [
  {
    id: 1,
    name: "Nusantara Ventures",
    category: "Venture Capital",
    ticketSize: "Rp 500 Juta - Rp 2 Miliar",
    sector: "Fintech & AI",
    portfolioCount: 24,
    description: "Fokus berinvestasi pada startup tahap awal (Seed Stage) yang memecahkan masalah keuangan inklusif dan efisiensi teknologi.",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
    isVerified: true
  },
  {
    id: 2,
    name: "Artha Angel Network",
    category: "Angel Investor",
    ticketSize: "Rp 100 Juta - Rp 500 Juta",
    sector: "Agritech & IoT",
    portfolioCount: 12,
    description: "Jaringan investor malaikat yang aktif mendampingi founder muda dalam inovasi rantai pasok pertanian dan IoT modern.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    isVerified: true
  },
  {
    id: 3,
    name: "Surya Green Capital",
    category: "Impact Investor",
    ticketSize: "Rp 1 Miliar - Rp 5 Miliar",
    sector: "Clean Energy & ESG",
    portfolioCount: 18,
    description: "Mendanai inisiatif ramah lingkungan, energi terbarukan, dan ekonomi sirkular yang memiliki dampak sosial nyata.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    isVerified: false
  },
  {
    id: 4,
    name: "Karya Mandiri Capital",
    category: "Corporate VC",
    ticketSize: "Rp 2 Miliar - Rp 10 Miliar",
    sector: "Logistik & E-commerce",
    portfolioCount: 35,
    description: "Mendukung percepatan pertumbuhan startup logistik B2B dan infrastruktur digital untuk UMKM se-Indonesia.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    isVerified: true
  }
];

export const platformStats = [
  { label: "Total Investor Terdaftar", value: "150+" },
  { label: "Pendanaan Tersalurkan", value: "Rp 45 Miliar" },
  { label: "Startup Terhubung", value: "320+" },
  { label: "Tingkat Keberhasilan Match", value: "94%" }
];
