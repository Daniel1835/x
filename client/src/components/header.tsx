import { Link, useLocation } from "wouter";
import { Menu, X, Mic2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/direktori", label: "Direktori MC" },
  { href: "/fotografer", label: "Fotografer" },
  { href: "/dekorasi", label: "Dekorasi" },
  { href: "/sanggar", label: "Sanggar Seni" },
  { href: "/blog", label: "Blog" },
  { href: "/kontak", label: "Kontak" },
];

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary font-semibold text-sm text-primary-foreground">
            Y
          </div>
          <span className="text-lg font-semibold tracking-tight">YSMS</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button
                variant={location === link.href ? "secondary" : "ghost"}
                size="sm"
                data-testid={`nav-${link.label.toLowerCase().replace(" ", "-")}`}
              >
                {link.label}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex gap-2">
            <Link href="/daftar">
              <Button variant="outline" size="sm" data-testid="button-daftar-mc-header">Daftar</Button>
            </Link>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t md:hidden bg-background"
          >
            <nav className="container mx-auto flex flex-col p-4 gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Button
                    variant={location === link.href ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
              <div className="mt-4 space-y-2 border-t pt-4">
                <p className="text-sm font-semibold px-2 py-1">Daftar sebagai:</p>
                <Link href="/daftar" className="block">
                  <Button variant="outline" className="w-full justify-start" onClick={() => setMobileMenuOpen(false)}>
                    MC
                  </Button>
                </Link>
                <Link href="/daftar-fotografer" className="block">
                  <Button variant="outline" className="w-full justify-start" onClick={() => setMobileMenuOpen(false)}>
                    Fotografer
                  </Button>
                </Link>
                <Link href="/daftar-dekorasi" className="block">
                  <Button variant="outline" className="w-full justify-start" onClick={() => setMobileMenuOpen(false)}>
                    Dekorasi
                  </Button>
                </Link>
                <Link href="/daftar-sanggar" className="block">
                  <Button className="w-full justify-start" onClick={() => setMobileMenuOpen(false)}>
                    Sanggar Seni
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
