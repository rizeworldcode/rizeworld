import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";

// Referrer Routes
import ReferrerLogin from "./pages/referrer/ReferrerLogin";
import ReferrerForgetPassword from "./pages/referrer/ReferrerForgetPassword";
import ReferrerDashboard from "./pages/referrer/ReferrerDashboard";

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
        <Route path="/" element={<Navigate to="/referrer/login" replace />} />
        
        {/* Referrer Routes */}
        <Route path="/referrer/login" element={<ReferrerLogin />} />
        <Route path="/referrer/forget-password" element={<ReferrerForgetPassword />} />
        <Route path="/referrer/dashboard" element={<ReferrerDashboard />} />
        <Route path="/referrer/dashboard/:expandedStat" element={<ReferrerDashboard />} />
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
