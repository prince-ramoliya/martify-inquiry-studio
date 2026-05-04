import { Navigate, Route, Routes } from "react-router-dom";
import { AdminGuard } from "@/components/AdminGuard";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AuthProvider } from "@/hooks/useAuth";
import AdminCategories from "./AdminCategories";
import AdminDashboard from "./AdminDashboard";
import AdminHero from "./AdminHero";
import AdminLogin from "./AdminLogin";
import AdminProducts from "./AdminProducts";
import AdminSettings from "./AdminSettings";
import AdminSetup from "./AdminSetup";

const AdminRoutes = () => (
  <AuthProvider>
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route path="setup" element={<AdminSetup />} />
      <Route element={<AdminGuard><AdminLayout /></AdminGuard>}>
        <Route index element={<AdminDashboard />} />
        <Route path="hero" element={<AdminHero />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  </AuthProvider>
);

export default AdminRoutes;