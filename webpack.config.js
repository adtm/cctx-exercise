const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./src/server.ts",
  target: "node",
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts|\.tsx$/,
        use: "ts-loader",
        include: [
          path.resolve(__dirname, "node_modules/cctx"),
          path.resolve(__dirname, "src"),
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx"],
  },
  output: {
    filename: "server.js",
    path: path.resolve(__dirname, "dist"),
  },
};
