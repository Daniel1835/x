import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, AlertCircle, Loader2 } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { WHATSAPP_ADMIN, EMAIL_ADMIN } from "@/lib/constants";
import { contactFormSchema, type ContactForm } from "@shared/schema";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "Pesan Terkirim!",
      description: "Terima kasih, kami akan segera menghubungi Anda.",
    });
    
    form.reset();
    setIsSubmitting(false);
  };

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
            <h1 className="text-3xl md:text-4xl font-bold">Hubungi Kami</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Punya pertanyaan atau ingin bekerja sama? Jangan ragu untuk menghubungi kami
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>Informasi Kontak</CardTitle>
                <CardDescription>
                  Hubungi kami melalui salah satu cara berikut
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <a
                  href={`https://wa.me/${WHATSAPP_ADMIN}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-lg border hover-elevate transition-all"
                  data-testid="link-contact-whatsapp"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366]">
                    <SiWhatsapp className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">WhatsApp Admin</h3>
                    <p className="text-sm text-muted-foreground">+62 812-3456-7890</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Respon cepat dalam 1x24 jam
                    </p>
                  </div>
                </a>

                <a
                  href={`mailto:${EMAIL_ADMIN}`}
                  className="flex items-start gap-4 p-4 rounded-lg border hover-elevate transition-all"
                  data-testid="link-contact-email"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                    <Mail className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-sm text-muted-foreground">{EMAIL_ADMIN}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Untuk kerja sama dan pertanyaan
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 rounded-lg border">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Lokasi</h3>
                    <p className="text-sm text-muted-foreground">Bulukumba, Sulawesi Selatan</p>
                    <p className="text-xs text-muted-foreground mt-1">Indonesia</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Penting:</strong> Website ini hanya direktori. Transaksi dilakukan langsung antara pengguna dan MC. Kami tidak bertanggung jawab atas transaksi di luar platform.
              </AlertDescription>
            </Alert>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Kirim Pesan</CardTitle>
                <CardDescription>
                  Isi formulir di bawah dan kami akan menghubungi Anda
                </CardDescription>
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
                            <Input placeholder="Nama Anda" {...field} data-testid="input-contact-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="email@example.com"
                              {...field}
                              data-testid="input-contact-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pesan</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tulis pesan Anda di sini..."
                              className="min-h-[120px] resize-none"
                              {...field}
                              data-testid="input-contact-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                      data-testid="button-submit-contact"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Mengirim...
                        </>
                      ) : (
                        "Kirim Pesan"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
