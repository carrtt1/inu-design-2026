import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import { GRAD_LIST } from "../gradImages";
import { Link } from "react-router-dom";

export default function DesignerPage() {
  const [query, setQuery] = useState("");
  const [infoByName, setInfoByName] = useState({});

  useEffect(() => {
    fetch("/api/designers")
      .then((res) => (res.ok ? res.json() : []))
      .then((rows) => setInfoByName(Object.fromEntries(rows.map((r) => [r.name, r]))))
      .catch(() => {});
  }, []);

  const results = useMemo(() => {
    const q = query.trim();
    return q ? GRAD_LIST.filter((d) => d.name.includes(q)) : GRAD_LIST;
  }, [query]);

  return (
    <div className="page designers-page">
      <Header />

      <main className="designers">
        <div className="designers__search">
          <span className="designers__dot designers__dot--fill" aria-hidden="true" />
          <span className="designers__dot" aria-hidden="true" />
          <label className="designers__field">
            <span className="visually-hidden">디자이너 이름 검색</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="디자이너의 이름을 꾹 입력해 보세요 !"
            />
          </label>
          <span className="designers__dot" aria-hidden="true" />
          <span className="designers__dot designers__dot--fill" aria-hidden="true" />
        </div>

        {results.length === 0 ? (
          <p className="designers__msg">‘{query}’ 디자이너를 찾을 수 없어요.</p>
        ) : (
          <ul className="designers__grid">
            {results.map((d) => {
              const info = infoByName[d.name];
              return (
                <li className="designer-card" key={d.key}>
                  <Link to={`/designer/${encodeURIComponent(d.key)}`} aria-label={`${d.name} 디자이너 보기`}>
                    {d.src ? (
                      <img
                        src={d.src}
                        alt={d.name}
                        title={info?.title ? `${d.name} · ${info.title}` : d.name}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <span className="designer-card__empty" title={d.name} />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </div>
  );
}