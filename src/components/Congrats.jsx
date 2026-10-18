import { useState } from "react";
import MaskIcon from "./MaskIcon";
import minipoint from "../assets/minipoint.svg";
import arrow from "../assets/thxsparr.svg";
import { CONGRATS, CREDITS } from "../congrats";

export default function Congrats({ pointColor }) {
  const [index, setIndex] = useState(0);
  const message = CONGRATS[index];

  return (
    <>
      <hr className="section-rule" />

      <section className="congrats">
        <div className="congrats__head">
          <div>
            <MaskIcon src={minipoint} className="congrats__point" style={{ color: pointColor }} />
            <h2 className="congrats__title">축하의 말</h2>
          </div>
          <button
            type="button"
            className="congrats__next"
            style={{ color: pointColor }}
            aria-label="다음 축하의 말 보기"
            onClick={() => setIndex((i) => (i + 1) % CONGRATS.length)}
          >
            <span className="congrats__next-text">다음</span>
            <MaskIcon src={arrow} className="congrats__arrow" style={{ color: pointColor }} />
          </button>
        </div>
        <div className="congrats__body" key={index} aria-live="polite">
          {message.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p className="congrats__sign">{message.sign}</p>
        </div>
      </section>

      <hr className="section-rule" />

      <section className="credits">
        {CREDITS.map((group) => (
          <div className="credits__col" key={group.title}>
            <h2 className="credits__title">{group.title}</h2>
            <dl className="credits__list">
              {group.rows.map((row) => (
                <div className="credits__row" key={row.role}>
                  <dt className="credits__role">{row.role}</dt>
                  <dd className="credits__names">
                    {row.names.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </section>
    </>
  );
}