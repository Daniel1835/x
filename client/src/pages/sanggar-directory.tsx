import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearch } from "wouter";
import { Filter, Grid3X3, List, Search, AlertCircle, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { Sanggar, SanggarType, Kecamatan } from "@shared/schema";
import { SANGGAR_TYPES, KECAMATAN_LIST } from "@shared/schema";
import { motion } from "framer-motion";
import { Link } from "wouter";

function SanggarCard({ sanggar }: { sanggar: Sanggar }) {
  return (
    <Link href={`/sanggar/${sanggar.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="hover-elevate cursor-pointer h-full">
          <CardContent className="p-5">
            <div className="flex flex-col items-center text-center space-y-3">
              <img
                src={sanggar.photo}
                alt={sanggar.name}
                className="h-24 w-24 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-base">{sanggar.name}</h3>
                <p className="text-sm text-muted-foreground">{sanggar.kecamatan}</p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {sanggar.types.slice(0, 2).map((type) => (
                  <span key={type} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {type}
                  </span>
                ))}
              </div>
              {sanggar.priceRange && (
                <p className="text-sm font-semibold text-primary">{sanggar.priceRange}</p>
              )}
              <Button size="sm" className="w-full">
                Lihat Detail
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}

export default function SanggarDirectoryPage() {
  const searchParams = useSearch();
  const params = new URLSearchParams(searchParams);

  const initialQuery = params.get("q") || "";
  const initialType = (params.get("type") as SanggarType | null) || null;
  const initialKecamatan = (params.get("kecamatan") as Kecamatan | null) || null;

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedType, setSelectedType] = useState<SanggarType | null>(initialType);
  const [selectedKecamatan, setSelectedKecamatan] = useState<Kecamatan | null>(initialKecamatan);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    const newParams = new URLSearchParams();
    if (searchQuery) newParams.set("q", searchQuery);
    if (selectedType) newParams.set("type", selectedType);
    if (selectedKecamatan) newParams.set("kecamatan", selectedKecamatan);

    const queryString = newParams.toString();
    const newPath = queryString ? `/sanggar?${queryString}` : "/sanggar";
    if (window.location.pathname + window.location.search !== newPath) {
      window.history.replaceState(null, "", newPath);
    }
  }, [searchQuery, selectedType, selectedKecamatan]);

  const { data: sanggars, isLoading, error } = useQuery<Sanggar[]>({
    queryKey: ["/api/sanggars"],
  });

  const filteredSanggars = useMemo(() => {
    if (!sanggars) return [];
    let result = [...sanggars];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.types.some((t) => t.toLowerCase().includes(query)) ||
          s.kecamatan.toLowerCase().includes(query)
      );
    }

    if (selectedType) {
      result = result.filter((s) => s.types.includes(selectedType));
    }

    if (selectedKecamatan) {
      result = result.filter((s) => s.kecamatan === selectedKecamatan);
    }

    return result;
  }, [sanggars, searchQuery, selectedType, selectedKecamatan]);

  const FilterControls = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-semibold text-sm">Jenis Seni</h3>
        <div className="space-y-2">
          <Button
            variant={selectedType === null ? "default" : "outline"}
            onClick={() => setSelectedType(null)}
            className="w-full justify-start"
            size="sm"
          >
            Semua Jenis
          </Button>
          {SANGGAR_TYPES.filter(t => t !== "Semua Seni").map((type) => (
            <Button
              key={type}
              variant={selectedType === type ? "default" : "outline"}
              onClick={() => setSelectedType(selectedType === type ? null : type)}
              className="w-full justify-start"
              size="sm"
            >
              {type}
            </Button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold text-sm">Kecamatan</h3>
        <select
          value={selectedKecamatan || ""}
          onChange={(e) => setSelectedKecamatan((e.target.value as Kecamatan) || null)}
          className="w-full border rounded-md p-2 text-sm"
        >
          <option value="">Semua Kecamatan</option>
          {KECAMATAN_LIST.map((kec) => (
            <option key={kec} value={kec}>
              {kec}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <section className="bg-primary/5 border-b py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4"
          >
            <h1 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-2">
              <Music className="h-8 w-8" />
              Daftar Sanggar Seni Bulukumba
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Temukan sanggar seni tradisional untuk pertunjukan dan pelatihan di Bulukumba
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <FilterControls />
              </CardContent>
            </Card>
          </aside>

          <main className="flex-1">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Cari sanggar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-2">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden gap-2">
                      <Filter className="h-4 w-4" />
                      Filter
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>Filter Sanggar</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterControls />
                    </div>
                  </SheetContent>
                </Sheet>

                <div className="hidden sm:flex border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="mb-4 text-sm text-muted-foreground">
              Menampilkan {filteredSanggars.length} sanggar
            </div>

            {error ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Terjadi kesalahan saat memuat data sanggar. Silakan coba lagi nanti.
                </AlertDescription>
              </Alert>
            ) : isLoading ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-5 space-y-4">
                      <Skeleton className="h-24 w-24 rounded-full mx-auto" />
                      <Skeleton className="h-4 w-32 mx-auto" />
                      <Skeleton className="h-10 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredSanggars.length === 0 ? (
              <Card>
                <CardContent className="py-16 text-center">
                  <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">Tidak Ada Sanggar Ditemukan</h3>
                  <p className="text-muted-foreground">Coba ubah filter atau kata kunci pencarian Anda</p>
                </CardContent>
              </Card>
            ) : (
              <div className={`grid gap-6 ${viewMode === "grid" ? "md:grid-cols-2 xl:grid-cols-3" : ""}`}>
                {filteredSanggars.map((sanggar) => (
                  <SanggarCard key={sanggar.id} sanggar={sanggar} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
