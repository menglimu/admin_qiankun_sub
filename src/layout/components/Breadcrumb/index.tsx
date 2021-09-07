/**
 * 面包屑
 */
import { goLink } from "@/layout/common";
import { MenuItem, RouteCustom } from "@/router/permission";
import StoreApp from "@/store/modules/app";
import Vue from "vue";
import styles from "../../index.module.scss";
import Collapse from "../Collapse";

export default Vue.extend({
  name: "Breadcrumb",
  data() {
    return {
      levelList: [] as MenuItem[]
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      this.levelList = []; // this.getList(StoreApp.menus, this.$route.name);
      let parent = StoreApp.menus;
      [...this.$route.meta.pids, this.$route.name].forEach(id => {
        const menu = parent.find(item => item.id === id);
        this.levelList.push(menu);
        parent = menu.children || [];
      });
    },
    goLink(menu: MenuItem) {
      if (!menu.url || menu.id === this.$route.name) {
        return;
      }
      goLink(menu);
    },
    onBack() {
      this.$router.go(-1);
    },
    hideBreadcrumb() {
      const menu = this.levelList[this.levelList.length - 1];
      if (StoreApp.isTopMenu && !StoreApp.sidebarMenus?.length) {
        return true;
      }
      if (!menu) return false;
      for (const rule of StoreApp.hiddenBreadcrumbViews) {
        if (typeof rule === "string" && rule === menu.url) {
          return true;
        }
        if (rule instanceof RegExp && rule.test(menu.url)) {
          return true;
        }
        if (typeof rule === "function" && rule(menu)) {
          return true;
        }
      }
      return false;
    }
  },
  render(this: any) {
    return this.hideBreadcrumb() ? null : (
      <div class={styles.breadcrumb}>
        {StoreApp.isCollapse && <Collapse />}
        <el-breadcrumb separator="/">
          {this.levelList.map(item => (
            <el-breadcrumb-item
              key={item.id}
              class={{ [styles.disabled]: !item.url, [styles.active]: item.id === this.$route.name }}
              nativeOnClick={() => this.goLink(item)}
            >
              {item.text}
            </el-breadcrumb-item>
          ))}
        </el-breadcrumb>
      </div>
    );
  }
});

/* <style lang="scss" scoped>
.app-breadcrumb {
  display: flex;
  align-items: center;
  height: 100%;
  padding-left: 30px;

  .el-button {
    font-size: 18px;
    color: #010101;
  }

  .el-breadcrumb {
    display: inline-flex;
    align-items: center;
    height: 100%;
    margin-left: 8px;
    font-size: 16px;

    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
}
</style> */
