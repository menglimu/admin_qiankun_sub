/**
 * 头部
 */
import Vue from "vue";
import styles from "../index.module.scss";
import { mapGetters } from "vuex";
import TopMenu from "./Sidebar/TopMenu";
import StoreApp from "@/store/modules/app";
// import Breadcrumb from "./Breadcrumb";
// import Collapse from "./Collapse";
// import Screenfull from "./Screenfull";

export default Vue.extend({
  name: "Header",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "userName"])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async onExit() {
      await this.$store.dispatch("FedLogOut");
      location.href = "/login";
    }
  },
  render() {
    return (
      <div class={styles.header}>
        {/*  菜单折叠  */}
        {/* <Collapse  :is-active="sidebar.opened" @toggleClick="toggleSideBar" /> */}
        {/*  面包屑  */}
        {/* <Breadcrumb class="breadcrumb-container" /> */}
        {/* logo和名称 */}
        <div class={styles.logoBox}>
          {StoreApp.logo && <img class={styles.logo} src={StoreApp.logo}></img>}
          {StoreApp.name || StoreApp.title}
        </div>
        {/* 顶部菜单 */}
        {StoreApp.isTopMenu && <TopMenu></TopMenu>}
        <div class={styles.headerRight}>
          {/* 全屏 */}
          {/* <Screenfull id="screenfull" class="right-menu-item hover-effect" /> */}
          {/* 消息 */}
          {/* <el-button type="text" class="message">
        <svg-icon icon-class="message" />
      </el-button> */}
          {/* 用户信息: 头像、名字 */}
          {this.avatar && <img class={styles.avatar} />}
          <svg-icon name="avatar" class={styles.avatar} />
          <div class={styles.userName}>{this.userName}</div>
          {/* 退出 */}
          <div class={styles.exit} onClick={this.onExit}>
            退出
          </div>
        </div>
      </div>
    );
  }
});
