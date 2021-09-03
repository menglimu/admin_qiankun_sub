/**
 * 增加svg的loader
 * 配置别名
 * 全局注入scss
 * 配置代理
 * 按需加载lodash
 */

// dart-sass 编译element-ui里icon伪元素的content unicode编码乱码处理
// 让css资源请求的响应头的Content-Type增加"charset=utf-8"声明

// 按需加载lodash
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const path = require("path");
module.exports = {
  lintOnSave: false,
  publicPath: process.env.VUE_APP_BASEURL || "/",
  productionSourceMap: false,
  chainWebpack: config => {
    // 按需加载lodash
    if (process.env.NODE_ENV === "production") {
      config.plugin("loadshReplace").use(new LodashModuleReplacementPlugin());
    }

    // svg处理
    config.module.rule("svg").include.add(path.resolve(__dirname, "./src/icons"));
    config.module.rule("svg").uses.delete("file-loader");
    config.module
      .rule("svg")
      .test(/\.(svg)(\?.*)?$/)
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      });
  },
  configureWebpack: function() {
    // console.log(config.module.rules[2])
    return {
      output: {
        library: `${process.env.VUE_APP_NAME}-[name]`,
        libraryTarget: "umd", // 把微应用打包成 umd 库格式
        jsonpFunction: `webpackJsonp_${process.env.VUE_APP_NAME}`
      },
      resolve: {
        extensions: [".js", ".ts", ".jsx", "tsx", ".vue", ".json"],
        alias: {
          "@": path.resolve(__dirname, "./src")
        }
      }
    };
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/styles/mixin.scss";' // 全局引入
      }
    }
  },
  devServer: {
    https: false,
    proxy: {
      // api接口代理
      "^/api": {
        target: `http://0.0.0.0`,
        changeOrigin: true
        // pathRewrite: {
        //   '^/chat': '/' //重写,
        // }
      },
      // websocket代理
      "^/wss": {
        target: `wss://0.0.0.0`,
        ws: true,
        changeOrigin: true
        // pathRewrite: {
        //   '^/chat': '/' //重写,
        // }
      }
    },
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  }
};
