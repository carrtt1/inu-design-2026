import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import MaskIcon from "./MaskIcon";
import { IMAGES } from "../image.js";
import arrowIcon from "../assets/thxsparr.svg";
import spiral from "../assets/miniarraw.svg";
import artwork from "../assets/artwork.svg";
import bstar from "../assets/bstar.svg";
import { gradKeyFor } from "../gradImages";
import { getWorkMedia } from "../workMedia";

export default function WorkModal({ work, info, tab, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.documentElement.classList.add("modal-open");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("modal-open");
    };
  }, [onClose]);

  const title = info?.title ?? "";
  const name = info?.name ?? work.name;

  // 이미지·영상 목록 (DB 이름 → 표지 파일 이름 순으로 시도)
  const media = useMemo(() => {
    const a = getWorkMedia(name, work.no);
    return a.length ? a : getWorkMedia(work.name, work.no);
  }, [name, work.name, work.no]);

  const [index, setIndex] = useState(0);
  useEffect(() => setIndex(0), [work.no]);

  const count = media.length;
  const item = media[index];
  const go = (step) => setIndex((i) => (i + step + count) % count);

  // 키보드 ← →
  useEffect(() => {
    if (count < 2) return;
    const onKey = (e) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count]);

  // 모바일 좌우 스와이프
  const touchX = useRef(null);
  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchX.current == null || count < 2) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  return (
    <div className="work-modal" onClick={onClose}>
      <div
        className="work-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-label={`${title} ${name}`}
        style={{ "--bar-color": tab.barColor, "--box-color": tab.color }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="work-modal__bar">
          <img src={IMAGES.headerImg} alt="꾹 PRESS OUR MARK" className="work-modal__logo" />
          <button type="button" className="work-modal__close" onClick={onClose} aria-label="닫기">
            <img src={IMAGES.barX} alt="" />
          </button>
        </div>

        <div className="work-modal__body">
          <img src={spiral} alt="" className="work-modal__deco work-modal__deco--spiral" />
          <img src={artwork} alt="" className="work-modal__deco work-modal__deco--art" />
          <img src={tab.icon} alt="" className="work-modal__deco work-modal__deco--big" />
          <img src={tab.icon} alt="" className="work-modal__deco work-modal__deco--small spin-45" />
          <img src={bstar} alt="" className="work-modal__deco work-modal__deco--bstar" />

          <div className="work-modal__media">
            {count > 1 && (
              <button
                type="button"
                className="work-modal__nav work-modal__nav--prev"
                onClick={() => go(-1)}
                aria-label="이전 이미지"
              >
                <MaskIcon src={arrowIcon} className="work-modal__nav-icon" />
              </button>
            )}

            <div
              className={`work-modal__image ${item ? "has-media" : ""}`}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {item?.type === "video" && (
                <video
                  key={item.src}
                  src={item.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                />
              )}
              {item?.type === "image" && (
                <img key={item.src} src={item.src} alt={`${title} ${index + 1}`} />
              )}
            </div>

            {count > 1 && (
              <button
                type="button"
                className="work-modal__nav work-modal__nav--next"
                onClick={() => go(1)}
                aria-label="다음 이미지"
              >
                <MaskIcon src={arrowIcon} className="work-modal__nav-icon" />
              </button>
            )}

            {count > 1 && (
              <p className="work-modal__count">
                {index + 1} / {count}
              </p>
            )}
          </div>

          <div className="work-modal__text">
            <div className="work-modal__box">
              <MaskIcon src={arrowIcon} className="work-modal__arrow" />
              <p className="work-modal__desc">
                {info?.description ?? "작품 설명을 불러오는 중이에요."}
              </p>
            </div>
            <p className="work-modal__title">{title}</p>
            <Link
              to={`/designer/${encodeURIComponent(gradKeyFor(name, work.no))}`}
              className="work-modal__name work-modal__name-link"
            >
              {name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}