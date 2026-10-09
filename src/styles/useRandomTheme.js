import { useEffect, useState } from "react";
import { pickRandomColorSet } from "./colorSets";

// 처음 mount 될 때 랜덤 컬러 세트를 골라 :root CSS 변수에 반영한다.
export default function useRandomTheme() {
  const [colorSet, setColorSet] = useState(null);

  useEffect(() => {
    const chosen = pickRandomColorSet();
    const root = document.documentElement;
    root.style.setProperty("--bg-primary", chosen.primary);
    root.style.setProperty("--bg-secondary", chosen.secondary);
    root.style.setProperty("--color-point", chosen.point);
    root.dataset.theme = chosen.name;
    setColorSet(chosen);
  }, []);

  return colorSet;
}
