<template>
  <div class="navbar">
    <!-- 菜单折叠 -->
    <!-- <hamburger  :is-active="sidebar.opened" @toggleClick="toggleSideBar" /> -->
    <!-- 面包屑 -->
    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <!-- 全屏 -->
      <!-- <screenfull id="screenfull" class="right-menu-item hover-effect" /> -->

      <!-- <el-button type="text" class="message">
        <svg-icon icon-class="message" />
      </el-button> -->

      <img v-if="avatar" class="avatar" />
      <svg-icon icon-class="avatar" class="avatar" />

      <div class="name">{{ userName }}</div>
      <el-button type="text" class="exit" @click="onExit">
        <svg-icon icon-class="exit" />
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from './Breadcrumb'
import Hamburger from './Hamburger'
import Screenfull from './Screenfull'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'userName'])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async onExit() {
      await this.$store.dispatch('FedLogOut')
      location.href = '/login'
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    display: flex;
    align-items: center;
    height: 100%;
    padding-right: 20px;
    .svg-icon {
      height: 18px;
      width: 18px;
    }
    .avatar {
      width: 30px;
      height: 30px;
      margin-right: 4px;
      margin-left: 15px;
    }
    .name {
      margin-right: 15px;
      font-size: 14px;
    }
  }
}
</style>
