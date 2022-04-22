const path = require("path");
const nodeExternals = require("webpack-node-externals");
const webpack = require("webpack");

require("dotenv").config({ override: true });

module.exports = {
  entry: "./server/index.tsx",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  target: "node",
  externals: [nodeExternals()],
  output: {
    path: path.resolve("server-build"),
    filename: "index.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "babel-loader",
      },
    ],
  },
  plugins: [new webpack.EnvironmentPlugin(["WEATHER_KEY", "CRYPTO_KEY"])],
};
