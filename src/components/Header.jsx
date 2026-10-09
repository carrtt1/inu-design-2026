import { useEffect, useState } from "react";
import { MENU_ITEMS, SITE_TITLE } from "../content";
import Slot from "./Slot";
import { IMAGES } from "../image.js";
import MaskIcon from "./MaskIcon";

export default function Header() {
  const [open, setOpen] = useState(false);

  // ESC 로 닫기
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // 모바일에서 메뉴가 화면을 덮는 동안 뒤 페이지가 스크롤되지 않게 (CSS 에서 모바일만 적용)
  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    return () => document.documentElement.classList.remove("menu-open");
  }, [open]);

  return (
    <header className={`header${open ? " is-open" : ""}`}>
      <div className="header__bar">
        {/* 문구 ↔ 로고가 3초마다 위로 스크롤되듯 바뀐다 */}
        <div className="header__ticker">
          <div className="header__track">
            <p className="header__item header__title">{SITE_TITLE}</p>
            <div className="header__item">
              <img src={IMAGES.headerImg} alt="꾹 PRESS OUR MARK" className="header__logo" />
            </div>
            {/* 끊김 없이 반복되도록 첫 항목을 한 번 더 둔다 */}
            <p className="header__item header__title" aria-hidden="true">
              {SITE_TITLE}
            </p>
          </div>
        </div>
        <button
          type="button"
          className={`hamburger${open ? " is-open" : ""}`}
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <img src={IMAGES.barX} alt="" className="hamburger__close" />
          ) : (
            <>
              <span />
              <span />
              <span />
            </>
          )}
        </button>
      </div>

      {/* 오른쪽 밖에 숨어 있다가 우→좌로 나오고, 다시 누르면 좌→우로 들어간다 */}
      <div className="menu-clip">
        <nav id="site-menu" className={`menu${open ? " is-open" : ""}`} aria-hidden={!open}>
          <ul>
            {MENU_ITEMS.map((item) => (
              <li key={item.label}>
                <a href={item.href} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
                  <MaskIcon src={item.icon} className="menu__icon" />
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}