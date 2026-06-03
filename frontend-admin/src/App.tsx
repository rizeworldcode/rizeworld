import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";

// Admin Routes
import AdminLogin from "./pages/admin/AdminLogin";
import AdminForgetPassword from "./pages/admin/AdminForgetPassword";
import AdminDashboard from "./pages/admin/AdminDashboard";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

function MainLayout() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Routes>
        <Route path="/" element={<Navigate to="/admin/login" replace />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/forget-password" element={<AdminForgetPassword />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/dashboard/:tab" element={<AdminDashboard />} />
        <Route path="/admin/dashboard/:tab/:subview" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <ScrollToTop />
      <MainLayout />
    </BrowserRouter>
  );
}
