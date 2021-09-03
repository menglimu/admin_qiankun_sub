/**
 * 页面中间的内容
 */
import Vue from "vue";
import styles from "../index.module.scss";

export default Vue.extend({
  name: "AppMain",
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.path;
    },
    isCached() {
      return this.$route.meta?.cache;
    }
  },
  render() {
    //   <div class="app-box">
    //   <keep-alive>
    //     <router-view class="app-main" v-if="isCached"></router-view>
    //   </keep-alive>
    //   <router-view v-if="!isCached" class="app-main"></router-view>
    // </div>
    //  include={this.cachedViews}
    return (
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <router-view class={styles.main} />
        </keep-alive>
      </transition>
    );
  }
});

// .app-box {
//   // height: calc(100% - 60px);
//   height: 100%;
//   padding: 30px;
//   overflow: auto;
// }
// .app-main {
//   min-height: 100%;
//   // margin: 30px;
//   background: #fff;
//   box-shadow: 0px 6px 18px 0px rgba(0, 60, 166, 0.05);
//   border-radius: 10px;
//   overflow: auto;
// }
