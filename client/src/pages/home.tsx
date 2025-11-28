import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Users, CheckCircle, Clock, Mic2, Camera, Palette, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchBar } from "@/components/search-bar";
import { HERO_IMAGE } from "@/lib/constants";
import type { MC, Photographer, Decorator, Sanggar } from "@shared/schema";
import { motion } from "framer-motion";

const serviceTypes = [
  { 
    icon: Mic2, 
    label: "Pembawa Acara", 
    description: "MC profesional untuk berbagai acara",
    href: "/direktori",
    color: "from-blue-500 to-blue-600"
  },
  { 
    icon: Camera, 
    label: "Fotografer", 
    description: "Abadikan momen spesial Anda",
    href: "/fotografer",
    color: "from-purple-500 to-purple-600"
  },
  { 
    icon: Palette, 
    label: "Dekorasi", 
    description: "Dekorasi indah untuk acara Anda",
    href: "/dekorasi",
    color: "from-pink-500 to-pink-600"
  },
  { 
    icon: Music, 
    label: "Sanggar Seni", 
    description: "Pertunjukan seni tradisional",
    href: "/sanggar",
    color: "from-orange-500 to-orange-600"
  },
];

function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [, navigate] = useLocation();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    navigate(`/direktori?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Layanan Acara Bulukumba"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center space-y-6"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Direktori Layanan Acara{" "}
            <span className="text-primary">Bulukumba</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Temukan MC, Fotografer, Dekorator, dan Sanggar Seni terbaik untuk menyempurnakan acara spesial Anda.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto mt-8"
        >
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
            placeholder="Cari layanan, nama, atau jenis acara..."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {serviceTypes.map((service, index) => (
              <motion.div
                key={service.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              >
                <Link href={service.href}>
                  <Card className="group cursor-pointer bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                    <CardContent className="p-4 text-center">
                      <div className={`inline-flex p-3 rounded-full bg-gradient-to-br ${service.color} mb-3`}>
                        <service.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-white text-sm md:text-base">
                        {service.label}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="py-12 bg-card border-y">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Mic2, value: "50+", label: "Pembawa Acara" },
            { icon: Camera, value: "30+", label: "Fotografer" },
            { icon: Palette, value: "20+", label: "Dekorator" },
            { icon: Music, value: "15+", label: "Sanggar Seni" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="text-center">
                <CardContent className="pt-6 pb-4">
                  <stat.icon className="h-8 w-8 mx-auto text-primary mb-3" />
                  <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                  <div className="text-muted-foreground text-sm">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const { data: mcs, isLoading: loadingMCs } = useQuery<MC[]>({
    queryKey: ["/api/mcs"],
  });
  
  const { data: photographers, isLoading: loadingPhotographers } = useQuery<Photographer[]>({
    queryKey: ["/api/photographers"],
  });
  
  const { data: decorators, isLoading: loadingDecorators } = useQuery<Decorator[]>({
    queryKey: ["/api/decorators"],
  });
  
  const { data: sanggars, isLoading: loadingSanggars } = useQuery<Sanggar[]>({
    queryKey: ["/api/sanggars"],
  });

  const services = [
    {
      title: "Pembawa Acara",
      subtitle: "MC profesional untuk acara Anda",
      icon: Mic2,
      href: "/direktori",
      data: mcs?.slice(0, 3),
      isLoading: loadingMCs,
      color: "blue",
    },
    {
      title: "Fotografer",
      subtitle: "Abadikan momen berharga",
      icon: Camera,
      href: "/fotografer",
      data: photographers?.slice(0, 3),
      isLoading: loadingPhotographers,
      color: "purple",
    },
    {
      title: "Dekorasi",
      subtitle: "Dekorasi indah untuk venue",
      icon: Palette,
      href: "/dekorasi",
      data: decorators?.slice(0, 3),
      isLoading: loadingDecorators,
      color: "pink",
    },
    {
      title: "Sanggar Seni",
      subtitle: "Pertunjukan seni tradisional",
      icon: Music,
      href: "/sanggar",
      data: sanggars?.slice(0, 3),
      isLoading: loadingSanggars,
      color: "orange",
    },
  ];

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Layanan Terpopuler
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Temukan berbagai layanan profesional untuk menyukseskan acara Anda di Bulukumba
          </p>
        </motion.div>

        <div className="space-y-12">
          {services.map((service, serviceIndex) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: serviceIndex * 0.1 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-${service.color}-100 dark:bg-${service.color}-900/30`}>
                    <service.icon className={`h-6 w-6 text-${service.color}-600 dark:text-${service.color}-400`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.subtitle}</p>
                  </div>
                </div>
                <Link href={service.href}>
                  <Button variant="ghost" className="gap-2">
                    Lihat Semua
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {service.isLoading ? (
                <div className="grid gap-4 md:grid-cols-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Card key={i}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <Skeleton className="h-16 w-16 rounded-full" />
                          <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-24" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-3">
                  {service.data?.map((item: any, index: number) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link href={`${service.href === '/direktori' ? '/mc' : service.href.slice(1, -1)}/${item.id}`}>
                        <Card className="group cursor-pointer hover:shadow-md transition-all duration-300">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-4">
                              <div className="relative h-16 w-16 rounded-full overflow-hidden bg-muted flex-shrink-0">
                                {item.photo ? (
                                  <img
                                    src={item.photo}
                                    alt={item.name}
                                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                                  />
                                ) : (
                                  <div className="h-full w-full flex items-center justify-center bg-primary/10">
                                    <span className="text-lg font-semibold text-primary">
                                      {item.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                                    </span>
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold truncate group-hover:text-primary transition-colors">
                                  {item.name}
                                </h4>
                                <p className="text-sm text-muted-foreground truncate">
                                  {item.kecamatan}
                                </p>
                                <p className="text-xs text-primary font-medium mt-1">
                                  {item.priceRange || "Hubungi untuk harga"}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: Users,
      title: "Vendor Terverifikasi",
      description: "Semua vendor telah melalui proses verifikasi untuk memastikan kualitas layanan"
    },
    {
      icon: CheckCircle,
      title: "Mudah & Cepat",
      description: "Temukan dan hubungi vendor yang tepat hanya dalam beberapa klik"
    },
    {
      icon: Clock,
      title: "Respons Cepat",
      description: "Dapatkan respons cepat dari vendor melalui WhatsApp langsung"
    },
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Mengapa Memilih Kami?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Platform terpercaya untuk menemukan layanan acara terbaik di Bulukumba
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="text-center h-full">
                <CardContent className="pt-8 pb-6">
                  <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-16 md:py-20 bg-primary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Ingin Bergabung Sebagai Vendor?
          </h2>
          <p className="text-muted-foreground text-lg">
            Daftarkan layanan Anda di direktori kami dan jangkau lebih banyak pelanggan. Gratis dan mudah!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/daftar">
              <Button size="lg" className="gap-2" data-testid="button-cta-daftar">
                Daftar Sebagai MC
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/daftar-fotografer">
              <Button size="lg" variant="outline" className="gap-2">
                Daftar Sebagai Fotografer
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link href="/daftar-dekorasi">
              <Button size="lg" variant="outline" className="gap-2">
                Daftar Sebagai Dekorator
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/daftar-sanggar">
              <Button size="lg" variant="outline" className="gap-2">
                Daftar Sebagai Sanggar Seni
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <FeaturesSection />
      <CTASection />
    </div>
  );
}
