/*
 * @Author: wenlin
 * @Date: 2020-06-09 16:25:28
 * @LastEditors: wenlin
 * @LastEditTime: 2020-12-24 11:26:24
 * @Description:
 */
// declare function Amap(): any
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'
declare module '*.module.scss'


interface AnyObj {
  [key: string]: any
}
declare module '@cci/cui'
declare module '@cci/cp-svg-icon'

declare module 'nprogress'
declare module 'qs'

declare module 'hls.js'
// declare module 'AMap'
// declare let AMap: any
// {
//   export default class {

//   }

// }

// declare let EventEmitter: any

// declare function merge<T>(...obj: any): T
declare module 'webpack-merge' {
  export default function merge<T>(...obj: any): T
}

interface Window {
  /* 项目的全局eventBus */
  eventBus: Vue
  /* 主项目的全局eventBus */
  appEventBus?: Vue
  /* 是否是qiankun的子系统运行 */
  __POWERED_BY_QIANKUN__: boolean 
  /* 主应用的baseURL */
  qiankun_app_baseurl?: string
  /* 主应用的项目名 */
  qiankun_app_name?: string
}
