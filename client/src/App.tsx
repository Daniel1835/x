import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import HomePage from "@/pages/home";
import DirectoryPage from "@/pages/directory";
import MCProfilePage from "@/pages/mc-profile";
import RegisterPage from "@/pages/register";
import PhotographerDirectoryPage from "@/pages/photographer-directory";
import PhotographerProfilePage from "@/pages/photographer-profile";
import PhotographerRegisterPage from "@/pages/photographer-register";
import DecoratorDirectoryPage from "@/pages/decorator-directory";
import DecoratorProfilePage from "@/pages/decorator-profile";
import DecoratorRegisterPage from "@/pages/decorator-register";
import SanggarDirectoryPage from "@/pages/sanggar-directory";
import SanggarProfilePage from "@/pages/sanggar-profile";
import SanggarRegisterPage from "@/pages/sanggar-register";
import BlogPage from "@/pages/blog";
import BlogArticlePage from "@/pages/blog-article";
import ContactPage from "@/pages/contact";
import NotFound from "@/pages/not-found";
import AdminLoginPage from "@/pages/admin-login";
import AdminDashboardPage from "@/pages/admin-dashboard";
import AdminMCListPage from "@/pages/admin-mc-list";
import AdminEditMCPage from "@/pages/admin-edit-mc";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/direktori" component={DirectoryPage} />
      <Route path="/mc/:id" component={MCProfilePage} />
      <Route path="/daftar" component={RegisterPage} />
      <Route path="/fotografer" component={PhotographerDirectoryPage} />
      <Route path="/fotografer/:id" component={PhotographerProfilePage} />
      <Route path="/daftar-fotografer" component={PhotographerRegisterPage} />
      <Route path="/dekorasi" component={DecoratorDirectoryPage} />
      <Route path="/dekorasi/:id" component={DecoratorProfilePage} />
      <Route path="/daftar-dekorasi" component={DecoratorRegisterPage} />
      <Route path="/sanggar" component={SanggarDirectoryPage} />
      <Route path="/sanggar/:id" component={SanggarProfilePage} />
      <Route path="/daftar-sanggar" component={SanggarRegisterPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/blog/:id" component={BlogArticlePage} />
      <Route path="/kontak" component={ContactPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AdminRouter() {
  return (
    <Switch>
      <Route path="/admin/login" component={AdminLoginPage} />
      <Route path="/admin/dashboard" component={AdminDashboardPage} />
      <Route path="/admin/mc" component={AdminMCListPage} />
      <Route path="/admin/mc/edit/:id" component={AdminEditMCPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();
  const isAdminRoute = location.startsWith("/admin");

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {isAdminRoute ? (
          <AdminRouter />
        ) : (
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <Router />
            </main>
            <Footer />
          </div>
        )}
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
