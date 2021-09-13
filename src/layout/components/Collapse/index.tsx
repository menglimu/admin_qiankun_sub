/**
 * 折叠按钮
 */
import StoreApp from "@/store/modules/app";
import Vue from "vue";
import styles from "../../index.module.scss";

export default Vue.extend({
  name: "Collapse",
  render() {
    return (
      <div onClick={StoreApp.TagCollapsed} class={styles.collapseBox}>
        <svg-icon name="collapse" class={{ [styles.collapse]: true, [styles.active]: StoreApp.collapsed }}></svg-icon>
      </div>
    );
  }
});

/* <style scoped>
.hamburger {
}

.hamburger.is-active {
  
}
</style> */
