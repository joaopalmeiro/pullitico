// https://github.com/thomas-lowry/figsvelte/blob/master/src/code.ts
// https://github.com/kevinwuhoo/vector-logos-figma-plugin/blob/master/code.ts
figma.showUI(__html__);

figma.ui.onmessage = (msg) => {
  if (msg.type === "add-logo") {
    // console.log(msg);

    // https://www.figma.com/plugin-docs/api/figma/#createnodefromsvg
    // https://www.figma.com/plugin-docs/api/FrameNode/
    const svg = figma.createNodeFromSvg(msg.logo);
    // console.log(svg);

    // https://www.figma.com/plugin-docs/api/figma-viewport/
    svg.name = msg.name;
    svg.x = figma.viewport.center.x;
    svg.y = figma.viewport.center.y;

    figma.currentPage.selection = [svg];
    // https://www.figma.com/plugin-docs/api/figma-viewport/#scrollandzoomintoview
    figma.viewport.scrollAndZoomIntoView([svg]);
  }

  figma.closePlugin();
};
