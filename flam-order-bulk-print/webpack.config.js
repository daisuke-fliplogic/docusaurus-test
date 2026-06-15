const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    saleLayoutSelectorDialog:
      "./app/webroot/js/react/src/SaleLayoutSelectorDialogWrapper.tsx",
    orderLayoutSelectorDialog:
      "./app/webroot/js/react/src/OrderLayoutSelectorDialogWrapper.tsx",
    // ... 他のReactエントリ
  },
  output: {
    path: path.resolve(__dirname, "app/webroot/js/react/dist"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
};
