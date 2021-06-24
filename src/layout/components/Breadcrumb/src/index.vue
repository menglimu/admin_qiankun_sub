<script>
export default {
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
      this.levelList = this.getList(this.menu, this.$route.path);
    },
    getList(data, val, key = 'url', childrenKey = 'children') {
      for (const i in data) {
        if (data[i][key] && data[i][key] === val) {
          return [data[i]];
        }
        if (data[i][childrenKey] && data[i][childrenKey].length) {
          const result = this.getList(data[i][childrenKey], val, key, childrenKey);
          if (result) return [data[i], ...result];
        }
      }
    }
  }
};
</script>

<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <el-breadcrumb-item
      v-for="item in levelList"
      :key="item.id"
      :to="item.url && item.url != $route.meta.url ? item.url : null"
      >{{ item.text }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style rel="stylesheet/scss" lang="scss">
.app-breadcrumb {
  display: block;

  &.el-breadcrumb {
    height: 42px;
    padding-left: 20px;
    font-size: 12px;
    line-height: 42px;

    .el-breadcrumb__inner {
      color: #999;
    }

    .el-breadcrumb__separator {
      margin: 0 6px;
      color: #999;
    }

    .el-breadcrumb__inner a,
    .el-breadcrumb__inner.is-link {
      color: #999;
      cursor: auto;
    }

    .el-breadcrumb__item:last-child .el-breadcrumb__inner,
    .el-breadcrumb__item:last-child .el-breadcrumb__inner a,
    .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover,
    .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
      color: #333;
    }
    // .breadcrumb__inner a, .el-breadcrumb__inner.is-link {
    //   color: #999999!important;
    // }
    // .el-breadcrumb__inner a:hover, .el-breadcrumb__inner.is-link:hover {
    //   cursor: auto;
    //   color: #999999;
    // }
  }
}
</style>
