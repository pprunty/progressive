const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Define the directory paths
const publicDir = path.join(process.cwd(), 'public');
const iconsDir = path.join(publicDir, 'icons');

// Ensure directory exists
function ensureDirectoryExistence(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Clear existing icons in the icons directory
function clearIconsDirectory(dirPath) {
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      if (fs.lstatSync(filePath).isFile()) {
        fs.unlinkSync(filePath);
      }
    }
  }
}

// Define the sizes for PWA icons
const sizes = [16, 32, 72, 96, 120, 128, 144, 152, 180, 192, 384, 512];

// Function to resize and save an icon
async function resizeAndSave(inputFile, size) {
  const outputFile = path.join(iconsDir, `${size}x${size}.png`);
  try {
    const image = sharp(inputFile).resize({ width: size, height: size });
    if (size === 32) {
      const radius = size / 20; // Adjust the divisor for corner roundness
      const roundedCorners = Buffer.from(
        `<svg><rect x="0" y="0" width="${size}" height="${size}" rx="${radius}" ry="${radius}"/></svg>`,
      );
      await image
        .composite([{ input: roundedCorners, blend: 'dest-in' }])
        .toFile(outputFile);
    } else {
      await image.toFile(outputFile);
    }
  } catch (error) {
    console.error(`❌ Error creating icon ${size}x${size}.png:`, error.message);
  }
}

// Main function to generate PWA icons and the WebP logo
async function generatePwaIcons() {
  try {
    // Ensure required directories exist
    ensureDirectoryExistence(publicDir);
    ensureDirectoryExistence(iconsDir);
    clearIconsDirectory(iconsDir);

    // Resolve source icon file: check for icon.webp, icon.png, or icon.jpg in public/
    const possibleExtensions = ['webp', 'png', 'jpg'];
    let sourceIcon = null;
    for (const ext of possibleExtensions) {
      const filePath = path.join(publicDir, `icon.${ext}`);
      if (fs.existsSync(filePath)) {
        sourceIcon = filePath;
        break;
      }
    }
    if (!sourceIcon) {
      throw new Error(
        'No valid source icon found. Please include icon.webp, icon.png, or icon.jpg in the public folder.',
      );
    }

    // Destination for the converted logo (always .webp)
    const logoDestination = path.join(publicDir, 'icon.webp');

    // If the found file isn't already webp, convert it; otherwise, copy if necessary
    if (path.extname(sourceIcon).toLowerCase() !== '.webp') {
      await sharp(sourceIcon).toFormat('webp').toFile(logoDestination);
    } else if (path.resolve(sourceIcon) !== path.resolve(logoDestination)) {
      fs.copyFileSync(sourceIcon, logoDestination);
    }

    // Small delay for file system consistency
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generate resized icons based on the logoDestination
    await Promise.all(
      sizes.map((size) =>
        resizeAndSave(logoDestination, size).catch((err) =>
          console.error(
            `❌ Failed to generate icon ${size}x${size}:`,
            err.message,
          ),
        ),
      ),
    );
    console.log('✓ PWA icons generated successfully!');
  } catch (error) {
    console.error('❌ Error generating PWA icons or logo:', error.message);
    throw error;
  }
}

// Immediately invoke the script
(async () => {
  try {
    await generatePwaIcons();
  } catch (error) {
    console.error('❌ Error generating PWA icons:', error);
  }
})();
