<template>
  <c-breadcrumb class="app-breadcrumb" separator="/">
    <c-breadcrumb-item v-for="(item, index) in navitems" :key="item.id">
      <a @click="handleNav(item, index)">{{ item.text }}</a>
      <!-- <router-link :to="item.redirect||item.path">{{item.name}}</router-link> -->
    </c-breadcrumb-item>
  </c-breadcrumb>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    navitems() {
      return this.items.filter(item => {
        return item.text
      })
    }
  },
  methods: {
    handleNav(item) {
      this.$router.push({
        path: item.url || item.redirect || item.path
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.app-breadcrumb {
  display: block;
  &.el-breadcrumb {
    height: 42px;
    font-size: 12px;
    padding-left: 20px;
    line-height: 42px;
    .el-breadcrumb__inner {
      color: #999999;
    }
    .el-breadcrumb__separator {
      color: #999999;
      margin: 0 6px;
    }
    .el-breadcrumb__inner a,
    .el-breadcrumb__inner.is-link {
      color: #999999;
      cursor: auto;
    }
    .el-breadcrumb__item:last-child .el-breadcrumb__inner,
    .el-breadcrumb__item:last-child .el-breadcrumb__inner a,
    .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover,
    .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
      color: #333333;
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
