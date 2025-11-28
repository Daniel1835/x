import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { MapPin, ArrowLeft, Image, AlertCircle, Music } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AvailabilityCalendar } from "@/components/availability-calendar";
import { SocialMediaLinks } from "@/components/social-media-links";
import { ReviewForm } from "@/components/review-form";
import { ReviewList } from "@/components/review-list";
import type { Sanggar } from "@shared/schema";
import { motion } from "framer-motion";

export default function SanggarProfilePage() {
  const { id } = useParams();

  const { data: sanggar, isLoading, error } = useQuery<Sanggar>({
    queryKey: ["/api/sanggars", id],
  });

  const { data: relatedSanggars } = useQuery<Sanggar[]>({
    queryKey: ["/api/sanggars"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Skeleton className="h-8 w-32 mb-8" />
          <Card>
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <Skeleton className="h-48 w-48 rounded-full mx-auto md:mx-0" />
                <div className="flex-1 space-y-4">
                  <Skeleton className="h-10 w-64" />
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-12 w-48" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link href="/sanggar">
            <Button variant="ghost" className="gap-2 mb-6">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Sanggar
            </Button>
          </Link>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Terjadi kesalahan saat memuat profil sanggar. Silakan coba lagi nanti.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  if (!sanggar) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card>
            <CardContent className="py-16 text-center">
              <h2 className="text-2xl font-bold mb-4">Sanggar Tidak Ditemukan</h2>
              <p className="text-muted-foreground mb-6">Sanggar yang Anda cari tidak tersedia.</p>
              <Link href="/sanggar">
                <Button>Kembali ke Sanggar</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const whatsappUrl = `https://wa.me/${sanggar.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    `Halo ${sanggar.name}, saya tertarik dengan program seni Anda yang saya temukan di website YSMS.`
  )}`;

  const otherSanggars = relatedSanggars?.filter((s) => s.id !== sanggar.id).slice(0, 3) || [];

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      <div className="container mx-auto px-4 max-w-4xl py-8 space-y-6">
        <Link href="/sanggar">
          <Button variant="ghost" className="gap-2 mb-6">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Sanggar
          </Button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-shrink-0">
                  <Avatar className="h-48 w-48">
                    <AvatarImage src={sanggar.photo} alt={sanggar.name} />
                    <AvatarFallback>{sanggar.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex-1 space-y-6">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{sanggar.name}</h1>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {sanggar.kecamatan}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {sanggar.types.map((type) => (
                      <Badge key={type} variant="secondary">
                        {type}
                      </Badge>
                    ))}
                  </div>

                  {sanggar.priceRange && (
                    <div className="text-lg">
                      <span className="text-muted-foreground">Dari: </span>
                      <span className="font-semibold text-primary">{sanggar.priceRange}</span>
                    </div>
                  )}

                  <p className="text-muted-foreground leading-relaxed">{sanggar.description}</p>

                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="bg-[#25D366] hover:bg-[#20BD5A] text-white gap-2">
                      <SiWhatsapp className="h-5 w-5" />
                      Hubungi via WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {sanggar.portfolioImages && sanggar.portfolioImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Image className="h-5 w-5 text-primary" />
                  Galeri Pertunjukan
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {sanggar.portfolioImages.map((image, index) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden bg-muted">
                      <img
                        src={image}
                        alt={`Pertunjukan ${index + 1}`}
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-6"
        >
          <AvailabilityCalendar availability={sanggar.availability} />
          <SocialMediaLinks socialMedia={sanggar.socialMedia} />
          <ReviewForm mcId={sanggar.id} />
          <ReviewList mcId={sanggar.id} />
        </motion.div>

        {otherSanggars.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Music className="h-6 w-6" />
              Sanggar Lainnya
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {otherSanggars.map((s) => (
                <Link key={s.id} href={`/sanggar/${s.id}`}>
                  <Card className="hover-elevate cursor-pointer">
                    <CardContent className="p-5">
                      <div className="flex flex-col items-center text-center space-y-3">
                        <img src={s.photo} alt={s.name} className="h-24 w-24 rounded-full object-cover" />
                        <div>
                          <h3 className="font-semibold">{s.name}</h3>
                          <p className="text-sm text-muted-foreground">{s.kecamatan}</p>
                        </div>
                        <Button size="sm" className="w-full">
                          Lihat Detail
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </motion.section>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t md:hidden">
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block">
          <Button size="lg" className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white gap-2">
            <SiWhatsapp className="h-5 w-5" />
            Hubungi via WhatsApp
          </Button>
        </a>
      </div>
    </div>
  );
}
