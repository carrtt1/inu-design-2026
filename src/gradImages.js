const allFiles = import.meta.glob("./assets/gradImg/*.*", {
  eager: true,
  import: "default",
});

const ENTRIES = [];

for (const [path, src] of Object.entries(allFiles)) {
  const file = path.split("/").pop().normalize("NFC");
  if (!/\.(jpe?g|png|webp)\s*$/i.test(file)) continue;

  let rest = file
    .replace(/\.[^.]+$/, "")
    .trim()
    .replace(/^\d+\.\d+\s*/, "");

  let coverNo = null;
  const m = rest.match(/^(.+?)\s*\(?(\d+)\)?$/);
  if (m) {
    rest = m[1];
    coverNo = Number(m[2]);
  }

  const name = rest.replace(/님$/, "").trim();
  const key = coverNo ? `${name}-${coverNo}` : name;
  ENTRIES.push({ key, name, coverNo, src });
}

const NO_PHOTO_NAMES = ["천수아"];
for (const name of NO_PHOTO_NAMES) {
  if (!ENTRIES.some((e) => e.name === name)) {
    ENTRIES.push({ key: name, name, coverNo: null, src: null });
  }
}

export const GRAD_LIST = ENTRIES.sort(
  (a, b) => a.name.localeCompare(b.name, "ko") || (a.coverNo ?? 0) - (b.coverNo ?? 0)
);

export function findGrad(key) {
  return GRAD_LIST.find((d) => d.key === String(key).normalize("NFC").trim()) ?? null;
}

export function getGradImage(key) {
  return findGrad(key)?.src ?? null;
}

export function gradKeyFor(name, coverNo) {
  const n = (name ?? "").normalize("NFC").trim();
  const byNo = GRAD_LIST.find((d) => d.coverNo != null && d.coverNo === Number(coverNo));
  if (byNo) return byNo.key;
  const byName = GRAD_LIST.find((d) => d.name === n);
  return byName ? byName.key : n;
}