// 이미지 자리. src 를 넘기면 <img>, 없으면 빈 자리(점선 박스)로 남는다.
export default function Slot({ src, alt = "", className = "", outlined = false }) {
  if (src) return <img src={src} alt={alt} className={`slot slot--img ${className}`} />;
  return (
    <div
      className={`slot ${outlined ? "slot--outlined" : ""} ${className}`}
      role="img"
      aria-label={alt}
    />
  );
}
