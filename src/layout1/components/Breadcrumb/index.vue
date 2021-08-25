<template>
  <div class="app-breadcrumb">
    <el-button type="text" @click="onBack">
      <i class="el-icon-arrow-left"></i>
    </el-button>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="item in levelList"
        :to="item.url && item.url != $route.meta.url ? item.url : null"
        :key="item.id"
        >{{ item.text }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  computed: {
    menu() {
      return this.$store.getters.menu
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      this.levelList = this.getList(this.menu, this.$route.meta.url)
    },
    getList(data, val, key = 'url', childrenKey = 'children') {
      for (const i in data) {
        if (data[i][key] && data[i][key] === val) {
          return [data[i]]
        }
        if (data[i][childrenKey] && data[i][childrenKey].length) {
          const result = this.getList(data[i][childrenKey], val, key, childrenKey)
          if (result) return [data[i], ...result]
        }
      }
    },
    onBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
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
    font-size: 16px;
    margin-left: 8px;
    height: 100%;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
}
</style>
