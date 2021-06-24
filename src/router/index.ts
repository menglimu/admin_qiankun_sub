/*
 * @Author: your name
 * @Date: 2020-11-09 09:34:04
 * @LastEditTime: 2020-11-27 16:45:52
 * @LastEditors: wenlin
 * @Description: In User Settings Edi,
 * @FilePath: \hcsg_evaluation_fore\src\router\index.ts
 */
// eslint-disable
import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条样式

Vue.use(Router);

export const constantRouterMap = [
  {
    name: '404',
    path: '/404',
    redirect: '',
    component: () => import(/* webpackChunkName: "404" */ '@/views/base/404'),
    chunkName: 'views/404',
    hidden: true
  },
  {
    name: 'index',
    path: '/',
    component: () => import(/* webpackChunkName: "index" */ '@/layout/index.vue'),
    chunkName: 'views/index',
    children: [],
    hidden: true
  },
  {
    name: 'login',
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/base/login'),
    hidden: true
  },
  {
    name: '*',
    path: '*',
    component: () => import(/* webpackChunkName: "404" */ '@/views/base/404'),
    hidden: true
  }
];
const router: Router = new Router({
  mode: 'history', // 后端支持可开
  base:
    ((window as any).__POWERED_BY_QIANKUN__ ? (window as any).qiankun_app_baseurl : process.env.VUE_APP_BASEURL) || '/',
  scrollBehavior: () => ({
    y: 0,
    x: 0
  }),
  routes: constantRouterMap
});
// 拦截路由，增加进度
router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});
router.onError(() => {
  NProgress.done(); // 结束Progress
});
router.afterEach(() => {
  NProgress.done(); // 结束Progress
});
export default router;
