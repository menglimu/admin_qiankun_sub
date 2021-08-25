<template>
  <transition name="fade-transform" mode="out-in">
    <!-- <keep-alive :include="cachedViews">
      <router-view :key="key" class="app-main" />
    </keep-alive> -->
    <div class="app-box">
      <keep-alive>
        <router-view class="app-main" v-if="isCached"></router-view>
      </keep-alive>
      <router-view v-if="!isCached" class="app-main"></router-view>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    },
    isCached() {
      return this.$route.meta?.cache
    }
  },
  mounted() {
    console.log()
  }
}
</script>
<style lang="scss" scoped>
.app-box {
  // height: calc(100% - 60px);
  height: 100%;
  padding: 30px;
  overflow: auto;
}
.app-main {
  min-height: 100%;
  // margin: 30px;
  background: #fff;
  box-shadow: 0px 6px 18px 0px rgba(0, 60, 166, 0.05);
  border-radius: 10px;
  overflow: auto;
}
</style>
