/** 路由处理
 * 不需要左侧菜单的页面: 一级菜单下不配置的时候。左侧菜单不显示
 */
import router from "@/router";
import StoreApp from "@/store/modules/app";
import { isNull } from "@/utils";
import { RouteConfigSingleView } from "vue-router/types/router";

// TODO: 不需要登录的页面。后台系统目前没需求。
/** 后端返回的菜单或本地静态菜单 */
export interface FunItem {
  id: string;
  text: string;
  url: string;
  expanded?: boolean;
  helpUrl?: string;
  icon?: string;
  leaf?: boolean;
  // 0"顶级菜单", 1"节点", 2"叶子", 3"按钮"
  nodeType?: number;
  // 排序号
  orderNo?: number;
  // 是否日志
  logFlag?: boolean;
  children?: FunItem[];

  /** 是否隐藏的菜单，目前后台没有字段配。通过nodeType */
  hidden?: boolean;
  /** 是否缓存菜单。目前后台没有字段。通过store中app中列表进行匹配 */
  cache?: boolean;
  /** 不需要layout的菜单。目前后台没有字段。通过store中app中列表进行匹配 */
  root?: boolean;
}
export interface MenuItem extends FunItem {
  /** 父级的id层级 */
  pids?: string[];
  /** http为外部链接。点击直接跳转走。iframe为嵌入在系统中的外部链接 */
  urlType?: "http" | "iframe";
  /** 子菜单 */
  children?: MenuItem[];
}

export interface RouteCustom extends RouteConfigSingleView {
  meta: {
    pids?: string[];
    text?: string;
    url?: string;
    btns?: string[];
    icon?: string;
    id?: string;
    cache?: boolean;
  };
}

// 是否是按钮权限菜单 ， 三中心没有是否隐藏的菜单类型。先以 / 开头区分。 非/表示按钮权限
function isBtn(fun: FunItem) {
  const reg = /^[http|/]/;
  return fun.nodeType === 3 && !reg.test(fun.url);
}

/** 是否缓存菜单。目前后台没有字段。应该要通过列表进行匹配 */
function isCache(fun: FunItem) {
  for (const rule of StoreApp.cacheViews) {
    if (typeof rule === "string" && rule === fun.url) {
      return true;
    }
    if (rule instanceof RegExp && rule.test(fun.url)) {
      return true;
    }
    if (typeof rule === "function" && rule(fun)) {
      return true;
    }
  }
  return false;
}
/** 不需要layout的菜单。目前后台没有字段。应该要通过列表进行匹配 */
function isRoot(fun: FunItem) {
  for (const rule of StoreApp.rootViews) {
    if (typeof rule === "string" && rule === fun.url) {
      return true;
    }
    if (rule instanceof RegExp && rule.test(fun.url)) {
      return true;
    }
    if (typeof rule === "function" && rule(fun)) {
      return true;
    }
  }
  return false;
}

// type: http为外部链接。点击直接跳转走。iframe为嵌入在系统中的外部链接
export function parseUrl(url: string): { url: string; urlType?: "http" | "iframe" } {
  if (/^https?:\/\//.test(url)) {
    return {
      url: "/http/" + window.btoa(url),
      urlType: "http"
    };
  }
  // 外部链接可能不以http开头, 暂定以/http/的相对路径为外链
  if (/^\/http\//.test(url)) {
    return {
      url: "/http/" + window.btoa(url.slice(6)),
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
    // 排除按钮，隐藏菜单，外链等一些特殊的菜单
    if (item.url && !item.hidden && item.urlType !== "http") return item.url;
    if (item.children?.length) {
      const url = findFirstRoute(item.children);
      if (url) return url;
    }
  }
}

let rootRoutes: RouteCustom[] = [];
let layoutRoutes: RouteCustom[] = [];
/** 将funs转换为route和menu */
const toMenuRoute = function(funs: FunItem[], pids: string[]) {
  const menus: MenuItem[] = [];
  funs.forEach(fun => {
    // 处理目前后端不支持配置的几个项
    if (isNull(fun.hidden)) {
      fun.hidden = fun.nodeType === 3;
    }
    if (isNull(fun.cache)) {
      fun.cache = isCache(fun);
    }
    if (isNull(fun.root)) {
      fun.root = isRoot(fun);
    }
    // fun2route,menu
    if (!isBtn(fun)) {
      const { url, urlType } = parseUrl(fun.url);
      // 按钮权限
      const btns = fun.children?.filter(item => isBtn(item)).map(item => item.url) || [];
      // 路由
      const route: RouteCustom = {
        // url为空的时候。路由会直接进到空这来。不会走父级的重定向。这里给空url写一个id作为path
        path: url || "/" + fun.id,
        // component: isExternal ? () => import('@/views/iframeTemplateEmpty/index') : () => import(`@/views${url}`),
        component:
          urlType === "iframe"
            ? () => import(`@/views/base/iframe`)
            : fun.url && urlType !== "http"
            ? () => import(`@/views/home`) // () => import(`@/views${menu.url}`)
            : null,
        name: fun.id,
        meta: { pids, url: fun.url, btns, text: fun.text, icon: fun.icon, id: fun.id, cache: fun.cache },
        redirect: null
      };
      // 菜单
      const menu: MenuItem = {
        ...fun,
        url,
        urlType,
        pids
      };
      if (fun.children?.length) {
        menu.children = toMenuRoute(fun.children, [...pids, fun.id]);
        // 重定向到第一个
        route.redirect = findFirstRoute(menu.children);
      }
      if (fun.root) {
        rootRoutes.push(route);
      } else {
        layoutRoutes.push(route);
      }
      menus.push(menu);
    }
  });
  return menus.sort((a, b) => a.orderNo - b.orderNo);

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
};
function createMenusRoutes(funs: FunItem[]) {
  rootRoutes = [];
  layoutRoutes = [];
  const menus = toMenuRoute(funs, []);
  const first = findFirstRoute(menus);
  // 入口路由
  const main: RouteCustom[] = [
    {
      path: "/",
      component: !window.__POWERED_BY_QIANKUN__ ? () => import("@/layout/") : null,
      children: layoutRoutes || [],
      redirect: first,
      meta: {}
    },
    ...rootRoutes
  ];
  router.addRoutes(main);
  StoreApp.SetMenus(menus);
}

// 添加异步route到vue
export function addRoutes(funs: FunItem[]) {
  if (!funs?.length) return;
  createMenusRoutes(funs);
}
