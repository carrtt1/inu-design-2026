import pinkFinger from "../assets/pinkFinger.svg";
import pinkMainLogo from "../assets/pinkmainlogo.svg";
import pinkSmallFinger from "../assets/pinksmallFinger.svg";
import pinkMobilePoster from "../assets/pinkmobileposter.svg";

// 접속할 때마다 아래 세트 중 하나가 랜덤으로 적용됩니다
// primary   -> 히어로 / 푸터 배경색
// secondary -> 상단바 / 메뉴 / 소개 영역 배경색
export const COLOR_SETS = [
  { name: "set-1", primary: "#000000", secondary: "#E4007F",
    point: "#5BB6E8",
    fingerprint: pinkFinger,
    mobilePoster: pinkMobilePoster,
    mainLogo: pinkMainLogo, 
    smallFinger: pinkSmallFinger,
  },
  { name: "set-2", primary: "#009DE2", secondary: "#EAAB46",
    point: "#E4007F",
    fingerprint: null,
    mobilePoster: null,
  },
  { name: "set-3", primary: "#D75894", secondary: "#55A35C",
    fingerprint: null,
    mobilePoster: null,
    point: "#EDC056",
  },
];

export function pickRandomColorSet() {
  return COLOR_SETS[Math.floor(Math.random() * COLOR_SETS.length)];
}
