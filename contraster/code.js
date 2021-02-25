figma.showUI(__html__);

let foregroundColor;
let foregroundAlpha;
let backgroundColor;

function convertRgbToHex(color) {
  const hex = color
    .map((col) => {
      // Hexadecimal numbers (base 16)
      const hexColor = col.toString(16);
      return `0${hexColor}`.slice(-2);
    })
    .join('');
  return `#${hex}`;
}

function calculateLuminance(color) {
  // Source: https://www.w3.org/WAI/GL/wiki/Relative_luminance
  const normalizedColor = color.map((channel) => channel / 255);

  const gammaCorrectedRGB = normalizedColor.map((channel) =>
    channel <= 0.03928 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4)
  );

  const luminance =
    gammaCorrectedRGB[0] * 0.2126 + gammaCorrectedRGB[1] * 0.7152 + gammaCorrectedRGB[2] * 0.0722;

  return luminance;
}

function getRGB({ r, g, b }) {
  // Round each channel to the nearest integer
  const rgbColorArray = [r, g, b].map((channel) => Math.round(channel * 255));
  return rgbColorArray;
}

function calculateContrast(foreground, background) {
  const foregroundLuminance = calculateLuminance(foreground) + 0.05;
  const backgroundLuminance = calculateLuminance(background) + 0.05;
  let contrast = foregroundLuminance / backgroundLuminance;

  if (backgroundLuminance > foregroundLuminance) {
    contrast = 1 / contrast;
  }

  // Round to two decimal places
  contrast = Math.floor(contrast * 100) / 100;

  return contrast;
}

// Sending results to the UI
function sendContrastInfo(contrast, foregroundColor, backgroundColor) {
  figma.ui.postMessage({
    type: 'selectionChange',
    foreground: convertRgbToHex(foregroundColor),
    background: convertRgbToHex(backgroundColor),
    contrast,
  });
}

figma.on('selectionchange', () => {
  if (figma.currentPage.selection.length > 1) {
    // Find nodes with fills that are of type SOLID
    const selection = figma.currentPage.selection.filter(
      (node) => node.fills.length > 0 && node.fills[0].type === 'SOLID'
    );

    // Filter out the first fills of each node
    const fills = selection.map((node) => node.fills[0]);

    // The channel values have been normalized to be between 0 and 1
    foregroundColor = getRGB(fills[0].color);
    backgroundColor = getRGB(fills[1].color);

    const contrast = calculateContrast(foregroundColor, backgroundColor);

    sendContrastInfo(contrast, foregroundColor, backgroundColor);
  } else {
    console.log('Select at least 2 layers');
  }
});
