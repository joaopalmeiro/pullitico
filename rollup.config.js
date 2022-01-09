// Source:
// - https://github.com/sveltejs/component-template/blob/master/rollup.config.js
// - https://github.com/thomas-lowry/figsvelte/blob/master/rollup.config.js
// - https://github.com/tomquinonero/figma-plugin-template/blob/main/rollup.config.js
// - https://github.com/sveltejs/template/blob/master/rollup.config.js
// - https://svelte.dev/docs#compile-time-svelte-compile
// - https://www.npmjs.com/package/rollup-plugin-copy
// - https://www.npmjs.com/package/rollup-plugin-postcss
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import cssnano from "cssnano";
import htmlBundle from "rollup-plugin-html-bundle";
import postcss from "rollup-plugin-postcss";
import svelte from "rollup-plugin-svelte";
import svg from "rollup-plugin-svg";
import { terser } from "rollup-plugin-terser";

const production = !process.env.ROLLUP_WATCH;

export default [
  // ui.html
  {
    input: "src/main.js",
    output: {
      format: "iife",
      name: "ui",
      file: "src/build/bundle.js",
    },
    plugins: [
      svelte({
        compilerOptions: {
          dev: !production,
        },
      }),
      resolve(),
      commonjs(),
      svg(),
      postcss({
        extensions: [".css"],
        plugins: [cssnano()],
      }),
      htmlBundle({
        template: "src/template.html",
        target: "public/ui.html",
        inline: true,
      }),
      production && terser(),
    ],
  },
  // code.js
  {
    input: "src/code.js",
    output: {
      file: "public/code.js",
      format: "cjs",
      name: "code",
    },
    plugins: [commonjs(), production && terser()],
  },
];
