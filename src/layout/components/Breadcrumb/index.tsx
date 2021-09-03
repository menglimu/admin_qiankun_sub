/**
 * 面包屑
 */
import Vue from "vue";
import styles from "./index.module.scss";

export default Vue.extend({
  name: "Breadcrumb",
  data() {
    return {
      levelList: null
    };
  },
  computed: {
    menu() {
      return this.$store.getters.menu;
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      this.levelList = this.getList(this.menu, this.$route.meta.url);
    },
    getList(data, val, key = "url", childrenKey = "children") {
      for (const i in data) {
        if (data[i][key] && data[i][key] === val) {
          return [data[i]];
        }
        if (data[i][childrenKey] && data[i][childrenKey].length) {
          const result = this.getList(data[i][childrenKey], val, key, childrenKey);
          if (result) return [data[i], ...result];
        }
      }
    },
    onBack() {
      this.$router.go(-1);
    }
  },
  render() {
    return (
      <div class="app-breadcrumb">
        <el-button type="text" click="onBack">
          <i class="el-icon-arrow-left"></i>
        </el-button>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item
            v-for="item in levelList"
            key="item.id"
            to="item.url && item.url != $route.meta.url ? item.url : null"
          >
            {item.text}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    );
  }
});

/* <style lang="scss" scoped>
.app-breadcrumb {
  display: flex;
  align-items: center;
  height: 100%;
  padding-left: 30px;

  .el-button {
    font-size: 18px;
    color: #010101;
  }

  .el-breadcrumb {
    display: inline-flex;
    align-items: center;
    height: 100%;
    margin-left: 8px;
    font-size: 16px;

    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
}
</style> */
