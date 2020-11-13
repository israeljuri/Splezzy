const path = require("path");
module.exports = {
  entry: "./src/js/App.js",
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "./dist/js/"),
    filename: "index.js",
  },
  mode: "production",
  watch: true,
};
