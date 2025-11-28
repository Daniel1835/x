import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SortOption = "popular" | "newest";

interface SortSelectProps {
  selected: SortOption;
  onSelect: (option: SortOption) => void;
}

export function SortSelect({ selected, onSelect }: SortSelectProps) {
  return (
    <Select value={selected} onValueChange={(value) => onSelect(value as SortOption)}>
      <SelectTrigger className="w-[200px]" data-testid="select-sort">
        <SelectValue placeholder="Urutkan" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="popular">Paling Banyak Dicari</SelectItem>
        <SelectItem value="newest">Terbaru Ditambahkan</SelectItem>
      </SelectContent>
    </Select>
  );
}
