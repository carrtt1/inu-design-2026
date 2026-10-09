import line1 from "./assets/line1.svg";
import icon1 from "./assets/icon1.svg";
import line2 from "./assets/line2.svg";
import icon2 from "./assets/icon2.svg";
import line3 from "./assets/line3.svg";
import icon3 from "./assets/icon3.svg";
import line4 from "./assets/line4.svg";
import icon4 from "./assets/icon4.svg";
import line5 from "./assets/line5.svg";
import icon5 from "./assets/icon5.svg";
import line6 from "./assets/line6.svg";
import icon6 from "./assets/icon6.svg";
import line7 from "./assets/line7.svg";
import icon7 from "./assets/icon7.svg";
import line8 from "./assets/line8.svg";
import icon8 from "./assets/icon8.svg";
import line9 from "./assets/line9.svg";
import icon9 from "./assets/icon9.svg";
import line10 from "./assets/line10.svg";
import icon10 from "./assets/icon10.svg";
import line11 from "./assets/line11.svg";
import icon11 from "./assets/icon11.svg";
import line12 from "./assets/line12.svg";
import icon12 from "./assets/icon12.svg";

// 지문(pinkFinger.svg, 453 x 612) 위에 겹치는 선 + 아이콘 목록.
// 좌표는 전부 svg 파일 안의 숫자(px) 그대로 적는다.
//   size     : 선 svg 의 [가로, 세로]
//   circle   : 선 svg 안에서 동그라미 중심의 [x, y]
//   start    : 선 svg 안에서 아이콘이 붙는 쪽 끝점의 [x, y]
//   target   : 지문 svg 안에서 동그라미가 가야 할 위치 [x, y]
//   iconSide : 아이콘이 선 끝의 어느 쪽에 붙는지 ("left" | "right")
//   iconSize : 아이콘 svg 의 [가로, 세로]
export const FINGER_SIZE = [453, 612];
const ICON_GAP = 6;

export const FINGER_LINES = [
  {
    id: "explore",
    line: line1,
    size: [92, 48],
    circle: [3.3, 3.3],
    start: [91, 47.3],
    target: [374.5, 521.5],
    icon: icon1,
    iconSide: "right",
    iconSize: [33, 42],
    no: 1,
    title: "Explore",
    desc: "새로운 가능성을 찾아 넓게 탐색하는 시작점.",
    mark: [344.7, 477],
  },
  {
    id: "select",
    line: line2,
    size: [112, 7],
    circle: [3.3, 3.3],
    start: [111.3, 3.3],
    target: [357, 298],
    icon: icon2,
    iconSide: "right",
    iconSize: [29, 38],
    no: 2,
    title: "Select",
    desc: "수많은 가능성 중 하나를 선택하는 과정.",
    mark: [345, 290],
  },
  {
    id: "try",
    line: line3,
    size: [96, 45],
    circle: [92.6, 41.6],
    start: [0, 0.4],
    target: [137.7, 82.8],
    icon: icon3,
    iconSide: "left",
    iconSize: [29, 35],
    no: 3,
    title: "Try",
    desc: "직접 만들고 시도하며 가능성을 넓혀가는 과정.",
    mark: [160, 93.3],
  },
  {
    id: "delete",
    line: line4,
    size: [207, 132],
    circle: [3.3, 3.3],
    start: [206.4, 131.5],
    target: [270, 327],
    icon: icon4,
    iconSide: "right",
    iconSize: [30, 37],
    no: 4,
    title: "Delete",
    desc: "불필요한 요소를 과감히 덜어내는 과정.",
    mark: [259.2, 314],
  },
  {
    id: "adjust",
    line: line5,
    size: [101, 50],
    circle: [3.3, 46],
    start: [100.4, 0.4],
    target: [370.5, 238],
    icon: icon5,
    iconSide: "right",
    iconSize: [42, 41],
    no: 5,
    title: "Adjust",
    desc: "작은 차이를 끊임없이 조정하는 과정.",
    mark: [345.5, 236],
  },
  {
    id: "repeat",
    line: line6,
    size: [153, 88],
    circle: [3.3, 3.3],
    start: [152.5, 87.3],
    target: [256, 520],
    icon: icon6,
    iconSide: "right",
    iconSize: [37, 31],
    no: 6,
    title: "Repeat",
    desc: "같은 과정을 여러 번 반복하는 과정.",
    mark: [233.5, 494.5],
  },
  {
    id: "decide",
    line: line7,
    size: [119, 31],
    circle: [115.2, 3.3],
    start: [0, 29.6],
    target: [42.5, 381.5],
    icon: icon7,
    iconSide: "left",
    iconSize: [35, 30],
    no: 7,
    title: "Decide",
    desc: "수많은 고민 끝에 최종 결정을 내리는 과정.",
    mark: [62, 364.5],
  },
  {
    id: "refine",
    line: line8,
    size: [91, 53],
    circle: [87.4, 49.7],
    start: [0, 0.4],
    target: [110, 240.5],
    icon: icon8,
    iconSide: "left",
    iconSize: [29, 40],
    no: 8,
    title: "Refine",
    desc: "형태와 디테일을 다듬는 과정.",
    mark: [125.8, 252.4],
  },
  {
    id: "define",
    line: line9,
    size: [148, 39],
    circle: [143.9, 35],
    start: [0, 0.4],
    target: [116, 354],
    icon: icon9,
    iconSide: "left",
    iconSize: [35, 35],
    no: 9,
    title: "Define",
    desc: "작품의 의미와 방향을 분명하게 만드는 과정.",
    mark: [163, 366],
  },
  {
    id: "merge",
    line: line10,
    size: [136, 57],
    circle: [132.7, 3.3],
    start: [0, 56.6],
    target: [59.5, 505.5],
    icon: icon10,
    iconSide: "left",
    iconSize: [33, 32],
    no: 10,
    title: "Merge",
    desc: "서로 다른 생각과 요소를 하나로 연결하는 과정.",
    mark: [69.9, 494.7],
  },
  {
    id: "focus",
    line: line11,
    size: [85, 40],
    circle: [3.3, 36.55],
    start: [84.6, 0.4],
    target: [340, 69.5],
    icon: icon11,
    iconSide: "right",
    iconSize: [23, 32],
    no: 11,
    title: "Focus",
    desc: "가장 중요한 가치만 남기는 과정.",
    mark: [328.5, 80],
  },
  {
    id: "own",
    line: line12,
    size: [89, 54],
    circle: [85.6, 3.3],
    start: [0, 52.8],
    target: [58, 423],
    icon: icon12,
    iconSide: "left",
    iconSize: [33, 33],
    no: 12,
    title: "Own",
    desc: "모든 경험과 과정을 자신만의 것으로 만드는 과정.",
    mark: [70.1, 410.5],
  },
];

export function lineStyle({ size, circle, target }) {
  const [fw, fh] = FINGER_SIZE;
  return {
    left: `${((target[0] - circle[0]) / fw) * 100}%`,
    top: `${((target[1] - circle[1]) / fh) * 100}%`,
    width: `${(size[0] / fw) * 100}%`,
  };
}

export function iconStyle({ circle, start, target, iconSide, iconSize }) {
  const [fw, fh] = FINGER_SIZE;
  const [iw, ih] = iconSize;
  const endX = target[0] - circle[0] + start[0];
  const x = iconSide === "right" ? endX + ICON_GAP : endX - ICON_GAP - iw;
  const y = target[1] - circle[1] + start[1] - ih / 2;
  return {
    left: `${(x / fw) * 100}%`,
    top: `${(y / fh) * 100}%`,
    width: `${(iw / fw) * 100}%`,
    aspectRatio: `${iw} / ${ih}`,
  };
}

export function markStyle({ mark, iconSize }) {
  const [fw, fh] = FINGER_SIZE;
  return {
    left: `${(mark[0] / fw) * 100}%`,
    top: `${(mark[1] / fh) * 100}%`,
    aspectRatio: `${iconSize[0]} / ${iconSize[1]}`,
  };
}
