// svg 모양대로 색을 칠하는 아이콘. 색은 CSS 의 color 를 따라간다.
export default function MaskIcon({ src, className = "", style }) {
  return (
    <span
      className={`mask-icon ${className}`}
      style={{ "--icon": `url("${src}")`, ...style }}
      aria-hidden="true"
    />
  );
}