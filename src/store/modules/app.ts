/* eslint-disable @typescript-eslint/member-ordering */
import { FunItem, MenuItem } from "@/router/permission";
import { Module, VuexModule, Mutation, Action, getModule } from "vuex-module-decorators";
import store from "../root";

@Module({ dynamic: true, store, name: "app" })
class App extends VuexModule {
  public title = process.env.VUE_APP_TITLE;
  public name = process.env.VUE_APP_TITLE;
  public logo = "/favicon.ico";
  /** 是否使用顶部菜单 */
  public isTopMenu = true;
  /** 是否使用面包屑 */
  public isBreadcrumb = true;
  /** 是否使用折叠 */
  public isCollapsed = false;
  /** 是否使用顶部的tag页签，开启后,会缓存所有的页面 */
  public isCacheTag = false;

  /** 需要缓存的页面，会根据条件匹配到true或结束 */
  public cacheViews: (string | RegExp | ((fun: FunItem) => boolean))[] = []; // ["/cache"]
  /** 不需要layout而直接显示的页面，会根据条件匹配到true或结束 */
  public rootViews: (string | RegExp | ((fun: FunItem) => boolean))[] = []; // ["/root"]
  /** 隐藏面包屑的页面。左侧没有菜单的时候。面包屑会默认不显示 */
  public hiddenBreadcrumbViews: (string | RegExp | ((fun: FunItem) => boolean))[] = [];
  /** 隐藏缓存标签页的页面 */
  public hiddenCacheTagViews: (string | RegExp | ((fun: FunItem) => boolean))[] = [];

  /** 整体菜单 */
  public menus: MenuItem[] = [];
  /** 左侧激活的菜单 */
  public sidebarMenus: MenuItem[] = [];
  /** 缓存的页面id */
  public cachedIds: string[] = [];
  /** 顶部的缓存的tag */
  public cachedTags: MenuItem[] = [];
  /** 折叠状态 */
  public collapsed = false;
  @Mutation
  public TagCollapsed() {
    this.collapsed = !this.collapsed;
  }
  // 设置总的菜单
  @Mutation
  public SetMenus(menus: MenuItem[]) {
    this.menus = menus;
  }
  // 设置左侧菜单。当不需要顶部时，这个变量没用
  @Mutation
  public SetSidebarMenus(menus: MenuItem[]) {
    this.sidebarMenus = menus;
  }

  // 添加缓存的页面
  @Mutation
  public AddCachedId(id: string) {
    if (!this.cachedIds.includes(id)) {
      this.cachedIds.push(id);
    }
  }
  @Mutation
  public RemoveCachedId(id: string) {
    const index = this.cachedIds.findIndex(item => item === id);
    if (index > -1) {
      this.cachedIds.splice(index, 1);
    }
  }
  @Mutation
  private AddCachedTags(menu: MenuItem) {
    this.cachedTags.push(menu);
  }
  @Mutation
  private RemoveCachedTags(id: string) {
    const index = this.cachedTags.findIndex(item => item.id === id);
    if (index > -1) {
      this.cachedTags.splice(index, 1);
    }
  }
  // 添加缓存tag
  @Action
  public addCachedTags(menu: MenuItem) {
    const index = this.cachedTags.findIndex(item => item.id === menu.id);
    if (index > -1) {
      return;
    }
    this.AddCachedTags(menu);
    this.AddCachedId(menu.id);
  }
  // 移除缓存tag
  @Action
  public removeCachedTags(id: string) {
    this.RemoveCachedTags(id);
    this.RemoveCachedId(id);
  }
}

const StoreApp = getModule(App);
export default StoreApp;
