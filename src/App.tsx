import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultProviders } from "./components/providers/default.tsx";
import ScrollToTop from "./components/scroll-to-top.tsx";
import { PageTracker } from "./components/page-tracker.tsx";
import AuthCallback from "./pages/auth/Callback.tsx";
import Index from "./pages/Index.tsx";
import AdminServicesPage from "./pages/admin-services/page.tsx";
import DomoupravitelPage from "./pages/domoupravitel/page.tsx";
import ElKasierPage from "./pages/el-kasier/page.tsx";
import PropertyDetailPage from "./pages/imoti/page.tsx";
import AdminPage from "./pages/admin/page.tsx";
import NotFound from "./pages/NotFound.tsx";

export default function App() {
  return (
    <DefaultProviders>
      <BrowserRouter>
        <ScrollToTop />
        <PageTracker />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/administrativni-uslugi" element={<AdminServicesPage />} />
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
  );
}
