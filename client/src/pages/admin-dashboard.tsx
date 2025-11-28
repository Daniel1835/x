import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic2, Camera, Palette, Music, Users, LogOut, List, Settings } from "lucide-react";
import type { MC, Photographer, Decorator, Sanggar } from "@shared/schema";

function useAdminAuth() {
  const [, navigate] = useLocation();
  
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return { logout };
}

export default function AdminDashboardPage() {
  const { logout } = useAdminAuth();

  const { data: mcs } = useQuery<MC[]>({
    queryKey: ["/api/mcs"],
  });

  const { data: photographers } = useQuery<Photographer[]>({
    queryKey: ["/api/photographers"],
  });

  const { data: decorators } = useQuery<Decorator[]>({
    queryKey: ["/api/decorators"],
  });

  const { data: sanggars } = useQuery<Sanggar[]>({
    queryKey: ["/api/sanggars"],
  });

  const stats = [
    {
      title: "Total MC",
      value: mcs?.length || 0,
      icon: Mic2,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      href: "/admin/mc",
    },
    {
      title: "Total Fotografer",
      value: photographers?.length || 0,
      icon: Camera,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      href: "/admin/fotografer",
    },
    {
      title: "Total Dekorator",
      value: decorators?.length || 0,
      icon: Palette,
      color: "text-pink-600",
      bgColor: "bg-pink-100",
      href: "/admin/dekorasi",
    },
    {
      title: "Total Sanggar",
      value: sanggars?.length || 0,
      icon: Music,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      href: "/admin/sanggar",
    },
  ];

  const menuItems = [
    { title: "Kelola MC", description: "Tambah, edit, atau hapus data MC", icon: Mic2, href: "/admin/mc" },
    { title: "Kelola Fotografer", description: "Tambah, edit, atau hapus data fotografer", icon: Camera, href: "/admin/fotografer" },
    { title: "Kelola Dekorator", description: "Tambah, edit, atau hapus data dekorator", icon: Palette, href: "/admin/dekorasi" },
    { title: "Kelola Sanggar", description: "Tambah, edit, atau hapus data sanggar", icon: Music, href: "/admin/sanggar" },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Settings className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Admin Panel</h1>
              <p className="text-xs text-muted-foreground">Direktori Layanan Acara Bulukumba</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                Lihat Website
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={logout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Dashboard</h2>
          <p className="text-muted-foreground">Selamat datang di panel admin</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <Link key={stat.title} href={stat.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Menu Kelola</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {menuItems.map((item) => (
              <Link key={item.title} href={item.href}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <List className="h-5 w-5" />
              Aktivitas Terbaru
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center py-8">
              Belum ada aktivitas terbaru
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
