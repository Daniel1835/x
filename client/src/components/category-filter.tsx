import { Button } from "@/components/ui/button";
import { SERVICE_CATEGORIES, type ServiceCategory } from "@shared/schema";
import { Heart, GraduationCap, Cake, Briefcase, Music, Star } from "lucide-react";

interface CategoryFilterProps {
  selected: ServiceCategory | null;
  onSelect: (category: ServiceCategory | null) => void;
  showAll?: boolean;
}

const categoryIcons: Record<ServiceCategory, typeof Heart> = {
  Wedding: Heart,
  Wisuda: GraduationCap,
  "Ulang Tahun": Cake,
  Formal: Briefcase,
  Tradisional: Music,
  "Semua Acara": Star,
};

export function CategoryFilter({ selected, onSelect, showAll = false }: CategoryFilterProps) {
  const categories = showAll ? SERVICE_CATEGORIES : SERVICE_CATEGORIES.filter(c => c !== "Semua Acara");

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {showAll && (
        <Button
          variant={selected === null ? "default" : "outline"}
          onClick={() => onSelect(null)}
          className="gap-2 rounded-full"
          data-testid="filter-all"
        >
          <Star className="h-4 w-4" />
          Semua
        </Button>
      )}
      {categories.map((category) => {
        const Icon = categoryIcons[category];
        const isSelected = selected === category;
        
        return (
          <Button
            key={category}
            variant={isSelected ? "default" : "outline"}
            onClick={() => onSelect(isSelected ? null : category)}
            className="gap-2 rounded-full"
            data-testid={`filter-${category.toLowerCase().replace(" ", "-")}`}
          >
            <Icon className="h-4 w-4" />
            MC {category}
          </Button>
        );
      })}
    </div>
  );
}
