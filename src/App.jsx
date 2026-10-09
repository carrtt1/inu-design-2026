import useRandomTheme from "./styles/useRandomTheme";
import { ABOUT, SITE_TITLE } from "./content";
import Header from "./components/Header";
import Slot from "./components/Slot";
import { IMAGES } from "./image.js";
import { Fragment, useEffect, useState } from "react";
import MaskIcon from "./components/MaskIcon";
import { FINGER_LINES, lineStyle, iconStyle, markStyle } from "./fingerLines";
import minipoint from "./assets/minipoint.svg";


export default function App() {
  const theme = useRandomTheme();
  // 지금 눌려 있는 아이콘 (없으면 null)
  const [activeId, setActiveId] = useState(null);
  const active = FINGER_LINES.find((item) => item.id === activeId);

  // 아이콘이 아닌 곳을 누르면 선택 해제
  useEffect(() => {
    if (!activeId) return;
    const onClick = (e) => {
      if (!e.target.closest(".hero__icon")) setActiveId(null);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [activeId]);

  return (
    <div className="page">
      <Header />

      <main>
        <section className="hero">
          <Slot src={theme?.mobilePoster} alt="꾹 PRESS OUR MARK" className="hero__mobile" />
          <div className="hero__inner">
            <div className="hero__left">
              <Slot src={theme?.mainLogo} alt="꾹 PRESS OUR MARK 로고" className="hero__logo" />
              <p className="hero__tagline">
                지문의 열두 가지 요소를 ‘{" "}
                <span className="hero__press">
                  {theme?.smallFinger && (
                    <img src={theme.smallFinger} alt="" className="hero__press-bg" />
                  )}
                  <span className="hero__press-text">꾹 PRESS</span>
                </span>{" "}
                ’ 해 보세요!
              </p>
              <div className="hero__box slot slot--outlined" aria-live="polite">
                {active && (
                  <div className="hero__info" key={active.id}>
                    <div className="hero__info-head">
                      <strong className="hero__info-title">
                        {active.no}. {active.title}
                      </strong>
                      <div className="hero__info-icons">
                        {[0, 1, 2].map((i) => (
                          <MaskIcon
                            key={i}
                            src={active.icon}
                            className="hero__info-icon"
                            style={{ aspectRatio: active.iconSize.join(" / ") }}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="hero__info-text">{active.desc}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="hero__finger-wrap">
              <Slot src={theme?.fingerprint} alt="지문 일러스트" className="hero__fingerprint" />
                {theme?.fingerprint && active && (
                  <MaskIcon
                    key={active.id}
                    src={active.icon}
                    className="hero__mark"
                    style={markStyle(active)}
                  />
                )}
              {theme?.fingerprint &&
                FINGER_LINES.map((item) => (
                  <Fragment key={item.id}>
                    <img src={item.line} alt="" className="hero__line" style={lineStyle(item)} />
                    <button
                      type="button"
                      className={`hero__icon hero__icon--${item.iconSide}${
                        activeId === item.id ? " is-active" : ""
                      }`}
                      style={iconStyle(item)}
                      aria-label={item.title}
                      aria-pressed={activeId === item.id}
                      onClick={() => setActiveId(activeId === item.id ? null : item.id)}
                    >
                      <MaskIcon src={item.icon} />
                    </button>
                  </Fragment>
                ))}
            </div>
          </div>
        </section>

        <section className="about" id="about">
          <div className="about__inner">
            <div className="about__points">
              <MaskIcon src={minipoint} className="about__point" style={{ color: theme?.point }} />
              <MaskIcon src={minipoint} className="about__point" style={{ color: theme?.point }} />
            </div>
            <h1 className="about__heading">
              {ABOUT.heading.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h1>
            <div className="about__body">
              {ABOUT.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer__inner">
          <div>
            <p className="footer__title">2026 인천대학교 디자인학부 졸업 전시회</p>
            <p className="footer__sub">
              Incheon National University’s Division of Design Graduation exhibition 2026
            </p>
            <p className="footer__copy">© 2026 INUD. All rights reserved.</p>
          </div>
          <div className="footer__logos">
            <Slot src={IMAGES.oneulLogo} alt="오늘" className="footer__logo footer__logo--wide" />
            <Slot src={IMAGES.inuLogo} alt="인천대학교" className="footer__logo" />
            <Slot src={IMAGES.inuTextLogo} alt="INU 인천대학교" className="footer__logo" />
          </div>
        </div>
      </footer>
      <span hidden>{SITE_TITLE}</span>
    </div>
  );
}