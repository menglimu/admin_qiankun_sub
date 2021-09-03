import { MenuItem } from "@/router/permission";
import { Module, VuexModule, Mutation, Action, getModule } from "vuex-module-decorators";
import store from "../root";

@Module({ dynamic: true, store, name: "app" })
class App extends VuexModule {
  /** 是否使用顶部菜单 */
  public isTopMenu = true;
  /** 是否折叠 */
  public isCollapsed = false;
  /** 整体菜单 */
  public menus: MenuItem[] = [];
  /** 左侧激活的菜单 */
  public sidebarMenus: MenuItem[] = [];

  @Mutation
  public TagCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }

  @Mutation
  public SetMenus(menus: MenuItem[]) {
    this.menus = menus;
  }

  @Mutation
  public SetSidebarMenus(menus: MenuItem[]) {
    this.sidebarMenus = menus;
  }
}

const StoreApp = getModule(App);
export default StoreApp;
