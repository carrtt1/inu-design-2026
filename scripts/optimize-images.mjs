import sharp from "sharp";
import { readdir, mkdir, copyFile } from "node:fs/promises";
import path from "node:path";

const [, , inDir = "src/assets/gradImg", outDir = "src/assets/gradImgSmall", width = "700"] =
  process.argv;

const IMG_RE = /\.(jpe?g|png|webp)\s*$/i;
const COPY_RE = /\.(gif|mp4|webm|mov)\s*$/i;
let count = 0;

async function walk(src, dst) {
  await mkdir(dst, { recursive: true });
  for (const ent of await readdir(src, { withFileTypes: true })) {
    const from = path.join(src, ent.name);

    if (ent.isDirectory()) {
      await walk(from, path.join(dst, ent.name));
      continue;
    }

    const name = ent.name.trim();
    if (IMG_RE.test(name)) {
      await sharp(from)
        .rotate()
        .resize({ width: Number(width), withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(path.join(dst, name.replace(/\.[^.]+$/, ".webp")));
    } else if (COPY_RE.test(name)) {
      await copyFile(from, path.join(dst, name));
    } else {
      continue;
    }
    count++;
    console.log("✓", path.relative(inDir, from));
  }
}

await walk(inDir, outDir);
console.log(`\n${count}개 완료 → ${outDir}`);