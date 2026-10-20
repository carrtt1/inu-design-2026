import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";

const [, , inDir = "src/assets/gradImg", outDir = "src/assets/gradImgSmall", width = "700"] =
  process.argv;

await mkdir(outDir, { recursive: true });

const files = (await readdir(inDir)).filter((f) => /\.(jpe?g|png|webp)\s*$/i.test(f));

for (const f of files) {
  const out = path.join(outDir, f.trim().replace(/\.[^.]+$/, ".webp"));
  await sharp(path.join(inDir, f))
    .rotate()
    .resize({ width: Number(width), withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(out);
  console.log("✓", f);
}

console.log(`\n${files.length}장 완료 → ${outDir}`);