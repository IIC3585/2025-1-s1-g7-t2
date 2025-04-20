import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SIZES = [64, 192, 512];
const SOURCE_ICON = path.join(process.cwd(), 'src', 'assets', 'icon.png');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

async function generateIcons() {
  // Ensure the public directory exists
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  // Generate regular icons
  for (const size of SIZES) {
    await sharp(SOURCE_ICON)
      .resize(size, size)
      .toFile(path.join(PUBLIC_DIR, `pwa-${size}x${size}.png`));
  }

  // Generate maskable icon (with padding)
  await sharp(SOURCE_ICON)
    .resize(512, 512, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 0 }
    })
    .extend({
      top: 51,
      bottom: 51,
      left: 51,
      right: 51,
      background: { r: 255, g: 255, b: 255, alpha: 0 }
    })
    .toFile(path.join(PUBLIC_DIR, 'maskable-icon-512x512.png'));

  // Generate Apple touch icon
  await sharp(SOURCE_ICON)
    .resize(180, 180)
    .toFile(path.join(PUBLIC_DIR, 'apple-touch-icon.png'));
}

generateIcons().catch(console.error); 