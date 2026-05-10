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
