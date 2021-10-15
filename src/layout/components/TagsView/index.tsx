/**
 * @Author: wenlin
 * @Description: 顶部页签
 */
import { getMenuById, goLink } from "@/layout/common";
import StoreApp from "@/store/modules/app";
import Vue from "vue";
import { VNode } from "vue/types/umd";
import "./index.scss";

export default Vue.extend({
  name: "TagsView",
  methods: {
    handleRouteJump({ name }) {
      const menu = getMenuById(name);
      goLink(menu);
    },
    removeTag(name: string) {
      if (name === this.$route.name) {
        const index = StoreApp.cachedTags.findIndex(item => item.id === name);
        const id = StoreApp.cachedTags[index + 1]?.id || StoreApp.cachedTags[index - 1]?.id;
        if (id) {
          const menu = getMenuById(id);
          goLink(menu);
        } else {
          this.$router.push("/");
        }
      }
      StoreApp.removeCachedTags(name);
    },

    hideTagsView() {
      const menu = getMenuById(this.$route.name);
      if (StoreApp.isTopMenu && !StoreApp.sidebarMenus?.length) {
        return true;
      }
      if (!menu) return false;
      for (const rule of StoreApp.hiddenCacheTagViews) {
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
  //
  render(): VNode {
    return this.hideTagsView() ? null : (
      <el-tabs
        ref="tabs"
        value={this.$route.name}
        type="card"
        closable
        class={["tagsView"]}
        on={{ "tab-click": this.handleRouteJump, "tab-remove": this.removeTag }}
      >
        {StoreApp.cachedTags?.map(item => (
          <el-tab-pane key={item.id} label={item.text} name={item.id}></el-tab-pane>
        ))}
      </el-tabs>
    );
  }
});
