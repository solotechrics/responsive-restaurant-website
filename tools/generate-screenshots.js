#!/usr/bin/env node
// generate-screenshots.js
// Small helper that converts the repository SVG placeholders to PNGs using sharp
// Usage: node tools/generate-screenshots.js

const fs = require('fs');
const path = require('path');

async function main() {
  let sharp;
  try {
    sharp = require('sharp');
  } catch (err) {
    console.error('`sharp` is not installed. Install devDependency or run `npm install` before running this script.');
    process.exit(0);
  }

  const svgDir = path.join(__dirname, '..', 'screenshots');
  const outDir = path.join(svgDir, 'optimized');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const conversions = [
    { input: 'desktop-hero.svg', output: 'desktop-hero-1200x630.png', width: 1200, height: 630 },
    { input: 'main-course.svg', output: 'main-course-1000x600.png', width: 1000, height: 600 },
    { input: 'mobile-gallery.svg', output: 'mobile-gallery-640x960.png', width: 640, height: 960 },
  ];

  for (const c of conversions) {
    const inPath = path.join(svgDir, c.input);
    const outPath = path.join(outDir, c.output);
    if (!fs.existsSync(inPath)) {
      console.warn(`Skipping ${c.input} — source file is missing.`);
      continue;
    }

    try {
      await sharp(inPath)
        .resize(c.width, c.height, { fit: 'cover' })
        .png({ quality: 85, compressionLevel: 8 })
        .toFile(outPath);
      console.log(`Wrote: ${path.relative(process.cwd(), outPath)}`);
    } catch (err) {
      console.error('Error converting', inPath, err.message || err);
    }
  }

  // also create an OG sized PNG fallback
  const ogOut = path.join(outDir, 'og-image-1200x630.png');
  const ogSrc = path.join(svgDir, 'desktop-hero.svg');
  if (fs.existsSync(ogSrc)) {
    await sharp(ogSrc).resize(1200, 630, { fit: 'cover' }).png({ quality: 88 }).toFile(ogOut);
    console.log('Wrote OG image', path.relative(process.cwd(), ogOut));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
