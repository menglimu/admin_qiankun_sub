/*
 * @Author: MrRabbit
 * @Date: 2020-11-05 11:15:50
 * @LastEditors: wenlin
 * @LastEditTime: 2020-12-22 17:13:01
 * @Description:
 * 增加svg的loader，
 * 配置别名
 * 全局注入scss
 * 配置代理
 * 按需加载lodash
 */

//按需加载lodash
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const path = require('path')

module.exports = {
  lintOnSave: false,
  publicPath: process.env.VUE_APP_BASEURL || '/',
  productionSourceMap: false,
  chainWebpack: chain => {
    //按需加载lodash
    if (process.env.NODE_ENV === 'production') {
      chain.plugin('loadshReplace').use(new LodashModuleReplacementPlugin())
    }
    chain.module.rule('svg').include.add(path.resolve(__dirname, './src/icons'))
    chain.module.rule('svg').uses.delete('file-loader')
    chain.module
      .rule('svg')
      .test(/\.(svg)(\?.*)?$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  },
  configureWebpack: function() {
    // console.log(config.module.rules[2])
    return {
      output: {
        library: `${process.env.VUE_APP_NAME}-[name]`,
        libraryTarget: 'umd', // 把微应用打包成 umd 库格式
        jsonpFunction: `webpackJsonp_${process.env.VUE_APP_NAME}`
      },
      resolve: {
        extensions: ['.js', '.ts', '.jsx', 'tsx', '.vue', '.json'],
        alias: {
          '@': path.resolve(__dirname, './src'),
          globalviews: path.resolve(__dirname, './src/views')
        }
      }
    }
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
      '/v1': {
        target: `http://10.10.10.10:80`,
        changeOrigin: true
      }
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
}
