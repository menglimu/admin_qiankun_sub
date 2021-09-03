/**
 * 全屏按钮
 */
import Vue from "vue";
import styles from "./index.module.scss";
import screenfull from "screenfull";

export default Vue.extend({
  name: "Screenfull",
  data() {
    return {
      isFullscreen: false
    };
  },
  mounted() {
    console.log(screenfull);
    this.init();
  },
  beforeDestroy() {
    this.destroy();
  },
  methods: {
    click() {
      if (!screenfull.enabled) {
        this.$message({
          message: "you browser can not work",
          type: "warning"
        });
        return false;
      }
      screenfull.toggle();
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen;
    },
    init() {
      if (screenfull.enabled) {
        screenfull.on("change", this.change);
      }
    },
    destroy() {
      if (screenfull.enabled) {
        screenfull.off("change", this.change);
      }
    }
  },
  render() {
    return <svg-icon icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" click="click" />;
  }
});

// .screenfull-svg {
//   display: inline-block;
//   cursor: pointer;
//   fill: #5a5e66;
//   width: 20px;
//   height: 20px;
//   vertical-align: 10px;
// }
