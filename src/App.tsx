import { Component, type ReactNode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultProviders } from "./components/providers/default";
import ScrollToTop from "./components/scroll-to-top";
import { PageTracker } from "./components/page-tracker";
import AuthCallback from "./pages/auth/Callback";
import Index from "./pages/Index";
import AdminServicesPage from "./pages/admin-services/page";
import DomoupravitelPage from "./pages/domoupravitel/page";
import ElKasierPage from "./pages/el-kasier/page";
import PropertyDetailPage from "./pages/imoti/page";
import AdminPage from "./pages/admin/page";
import NotFound from "./pages/NotFound";

class AppErrorBoundary extends Component<
  { children: ReactNode },
  { message: string | null }
> {
  state = { message: null };

  static getDerivedStateFromError(error: unknown) {
    return {
      message:
        error instanceof Error
          ? error.message
          : "Възникна грешка при зареждането.",
    };
  }

  componentDidCatch(error: unknown) {
    console.error("App render error", error);
  }

  render() {
    if (this.state.message) {
      return (
        <div className="min-h-screen bg-[oklch(0.13_0.04_255)] text-white flex items-center justify-center p-6">
          <div className="max-w-lg rounded-xl border border-white/10 bg-white/5 p-6 text-center">
            <h1 className="text-xl font-bold mb-2">Сайтът не се зареди</h1>
            <p className="text-white/70 text-sm">{this.state.message}</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  return (
    <AppErrorBoundary>
      <DefaultProviders>
        <BrowserRouter>
          <ScrollToTop />
          <PageTracker />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route
              path="/administrativni-uslugi"
              element={<AdminServicesPage />}
            />
            <Route path="/domoupravitel" element={<DomoupravitelPage />} />
            <Route path="/el-kasier" element={<ElKasierPage />} />
            <Route path="/imoti/:id" element={<PropertyDetailPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </DefaultProviders>
    </AppErrorBoundary>
  );
}
