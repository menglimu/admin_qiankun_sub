<template>
  <div class="layout">
    <siderbar class="siderbar" />
    <div class="container">
      <navbar />
      <div class="container-mid">
        <router-view v-if="isRouterAlive" class="container-page" />
      </div>
    </div>
  </div>
</template>

<script>
import Siderbar from './components/Sidebar'
import Navbar from './components/NavBar'

export default {
  name: 'Layout',
  components: {
    Siderbar,
    Navbar
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  provide() {
    return {
      reloadRouter: this.reloadRouter
    }
  },
  methods: {
    reloadRouter() {
      this.isRouterAlive = false
      this.$nextTick(() => (this.isRouterAlive = true))
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  display: flex;
  .siderbar {
    flex: none;
    height: 100%;
    background: #fff;
    // box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.09);
  }
}
.container {
  flex: auto;
  display: flex;
  flex-direction: column;
  flex-direction: column;
  overflow-x: hidden;
  background: #f0f2f5;
  // padding: 0 20px 20px 20px;
  &-mid {
    flex: 1;
    overflow: hidden;
    overflow-y: auto;
  }
  &-page {
    background: #ffffff;
    border-radius: 6px;
    margin: 20px;
    padding: 20px 24px;
    min-height: calc(100% - 40px);
  }
}
</style>
