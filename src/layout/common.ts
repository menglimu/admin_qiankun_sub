import router from "@/router";
import { MenuItem } from "@/router/permission";
import StoreApp from "@/store/modules/app";
export function goLink(menu: MenuItem) {
  if (menu.urlType === "http") {
    window.open(window.atob(menu.url.slice(6)));
  } else {
    router.push({ name: menu.id });
  }
}

function getList(data: MenuItem[], val: string) {
  for (const item of data) {
    if (item.id === val) {
      return item;
    }
    if (item.children?.length) {
      const result = getList(item.children, val);
      if (result) return result;
    }
  }
}
export function getMenuById(id: string): MenuItem {
  return getList(StoreApp.menus, id);
}
