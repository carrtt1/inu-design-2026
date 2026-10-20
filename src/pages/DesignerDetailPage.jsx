import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import MaskIcon from "../components/MaskIcon";
import { DESIGN_TABS } from "../designTabs";
import { GRAD_LIST, findGrad, getGradImage } from "../gradImages";
import { MAJOR_KO, getMockDesigner, withoutEmpty } from "../designerData";
import starIcon from "../assets/starIcon.svg";
import infoIcon from "../assets/infoicon.svg";
import designIcon from "../assets/designicon.svg";
import minipoint from "../assets/minipoint.svg";

export default function DesignerDetailPage() {
  const params = useParams();
  const key = String(params.name ?? "").normalize("NFC");
  const entry = findGrad(key);
  const navigate = useNavigate();

  const [designer, setDesigner] = useState(() => getMockDesigner(key));
  const [input, setInput] = useState("");
  const [notFound, setNotFound] = useState("");
  const [choices, setChoices] = useState([]);

  useEffect(() => {
    setChoices([]);
  }, [key]);

  useEffect(() => {
    if (choices.length === 0) return;
    const onKey = (e) => {
      if (e.key === "Escape") setChoices([]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [choices]);

  useEffect(() => {
    setDesigner(getMockDesigner(key));
    setInput("");
    setNotFound("");
    if (!entry) return;

    let alive = true;
    fetch(`/api/designers?q=${encodeURIComponent(entry.name)}`)
      .then((res) => (res.ok ? res.json() : []))
      .then((rows) => {
        const row = entry.coverNo
          ? rows.find((r) => r.cover_no === entry.coverNo)
          : rows.find((r) => r.name === entry.name);
        if (alive && row) setDesigner((prev) => ({ ...prev, ...withoutEmpty(row) }));
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [key]);

  if (!designer) return <Navigate to="/designer" replace />;

  const tab = DESIGN_TABS.find((t) => t.id === designer.major) ?? DESIGN_TABS[0];
  const photo = getGradImage(key);
  
  const onSubmit = async (e) => {
    e.preventDefault();
    const q = input.trim().normalize("NFC");
    if (!q) return;

    setNotFound("");
    setChoices([]);

    const exact = GRAD_LIST.filter((d) => d.name === q);
    const partial = GRAD_LIST.filter((d) => d.name.includes(q));

    if (exact.length === 1) {
      navigate(`/designer/${encodeURIComponent(exact[0].key)}`);
      return;
    }

    if (exact.length > 1) {
      let titleByNo = {};
      try {
        const res = await fetch(`/api/designers?q=${encodeURIComponent(q)}`);
        if (res.ok) {
          const rows = await res.json();
          (Array.isArray(rows) ? rows : rows.rows ?? []).forEach((r) => {
            titleByNo[r.cover_no] = r.title;
          });
        }
      } catch {
        titleByNo = {};
      }

      setChoices(
        exact.map((d) => ({
          key: d.key,
          label: `${d.name} (${titleByNo[d.coverNo] ?? `${d.coverNo}번`})`,
        }))
      );
      return;
    }

    if (partial.length > 1) {
      navigate(`/designer?q=${encodeURIComponent(q)}`);
    } else if (partial.length === 1) {
      navigate(`/designer/${encodeURIComponent(partial[0].key)}`);
    } else {
      setNotFound(q);
    }
  };

  return (
    <div
      className="page designers-page"
      style={{
        "--bg-secondary": tab.color,
        "--color-point": tab.point,
        "--tab-color": tab.color,
      }}
    >
      <Header />

      <main className="profile">
        <form className="designers__search" onSubmit={onSubmit} role="search">
          <span className="designers__dot designers__dot--fill" aria-hidden="true" />
          <span className="designers__dot" aria-hidden="true" />
          <label className="designers__field">
            <span className="visually-hidden">디자이너 이름 검색 (입력 후 엔터)</span>
            <input
              type="search"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setNotFound("");
                setChoices([]);
              }}
              placeholder={designer.name}
              enterKeyHint="search"
            />
          </label>
          <span className="designers__dot" aria-hidden="true" />
          <span className="designers__dot designers__dot--fill" aria-hidden="true" />
        </form>
      {choices.length > 0 && (
        <div className="choice-popup" onClick={() => setChoices([])}>
          <div
            className="choice-popup__panel"
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="choice-popup__list">
              {choices.map((c) => (
                <li key={c.key}>
                  <Link
                    to={`/designer/${encodeURIComponent(c.key)}`}
                    className="choice-popup__item"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
        {notFound && (
          <p className="designers__msg" role="status">
            ‘{notFound}’ 디자이너를 찾을 수 없어요. 이름을 정확히 입력해 주세요.
          </p>
        )}

        <div className="profile__body">
          {photo && (
            <div className="profile__visual">
              <img src={photo} alt={`${designer.name} 사진`} className="profile__photo" />
            </div>
          )}

          <div className="profile__info">
            <h1 className="profile__name">{designer.name}</h1>
            {designer.email && (
              <a className="profile__email" href={`mailto:${designer.email}`}>
                {designer.email}
              </a>
            )}
            <div className="profile__links">
              <Link
                to={
                  designer.cover_no
                    ? `/design/${tab.id}?work=${designer.cover_no}`
                    : `/design/${tab.id}`
                }
              >
                <span className="profile__work-title">{designer.title}</span>
                <svg
                  className="profile__dot-arrow"
                  viewBox="0 0 20 12"
                  aria-hidden="true"
                >
                  <line
                    x1="0" y1="6" x2="13" y2="6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeDasharray="2 3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 1.5 L18.5 6 L12 10.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <span>{MAJOR_KO[designer.major]}</span>
            </div>
          </div>
        </div>

        <Link to="/designer" className="profile__star" aria-label="디자이너 목록으로">
          <MaskIcon src={starIcon} />
        </Link>
      </main>

      <nav className="profile__more" aria-label="더 보기">
        <div className="profile__more-links">
          <Link to="/#about" className="profile__more-link">
            <MaskIcon src={infoIcon} className="profile__more-icon" />
            <span>PRESS - 전시 정보</span>
          </Link>
          <Link to={`/design/${tab.id}`} className="profile__more-link">
            <MaskIcon src={designIcon} className="profile__more-icon" />
            <span>PRESS - 디자인</span>
          </Link>
        </div>
        <Link to="/designer" className="profile__more-star" aria-label="디자이너 목록으로">
          <MaskIcon src={minipoint} />
        </Link>
      </nav>
    </div>
  );
}