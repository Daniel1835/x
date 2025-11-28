import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Play, ArrowLeft, Image, AlertCircle } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MCCard } from "@/components/mc-card";
import { AvailabilityCalendar } from "@/components/availability-calendar";
import { SocialMediaLinks } from "@/components/social-media-links";
import { ReviewForm } from "@/components/review-form";
import { ReviewList } from "@/components/review-list";
import type { MC } from "@shared/schema";
import { motion } from "framer-motion";

export default function MCProfilePage() {
  const { id } = useParams();

  const { data: mc, isLoading, error } = useQuery<MC>({
    queryKey: ["/api/mcs", id],
  });

  const { data: relatedMCs } = useQuery<MC[]>({
    queryKey: ["/api/mcs"],
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
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-20 rounded-full" />
                    <Skeleton className="h-8 w-20 rounded-full" />
                  </div>
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
          <Link href="/direktori">
            <Button variant="ghost" className="gap-2 mb-6">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Direktori
            </Button>
          </Link>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Terjadi kesalahan saat memuat profil MC. Silakan coba lagi nanti.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  if (!mc) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card>
            <CardContent className="py-16 text-center">
              <h2 className="text-2xl font-bold mb-4">MC Tidak Ditemukan</h2>
              <p className="text-muted-foreground mb-6">
                Pembawa acara yang Anda cari tidak tersedia.
              </p>
              <Link href="/direktori">
                <Button>Kembali ke Direktori</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const whatsappUrl = `https://wa.me/${mc.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    `Halo ${mc.name}, saya tertarik dengan jasa MC Anda yang saya temukan di website MC Bulukumba.`
  )}`;

  const otherMCs = relatedMCs?.filter((m) => m.id !== mc.id).slice(0, 3) || [];

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      <div className="container mx-auto px-4 max-w-4xl py-8 space-y-6">
        <Link href="/direktori">
          <Button variant="ghost" className="gap-2 mb-6" data-testid="button-back-profile">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Direktori
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
                    <AvatarImage src={mc.photo} alt={mc.name} />
                    <AvatarFallback>{mc.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex-1 space-y-6">
                  <div>
                    <h1 className="text-3xl font-bold mb-2" data-testid="text-mc-name">
                      {mc.name}
                    </h1>
                    <div className="flex items-center gap-2 text-muted-foreground" data-testid="text-mc-location">
                      <MapPin className="h-4 w-4" />
                      {mc.kecamatan}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {mc.categories.map((category) => (
                      <Badge key={category} variant="secondary" data-testid={`badge-profile-category-${category}`}>
                        MC {category}
                      </Badge>
                    ))}
                  </div>

                  {mc.priceRange && (
                    <div className="text-lg">
                      <span className="text-muted-foreground">Mulai dari: </span>
                      <span className="font-semibold text-primary" data-testid="text-mc-price">
                        {mc.priceRange}
                      </span>
                    </div>
                  )}

                  <p className="text-muted-foreground leading-relaxed" data-testid="text-mc-description">
                    {mc.description}
                  </p>

                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="bg-[#25D366] hover:bg-[#20BD5A] text-white gap-2" data-testid="button-whatsapp-profile">
                      <SiWhatsapp className="h-5 w-5" />
                      Hubungi via WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {mc.videoPortfolio && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="mt-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Play className="h-5 w-5 text-primary" />
                  Video Portofolio
                </h2>
                <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                  <iframe
                    src={mc.videoPortfolio.replace("watch?v=", "embed/")}
                    title="Video Portofolio"
                    className="w-full h-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {mc.portfolioImages && mc.portfolioImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="mt-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Image className="h-5 w-5 text-primary" />
                  Galeri Foto
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {mc.portfolioImages.map((image, index) => (
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
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-6"
        >
          <AvailabilityCalendar availability={mc.availability} />
          <SocialMediaLinks socialMedia={mc.socialMedia} />
          <ReviewForm mcId={mc.id} />
          <ReviewList mcId={mc.id} />
        </motion.div>

        {otherMCs.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-bold mb-6">MC Lainnya dari Bulukumba</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {otherMCs.map((relatedMc, index) => (
                <MCCard key={relatedMc.id} mc={relatedMc} index={index} />
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
