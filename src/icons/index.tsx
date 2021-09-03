/**
 * @Author: wenlin
 * @Description: 去掉外层遍历引用。在组件内引
 */
import Vue from "vue";
import SvgIcon from "./component";
Vue.component("svg-icon", SvgIcon);
// import SvgIcon from './component'; // svg组件
// register globally
// Vue.component('svg-icon', SvgIcon);
// const requireAll = requireContext => requireContext.keys().map(requireContext);
// const req = require.context("./svg", false, /\.svg$/);
// const re = /[^-]+/g;
// const icons = requireAll(req).map(i => {
//   return i.default.id.match(re)[1];
// });
// export default icons;
