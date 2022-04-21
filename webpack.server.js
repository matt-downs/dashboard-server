const path = require("path");
const nodeExternals = require("webpack-node-externals");
const Dotenv = require("dotenv-webpack");

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
  plugins: [new Dotenv()],
};