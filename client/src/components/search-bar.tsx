import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = "Cari MC berdasarkan nama atau jenis acara...",
  className = "",
}: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.();
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative flex items-center">
        <Search className="absolute left-4 h-5 w-5 text-muted-foreground pointer-events-none" />
        <Input
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-14 pl-12 pr-24 text-base rounded-full shadow-md border-2 focus:border-primary focus:ring-primary"
          data-testid="input-search"
        />
        <Button
          type="submit"
          className="absolute right-2 rounded-full px-6"
          data-testid="button-search"
        >
          Cari
        </Button>
      </div>
    </form>
  );
}
