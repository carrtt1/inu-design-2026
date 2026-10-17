import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import MaskIcon from "../components/MaskIcon";
import { DESIGN_TABS } from "../designTabs";
import { GRAD_LIST, getGradImage } from "../gradImages";
import { MAJOR_KO, getMockDesigner, withoutEmpty } from "../designerData";
import starIcon from "../assets/starIcon.svg";
import infoIcon from "../assets/infoicon.svg";
import designIcon from "../assets/designicon.svg";
import minipoint from "../assets/minipoint.svg";

export default function DesignerDetailPage() {
  const params = useParams();
  const name = String(params.name ?? "").normalize("NFC");
  const navigate = useNavigate();

  const [designer, setDesigner] = useState(() => getMockDesigner(name));
  const [input, setInput] = useState("");
  const [notFound, setNotFound] = useState("");

  useEffect(() => {
    setDesigner(getMockDesigner(name));
    setInput("");
    setNotFound("");

    let alive = true;
    fetch(`/api/designers?q=${encodeURIComponent(name)}`)
      .then((res) => (res.ok ? res.json() : []))
      .then((rows) => {
        const row = rows.find((r) => r.name === name);
        if (alive && row) setDesigner((prev) => ({ ...prev, ...withoutEmpty(row) }));
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [name]);

  if (!designer) return <Navigate to="/designer" replace />;

  const tab = DESIGN_TABS.find((t) => t.id === designer.major) ?? DESIGN_TABS[0];
  const photo = getGradImage(name);

  const onSubmit = (e) => {
    e.preventDefault();
    const q = input.trim().normalize("NFC");
    if (!q) return;
    const exact = GRAD_LIST.find((d) => d.name === q);
    const partial = GRAD_LIST.filter((d) => d.name.includes(q));
    const target = exact ?? (partial.length === 1 ? partial[0] : null);
    if (target) navigate(`/designer/${encodeURIComponent(target.name)}`);
    else setNotFound(q);
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
              }}
              placeholder={designer.name}
              enterKeyHint="search"
            />
          </label>
          <span className="designers__dot" aria-hidden="true" />
          <span className="designers__dot designers__dot--fill" aria-hidden="true" />
        </form>

        {notFound && (
          <p className="designers__msg" role="status">
            ‘{notFound}’ 디자이너를 찾을 수 없어요. 이름을 정확히 입력해 주세요.
          </p>
        )}

        <div className="profile__body">
          <div className="profile__visual">
            <img src={tab.finger} alt="" className="profile__finger" />
            {photo && <img src={photo} alt={`${designer.name} 사진`} className="profile__photo" />}
          </div>

          <div className="profile__info">
            <h1 className="profile__name">{designer.name}</h1>
            {designer.email && (
              <a className="profile__email" href={`mailto:${designer.email}`}>
                {designer.email}
              </a>
            )}
            <div className="profile__links">
              <Link to={`/design/${tab.id}`}>{designer.title} 바로가기</Link>
              <span>{designer.detail ?? MAJOR_KO[designer.major]}</span>
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