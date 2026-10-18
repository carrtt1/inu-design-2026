import { GRAD_LIST } from "./gradImages";

export const MAJOR_KO = { visual: "시각디자인", video: "영상디자인", product: "제품디자인" };
const MAJORS = ["visual", "video", "product"];

export function getMockDesigner(key) {
  const index = GRAD_LIST.findIndex((d) => d.key === key);
  if (index === -1) return null;
  const entry = GRAD_LIST[index];
  const no = String(index + 1).padStart(2, "0");
  return {
    id: index + 1,
    name: entry.name,
    cover_no: entry.coverNo,
    email: `designer${no}@example.com`,
    title: "작품명",
    major: MAJORS[index % 3],
  };
}

export function withoutEmpty(row) {
  return Object.fromEntries(
    Object.entries(row).filter(([, v]) => v !== null && v !== undefined && v !== "")
  );
}