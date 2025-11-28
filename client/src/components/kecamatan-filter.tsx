import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { KECAMATAN_LIST, type Kecamatan } from "@shared/schema";

interface KecamatanFilterProps {
  selected: Kecamatan | null;
  onSelect: (kecamatan: Kecamatan | null) => void;
}

export function KecamatanFilter({ selected, onSelect }: KecamatanFilterProps) {
  return (
    <Select
      value={selected || "all"}
      onValueChange={(value) => onSelect(value === "all" ? null : value as Kecamatan)}
    >
      <SelectTrigger className="w-[200px]" data-testid="select-kecamatan">
        <SelectValue placeholder="Pilih Kecamatan" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Semua Kecamatan</SelectItem>
        {KECAMATAN_LIST.map((kec) => (
          <SelectItem key={kec} value={kec}>
            {kec}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
