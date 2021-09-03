/**
 * 后台布局
 */
import Vue from "vue";
import styles from "./index.module.scss";
import StoreApp from "@/store/modules/app";
import Header from "./components/Header";
import AppMain from "./components/AppMain";
import Sidebar from "./components/Sidebar";

export default Vue.extend({
  name: "Layout",
  render() {
    return (
      <div class={styles.app}>
        <Header />
        <div class={styles.container}>
          <Sidebar />
          <AppMain />
        </div>
      </div>
    );
  }
});
