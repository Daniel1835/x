import { Link } from "wouter";
import { Mic2, Mail, Phone, MapPin } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { WHATSAPP_ADMIN, EMAIL_ADMIN } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Mic2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold">MC Bulukumba</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Direktori profesional pembawa acara terbaik di Bulukumba. Temukan MC untuk wedding, wisuda, ulang tahun, dan acara formal.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Menu</h3>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Beranda
              </Link>
              <Link href="/direktori" className="text-muted-foreground hover:text-foreground transition-colors">
                Direktori MC
              </Link>
              <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                Blog & Tips
              </Link>
              <Link href="/kontak" className="text-muted-foreground hover:text-foreground transition-colors">
                Kontak
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Kategori MC</h3>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/direktori?category=Wedding" className="text-muted-foreground hover:text-foreground transition-colors">
                MC Wedding
              </Link>
              <Link href="/direktori?category=Wisuda" className="text-muted-foreground hover:text-foreground transition-colors">
                MC Wisuda
              </Link>
              <Link href="/direktori?category=Ulang Tahun" className="text-muted-foreground hover:text-foreground transition-colors">
                MC Ulang Tahun
              </Link>
              <Link href="/direktori?category=Formal" className="text-muted-foreground hover:text-foreground transition-colors">
                MC Formal
              </Link>
              <Link href="/direktori?category=Tradisional" className="text-muted-foreground hover:text-foreground transition-colors">
                MC Tradisional
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Hubungi Kami</h3>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href={`https://wa.me/${WHATSAPP_ADMIN}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <SiWhatsapp className="h-4 w-4" />
                <span>WhatsApp Admin</span>
              </a>
              <a
                href={`mailto:${EMAIL_ADMIN}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>{EMAIL_ADMIN}</span>
              </a>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Bulukumba, Sulawesi Selatan</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} MC Bulukumba. Semua hak cipta dilindungi.</p>
          <p className="mt-1 text-xs">
            Website ini hanya direktori. Transaksi dilakukan langsung antara pengguna dan MC.
          </p>
        </div>
      </div>
    </footer>
  );
}
