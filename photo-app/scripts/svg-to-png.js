import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const SVG_PATH = path.join(process.cwd(), 'src', 'assets', 'icon.svg');
const PNG_PATH = path.join(process.cwd(), 'src', 'assets', 'icon.png');

async function convertSvgToPng() {
  const svgBuffer = fs.readFileSync(SVG_PATH);
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(PNG_PATH);
}

convertSvgToPng().catch(console.error); 