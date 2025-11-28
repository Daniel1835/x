import { z } from "zod";

export const SERVICE_CATEGORIES = [
  "Wedding",
  "Wisuda", 
  "Ulang Tahun",
  "Formal",
  "Tradisional",
  "Semua Acara",
] as const;

export const KECAMATAN_LIST = [
  "Ujung Bulu",
  "Ujung Loe",
  "Kajang",
  "Herlang",
  "Bonto Bahari",
  "Rilau Ale",
  "Masamba",
  "Bulukumpa",
] as const;

export type ServiceCategory = typeof SERVICE_CATEGORIES[number];
export type Kecamatan = typeof KECAMATAN_LIST[number];

export const mcSchema = z.object({
  id: z.string(),
  name: z.string(),
  whatsapp: z.string(),
  kecamatan: z.enum(KECAMATAN_LIST),
  categories: z.array(z.enum(SERVICE_CATEGORIES)),
  photo: z.string(),
  description: z.string(),
  priceRange: z.string().optional(),
  videoPortfolio: z.string().optional(),
  portfolioImages: z.array(z.string()).optional(),
  socialMedia: z.object({
    instagram: z.string().optional(),
    facebook: z.string().optional(),
    tiktok: z.string().optional(),
  }).optional(),
  availability: z.array(z.object({
    date: z.string(),
    isBooked: z.boolean(),
  })).optional(),
  viewCount: z.number().default(0),
});

export const insertMcSchema = mcSchema.omit({ id: true, viewCount: true });

export type MC = z.infer<typeof mcSchema>;
export type InsertMC = z.infer<typeof insertMcSchema>;

export const articleSchema = z.object({
  id: z.string(),
  title: z.string(),
  excerpt: z.string(),
  content: z.string(),
  image: z.string(),
  publishedAt: z.string(),
});

export type Article = z.infer<typeof articleSchema>;

export const contactFormSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Email tidak valid"),
  message: z.string().min(10, "Pesan minimal 10 karakter"),
});

export type ContactForm = z.infer<typeof contactFormSchema>;

export const reviewSchema = z.object({
  id: z.string(),
  mcId: z.string(),
  name: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string(),
  createdAt: z.string(),
});

export const insertReviewSchema = reviewSchema.omit({ id: true, createdAt: true });

export type Review = z.infer<typeof reviewSchema>;
export type InsertReview = z.infer<typeof insertReviewSchema>;

export const PHOTOGRAPHER_TYPES = [
  "Wedding",
  "Potrait",
  "Event",
  "Product",
  "Semua Jenis",
] as const;

export type PhotographerType = typeof PHOTOGRAPHER_TYPES[number];

export const photographerSchema = z.object({
  id: z.string(),
  name: z.string(),
  whatsapp: z.string(),
  kecamatan: z.enum(KECAMATAN_LIST),
  types: z.array(z.enum(PHOTOGRAPHER_TYPES)),
  photo: z.string(),
  description: z.string(),
  priceRange: z.string().optional(),
  portfolioImages: z.array(z.string()).optional(),
  socialMedia: z.object({
    instagram: z.string().optional(),
    facebook: z.string().optional(),
    tiktok: z.string().optional(),
  }).optional(),
  availability: z.array(z.object({
    date: z.string(),
    isBooked: z.boolean(),
  })).optional(),
  viewCount: z.number().default(0),
});

export const insertPhotographerSchema = photographerSchema.omit({ id: true, viewCount: true });

export type Photographer = z.infer<typeof photographerSchema>;
export type InsertPhotographer = z.infer<typeof insertPhotographerSchema>;

export const DECORATOR_TYPES = [
  "Wedding",
  "Ulang Tahun",
  "Acara Perusahaan",
  "Semilir Bunga",
  "Semua Acara",
] as const;

export type DecoratorType = typeof DECORATOR_TYPES[number];

export const decoratorSchema = z.object({
  id: z.string(),
  name: z.string(),
  whatsapp: z.string(),
  kecamatan: z.enum(KECAMATAN_LIST),
  types: z.array(z.enum(DECORATOR_TYPES)),
  photo: z.string(),
  description: z.string(),
  priceRange: z.string().optional(),
  portfolioImages: z.array(z.string()).optional(),
  socialMedia: z.object({
    instagram: z.string().optional(),
    facebook: z.string().optional(),
    tiktok: z.string().optional(),
  }).optional(),
  availability: z.array(z.object({
    date: z.string(),
    isBooked: z.boolean(),
  })).optional(),
  viewCount: z.number().default(0),
});

export const insertDecoratorSchema = decoratorSchema.omit({ id: true, viewCount: true });

export type Decorator = z.infer<typeof decoratorSchema>;
export type InsertDecorator = z.infer<typeof insertDecoratorSchema>;

export const SANGGAR_TYPES = [
  "Tari Tradisional",
  "Musik Tradisional",
  "Seni Rupa",
  "Teater",
  "Semua Seni",
] as const;

export type SanggarType = typeof SANGGAR_TYPES[number];

export const sanggarSchema = z.object({
  id: z.string(),
  name: z.string(),
  whatsapp: z.string(),
  kecamatan: z.enum(KECAMATAN_LIST),
  types: z.array(z.enum(SANGGAR_TYPES)),
  photo: z.string(),
  description: z.string(),
  priceRange: z.string().optional(),
  portfolioImages: z.array(z.string()).optional(),
  socialMedia: z.object({
    instagram: z.string().optional(),
    facebook: z.string().optional(),
    tiktok: z.string().optional(),
  }).optional(),
  availability: z.array(z.object({
    date: z.string(),
    isBooked: z.boolean(),
  })).optional(),
  viewCount: z.number().default(0),
});

export const insertSanggarSchema = sanggarSchema.omit({ id: true, viewCount: true });

export type Sanggar = z.infer<typeof sanggarSchema>;
export type InsertSanggar = z.infer<typeof insertSanggarSchema>;
