/*
 * @Author: wenlin
 * @Date: 2020-02-25 09:59:40
 * @LastEditors: wenlin
 * @LastEditTime: 2020-04-24 10:14:25
 * @Description:
 */
import Vue from 'vue';
import SvgIcon from './component'; // svg组件
// register globally
Vue.component('svg-icon', SvgIcon);

const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('./svg', false, /\.svg$/);

const re = /[^-]+/g;
const icons = requireAll(req).map(i => {
  return i.default.id.match(re)[1];
});

export default icons;
