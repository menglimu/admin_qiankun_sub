/**
 * @Author: wenlin
 * @Description: 消息
 */
import Vue from "vue";
import styles from "./index.module.scss";

export default Vue.extend({
  name: "Message",
  data() {
    return {};
  },
  methods: {},
  render() {
    return (
      <div>
        <svg-icon class={styles.icon} name="message" />
      </div>
    );
  }
});
