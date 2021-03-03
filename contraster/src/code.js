let foregroundColor = [52, 45, 53];
let backgroundColor = [255, 255, 255];
let foregroundAlpha = 1;
let backgroundAlpha = 1;

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

// Opacity
function overlay(foreground, alpha, background) {
  if (alpha >= 1) {
    return foreground;
  }

  const overlaid = foreground.map((channel, i) =>
    Math.round(channel * alpha + background[i] * (1 - alpha))
  );

  return overlaid;
}

function getContrastScores(contrast) {
  let largeText;
  let normalText;

  switch (true) {
    case contrast > 7:
      largeText = 'AAA';
      normalText = 'AAA';
      break;
    case contrast > 4.5:
      largeText = 'AAA';
      normalText = 'AA';
      break;
    case contrast > 3:
      largeText = 'AA';
      normalText = 'FAIL';
      break;
    default:
      largeText = 'FAIL';
      normalText = 'FAIL';
      break;
  }

  return { largeText, normalText };
}

// Sending results to the UI
function sendContrastInfo(contrast, foreground, background) {
  figma.ui.postMessage({
    type: 'selectionChange',
    foreground: convertRgbToHex(foreground),
    background: convertRgbToHex(background),
    contrast,
    scores: getContrastScores(contrast),
  });
}

function calculateAndSendContrast(foreground, alpha, background) {
  if (alpha < 1) {
    foreground = overlay(foreground, alpha, background);
  }

  const foregroundLuminance = calculateLuminance(foreground) + 0.05;
  const backgroundLuminance = calculateLuminance(background) + 0.05;
  let contrast = foregroundLuminance / backgroundLuminance;

  if (backgroundLuminance > foregroundLuminance) {
    contrast = 1 / contrast;
  }

  // Round to two decimal places
  contrast = Math.floor(contrast * 100) / 100;

  return sendContrastInfo(contrast, foreground, background);
}

function findFills(nodes) {
  // Find nodes with fills that are of type SOLID
  const nodesWithFills = nodes.filter(
    (node) => node.fills && node.fills.length > 0 && node.fills[0].type === 'SOLID'
  );

  // More info: https://www.figma.com/plugin-docs/api/properties/figma-notify/
  if (nodesWithFills.length <= 0) {
    return figma.notify('Please select a layer that has a solid fill.', {
      // How long the notification stays up before closing
      timeout: 1000,
    });
  }

  // Filter out the first fills of each node
  const fills = nodesWithFills.map((node) => node.fills[0]);

  return fills;
}

figma.on('selectionchange', () => {
  const fills = findFills(figma.currentPage.selection);

  if (fills.length > 1) {
    // The channel values have been normalized to be between 0 and 1
    foregroundColor = getRGB(fills[0].color);
    foregroundAlpha = fills[0].opacity;
    backgroundColor = getRGB(fills[1].color);
    backgroundAlpha = fills[1].opacity;

    calculateAndSendContrast(foregroundColor, foregroundAlpha, backgroundColor);
  }

  if (fills.length === 1) {
    const fills = findFills(figma.currentPage.selection);

    foregroundColor = getRGB(fills[0].color);
    foregroundAlpha = fills[0].opacity;

    calculateAndSendContrast(foregroundColor, foregroundAlpha, backgroundColor);
  }
});

figma.ui.onmessage = (msg) => {
  if (msg.type === 'swap') {
    // Destructuring Assignment Array Matching
    [foregroundColor, backgroundColor, foregroundAlpha, backgroundAlpha] = [
      backgroundColor,
      foregroundColor,
      backgroundAlpha,
      foregroundAlpha,
    ];

    // It is necessary to recalculate the contrast to handle the foreground opacity.
    // The contrast ratio between two solid colors never changes.
    calculateAndSendContrast(foregroundColor, foregroundAlpha, backgroundColor);
  }
};

// Call on plugin start
// 405 - 80 = 325
figma.showUI(__html__, { width: 340, height: 325 });
calculateAndSendContrast(foregroundColor, foregroundAlpha, backgroundColor);
