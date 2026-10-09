// 이미지가 준비되면 src/assets 에 넣고 여기서 import 해서 null 자리에 연결하세요.
// 예) import mainLogo from "./assets/mainlogo.svg";  ->  mainLogo: mainLogo
import headerLogo from "./assets/headerimg.svg";
import barX from "./assets/barx.svg";
import oneulLogo from "./assets/oneullogo.svg";
import inuLogo from "./assets/inulogo.svg";
import inuTextLogo from "./assets/inutextlogo.svg";

export const IMAGES = {
  // PC 히어로
  mainLogo: null, // 꾹 PRESS OUR MARK 메인 로고
  fingerprint: null, // 지문 일러스트 (열두 가지 아이콘 포함)
  pressBox: null, // 히어로 왼쪽 아래 점선 박스 자리
  // 모바일 히어로: 로고 + 지문이 한 장으로 합쳐진 이미지 (가로 꽉 참)
  heroMobile: null,
  // 모바일 메뉴가 열렸을 때 상단바 가운데에 나오는 작은 로고
  headerImg: headerLogo,
  point: null, // 소개 영역 별표 아이콘
  oneulLogo: oneulLogo,
  inuLogo: inuLogo,
  inuTextLogo: inuTextLogo,
  barX: barX,
};