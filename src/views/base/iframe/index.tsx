import Vue from "vue";
import { urlAdd } from "@/utils";
import styles from "./index.module.scss";
export default Vue.extend({
  name: "IframeTemplateEmpty",
  data() {
    return {
      url: ""
    };
  },
  created() {
    // 去掉 /iframe/
    this.$watch("$route.path", this.refreshIframe, { immediate: true });
  },
  methods: {
    refreshIframe() {
      let url = this.$route?.path?.slice(8);
      const token = this.$store.getters.token;
      if (url) {
        url = window.atob(url);
        this.url = urlAdd({ token }, url);
      }
    }
  },
  render: () => (
    <div class={styles.iframeBox}>
      <iframe src="url" key="url"></iframe>
    </div>
  )
});
