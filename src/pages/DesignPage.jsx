import { Link, Navigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { DESIGN_TABS } from "../designTabs";
import MaskIcon from "../components/MaskIcon";
import arrowIcon from "../assets/thxsparr.svg";
import { WORKS } from "../designWorks";

function TabLabel({ tab }) {
  return (
    <>
      <img src={tab.icon} alt="" className="design-nav__icon" />
      <span className="design-nav__ko">{tab.ko}</span>
      <span className="design-nav__en">{tab.en}</span>
    </>
  );
}

export default function DesignPage() {
  const { tab: tabId } = useParams();
  const current = DESIGN_TABS.find((t) => t.id === tabId);

  if (!current) return <Navigate to="/design/visual" replace />;

  const [lower, upper] = DESIGN_TABS.filter((t) => t.id !== current.id);

  const works = WORKS[current.id] ?? [];
  const emptyPc = (5 - (works.length % 5)) % 5;
  const emptyMo = (4 - (works.length % 4)) % 4;
  const emptyCount = Math.max(emptyPc, emptyMo);

  return (
    <div
      className="page design-page"
      style={{
        "--bg-primary": "#000000",
        "--bg-secondary": current.color,
        "--color-point": current.point,
        "--tab-color": current.color,
      }}
    >
      <Header />

      <main>
        <nav className="design-nav" aria-label="디자인 전공">
          <div className="design-nav__stage">
            <Link
              key={`current-${current.id}`}
              to={`/design/${current.id}`}
              reloadDocument
              className={`design-nav__item design-nav__item--current design-nav__item--${current.id}`}
              aria-current="page"
            >
              <TabLabel tab={current} />
            </Link>
            <Link to="/" className="design-nav__logo" aria-label="메인 페이지로">
              <img src={current.logo} alt="" />
            </Link>
            <Link
              to={`/design/${lower.id}`}
              className={`design-nav__item design-nav__item--lower design-nav__item--${lower.id}`}
            >
              <TabLabel tab={lower} />
            </Link>
            <Link
              to={`/design/${upper.id}`}
              className={`design-nav__item design-nav__item--upper design-nav__item--${upper.id}`}
            >
              <TabLabel tab={upper} />
            </Link>
          </div>
        </nav>
        <div className="design-bar" style={{ "--bar-color": current.barColor }}>
          <div className="design-bar__inner">
            <div className="design-bar__icons" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <MaskIcon key={i} src={current.icon} className="design-bar__icon" />
              ))}
            </div>
            <div className="design-bar__order" aria-label="ㄱ부터 ㅎ 순">
              <span aria-hidden="true">ㄱ</span>
              <MaskIcon src={arrowIcon} className="design-bar__arrow" />
              <span aria-hidden="true">ㅎ</span>
            </div>
          </div>
        </div>

        <section className="design-grid" aria-label={`${current.ko} 작품`}>
          {works.map((work) => (
            <div className="design-card" key={work.id}>
              <img src={work.src} alt={`${work.name} 작품`} loading="lazy" />
            </div>
          ))}
          {Array.from({ length: emptyCount }, (_, i) => (
            <div
              key={`empty-${i}`}
              aria-hidden="true"
              className={[
                "design-card",
                "design-card--empty",
                i < emptyPc ? "" : "design-card--mo-only",
                i < emptyMo ? "" : "design-card--pc-only",
              ].join(" ")}
            >
              <img src={current.icon} alt="" />
            </div>
          ))}
          {works.length > 0 && (emptyPc === 0 || emptyMo === 0) && (
            <div
              aria-hidden="true"
              className={[
                "design-grid__end",
                emptyPc === 0 ? "" : "design-card--mo-only",
                emptyMo === 0 ? "" : "design-card--pc-only",
              ].join(" ")}
            >
              <img src={current.icon} alt="" />
            </div>
          )}
        </section>
      </main>
    </div>
  );
}