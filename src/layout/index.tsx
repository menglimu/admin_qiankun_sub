/**
 * 后台布局
 */
import Vue from "vue";
import styles from "./index.module.scss";
import StoreApp from "@/store/modules/app";
import Header from "./components/Header";
import AppMain from "./components/AppMain";
import Sidebar from "./components/Sidebar";
import Breadcrumb from "./components/Breadcrumb";
import TagsView from "./components/TagsView";

export default Vue.extend({
  name: "Layout",
  render() {
    return (
      <div class={styles.app}>
        <Header />
        <div class={styles.container}>
          <Sidebar />
          <div class={styles.mainBox}>
            {StoreApp.isCacheTag && <TagsView />}
            {StoreApp.isBreadcrumb && <Breadcrumb />}
            <AppMain />
          </div>
        </div>
      </div>
    );
  }
});
