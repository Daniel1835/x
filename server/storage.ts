import type { MC, InsertMC, Article, Review, InsertReview, Photographer, InsertPhotographer, Decorator, InsertDecorator, Sanggar, InsertSanggar } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getMCs(): Promise<MC[]>;
  getMC(id: string): Promise<MC | undefined>;
  createMC(mc: InsertMC): Promise<MC>;
  updateMC(id: string, mc: Partial<InsertMC>): Promise<MC | undefined>;
  deleteMC(id: string): Promise<boolean>;
  incrementMCViews(id: string): Promise<void>;
  getPhotographers(): Promise<Photographer[]>;
  getPhotographer(id: string): Promise<Photographer | undefined>;
  createPhotographer(photographer: InsertPhotographer): Promise<Photographer>;
  incrementPhotographerViews(id: string): Promise<void>;
  getDecorators(): Promise<Decorator[]>;
  getDecorator(id: string): Promise<Decorator | undefined>;
  createDecorator(decorator: InsertDecorator): Promise<Decorator>;
  incrementDecoratorViews(id: string): Promise<void>;
  getSanggars(): Promise<Sanggar[]>;
  getSanggar(id: string): Promise<Sanggar | undefined>;
  createSanggar(sanggar: InsertSanggar): Promise<Sanggar>;
  incrementSanggarViews(id: string): Promise<void>;
  getArticles(): Promise<Article[]>;
  getArticle(id: string): Promise<Article | undefined>;
  getReviews(mcId: string): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
}

const dummyMCs: MC[] = [
  {
    id: "mc-1",
    name: "Andi Rahman",
    whatsapp: "6281234567001",
    kecamatan: "Ujung Bulu",
    categories: ["Wedding"],
    photo: "/api/placeholder/mc1",
    description: "MC profesional dengan pengalaman lebih dari 5 tahun dalam menangani berbagai acara pernikahan di Bulukumba. Gaya membawakan acara yang elegan dan hangat, mampu mencairkan suasana dan membuat tamu merasa nyaman.",
    priceRange: "Rp 750.000 - Rp 1.500.000",
    videoPortfolio: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    portfolioImages: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&auto=format&fit=crop&q=60",
    ],
    socialMedia: {
      instagram: "andi.rahman.mc",
      tiktok: "@andirahmn",
    },
    availability: [
      { date: "2024-12-01", isBooked: false },
      { date: "2024-12-02", isBooked: true },
      { date: "2024-12-03", isBooked: false },
      { date: "2024-12-04", isBooked: false },
      { date: "2024-12-05", isBooked: true },
      { date: "2024-12-06", isBooked: false },
    ],
    viewCount: 156,
  },
  {
    id: "mc-2",
    name: "Sitti Ayu Hasna",
    whatsapp: "6281234567002",
    kecamatan: "Kajang",
    categories: ["Wisuda"],
    photo: "/api/placeholder/mc2",
    description: "Pembawa acara spesialis wisuda dengan pengalaman di berbagai kampus di Sulawesi Selatan. Memiliki suara yang merdu dan kemampuan public speaking yang excellent.",
    priceRange: "Rp 500.000 - Rp 1.000.000",
    portfolioImages: [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1627556704283-4fb792eb4399?w=400&auto=format&fit=crop&q=60",
    ],
    socialMedia: {
      instagram: "sitti.ayu.mc",
      facebook: "Sitti Ayu Hasna MC",
    },
    availability: [
      { date: "2024-12-01", isBooked: true },
      { date: "2024-12-02", isBooked: false },
      { date: "2024-12-03", isBooked: true },
      { date: "2024-12-04", isBooked: false },
      { date: "2024-12-05", isBooked: false },
      { date: "2024-12-06", isBooked: true },
    ],
    viewCount: 134,
  },
  {
    id: "mc-3",
    name: "Rijal Pratama",
    whatsapp: "6281234567003",
    kecamatan: "Bonto Bahari",
    categories: ["Ulang Tahun"],
    photo: "/api/placeholder/mc3",
    description: "MC yang energik dan kreatif, cocok untuk acara ulang tahun anak-anak hingga dewasa. Membawa keseruan dan tawa dalam setiap acara yang dibawakan.",
    priceRange: "Rp 400.000 - Rp 800.000",
    viewCount: 98,
  },
  {
    id: "mc-4",
    name: "Dewi Yunita",
    whatsapp: "6281234567004",
    kecamatan: "Herlang",
    categories: ["Formal"],
    photo: "/api/placeholder/mc4",
    description: "MC formal dan profesional untuk acara seminar, konferensi, dan gathering perusahaan. Berpengalaman dalam menangani acara dengan protokol ketat.",
    priceRange: "Rp 1.000.000 - Rp 2.500.000",
    viewCount: 112,
  },
  {
    id: "mc-5",
    name: "Nurdin Halim",
    whatsapp: "6281234567005",
    kecamatan: "Bulukumpa",
    categories: ["Tradisional"],
    photo: "/api/placeholder/mc5",
    description: "Ahli dalam membawakan acara adat Bugis-Makassar dengan sempurna. Menguasai protokol adat dan mampu menyampaikan dengan bahasa yang fasih.",
    priceRange: "Rp 600.000 - Rp 1.200.000",
    viewCount: 89,
  },
  {
    id: "mc-6",
    name: "Winda Sari",
    whatsapp: "6281234567006",
    kecamatan: "Ujung Loe",
    categories: ["Wedding", "Wisuda", "Ulang Tahun", "Formal", "Semua Acara"],
    photo: "/api/placeholder/mc6",
    description: "MC serba bisa yang dapat menangani berbagai jenis acara. Fleksibel, profesional, dan selalu memberikan penampilan terbaik di setiap kesempatan.",
    priceRange: "Rp 500.000 - Rp 1.500.000",
    viewCount: 201,
  },
];

const dummyArticles: Article[] = [
  {
    id: "article-1",
    title: "Tips Memilih MC Wedding yang Tepat untuk Acara Pernikahan Anda",
    excerpt: "Memilih MC untuk pernikahan adalah keputusan penting. Simak tips berikut untuk menemukan MC yang sesuai dengan visi acara Anda.",
    content: `
      <p>Pernikahan adalah momen sakral yang hanya terjadi sekali seumur hidup. Salah satu kunci kesuksesan acara pernikahan adalah memiliki MC (Master of Ceremony) yang handal. Berikut tips memilih MC wedding yang tepat:</p>
      
      <h2>1. Cek Portofolio dan Pengalaman</h2>
      <p>Pastikan MC yang Anda pilih memiliki pengalaman dalam membawakan acara pernikahan. Minta video atau dokumentasi dari acara-acara sebelumnya untuk melihat gaya dan kemampuan mereka.</p>
      
      <h2>2. Sesuaikan dengan Tema Acara</h2>
      <p>Setiap pernikahan memiliki tema yang berbeda. Pilih MC yang bisa menyesuaikan gaya bicara dan penampilan dengan konsep acara Anda, baik itu formal, semi-formal, atau casual.</p>
      
      <h2>3. Komunikasi yang Baik</h2>
      <p>MC yang baik adalah pendengar yang baik. Mereka harus bisa memahami keinginan Anda dan mengkomunikasikan setiap rundown acara dengan jelas.</p>
      
      <h2>4. Perhatikan Chemistry</h2>
      <p>Saat meeting pertama, perhatikan apakah Anda merasa nyaman berkomunikasi dengan MC tersebut. Chemistry yang baik akan membantu proses koordinasi berjalan lancar.</p>
      
      <h2>5. Tanyakan Paket dan Harga</h2>
      <p>Diskusikan detail paket layanan dan harga dengan jelas. Pastikan tidak ada biaya tersembunyi dan semua kebutuhan Anda tercakup dalam paket yang ditawarkan.</p>
    `,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=60",
    publishedAt: "2024-11-15T10:00:00Z",
  },
  {
    id: "article-2",
    title: "Kisaran Harga MC di Bulukumba: Panduan Lengkap 2024",
    excerpt: "Berapa biaya jasa MC di Bulukumba? Simak panduan lengkap kisaran harga MC untuk berbagai jenis acara di tahun 2024.",
    content: `
      <p>Memahami kisaran harga MC sangat penting dalam perencanaan anggaran acara Anda. Berikut panduan lengkap harga MC di Bulukumba tahun 2024:</p>
      
      <h2>MC Wedding</h2>
      <p>Untuk acara pernikahan, harga MC berkisar antara Rp 750.000 hingga Rp 2.500.000. Harga bervariasi tergantung pada pengalaman MC, durasi acara, dan lokasi venue.</p>
      
      <h2>MC Wisuda</h2>
      <p>Acara wisuda biasanya membutuhkan MC dengan harga Rp 500.000 - Rp 1.500.000. Harga dapat lebih tinggi untuk wisuda skala besar atau yang memerlukan bilingual MC.</p>
      
      <h2>MC Ulang Tahun</h2>
      <p>Untuk acara ulang tahun, harga MC relatif lebih terjangkau, mulai dari Rp 300.000 hingga Rp 800.000, tergantung kompleksitas acara.</p>
      
      <h2>MC Formal/Corporate</h2>
      <p>Acara formal seperti seminar atau gathering perusahaan memiliki range harga Rp 1.000.000 - Rp 3.000.000, mengingat tingkat profesionalisme yang dibutuhkan.</p>
      
      <h2>Faktor yang Mempengaruhi Harga</h2>
      <ul>
        <li>Pengalaman dan reputasi MC</li>
        <li>Durasi acara</li>
        <li>Lokasi venue</li>
        <li>Kompleksitas rundown</li>
        <li>Kebutuhan khusus (bilingual, dll)</li>
      </ul>
    `,
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&auto=format&fit=crop&q=60",
    publishedAt: "2024-11-10T10:00:00Z",
  },
  {
    id: "article-3",
    title: "5 Cara Membuat Acara Lebih Meriah dengan MC Profesional",
    excerpt: "Acara yang sukses membutuhkan MC yang tepat. Pelajari bagaimana MC profesional bisa membuat acara Anda lebih berkesan.",
    content: `
      <p>MC profesional memiliki peran krusial dalam membuat acara menjadi berkesan. Berikut 5 cara MC profesional membuat acara lebih meriah:</p>
      
      <h2>1. Membuka Acara dengan Energi</h2>
      <p>MC profesional tahu cara membuka acara dengan penuh energi yang tepat. Mereka menciptakan antusiasme yang menular ke seluruh hadirin.</p>
      
      <h2>2. Mengelola Waktu dengan Baik</h2>
      <p>Timing adalah segalanya. MC yang handal memastikan setiap sesi berjalan sesuai jadwal tanpa membuat tamu merasa terburu-buru atau bosan.</p>
      
      <h2>3. Interaksi dengan Tamu</h2>
      <p>MC profesional mampu melibatkan tamu dalam acara, menciptakan momen-momen interaktif yang membuat semua orang merasa menjadi bagian dari perayaan.</p>
      
      <h2>4. Menangani Situasi Tak Terduga</h2>
      <p>Acara tidak selalu berjalan sesuai rencana. MC berpengalaman bisa mengatasi kendala teknis atau situasi tak terduga dengan tenang dan profesional.</p>
      
      <h2>5. Menutup Acara dengan Memorable</h2>
      <p>Kesan akhir sama pentingnya dengan kesan pertama. MC profesional menutup acara dengan cara yang membuat tamu pulang dengan perasaan bahagia.</p>
    `,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60",
    publishedAt: "2024-11-05T10:00:00Z",
  },
];

const dummyPhotographers: Photographer[] = [
  {
    id: "photographer-1",
    name: "Budi Santoso",
    whatsapp: "6281234567101",
    kecamatan: "Ujung Bulu",
    types: ["Wedding"],
    photo: "/api/placeholder/photo1",
    description: "Fotografer profesional spesialis pernikahan dengan pengalaman 8 tahun. Menghasilkan foto berkualitas tinggi dengan editing modern.",
    priceRange: "Rp 2.000.000 - Rp 5.000.000",
    portfolioImages: [
      "https://images.unsplash.com/photo-1502031826978-92099155ee16?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&auto=format&fit=crop&q=60",
    ],
    socialMedia: {
      instagram: "budi.photography",
      facebook: "Budi Santoso Photography",
    },
    availability: [
      { date: "2024-12-01", isBooked: false },
      { date: "2024-12-02", isBooked: false },
      { date: "2024-12-03", isBooked: true },
      { date: "2024-12-04", isBooked: false },
      { date: "2024-12-05", isBooked: false },
      { date: "2024-12-06", isBooked: true },
    ],
    viewCount: 145,
  },
  {
    id: "photographer-2",
    name: "Siti Nurhaliza",
    whatsapp: "6281234567102",
    kecamatan: "Kajang",
    types: ["Potrait", "Event"],
    photo: "/api/placeholder/photo2",
    description: "Fotografer yang ahli dalam menangkap momen berharga dengan perspektif artistik. Spesialis dalam potrait dan dokumentasi acara.",
    priceRange: "Rp 1.500.000 - Rp 3.500.000",
    portfolioImages: [
      "https://images.unsplash.com/photo-1502299250894-fbb2533a762f?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1532712323033-b1a663e51e18?w=400&auto=format&fit=crop&q=60",
    ],
    socialMedia: {
      instagram: "siti.nurhaliza.photo",
      tiktok: "@sitiphoto",
    },
    availability: [
      { date: "2024-12-01", isBooked: true },
      { date: "2024-12-02", isBooked: false },
      { date: "2024-12-03", isBooked: false },
      { date: "2024-12-04", isBooked: true },
      { date: "2024-12-05", isBooked: false },
      { date: "2024-12-06", isBooked: false },
    ],
    viewCount: 112,
  },
  {
    id: "photographer-3",
    name: "Rudi Hermawan",
    whatsapp: "6281234567103",
    kecamatan: "Herlang",
    types: ["Product", "Event"],
    photo: "/api/placeholder/photo3",
    description: "Fotografer berpengalaman dalam fotografi produk dan dokumentasi event. Menggunakan peralatan profesional untuk hasil maksimal.",
    priceRange: "Rp 1.000.000 - Rp 2.500.000",
    portfolioImages: [
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=400&auto=format&fit=crop&q=60",
    ],
    socialMedia: {
      instagram: "rudi.photo",
    },
    availability: [
      { date: "2024-12-01", isBooked: false },
      { date: "2024-12-02", isBooked: true },
      { date: "2024-12-03", isBooked: false },
      { date: "2024-12-04", isBooked: false },
      { date: "2024-12-05", isBooked: true },
      { date: "2024-12-06", isBooked: false },
    ],
    viewCount: 98,
  },
];

const dummyDecorators: Decorator[] = [
  {
    id: "decorator-1",
    name: "Ira Decorasi",
    whatsapp: "6281234567201",
    kecamatan: "Ujung Bulu",
    types: ["Wedding"],
    photo: "/api/placeholder/decorator1",
    description: "Dekorator profesional dengan spesialisasi pernikahan modern. Menciptakan dekorasi elegan dan Instagram-worthy untuk momen spesial Anda.",
    priceRange: "Rp 3.000.000 - Rp 8.000.000",
    portfolioImages: [
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=400&auto=format&fit=crop&q=60",
    ],
    socialMedia: {
      instagram: "ira.decorasi",
    },
    availability: [
      { date: "2024-12-01", isBooked: false },
      { date: "2024-12-02", isBooked: false },
      { date: "2024-12-03", isBooked: true },
      { date: "2024-12-04", isBooked: false },
      { date: "2024-12-05", isBooked: false },
      { date: "2024-12-06", isBooked: true },
    ],
    viewCount: 87,
  },
  {
    id: "decorator-2",
    name: "Toko Bunga Bulukumba",
    whatsapp: "6281234567202",
    kecamatan: "Kajang",
    types: ["Ulang Tahun", "Acara Perusahaan"],
    photo: "/api/placeholder/decorator2",
    description: "Toko bunga dengan layanan dekorasi untuk berbagai acara. Menggunakan bunga segar berkualitas tinggi dan desain yang kreatif.",
    priceRange: "Rp 1.500.000 - Rp 4.000.000",
    portfolioImages: [
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1487577671167-fb9eb9a1ceb5?w=400&auto=format&fit=crop&q=60",
    ],
    socialMedia: {
      instagram: "tokobunga.bulukumba",
      facebook: "Toko Bunga Bulukumba",
    },
    availability: [
      { date: "2024-12-01", isBooked: true },
      { date: "2024-12-02", isBooked: false },
      { date: "2024-12-03", isBooked: false },
      { date: "2024-12-04", isBooked: true },
      { date: "2024-12-05", isBooked: false },
      { date: "2024-12-06", isBooked: false },
    ],
    viewCount: 92,
  },
];

const dummySanggars: Sanggar[] = [
  {
    id: "sanggar-1",
    name: "Sanggar Tari Bugis",
    whatsapp: "6281234567301",
    kecamatan: "Bulukumpa",
    types: ["Tari Tradisional"],
    photo: "/api/placeholder/sanggar1",
    description: "Sanggar seni yang melestarikan dan mengajarkan tari tradisional Bugis. Tersedia untuk pertunjukan dan pelatihan seni.",
    priceRange: "Rp 2.000.000 - Rp 5.000.000",
    portfolioImages: [
      "https://images.unsplash.com/photo-1516027271669-d5a82a0adf39?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1505484496716-04a0b41d0fd9?w=400&auto=format&fit=crop&q=60",
    ],
    socialMedia: {
      instagram: "sanggar.tari.bugis",
      facebook: "Sanggar Tari Bugis",
    },
    availability: [
      { date: "2024-12-01", isBooked: false },
      { date: "2024-12-02", isBooked: false },
      { date: "2024-12-03", isBooked: true },
      { date: "2024-12-04", isBooked: false },
      { date: "2024-12-05", isBooked: false },
      { date: "2024-12-06", isBooked: true },
    ],
    viewCount: 76,
  },
  {
    id: "sanggar-2",
    name: "Sanggar Musik Tradisional",
    whatsapp: "6281234567302",
    kecamatan: "Ujung Loe",
    types: ["Musik Tradisional"],
    photo: "/api/placeholder/sanggar2",
    description: "Sanggar musik yang menyediakan musisi tradisional untuk berbagai acara. Menampilkan instrumen tradisional Sulawesi Selatan.",
    priceRange: "Rp 1.500.000 - Rp 4.000.000",
    portfolioImages: [
      "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&auto=format&fit=crop&q=60",
    ],
    socialMedia: {
      instagram: "musiktradisional.bulukumba",
    },
    availability: [
      { date: "2024-12-01", isBooked: true },
      { date: "2024-12-02", isBooked: false },
      { date: "2024-12-03", isBooked: false },
      { date: "2024-12-04", isBooked: true },
      { date: "2024-12-05", isBooked: false },
      { date: "2024-12-06", isBooked: false },
    ],
    viewCount: 64,
  },
];

export class MemStorage implements IStorage {
  private mcs: Map<string, MC>;
  private photographers: Map<string, Photographer>;
  private decorators: Map<string, Decorator>;
  private sanggars: Map<string, Sanggar>;
  private articles: Map<string, Article>;
  private reviews: Map<string, Review[]>;

  constructor() {
    this.mcs = new Map(dummyMCs.map((mc) => [mc.id, mc]));
    this.photographers = new Map(dummyPhotographers.map((p) => [p.id, p]));
    this.decorators = new Map(dummyDecorators.map((d) => [d.id, d]));
    this.sanggars = new Map(dummySanggars.map((s) => [s.id, s]));
    this.articles = new Map(dummyArticles.map((article) => [article.id, article]));
    this.reviews = new Map();
  }

  async getMCs(): Promise<MC[]> {
    return Array.from(this.mcs.values());
  }

  async getMC(id: string): Promise<MC | undefined> {
    return this.mcs.get(id);
  }

  async createMC(insertMc: InsertMC): Promise<MC> {
    const id = `mc-${randomUUID()}`;
    const mc: MC = { ...insertMc, id, viewCount: 0 };
    this.mcs.set(id, mc);
    return mc;
  }

  async incrementMCViews(id: string): Promise<void> {
    const mc = this.mcs.get(id);
    if (mc) {
      mc.viewCount++;
      this.mcs.set(id, mc);
    }
  }

  async updateMC(id: string, updateData: Partial<InsertMC>): Promise<MC | undefined> {
    const mc = this.mcs.get(id);
    if (!mc) return undefined;
    
    const updatedMC: MC = {
      ...mc,
      ...updateData,
      id: mc.id,
      viewCount: mc.viewCount,
    };
    this.mcs.set(id, updatedMC);
    return updatedMC;
  }

  async deleteMC(id: string): Promise<boolean> {
    return this.mcs.delete(id);
  }

  async getArticles(): Promise<Article[]> {
    return Array.from(this.articles.values());
  }

  async getArticle(id: string): Promise<Article | undefined> {
    return this.articles.get(id);
  }

  async getReviews(mcId: string): Promise<Review[]> {
    return this.reviews.get(mcId) || [];
  }

  async getPhotographers(): Promise<Photographer[]> {
    return Array.from(this.photographers.values());
  }

  async getPhotographer(id: string): Promise<Photographer | undefined> {
    return this.photographers.get(id);
  }

  async createPhotographer(insertPhotographer: InsertPhotographer): Promise<Photographer> {
    const id = `photographer-${randomUUID()}`;
    const photographer: Photographer = { ...insertPhotographer, id, viewCount: 0 };
    this.photographers.set(id, photographer);
    return photographer;
  }

  async incrementPhotographerViews(id: string): Promise<void> {
    const photographer = this.photographers.get(id);
    if (photographer) {
      photographer.viewCount++;
      this.photographers.set(id, photographer);
    }
  }

  async getDecorators(): Promise<Decorator[]> {
    return Array.from(this.decorators.values());
  }

  async getDecorator(id: string): Promise<Decorator | undefined> {
    return this.decorators.get(id);
  }

  async createDecorator(insertDecorator: InsertDecorator): Promise<Decorator> {
    const id = `decorator-${randomUUID()}`;
    const decorator: Decorator = { ...insertDecorator, id, viewCount: 0 };
    this.decorators.set(id, decorator);
    return decorator;
  }

  async incrementDecoratorViews(id: string): Promise<void> {
    const decorator = this.decorators.get(id);
    if (decorator) {
      decorator.viewCount++;
      this.decorators.set(id, decorator);
    }
  }

  async getSanggars(): Promise<Sanggar[]> {
    return Array.from(this.sanggars.values());
  }

  async getSanggar(id: string): Promise<Sanggar | undefined> {
    return this.sanggars.get(id);
  }

  async createSanggar(insertSanggar: InsertSanggar): Promise<Sanggar> {
    const id = `sanggar-${randomUUID()}`;
    const sanggar: Sanggar = { ...insertSanggar, id, viewCount: 0 };
    this.sanggars.set(id, sanggar);
    return sanggar;
  }

  async incrementSanggarViews(id: string): Promise<void> {
    const sanggar = this.sanggars.get(id);
    if (sanggar) {
      sanggar.viewCount++;
      this.sanggars.set(id, sanggar);
    }
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = `review-${randomUUID()}`;
    const review: Review = {
      ...insertReview,
      id,
      createdAt: new Date().toISOString(),
    };
    
    const mcReviews = this.reviews.get(insertReview.mcId) || [];
    mcReviews.push(review);
    this.reviews.set(insertReview.mcId, mcReviews);
    
    return review;
  }
}

export const storage = new MemStorage();
