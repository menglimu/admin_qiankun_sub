import router from '@/router';
import child from '@/router/child';

// import { loadComponent } from '@/utils'

export function parseUrl(url: string) {
  if (!url) {
    return { url: '', isExternal: false };
  }
  if (/^https?:\/\//.test(url)) {
    return {
      url: '/iframe/' + encodeURIComponent(url),
      isExternal: true
    };
  } else if (url.substring(0, 8) === '/iframe/') {
    return {
      url,
      isExternal: true
    };
  } else if (url.charAt(0) === '/') {
    return {
      url: url.toLocaleLowerCase(),
      isExternal: false
    };
  } else {
    return { url: '', isExternal: false };
  }
}
const toRoute = function (item, pids: string[], route) {
  const { url, isExternal } = parseUrl(item.nodeType !== 3 ? item.url : '');
  if (url) {
    item.pids = pids;
    // 需要判断底下有没有路由,由于有些有些具备二级菜单路由，所以一级菜单无 component
    // 需要加入重定向
    let redirectUrl = '';
    if (item.children) {
      const len = item.children.length;
      for (let i = 0; i < len; i++) {
        const element = item.children[i];
        if (element.nodeType !== 3 && element.url) {
          redirectUrl = element.url;
          break;
        }
      }
    }
    route.push({
      path: `${url}`,
      component: isExternal ? () => import('@/views/base/iframeTemplateEmpty/index') : () => import(`@/views${url}/`),
      name: pids.concat(item.id).join('-'),
      icon: '',
      meta: Object.assign(item, { pids, url: `${url}` }),
      noDropdown: true,
      redirect: redirectUrl
    });

    if (child.hasOwnProperty(url)) {
      [...child[url]].forEach((c, i) => {
        const id = `${item.id}.${i}`;
        c.meta = {
          children: item.children || [],
          id,
          pids: pids.concat(item.id),
          // hideMenu: true,
          addTag: false,
          text: c.name,
          ...(c.meta || {})
        };
        route.push(c);
      });
    }
  }
  if (item.children?.length) {
    for (let i = 0, len = item.children.length; i < len; i++) {
      toRoute(item.children[i], [...pids, item.id], route);
    }
  }
};

function findFirstRoute(obj) {
  // 找到第一个路由
  let url = '';
  function getUrl(obj) {
    if (url) return;
    if (obj.url) {
      url = obj.url;
      return;
    }
    if (obj.children?.[0]) {
      obj.children.forEach(item => {
        getUrl(item);
      });
    }
  }
  getUrl(obj);
  return url;
}

function menuToRoute(menu) {
  const qiankun = (window as any).__POWERED_BY_QIANKUN__;
  if (qiankun) {
    const route = [];
    menu.forEach(item => {
      toRoute(item, [], route);
    });
    return route;
  } else {
    const first = menu[0] && findFirstRoute(menu[0]);
    console.log(first);
    const route = {
      path: '/',
      component: () => import('@/layout/index.vue'),
      chunkName: 'views/index',
      children: [],
      hidden: true,
      redirect: first
    };
    menu.forEach(item => {
      toRoute(item, [], route.children);
    });
    return [route];
  }
}

export function addRoutes(menu) {
  router.addRoutes(menuToRoute(menu));
}

// 使用本地static中的菜单,初始的渲染，登录后还会进行注入路由
// const useLocalMenu = process.env.VUE_APP_LOCAL_MENU === '1'
// if (useLocalMenu) {
//   console.log(staticRoutes)
//   router.addRoutes(menuToRoute(staticRoutes))
// }
