const VueLoaderPlugin = require("vue-loader/lib/plugin");
const path = require("path");

const config = {
  //mode: "development",
  mode: "production",
  entry: [path.resolve(__dirname, "index.ts")],
  output: {
    library: "@jswf/vue",
    libraryTarget: "umd",
    umdNamedDefine: true,
    filename: "index.js",
    path: path.resolve(__dirname, "../dist")
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: "vue-loader"
      },
      {
        test: /\.ts|\.tsx$/,
        exclude: /node_modules/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.js$/,
        use: ["babel-loader", "source-map-loader"],
        enforce: "pre"
      },
      {
        test: /\.(scss|css)$/,
        use: [
          "vue-style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            }
          },
          "sass-loader"
        ]
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        loaders: "url-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js", ".scss", "css", ".svg", ".vue"],
  },
  devtool: "source-map",
  plugins: [new VueLoaderPlugin()],

  externals: {
    "vue-property-decorator": "vue-property-decorator",
    "resize-observer-polyfill": "resize-observer-polyfill",
    "css-loader":"css-loader"
  }
};
if (config.mode === "development") {
  config.devtool = "source-map";
}
module.exports = config;
