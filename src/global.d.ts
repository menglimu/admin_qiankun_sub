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
