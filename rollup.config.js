// Source:
// - https://github.com/sveltejs/component-template/blob/master/rollup.config.js
// - https://github.com/thomas-lowry/figsvelte/blob/master/rollup.config.js
// - https://github.com/tomquinonero/figma-plugin-template/blob/main/rollup.config.js
// - https://github.com/sveltejs/template/blob/master/rollup.config.js
// - https://svelte.dev/docs#compile-time-svelte-compile
// - https://www.npmjs.com/package/rollup-plugin-copy
import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import htmlBundle from "rollup-plugin-html-bundle";

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
      htmlBundle({
        template: "src/template.html",
        target: "public/index.html",
        inline: true,
      }),
      production && terser(),
    ],
  },
];
