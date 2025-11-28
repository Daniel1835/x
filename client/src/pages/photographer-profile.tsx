import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { MapPin, ArrowLeft, Image, AlertCircle, Camera } from "lucide-react";
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
import type { Photographer } from "@shared/schema";
import { motion } from "framer-motion";

export default function PhotographerProfilePage() {
  const { id } = useParams();

  const { data: photographer, isLoading, error } = useQuery<Photographer>({
    queryKey: ["/api/photographers", id],
  });

  const { data: relatedPhotographers } = useQuery<Photographer[]>({
    queryKey: ["/api/photographers"],
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
          <Link href="/fotografer">
            <Button variant="ghost" className="gap-2 mb-6">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Fotografer
            </Button>
          </Link>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Terjadi kesalahan saat memuat profil fotografer. Silakan coba lagi nanti.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  if (!photographer) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card>
            <CardContent className="py-16 text-center">
              <h2 className="text-2xl font-bold mb-4">Fotografer Tidak Ditemukan</h2>
              <p className="text-muted-foreground mb-6">Fotografer yang Anda cari tidak tersedia.</p>
              <Link href="/fotografer">
                <Button>Kembali ke Fotografer</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const whatsappUrl = `https://wa.me/${photographer.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    `Halo ${photographer.name}, saya tertarik dengan jasa fotografi Anda yang saya temukan di website Fotografer Bulukumba.`
  )}`;

  const otherPhotographers = relatedPhotographers?.filter((p) => p.id !== photographer.id).slice(0, 3) || [];

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      <div className="container mx-auto px-4 max-w-4xl py-8 space-y-6">
        <Link href="/fotografer">
          <Button variant="ghost" className="gap-2 mb-6">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Fotografer
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
                    <AvatarImage src={photographer.photo} alt={photographer.name} />
                    <AvatarFallback>{photographer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex-1 space-y-6">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{photographer.name}</h1>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {photographer.kecamatan}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {photographer.types.map((type) => (
                      <Badge key={type} variant="secondary">
                        {type}
                      </Badge>
                    ))}
                  </div>

                  {photographer.priceRange && (
                    <div className="text-lg">
                      <span className="text-muted-foreground">Mulai dari: </span>
                      <span className="font-semibold text-primary">{photographer.priceRange}</span>
                    </div>
                  )}

                  <p className="text-muted-foreground leading-relaxed">{photographer.description}</p>

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

        {photographer.portfolioImages && photographer.portfolioImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Image className="h-5 w-5 text-primary" />
                  Galeri Foto
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {photographer.portfolioImages.map((image, index) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden bg-muted">
                      <img
                        src={image}
                        alt={`Portfolio ${index + 1}`}
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
          <AvailabilityCalendar availability={photographer.availability} />
          <SocialMediaLinks socialMedia={photographer.socialMedia} />
          <ReviewForm mcId={photographer.id} />
          <ReviewList mcId={photographer.id} />
        </motion.div>

        {otherPhotographers.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Camera className="h-6 w-6" />
              Fotografer Lainnya
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {otherPhotographers.map((p) => (
                <Link key={p.id} href={`/fotografer/${p.id}`}>
                  <Card className="hover-elevate cursor-pointer">
                    <CardContent className="p-5">
                      <div className="flex flex-col items-center text-center space-y-3">
                        <img src={p.photo} alt={p.name} className="h-24 w-24 rounded-full object-cover" />
                        <div>
                          <h3 className="font-semibold">{p.name}</h3>
                          <p className="text-sm text-muted-foreground">{p.kecamatan}</p>
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
