const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (env, argv) => ({
  mode: argv.mode === 'production' ? 'production' : 'development',

  // This is necessary because Figma's 'eval' works differently than normal eval
  devtool: argv.mode === 'production' ? false : 'inline-source-map',

  entry: {
    ui: './src/ui.js', // The entry point for your UI code
    code: './src/code.js', // The entry point for your plugin code
  },

  module: {
    rules: [
      // Enables including CSS by doing "import './file.css'" in your JavaScript code
      { test: /\.css$/, use: ['style-loader', { loader: 'css-loader' }] },

      // More info: https://webpack.js.org/guides/asset-modules/
      { test: /\.svg/, type: 'asset/inline' },
    ],
  },

  // Webpack tries these extensions for you if you omit the extension like "import './file'"
  resolve: { extensions: ['.jsx', '.js'] },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'), // Compile into a folder called "dist"
    // Workaround: https://github.com/DustinJackson/html-webpack-inline-source-plugin/issues/57#issuecomment-603218420
    publicPath: '/',
  },

  // Tells Webpack to generate "ui.html" and to inline "ui.js" into it
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/ui.html',
      filename: 'ui.html',
      inlineSource: '.(js)$',
      chunks: ['ui'],
    }),
    new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin),
  ],
});
