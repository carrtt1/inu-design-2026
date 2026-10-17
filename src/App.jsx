import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import useRandomTheme from "./styles/useRandomTheme";
import MainPage from "./pages/MainPage";
import DesignPage from "./pages/DesignPage";

export default function App() {
  // 접속할 때 한 번만 테마를 정한다 (페이지를 옮겨도 유지)
  const theme = useRandomTheme();

  // 페이지를 옮기면 맨 위부터 보이게 (#about 처럼 위치가 정해진 경우는 제외)
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);

  return (
    <Routes>
      <Route path="/" element={<MainPage theme={theme} />} />
      <Route path="/design" element={<Navigate to="/design/visual" replace />} />
      <Route path="/design/:tab" element={<DesignPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}