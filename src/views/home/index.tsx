/**
 * @Author: wenlin
 * @Description: 测试首页
 */
import Vue from "vue";

export default Vue.extend({
  name: "Home",
  data() {
    return { aa: 1 };
  },
  methods: {},
  created() {
    console.log(this.$route.meta.btns);
  },
  render() {
    return (
      <div>
        这是测试
        <el-input v-model={this.aa}></el-input>
      </div>
    );
  }
});
