/*
 * @Author: wenlin
 * @Date: 2020-04-24 15:29:36
 * @LastEditors: wenlin
 * @LastEditTime: 2020-12-25 09:52:44
 * @Description:
 */
// import 'babel-polyfill'
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import mlComponents from "ml-component";
import("ml-component/dist/style.css");
import elementUi from "element-ui";
import "@/icons"; // icon svg图标
// import "@/directives"; // 指令

import "@/styles/index.scss"; // global css
import { QKProps } from "./main";

// TODO: 先通过zindex展示处理嵌套到主应用中的层级问题。后面考虑使用主应用和子应用共享同一elementUI框架
Vue.use(elementUi, { size: "small", zIndex: 3000 }).use(mlComponents);

Vue.config.productionTip = false;
// 初始化vue
export async function render(props: QKProps) {
  // 在这里用await 防止公共样式没加载。页面就展示
  // 微服务启动的时候，公共样式从主应用引入
  if (process.env?.VUE_APP_QIANKUN === "0") {
    await import("@/styles/common/index.scss");
  }
  const container = props?.container;
  return new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount(container ? container.querySelector("#app") : "#app");
}

window.eventBus = window.eventBus || new Vue(); // eventBus

// 给Date原型增加方法
// eslint-disable-next-line no-extend-native
Date.prototype.Format = function(fmt = "yyyy-MM-dd hh:mm:ss") {
  let fmt_ = fmt;
  const o = {
    "M+": this.getMonth() + 1, // 月份
    "d+": this.getDate(), // 日
    "h+": this.getHours(), // 小时
    "m+": this.getMinutes(), // 分
    "s+": this.getSeconds(), // 秒
    "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
    S: this.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt_)) fmt_ = fmt_.replace(RegExp.$1, String(this.getFullYear()).substr(4 - RegExp.$1.length));
  for (const k in o)
    if (new RegExp("(" + k + ")").test(fmt_))
      fmt_ = fmt_.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(String(o[k]).length));
  return fmt_;
};

// 重写c-ui的 confirm 修改默认提示的样式
const baseConfirm = Vue.prototype.$confirm;
Vue.prototype.$confirm = function(...params) {
  if (params.length === 1) {
    return baseConfirm(params[0], "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    });
  } else {
    return baseConfirm(...params);
  }
};
