const path = require("path");
const webpack = require("webpack");
const src = path.join(__dirname, "../src");
const dotenv = require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

const isProduction =
  typeof NODE_ENV !== "undefined" && NODE_ENV === "production";

module.exports = {
  entry: src,
  output: {
    publicPath: "/",
    path: path.resolve("dist"),
    filename: "[name].[hash].bundle.js",
    chunkFilename: "[name].[hash].bundle.js",
    assetModuleFilename: "assets/[hash][ext][query]",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        // options: {
        //   compilerOptions: {
        //     sourceMap: !isProduction,
        //   },
        // },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.html$/,
        loader: "html-loader",
        options: { minimize: true },
      },
      {
        type: "javascript/auto",
        test: /\.json$/,
        exclude: /node_modules/,
        loader: "json-loader",
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader",
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": dotenv.parsed,
    }),
  ],
  resolve: {
    modules: [src, "node_modules"],
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    fallback: {
      fs: false,
      path: false,
      crypto: false,
      module: false,
      os: false,
      vm: false,
      tty: false,
    },
    alias: {
      "@components": path.resolve(__dirname, "../src/components"),
      "@features": path.resolve(__dirname, "../src/features"),
      "@assets": path.resolve(__dirname, "../src/assets"),
      "@test-utils": path.resolve(__dirname, "../src/test-utils"),
      "@translations": path.resolve(__dirname, "../src/translations"),
    },
  },
};
