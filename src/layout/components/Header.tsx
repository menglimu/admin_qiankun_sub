/**
 * 头部
 */
import Vue from "vue";
import styles from "../index.module.scss";
import { mapGetters } from "vuex";
import TopMenu from "./Sidebar/TopMenu";
import StoreApp from "@/store/modules/app";
import Screenfull from "./Screenfull";
import Message from "../Message";

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
        {/* logo和名称 */}
        <div class={styles.logoBox}>
          {StoreApp.logo && <img class={styles.logo} src={StoreApp.logo}></img>}
          {StoreApp.name || StoreApp.title}
        </div>
        {/* 顶部菜单 */}
        {StoreApp.isTopMenu && <TopMenu></TopMenu>}
        <div class={styles.headerRight}>
          {/* 全屏 */}
          {StoreApp.isScreenFull && <Screenfull class="right-menu-item hover-effect" />}
          {/* 消息 */}
          {StoreApp.isMessage && <Message />}
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
