const allFiles = import.meta.glob("./assets/coverImg/*.jpg", {
  eager: true,
  import: "default",
});

const RANGES = {
  visual: [1, 35],
  video: [36, 66],
  product: [67, 82],
};

const ALL = Object.entries(allFiles).map(([path, src]) => {
  const file = path.split("/").pop().replace(/\.jpg$/i, "").normalize("NFC");
  const match = file.match(/^(\d+)_(.+)$/);
  return {
    id: file,
    no: match ? Number(match[1]) : null,
    name: match ? match[2] : file,
    src,
  };
});

function pick(range) {
  if (!range) return [];
  const [from, to] = range;
  return ALL.filter((w) => w.no !== null && w.no >= from && w.no <= to).sort((a, b) =>
    a.name.localeCompare(b.name, "ko")
  );
}

export const WORKS = {
  visual: pick(RANGES.visual),
  video: pick(RANGES.video),
  product: pick(RANGES.product),
};