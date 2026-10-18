const allFiles = import.meta.glob("./assets/gradImg/*.*", {
  eager: true,
  import: "default",
});
const files = Object.fromEntries(
  Object.entries(allFiles).filter(([path]) => /\.(jpe?g|png|webp)$/i.test(path.trim()))
);

const GRAD_IMAGES = {};

for (const [path, src] of Object.entries(files)) {
  const name = path
    .split("/")
    .pop()
    .normalize("NFC")
    .replace(/\.[^.]+$/, "")
    .trim()
    .replace(/^\d+\.\d+\s*/, "")
    .replace(/님$/, "")
    .trim();
  GRAD_IMAGES[name] = src;
}

export function getGradImage(name) {
  return GRAD_IMAGES[String(name).normalize("NFC").trim()] ?? null;
}

const NO_PHOTO_NAMES = ["천수아"];

export const GRAD_LIST = [
  ...Object.entries(GRAD_IMAGES).map(([name, src]) => ({ name, src })),
  ...NO_PHOTO_NAMES.filter((name) => !GRAD_IMAGES[name]).map((name) => ({ name, src: null })),
].sort((a, b) => a.name.localeCompare(b.name, "ko"));