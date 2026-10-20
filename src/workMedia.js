const files = import.meta.glob("./assets/productSmall/{visual,video,product}/*/*", {
  eager: true,
  query: "?url",
  import: "default",
});

const MEDIA_RE = /\.(jpe?g|png|webp|gif|mp4|webm|mov)$/i;
const VIDEO_RE = /\.(mp4|webm|mov)$/i;
const FOLDERS = new Map();

for (const [path, src] of Object.entries(files)) {
  const parts = path.normalize("NFC").split("/");
  const file = parts.pop();
  if (!MEDIA_RE.test(file)) continue;
  const folder = parts.pop().trim();
  const major = parts.pop();

  const base = file.replace(/\.[^.]+$/, "").trim();
  const om = base.match(/_(\d+)$/);
  const order = om ? Number(om[1]) : 0;

  const fm = folder.match(/^(.+?)[\s_-]*\(?(\d+)\)?$/);
  const name = (fm ? fm[1] : folder).trim();
  const coverNo = fm ? Number(fm[2]) : null;

  const id = `${major}/${folder}`;
  if (!FOLDERS.has(id)) FOLDERS.set(id, { major, name, coverNo, items: [] });
  FOLDERS.get(id).items.push({
    src,
    file,
    order,
    type: VIDEO_RE.test(file) ? "video" : "image",
  });
}

for (const f of FOLDERS.values()) {
  f.items.sort(
    (a, b) => a.order - b.order || a.file.localeCompare(b.file, "ko", { numeric: true })
  );
}

const LIST = [...FOLDERS.values()];

export function getWorkMedia(name, coverNo) {
  const n = (name ?? "").normalize("NFC").trim();
  const no = Number(coverNo);
  const found =
    LIST.find((f) => f.coverNo != null && f.coverNo === no) ??
    LIST.find((f) => f.coverNo == null && f.name === n) ??
    null;
  return found ? found.items : [];
}