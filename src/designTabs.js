import visualIcon from "./assets/visualDesign.svg";
import videoIcon from "./assets/videoDesign.svg";
import productIcon from "./assets/productDesign.svg";
import pinkMain from "./assets/designpgPinkMain.svg";
import yellowMain from "./assets/designpgYellowMain.svg";
import greenMain from "./assets/designpgGreenMain.svg";
import pinkFinger from "./assets/pinkFinger.svg";
import yellowFinger from "./assets/yellowFinger.svg";
import greenFinger from "./assets/greenFinger.svg";

export const DESIGN_TABS = [
  {
    id: "visual",
    ko: "시각디자인",
    en: "VISUAL DESIGN",
    icon: visualIcon,
    logo: pinkMain,
    color: "#E4007F",
    point: "#5BB6E8",
    barColor: "#5BB6E8",
    finger: pinkFinger,
  },
  {
    id: "video",
    ko: "영상디자인",
    en: "VIDEO DESIGN",
    icon: videoIcon,
    logo: yellowMain,
    color: "#F5A825",
    point: "#E4007F",
    barColor: "#E3007F",
    finger: yellowFinger,
  },
  {
    id: "product",
    ko: "제품디자인",
    en: "PRODUCT DESIGN",
    icon: productIcon,
    logo: greenMain,
    color: "#30A553",
    point: "#EDC056",
    barColor: "#EAAB46",
    finger: greenFinger,
  },
];