/** 路由处理 */
import router from "@/router";
import { RouteConfig } from "vue-router";

// TODO: 不需要layout的页面，不需要登录的页面。后台系统目前没需求。
/** 后端返回的菜单或本地静态菜单 */
export interface MenuItem {
  expanded: boolean;
  helpUrl?: string;
  icon?: string;
  id: string;
  leaf: boolean;
  nodeType?: number;
  openNew?: boolean;
  orderNo?: number;
  pids?: string[];
  systemType?: number;
  text: string;
  url: string;
  urlType?: "http" | "iframe";
  children: MenuItem[];
}

// 是否是按钮权限菜单 ， 三中心没有是否隐藏的菜单类型。先以 / 开头区分。 非/表示按钮权限
function isBtn(menu: MenuItem) {
  const reg = /^[http|/]/;
  return menu.nodeType === 3 && !reg.test(menu.url);
}

// type: http为外部链接。点击直接跳转走。iframe为嵌入在系统中的外部链接
export function parseUrl(url: string): { url: string; urlType?: "http" | "iframe" } {
  if (/^https?:\/\//.test(url)) {
    return {
      url: "/http/" + window.btoa(url),
      urlType: "http"
    };
  }
  if (url.substring(0, 8) === "/iframe/") {
    return {
      url: "/iframe/" + window.btoa(url.slice(8)),
      urlType: "iframe"
    };
  }
  return { url };
}

/** 将menu转换为route */
const toRoute = function(menu: MenuItem, pids: string[], routes: RouteConfig[]) {
  const { url, urlType } = parseUrl(menu.url);
  // 修改菜单的属性
  menu.pids = pids;
  menu.url = url;
  menu.urlType = urlType;
  // 重定向到第一个
  let redirectUrl = "";
  if (!menu.url && menu.children?.length) {
    for (const item of menu.children) {
      if (item.nodeType !== 3 && item.url) {
        redirectUrl = item.url;
        break;
      }
    }
  }

  // 按钮权限
  const btns = menu.children?.filter(item => isBtn(item)).map(item => item.url) || [];
  // menu2route
  if (!isBtn(menu)) {
    routes.push({
      path: `${menu.url}`,
      component:
        urlType === "iframe"
          ? () => import(`@/views/base/iframe`)
          : menu.url
          ? () => import(`@/views${menu.url}`)
          : undefined,
      name: menu.id || menu.url,
      meta: { pids, icon: menu.icon, url: `${menu.url}`, btns },
      redirect: redirectUrl || null
    });
  }

  // 加载本地路由中的child部分。这块逻辑有问题，业务无需求。先注释
  // if (child.hasOwnProperty(menu.url)) {
  //   [...child[menu.url]].forEach((c, i) => {
  //     const id = `${menu.id}.${i}`;
  //     c.meta = {
  //       children: menu.children || [],
  //       id,
  //       pids: pids.concat(menu.id),
  //       // hideMenu: true,
  //       addTag: false,
  //       text: c.name,
  //       ...(c.meta || {})
  //     };
  //     menu.push(c);
  //   });
  // }

  if (menu.children?.length) {
    for (let i = 0, len = menu.children.length; i < len; i++) {
      toRoute(menu.children[i], [...pids, menu.id], routes);
    }
  }
};

// 找到第一个路由。首页重定向到这个地址
function findFirstRoute(menu: MenuItem[]) {
  for (const item of menu) {
    if (item.url) return item.url;
    if (item.children?.length) {
      const url = findFirstRoute(item.children);
      if (url) return url;
    }
  }
}
// 将菜单转换为vue的route
function menuToRoute(menu: MenuItem[]) {
  const first = findFirstRoute(menu);
  const route: RouteConfig = {
    path: "/",
    component: !window.__POWERED_BY_QIANKUN__ ? () => import("@/layout/index.vue") : null,
    children: [],
    redirect: first
  };
  menu.forEach(item => {
    toRoute(item, [], route.children);
  });
  return [route];
}
// 添加异步route到vue
export function addRoutes(menu: MenuItem[]) {
  if (!menu?.length) return;
  router.addRoutes(menuToRoute(menu) || []);
  return menu;
}
