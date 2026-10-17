import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import useRandomTheme from "./styles/useRandomTheme";
import MainPage from "./pages/MainPage";
import DesignPage from "./pages/DesignPage";
import DesignerPage from "./pages/DesignerPage";
import DesignerDetailPage from "./pages/DesignerDetailPage";

export default function App() {
  const theme = useRandomTheme();
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);

  return (
    <Routes>
      <Route path="/" element={<MainPage theme={theme} />} />
      <Route path="/design" element={<Navigate to="/design/visual" replace />} />
      <Route path="/design/:tab" element={<DesignPage />} />
      <Route path="/designer" element={<DesignerPage />} />
      <Route path="/designer/:name" element={<DesignerDetailPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}