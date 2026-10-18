import { useEffect } from "react";
import MaskIcon from "./MaskIcon";
import { IMAGES } from "../image.js";
import arrowIcon from "../assets/thxsparr.svg";
import spiral from "../assets/miniarraw.svg";
import artwork from "../assets/artwork.svg";

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
          <img src={tab.icon} alt="" className="work-modal__deco work-modal__deco--small" />

          <div className="work-modal__image" />

          <div className="work-modal__text">
            <div className="work-modal__box">
              <MaskIcon src={arrowIcon} className="work-modal__arrow" />
              <p className="work-modal__desc">
                {info?.description ?? "작품 설명을 불러오는 중이에요."}
              </p>
            </div>
            <p className="work-modal__title">{title}</p>
            <p className="work-modal__name">{name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}