/*
 * @Author: wenlin
 * @Date: 2020-11-06 10:25:28
 * @LastEditors: wenlin
 * @LastEditTime: 2020-11-17 18:29:46
 * @Description:
 */
import Vue, { VNode } from 'vue'
import { RootState } from './store';
import { Store } from 'vuex';

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}
// 设置VueOptions为任意属性。屏蔽jsx检测属性报错问题
declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    [propName: string]: any
  }
}

// 设置VueOptions为任意属性。屏蔽jsx检测属性报错问题
declare module 'vue/types/vue' {
  interface Vue {
    $viewfile: any
    $viewImage:(fileKey: string, fileSrc?: string)=>void
  }
}