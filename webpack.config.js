const path = require("path");

// const babelOptions = {
//   cacheDirectory: true,
//   presets: [["es2015", { "modules": false }]]
// }

const config = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js"
  },
  plugins: [],
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      exclude: /node_modules/,
      use: [{
        loader: "babel-loader",
        options: babelOptions
      }, {
        loader: "ts-loader"
      }]
    }, {
      test: /\.html$/,
      loader: "raw-loader"
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader",
      options: babelOptions
    }]
  },
  devServer: {
    port: 7777,
    contentBase: path.resolve(__dirname, "public")
  }
};

module.exports = config;
