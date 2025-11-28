import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2, CheckCircle, Paintbrush } from "lucide-react";
import { SiInstagram, SiFacebook, SiTiktok } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
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
import { insertDecoratorSchema, KECAMATAN_LIST, DECORATOR_TYPES, type InsertDecorator } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { motion } from "framer-motion";

export default function DecoratorRegisterPage() {
  const { toast } = useToast();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<InsertDecorator>({
    resolver: zodResolver(insertDecoratorSchema),
    defaultValues: {
      name: "",
      whatsapp: "",
      kecamatan: undefined,
      types: [],
      photo: "",
      description: "",
      priceRange: "",
      socialMedia: {
        instagram: "",
        facebook: "",
        tiktok: "",
      },
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertDecorator) => {
      return apiRequest("POST", "/api/decorators", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/decorators"] });
      setIsSuccess(true);
      toast({
        title: "Pendaftaran Berhasil!",
        description: "Profil Dekorasi Anda akan segera ditampilkan di website.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Pendaftaran Gagal",
        description: error.message || "Terjadi kesalahan. Silakan coba lagi.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertDecorator) => {
    if (!data.photo) {
      data.photo = `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=f472b6&color=fff&size=256`;
    }
    mutation.mutate(data);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4 max-w-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="text-center">
              <CardContent className="py-12">
                <CheckCircle className="h-16 w-16 mx-auto text-green-500 mb-6" />
                <h2 className="text-2xl font-bold mb-4">Pendaftaran Berhasil!</h2>
                <p className="text-muted-foreground mb-6">
                  Terima kasih telah mendaftar. Profil Dekorasi Anda akan segera ditampilkan di direktori kami.
                </p>
                <Button onClick={() => setIsSuccess(false)}>Daftar Dekorasi Lainnya</Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Paintbrush className="h-8 w-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold">Daftarkan Dekorasi Anda</h1>
            </div>
            <p className="text-muted-foreground">
              Isi formulir di bawah untuk menampilkan profil Anda di direktori YSMS
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Formulir Pendaftaran Dekorasi</CardTitle>
              <CardDescription>Semua field bertanda * wajib diisi</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Usaha *</FormLabel>
                        <FormControl>
                          <Input placeholder="Contoh: Ira Decorasi" {...field} />
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
                        <FormLabel>Nomor WhatsApp *</FormLabel>
                        <FormControl>
                          <Input placeholder="Contoh: 6281234567890" {...field} />
                        </FormControl>
                        <FormDescription>Gunakan format internasional (62xxx)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="kecamatan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kecamatan *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih Kecamatan" />
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
                    name="types"
                    render={() => (
                      <FormItem>
                        <FormLabel>Jenis Dekorasi *</FormLabel>
                        <FormDescription>Pilih satu atau lebih jenis dekorasi yang Anda tawarkan</FormDescription>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          {DECORATOR_TYPES.map((type) => (
                            <FormField
                              key={type}
                              control={form.control}
                              name="types"
                              render={({ field }) => (
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(type)}
                                      onCheckedChange={(checked) => {
                                        const current = field.value || [];
                                        if (checked) {
                                          field.onChange([...current, type]);
                                        } else {
                                          field.onChange(current.filter((c) => c !== type));
                                        }
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">{type}</FormLabel>
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
                        <FormLabel>URL Foto Profil</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/foto.jpg" {...field} />
                        </FormControl>
                        <FormDescription>Kosongkan jika tidak ada, foto akan digenerate otomatis</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="priceRange"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kisaran Harga (Opsional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Contoh: Rp 2.000.000 - Rp 5.000.000" {...field} />
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
                        <FormLabel>Deskripsi Singkat *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Ceritakan tentang pengalaman dan keahlian dekorasi Anda..."
                            className="min-h-[120px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Media Sosial (Opsional)</h3>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="socialMedia.instagram"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <SiInstagram className="h-4 w-4 text-pink-500" />
                              Instagram
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Nama akun (tanpa @)" {...field} />
                            </FormControl>
                            <FormDescription>Contoh: ira.decorasi</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="socialMedia.facebook"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <SiFacebook className="h-4 w-4 text-blue-600" />
                              Facebook
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Nama akun atau URL" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="socialMedia.tiktok"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <SiTiktok className="h-4 w-4" />
                              TikTok
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Nama akun (@username)" {...field} />
                            </FormControl>
                            <FormDescription>Contoh: @ira_decorasi atau ira_decorasi</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Mengirim...
                      </>
                    ) : (
                      "Kirim & Tampilkan di Website"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
