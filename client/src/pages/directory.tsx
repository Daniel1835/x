import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearch, useLocation } from "wouter";
import { Filter, Grid3X3, List, Search, AlertCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MCCard } from "@/components/mc-card";
import { CategoryFilter } from "@/components/category-filter";
import { KecamatanFilter } from "@/components/kecamatan-filter";
import { SortSelect, type SortOption } from "@/components/sort-select";
import type { MC, ServiceCategory, Kecamatan } from "@shared/schema";
import { motion } from "framer-motion";

export default function DirectoryPage() {
  const searchParams = useSearch();
  const [, navigate] = useLocation();
  const params = new URLSearchParams(searchParams);

  const initialCategory = params.get("category") as ServiceCategory | null;
  const initialQuery = params.get("q") || "";
  const initialKecamatan = params.get("kecamatan") as Kecamatan | null;
  const initialSort = (params.get("sort") as SortOption) || "popular";
  const initialDate = params.get("date") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(initialCategory);
  const [selectedKecamatan, setSelectedKecamatan] = useState<Kecamatan | null>(initialKecamatan);
  const [sortBy, setSortBy] = useState<SortOption>(initialSort);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    const newParams = new URLSearchParams();
    if (searchQuery) newParams.set("q", searchQuery);
    if (selectedCategory) newParams.set("category", selectedCategory);
    if (selectedKecamatan) newParams.set("kecamatan", selectedKecamatan);
    if (sortBy !== "popular") newParams.set("sort", sortBy);
    if (selectedDate) newParams.set("date", selectedDate);
    
    const queryString = newParams.toString();
    const newPath = queryString ? `/direktori?${queryString}` : "/direktori";
    
    if (window.location.pathname + window.location.search !== newPath) {
      window.history.replaceState(null, "", newPath);
    }
  }, [searchQuery, selectedCategory, selectedKecamatan, sortBy, selectedDate]);

  const { data: mcs, isLoading, error } = useQuery<MC[]>({
    queryKey: ["/api/mcs"],
  });

  const filteredMCs = useMemo(() => {
    if (!mcs) return [];

    let result = [...mcs];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (mc) =>
          mc.name.toLowerCase().includes(query) ||
          mc.categories.some((c) => c.toLowerCase().includes(query)) ||
          mc.kecamatan.toLowerCase().includes(query)
      );
    }

    if (selectedCategory) {
      result = result.filter((mc) => mc.categories.includes(selectedCategory));
    }

    if (selectedKecamatan) {
      result = result.filter((mc) => mc.kecamatan === selectedKecamatan);
    }

    if (selectedDate) {
      result = result.filter((mc) => {
        if (!mc.availability) return true;
        const availabilityOnDate = mc.availability.find((a) => a.date === selectedDate);
        return availabilityOnDate && !availabilityOnDate.isBooked;
      });
    }

    if (sortBy === "popular") {
      result.sort((a, b) => b.viewCount - a.viewCount);
    } else {
      result.sort((a, b) => b.id.localeCompare(a.id));
    }

    return result;
  }, [mcs, searchQuery, selectedCategory, selectedKecamatan, sortBy, selectedDate]);

  const FilterControls = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-semibold text-sm flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Cari Berdasarkan Tanggal
        </h3>
        <Input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          data-testid="input-date-filter"
        />
        {selectedDate && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedDate("")}
            data-testid="button-clear-date"
          >
            Hapus Filter Tanggal
          </Button>
        )}
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold text-sm">Kategori Layanan</h3>
        <div className="flex flex-wrap gap-2">
          <CategoryFilter
            selected={selectedCategory}
            onSelect={setSelectedCategory}
            showAll
          />
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold text-sm">Kecamatan</h3>
        <KecamatanFilter
          selected={selectedKecamatan}
          onSelect={setSelectedKecamatan}
        />
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold text-sm">Urutkan</h3>
        <SortSelect selected={sortBy} onSelect={setSortBy} />
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
            <h1 className="text-3xl md:text-4xl font-bold">Daftar MC Bulukumba</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Temukan pembawa acara profesional untuk berbagai jenis event di Bulukumba
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
                  placeholder="Cari MC..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-directory"
                />
              </div>

              <div className="flex gap-2">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden gap-2" data-testid="button-filter-mobile">
                      <Filter className="h-4 w-4" />
                      Filter
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>Filter MC</SheetTitle>
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
                    data-testid="button-view-grid"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    data-testid="button-view-list"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="mb-4 text-sm text-muted-foreground">
              Menampilkan {filteredMCs.length} MC
              {selectedCategory && ` untuk kategori "${selectedCategory}"`}
              {selectedKecamatan && ` di ${selectedKecamatan}`}
              {selectedDate && ` yang tersedia pada ${new Date(selectedDate).toLocaleDateString("id-ID")}`}
            </div>

            {error ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Terjadi kesalahan saat memuat data MC. Silakan coba lagi nanti.
                </AlertDescription>
              </Alert>
            ) : isLoading ? (
              <div className={`grid gap-6 ${viewMode === "grid" ? "md:grid-cols-2 xl:grid-cols-3" : ""}`}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-5 space-y-4">
                      <div className="flex flex-col items-center">
                        <Skeleton className="h-24 w-24 rounded-full" />
                        <Skeleton className="h-6 w-32 mt-4" />
                        <Skeleton className="h-4 w-24 mt-2" />
                        <div className="flex gap-2 mt-4">
                          <Skeleton className="h-6 w-16 rounded-full" />
                          <Skeleton className="h-6 w-16 rounded-full" />
                        </div>
                        <Skeleton className="h-10 w-full mt-4" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredMCs.length === 0 ? (
              <Card>
                <CardContent className="py-16 text-center">
                  <div className="text-muted-foreground">
                    <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-semibold mb-2">Tidak Ada MC Ditemukan</h3>
                    <p>Coba ubah filter atau kata kunci pencarian Anda</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className={`grid gap-6 ${viewMode === "grid" ? "md:grid-cols-2 xl:grid-cols-3" : ""}`}>
                {filteredMCs.map((mc, index) => (
                  <MCCard key={mc.id} mc={mc} index={index} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
