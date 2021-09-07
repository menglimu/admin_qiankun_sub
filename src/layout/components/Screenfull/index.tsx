/**
 * 全屏按钮
 */
import Vue from "vue";
import screenfull, { Screenfull } from "screenfull";
import styles from "../../index.module.scss";

export default Vue.extend({
  name: "Screenfull",
  data() {
    return {
      isFullscreen: false
    };
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.destroy();
  },
  methods: {
    click() {
      if (!screenfull.isEnabled) {
        this.$message.warning("暂不支持全屏");
        return false;
      }
      screenfull.toggle();
    },
    change() {
      this.isFullscreen = (screenfull as Screenfull).isFullscreen;
    },
    init() {
      if (screenfull.isEnabled) {
        screenfull.on("change", this.change);
      }
    },
    destroy() {
      if (screenfull.isEnabled) {
        screenfull.off("change", this.change);
      }
    }
  },
  render() {
    return (
      <svg-icon
        class={styles.screenfull}
        name={this.isFullscreen ? "exit-fullscreen" : "fullscreen"}
        onClick={this.click}
      />
    );
  }
});
