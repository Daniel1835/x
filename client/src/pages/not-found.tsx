import { Link } from "wouter";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto text-center"
        >
          <Card>
            <CardContent className="py-12">
              <div className="text-6xl font-bold text-primary mb-4">404</div>
              <h1 className="text-2xl font-bold mb-4">Halaman Tidak Ditemukan</h1>
              <p className="text-muted-foreground mb-8">
                Maaf, halaman yang Anda cari tidak tersedia atau sudah dipindahkan.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/">
                  <Button className="gap-2" data-testid="button-home-404">
                    <Home className="h-4 w-4" />
                    Kembali ke Beranda
                  </Button>
                </Link>
                <Link href="/direktori">
                  <Button variant="outline" className="gap-2" data-testid="button-directory-404">
                    <Search className="h-4 w-4" />
                    Cari MC
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
