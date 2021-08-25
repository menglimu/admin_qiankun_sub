<template>
  <div :class="classObj" class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: needTagsView }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar class="navbar" />
        <!-- 标签选项 -->
        <!-- <tags-view v-if="needTagsView" /> -->
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import { AppMain, Navbar, Sidebar, TagsView } from './components'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    Sidebar,
    TagsView
  },
  data() {
    return {
      needTagsView: true,
      fixedHeader: true
    }
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  .sidebar-container {
    transition: width 0.28s;
    height: 100%;
    z-index: 1001;
    overflow: hidden;
    flex-shrink: 0;
  }
  .main-container {
    width: 0;
    flex: 1;
    height: 100%;
    transition: width 0.28s;
    background: #f5f6fa;
    position: relative;
    padding-top: 64px;
    overflow: auto;
    .navbar {
      height: 64px;
    }
  }
}

.fixed-header {
  position: fixed;
  top: 0;
  left: 260px;
  right: 0;
  z-index: 9;
  transition: width 0.28s;
}
</style>
