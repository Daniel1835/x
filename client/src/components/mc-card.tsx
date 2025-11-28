import { Link } from "wouter";
import { MapPin } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { MC } from "@shared/schema";
import { motion } from "framer-motion";

interface MCCardProps {
  mc: MC;
  index?: number;
}

export function MCCard({ mc, index = 0 }: MCCardProps) {
  const whatsappUrl = `https://wa.me/${mc.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    `Halo ${mc.name}, saya tertarik dengan jasa MC Anda yang saya temukan di website MC Bulukumba.`
  )}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="group hover-elevate transition-all duration-300" data-testid={`card-mc-${mc.id}`}>
        <CardContent className="p-5">
          <div className="flex flex-col items-center text-center space-y-4">
            <Link href={`/mc/${mc.id}`}>
              <Avatar className="h-24 w-24 border-2 border-primary/20 transition-transform duration-300 group-hover:scale-105">
                <AvatarImage src={mc.photo} alt={mc.name} className="object-cover" />
                <AvatarFallback className="text-xl font-semibold bg-primary/10">
                  {mc.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </Link>

            <div className="space-y-2">
              <Link href={`/mc/${mc.id}`}>
                <h3 className="text-lg font-semibold hover:text-primary transition-colors" data-testid={`text-mc-name-${mc.id}`}>
                  {mc.name}
                </h3>
              </Link>
              
              <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                <span data-testid={`text-mc-kecamatan-${mc.id}`}>{mc.kecamatan}</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-1.5">
              {mc.categories.slice(0, 3).map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="text-xs"
                  data-testid={`badge-category-${mc.id}-${category}`}
                >
                  {category}
                </Badge>
              ))}
              {mc.categories.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{mc.categories.length - 3}
                </Badge>
              )}
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button
                className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white gap-2"
                data-testid={`button-whatsapp-${mc.id}`}
              >
                <SiWhatsapp className="h-4 w-4" />
                Chat via WhatsApp
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
