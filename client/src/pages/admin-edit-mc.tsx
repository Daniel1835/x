import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Settings } from "lucide-react";
import { SERVICE_CATEGORIES, KECAMATAN_LIST, type MC } from "@shared/schema";

const editMcSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  whatsapp: z.string().min(10, "Nomor WhatsApp tidak valid"),
  kecamatan: z.enum(KECAMATAN_LIST),
  categories: z.array(z.enum(SERVICE_CATEGORIES)).min(1, "Pilih minimal 1 kategori"),
  photo: z.string().min(1, "URL foto harus diisi"),
  description: z.string().min(20, "Deskripsi minimal 20 karakter"),
  priceRange: z.string().optional(),
  videoPortfolio: z.string().optional(),
});

type EditMCFormData = z.infer<typeof editMcSchema>;

function useAdminAuth() {
  const [, navigate] = useLocation();
  
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);
}

export default function AdminEditMCPage() {
  useAdminAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, navigate] = useLocation();
  const params = useParams<{ id: string }>();
  const mcId = params.id;

  const { data: mc, isLoading } = useQuery<MC>({
    queryKey: [`/api/mcs/${mcId}`],
    enabled: !!mcId,
  });

  const form = useForm<EditMCFormData>({
    resolver: zodResolver(editMcSchema),
    defaultValues: {
      name: "",
      whatsapp: "",
      kecamatan: "Ujung Bulu",
      categories: [],
      photo: "",
      description: "",
      priceRange: "",
      videoPortfolio: "",
    },
  });

  useEffect(() => {
    if (mc) {
      form.reset({
        name: mc.name,
        whatsapp: mc.whatsapp,
        kecamatan: mc.kecamatan,
        categories: mc.categories,
        photo: mc.photo,
        description: mc.description,
        priceRange: mc.priceRange || "",
        videoPortfolio: mc.videoPortfolio || "",
      });
    }
  }, [mc, form]);

  const updateMutation = useMutation({
    mutationFn: async (data: EditMCFormData) => {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`/api/admin/mc/${mcId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Gagal memperbarui MC");
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/mcs"] });
      queryClient.invalidateQueries({ queryKey: [`/api/mcs/${mcId}`] });
      toast({
        title: "Berhasil",
        description: "Data MC berhasil diperbarui",
      });
      navigate("/admin/mc");
    },
    onError: (error: Error) => {
      toast({
        title: "Gagal",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: EditMCFormData) => {
    updateMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Memuat data...</p>
      </div>
    );
  }

  if (!mc) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">MC tidak ditemukan</p>
          <Link href="/admin/mc">
            <Button>Kembali ke Daftar MC</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/admin/mc">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Settings className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Edit MC</h1>
              <p className="text-xs text-muted-foreground">{mc.name}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Edit Data MC</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Lengkap</FormLabel>
                      <FormControl>
                        <Input placeholder="Nama MC" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="whatsapp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nomor WhatsApp</FormLabel>
                      <FormControl>
                        <Input placeholder="628xxxxxxxxxx" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="kecamatan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kecamatan</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih kecamatan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {KECAMATAN_LIST.map((kec) => (
                            <SelectItem key={kec} value={kec}>
                              {kec}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categories"
                  render={() => (
                    <FormItem>
                      <FormLabel>Kategori Acara</FormLabel>
                      <div className="grid grid-cols-2 gap-3">
                        {SERVICE_CATEGORIES.map((category) => (
                          <FormField
                            key={category}
                            control={form.control}
                            name="categories"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(category)}
                                    onCheckedChange={(checked) => {
                                      const value = field.value || [];
                                      if (checked) {
                                        field.onChange([...value, category]);
                                      } else {
                                        field.onChange(value.filter((v) => v !== category));
                                      }
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  {category}
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="photo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL Foto</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deskripsi</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Deskripsi tentang MC..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="priceRange"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kisaran Harga</FormLabel>
                      <FormControl>
                        <Input placeholder="Rp 500.000 - Rp 1.000.000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="videoPortfolio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Link Video Portfolio (Opsional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://youtube.com/..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-4">
                  <Link href="/admin/mc" className="flex-1">
                    <Button type="button" variant="outline" className="w-full">
                      Batal
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    className="flex-1 gap-2"
                    disabled={updateMutation.isPending}
                  >
                    <Save className="h-4 w-4" />
                    {updateMutation.isPending ? "Menyimpan..." : "Simpan Perubahan"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
