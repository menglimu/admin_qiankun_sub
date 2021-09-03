/** 路由处理
 * 不需要左侧菜单的页面: 一级菜单下不配置的时候。左侧菜单不显示
 */
import router from "@/router";
import StoreApp from "@/store/modules/app";
import { RouteConfigSingleView } from "vue-router/types/router";

// TODO: 不需要layout的页面,  不需要登录的页面。后台系统目前没需求。
// TODO: 排序
/** 后端返回的菜单或本地静态菜单 */
export interface FunItem {
  id: string;
  text: string;
  url: string;
  expanded?: boolean;
  helpUrl?: string;
  icon?: string;
  leaf?: boolean;
  nodeType?: number;
  orderNo?: number;
  children?: FunItem[];
}
export interface MenuItem extends FunItem {
  /** 父级的id层级 */
  pids?: string[];
  /** http为外部链接。点击直接跳转走。iframe为嵌入在系统中的外部链接 */
  urlType?: "http" | "iframe";
  /** 子菜单 */
  children?: MenuItem[];
  /** 是否隐藏的菜单，目前后台没有字段配。通过nodeType和url进行匹配区分 */
  hidden?: boolean;
  /** TODO: 是否缓存菜单。目前后台没有字段。应该要通过列表进行匹配 */
  cache?: boolean;
}

export interface RouteCustom extends RouteConfigSingleView {
  meta: {
    pids?: string[];
    url?: string;
    urlType?: "http" | "iframe";
    btns?: string[];
    icon?: string;
    id?: string;
  };
}

// 是否是按钮权限菜单 ， 三中心没有是否隐藏的菜单类型。先以 / 开头区分。 非/表示按钮权限
function isBtn(menu: FunItem) {
  const reg = /^[http|/]/;
  return menu.nodeType === 3 && !reg.test(menu.url);
}

// type: http为外部链接。点击直接跳转走。iframe为嵌入在系统中的外部链接
export function parseUrl(url: string): { url: string; urlType?: "http" | "iframe" } {
  // TODO: 外部链接可能不以http开头
  if (/^https?:\/\//.test(url) || /^\/http\//.test(url)) {
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

// 找到第一个路由。首页重定向到这个地址
function findFirstRoute(menus: MenuItem[]) {
  if (!menus) return;
  for (const item of menus) {
    // 排查按钮，隐藏菜单，外链等一些特殊的菜单
    if (item.url && !item.hidden && item.urlType !== "http") return item.url;
    if (item.children?.length) {
      const url = findFirstRoute(item.children);
      if (url) return url;
    }
  }
}

/** 将menu转换为route */
const toRoute = function(funs: FunItem[], pids: string[]) {
  const routes: RouteCustom[] = [];
  const menus: MenuItem[] = [];
  funs.forEach(fun => {
    // menu2route
    if (!isBtn(fun)) {
      const { url, urlType } = parseUrl(fun.url);
      // 按钮权限
      const btns = fun.children?.filter(item => isBtn(item)).map(item => item.url) || [];
      // 路由
      const route: RouteCustom = {
        // url为空的时候。路由会直接进到空这来。不会走父级的重定向。这里给空url写一个id作为path
        path: url || "/" + fun.id,
        component:
          urlType === "iframe"
            ? () => import(`@/views/base/iframe`)
            : fun.url && urlType !== "http"
            ? () => import(`@/views/home`) //  () => import(`@/views${menu.url}`)
            : undefined,
        name: fun.id,
        meta: { pids, url, urlType, btns, icon: fun.icon, id: fun.id },
        redirect: null
      };
      // 菜单
      const layoutMenu: MenuItem = {
        ...fun,
        url,
        urlType,
        pids,
        hidden: fun.nodeType === 3
      };
      if (fun.children?.length) {
        const { routes, menus } = toRoute(fun.children, [...pids, fun.id]);
        layoutMenu.children = menus;
        route.children = routes;
        // 重定向到第一个
        route.redirect = findFirstRoute(layoutMenu.children);
      }
      routes.push(route);
      menus.push(layoutMenu);
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
  });
  return { routes, menus };
};

// 添加异步route到vue
export function addRoutes(funs: FunItem[]) {
  if (!funs?.length) return;
  const { routes, menus } = toRoute(funs, []);
  const first = findFirstRoute(menus);
  // 入口路由
  const main: RouteCustom[] = [
    {
      path: "/",
      component: !window.__POWERED_BY_QIANKUN__ ? () => import("@/layout/") : null,
      children: routes || [],
      redirect: first,
      meta: {}
    }
  ];
  console.log(main);
  router.addRoutes(main);
  StoreApp.SetMenus(menus);
  return routes;
}
