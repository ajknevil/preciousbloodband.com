// scripts/convert-images.js
// Converts bg-1.jpg and bg-2.jpg to WebP and AVIF using sharp.
// Run with: node scripts/convert-images.js

const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

// Default images to convert; can be overridden with --images=filename1,filename2
let images = ["bg-1.jpg", "bg-2.jpg"];
const srcDir = path.join(__dirname, "..", "public", "img", "bg-img");

// Simple CLI parsing so you can run:
//   node scripts/convert-images.js --widths=480,800,1200 --jpeg-quality=82 --webp-quality=80 --avif-quality=50
// Defaults are chosen to be reasonable; override with CLI flags.
const argv = require("process").argv.slice(2);
const args = argv.reduce((acc, cur) => {
  const [k, v] = cur.replace(/^--/, "").split("=");
  acc[k] = v === undefined ? true : v;
  return acc;
}, {});

const widths = args["widths"]
  ? args["widths"].split(",").map(Number)
  : [800, 1200, 1600];
const jpegQuality = args["jpeg-quality"] ? Number(args["jpeg-quality"]) : 82;
const webpQuality = args["webp-quality"] ? Number(args["webp-quality"]) : 80;
const avifQuality = args["avif-quality"] ? Number(args["avif-quality"]) : 50;
const skipOriginal = args["skip-original"] ? true : false;

// Support --images=foo.jpg,bar.jpg to target specific files (filenames relative to srcDir)
if (args["images"]) {
  images = args["images"]
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

async function convert() {
  for (const img of images) {
    const input = path.join(srcDir, img);
    if (!fs.existsSync(input)) {
      console.warn("Skipping, not found:", input);
      continue;
    }
    const base = img.replace(/\.jpg$/i, "");

    for (const w of widths) {
      const jpegOut = path.join(srcDir, `${base}-${w}.jpg`);
      const webpOut = path.join(srcDir, `${base}-${w}.webp`);
      const avifOut = path.join(srcDir, `${base}-${w}.avif`);

      try {
        await sharp(input)
          .resize({ width: w })
          .jpeg({ quality: jpegQuality })
          .toFile(jpegOut);
        console.log("Wrote", jpegOut);
      } catch (err) {
        console.error("Failed jpeg for", input, err.message);
      }

      try {
        await sharp(input)
          .resize({ width: w })
          .webp({ quality: webpQuality })
          .toFile(webpOut);
        console.log("Wrote", webpOut);
      } catch (err) {
        console.error("Failed webp for", input, err.message);
      }

      try {
        await sharp(input)
          .resize({ width: w })
          .avif({ quality: avifQuality })
          .toFile(avifOut);
        console.log("Wrote", avifOut);
      } catch (err) {
        console.error("Failed avif for", input, err.message);
      }
    }

    // Optionally keep a 'largest' legacy name (no width suffix) for backward compatibility
    // but avoid writing if it would overwrite the original input file.
    const largestJpeg = path.join(srcDir, base + ".jpg");
    if (!skipOriginal) {
      if (path.resolve(largestJpeg) !== path.resolve(input)) {
        try {
          await sharp(input)
            .resize({ width: Math.max(...widths) })
            .jpeg({ quality: jpegQuality })
            .toFile(largestJpeg);
          console.log("Wrote", largestJpeg);
        } catch (err) {
          console.error("Failed write largest jpeg for", input, err.message);
        }
      } else {
        console.log(
          "Skipping largest jpeg write for",
          input,
          "(would overwrite source)"
        );
      }
    } else {
      console.log(
        "skipOriginal flag set; not writing largest legacy jpeg for",
        input
      );
    }
  }
}

convert().catch((err) => {
  console.error(err);
  process.exit(1);
});
