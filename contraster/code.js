figma.showUI(__html__);

let foregroundColor;
let foregroundAlpha;
let backgoundColor;

function calculateLuminance(color) {
  return 1;
}

function getRGB({ r, g, b }) {
  // Round each channel to the nearest integer
  const rgbColorArray = [r, g, b].map((channel) => Math.round(channel * 255));
  return rgbColorArray;
}

function calculateContrast(foregroundColor, backgroundColor) {
  const foregroundLuminance = calculateLuminance(foregroundColor);
  const backgroundLuminance = calculateLuminance(backgroundColor);
  return foregroundLuminance / backgroundLuminance;
}

// Sending results to the UI
function sendContrastInfo(contrast, foregroundColor, backgroundColor) {
  figma.ui.postMessage({
    type: 'selectionChange',
    foreground: foregroundColor,
    background: backgroundColor,
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
