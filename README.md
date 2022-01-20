# figma-playground

## Development

- `pnpm install`
- `pnpm dev`
- `pnpm build`

## Notes

- The `manifest.json` file is how Figma identifies plugins.
- `npm install --save-dev @figma/plugin-typings`.
- "A plugin runs in a _sandbox_ inside of Figma, isolated from the rest of the application (...) we don't have access to the browser APIs."
- "Anytime we need access to the browser APIs we have to launch an `iframe` and send messages to it."
- [Node Types](https://www.figma.com/plugin-docs/api/nodes/).
- Luminance is the apparent brightness of a color.
- "To calculate contrast with opacity we have to make a new solid colour by blending the two colours (...) then calculate the contrast between this new foreground colour (...) and the background colour (...). The problem is if the _background_ has opacity we can't determine what colour is _behind_ it to know what new colour to make. This means we can only reliably calculate the contrast if the opacity is on the foreground colour."
- "(...) the order of the layers in `figma.currentPage.selection` is _basically random_ so we can't reliably pick which layer will be which."
- `pnpm init -y` ([issue](https://github.com/pnpm/pnpm/issues/3505)).
- [Create Figma Plugin](https://yuanqing.github.io/create-figma-plugin/).
- `pnpm create vite my-svelte-app -- --template svelte`.
- [Uninstall pnpm](https://pnpm.io/uninstall).
- `volta install pnpm` (and reload the terminal). `pnpm node -v`.
- [Figma Plugin DS Svelte](https://github.com/thomas-lowry/figma-plugin-ds-svelte) (UI kit).
- `pnpm add -D svelte rollup rollup-plugin-svelte @rollup/plugin-node-resolve @rollup/plugin-commonjs rollup-plugin-terser rollup-plugin-html-bundle rollup-plugin-postcss cssnano postcss rollup-plugin-svg`.
- [Figma API reference](https://www.figma.com/plugin-docs/api/api-reference/).
- `Command`+`P`: Use quick actions ([Figma](https://help.figma.com/hc/en-us/articles/360040328653-Use-shortcuts-and-quick-actions#Quick_actions)).

## References

- [Figma Plugin Tutorial (1/6)](https://alcohollick.com/writing/figma-plugin-tutorial-1-6).
- [Figma Plugin Tutorial (2/6)](https://alcohollick.com/writing/figma-plugin-tutorial-2-6).
- [zebra](https://github.com/danhollick/zebra) (Figma plugin).
- [Figma Plugin Tutorial (3/6)](https://alcohollick.com/writing/figma-plugin-tutorial-3-6).
- [Heroicons](https://heroicons.com/).
- [Figma Plugin Tutorial (4/6)](https://alcohollick.com/writing/figma-plugin-tutorial-4-6).
- [Figma Plugin Tutorial (5/6)](https://alcohollick.com/writing/figma-plugin-tutorial-5-6).
- [Figma Plugin Tutorial (6/6)](https://alcohollick.com/writing/figma-plugin-tutorial-6-6).
- [Bundling with Webpack](https://www.figma.com/plugin-docs/bundling-webpack/).
- [Vector Logos - Figma Plugin](https://github.com/kevinwuhoo/vector-logos-figma-plugin).
- [Eleições Passadas (Portal do Eleitor)](https://www.portaldoeleitor.pt/Paginas/EleicoesPassadas.aspx).
- [Eleições (SGMAI)](https://www.eleicoes.mai.gov.pt/).
- [Eleições Autárquicas 2021 (CNE)](https://www.cne.pt/content/eleicoes-autarquicas-2021).
- [Eleições Autárquicas 2021 (SGMAI)](https://www.eleicoes.mai.gov.pt/autarquicas2021/).
- [Autarquias Locais - 26 de setembro de 2021 (SGMAI)](https://www.sg.mai.gov.pt/AdministracaoEleitoral/EleicoesReferendos/AutarquiasLocais/Paginas/default.aspx?FirstOpen=1).

### Logos

- [Eleições Autárquicas 2021](https://www.eleicoes.mai.gov.pt/autarquicas2021/assets/static/files/electionImage.svg)
  - Raw: `src/logos/raw/autarquicas2021.svg`
- [Volt Portugal](https://www.voltportugal.org/volt-logo.svg) ([CNE](https://www.cne.pt/partido/volt-portugal))
  - Raw: `src/logos/raw/volt.svg`
- [Nós, Cidadãos!](https://noscidadaos.pt/o-nos-cidadaos/regulamentos-e-documentos/) ([CNE](https://www.cne.pt/partido/nos-cidadaos))
  - Raw: `src/logos/raw/noscidadaos.ai`
- [PS](https://ps.pt/elementos-graficos/) ([CNE](https://www.cne.pt/partido/partido-socialista))
  - Raw: `src/logos/raw/ps.ai`
- [Bloco de Esquerda](https://www.bloco.org/o-bloco/manual-de-normas-gr%C3%A1ficas.html) ([CNE](https://www.cne.pt/partido/bloco-de-esquerda))
  - Raw: `src/logos/raw/be.pdf`
