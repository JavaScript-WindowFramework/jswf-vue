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
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          "style-loader",
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
    alias: {
      vue: 'vue/dist/vue.esm.js',
    }
  },
  devtool: "source-map",
  plugins: [new VueLoaderPlugin()],

  externals: {
    "vue-property-decorator": "vue-property-decorator",
    "resize-observer-polyfill": "resize-observer-polyfill"
  }
};
if (config.mode === "development") {
  config.devtool = "source-map";
}
module.exports = config;
