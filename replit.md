# Direktori MC Bulukumba

## Overview
Website direktori profesional untuk Pembawa Acara (MC), Fotografer, Dekorator, dan Sanggar Seni di Bulukumba, Sulawesi Selatan. Website ini membantu pengguna menemukan layanan untuk berbagai acara termasuk pernikahan, wisuda, ulang tahun, acara formal, dan upacara tradisional.

## Tech Stack

### Frontend
- **React 18** + TypeScript
- **Vite** (Build Tool)
- **Tailwind CSS** + shadcn/ui
- **Wouter** (Routing)
- **TanStack Query** (Data Fetching)
- **Framer Motion** (Animasi)

### Backend
- **Express.js** + TypeScript
- **Zod** (Validasi)
- **In-Memory Storage** (Data tersimpan selama server berjalan)

## Struktur Folder

```
├── client/                     # FRONTEND
│   ├── public/                 # Static files
│   │   └── favicon.png
│   ├── src/
│   │   ├── components/         # Komponen UI
│   │   │   ├── ui/             # shadcn/ui components
│   │   │   ├── header.tsx      # Header navigasi
│   │   │   ├── footer.tsx      # Footer
│   │   │   ├── mc-card.tsx     # Kartu profil MC
│   │   │   ├── search-bar.tsx  # Bar pencarian
│   │   │   └── ...
│   │   ├── pages/              # Halaman website
│   │   │   ├── home.tsx        # Beranda
│   │   │   ├── directory.tsx   # Direktori MC
│   │   │   ├── mc-profile.tsx  # Profil MC
│   │   │   ├── admin-login.tsx # Login admin
│   │   │   └── ...
│   │   ├── hooks/              # Custom React hooks
│   │   ├── lib/                # Utilities & constants
│   │   ├── App.tsx             # Root component
│   │   ├── main.tsx            # Entry point
│   │   └── index.css           # Global styles
│   └── index.html
│
├── server/                     # BACKEND
│   ├── index.ts                # Entry point server
│   ├── routes.ts               # API endpoints
│   ├── storage.ts              # In-memory data storage
│   ├── static.ts               # Static file serving
│   └── vite.ts                 # Vite dev integration
│
├── shared/                     # SHARED CODE
│   └── schema.ts               # TypeScript types & Zod schemas
│
├── attached_assets/            # ASSETS
│   └── stock_images/           # Gambar profil
│
├── docs/                       # DOKUMENTASI
│   └── database-schemas/       # SQL schemas (untuk migrasi ke PostgreSQL)
│
├── script/                     # BUILD SCRIPTS
│   └── build.ts                # Script build produksi
│
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
├── vite.config.ts              # Vite config
├── tailwind.config.ts          # Tailwind config
├── components.json             # shadcn/ui config
└── replit.md                   # Dokumentasi ini
```

## API Endpoints

### Public API
| Method | Endpoint | Fungsi |
|--------|----------|--------|
| GET | `/api/mcs` | Daftar semua MC |
| GET | `/api/mcs/:id` | Detail MC |
| POST | `/api/mcs` | Daftar MC baru |
| GET | `/api/photographers` | Daftar fotografer |
| GET | `/api/photographers/:id` | Detail fotografer |
| POST | `/api/photographers` | Daftar fotografer baru |
| GET | `/api/decorators` | Daftar dekorator |
| GET | `/api/decorators/:id` | Detail dekorator |
| POST | `/api/decorators` | Daftar dekorator baru |
| GET | `/api/sanggars` | Daftar sanggar seni |
| GET | `/api/sanggars/:id` | Detail sanggar |
| POST | `/api/sanggars` | Daftar sanggar baru |
| GET | `/api/articles` | Daftar artikel blog |
| GET | `/api/articles/:id` | Detail artikel |
| GET | `/api/reviews/:mcId` | Review MC |
| POST | `/api/reviews` | Tambah review |

### Admin API (Perlu autentikasi)
| Method | Endpoint | Fungsi |
|--------|----------|--------|
| POST | `/api/admin/login` | Login admin |
| GET | `/api/admin/mc` | Daftar MC (admin) |
| PUT | `/api/admin/mc/:id` | Update MC |
| DELETE | `/api/admin/mc/:id` | Hapus MC |

## Halaman Website

### Publik
1. **/** - Beranda dengan hero, pencarian, 4 kategori
2. **/direktori** - Direktori MC dengan filter
3. **/mc/:id** - Profil MC
4. **/fotografer** - Direktori Fotografer
5. **/fotografer/:id** - Profil Fotografer
6. **/dekorasi** - Direktori Dekorator
7. **/dekorasi/:id** - Profil Dekorator
8. **/sanggar** - Direktori Sanggar Seni
9. **/sanggar/:id** - Profil Sanggar
10. **/daftar** - Form pendaftaran MC
11. **/blog** - Daftar artikel
12. **/blog/:id** - Detail artikel
13. **/kontak** - Halaman kontak

### Admin
14. **/admin/login** - Login admin
15. **/admin/dashboard** - Dashboard admin
16. **/admin/mc** - Kelola MC
17. **/admin/mc/edit/:id** - Edit MC

## Admin Login
- **Username**: admin
- **Password**: Irwansyah12@

## Kategori Layanan

### MC
Wedding, Wisuda, Ulang Tahun, Formal, Tradisional, Semua Acara

### Fotografer
Wedding, Potrait, Event, Product, Semua Jenis

### Dekorator
Wedding, Ulang Tahun, Acara Perusahaan, Semilir Bunga, Semua Acara

### Sanggar Seni
Tari Tradisional, Musik Tradisional, Seni Rupa, Teater, Semua Seni

## Kecamatan (Wilayah)
Ujung Bulu, Ujung Loe, Kajang, Herlang, Bonto Bahari, Rilau Ale, Masamba, Bulukumpa

## Development

```bash
# Jalankan development server
npm run dev

# Build untuk produksi
npm run build

# Jalankan produksi
npm run start
```

## Catatan Penting
- Data disimpan dalam memory, akan reset saat server restart
- Untuk data permanen, gunakan PostgreSQL (schema tersedia di `docs/database-schemas/`)
- Admin panel di `/admin/login`

## Recent Changes
- 28 November 2025: Setup project di Replit
- Konfigurasi Vite untuk allow all hosts
- Reorganisasi struktur folder
- Dokumentasi SQL dipindahkan ke `docs/database-schemas/`
