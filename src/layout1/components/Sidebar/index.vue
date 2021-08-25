<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'

export default {
  name: 'Sidebar',
  components: { Logo },
  computed: {
    ...mapGetters(['menu', 'sidebar']),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return true
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    renderIcon(menu) {
      return (
        menu.icon &&
        (menu.icon.includes('el-icon') ? (
          <i class={[menu.icon, 'sub-el-icon']} />
        ) : (
          <svg-icon icon-class={menu.icon || ''} class="sub-svg-icon" />
        ))
      )
    },
    renderItem(menu) {
      if (Array.isArray(menu)) {
        return menu.map(_ => this.renderItem(_))
      }
      if (menu?.children?.filter(item => !item.hidden).length > 0) {
        return menu.hidden || menu.nodeType == 3 ? null : (
          <el-submenu index={menu.id}>
            <template slot="title">
              {this.renderIcon(menu)}
              <span slot="title" class="title">
                {menu.text}
              </span>
            </template>
            {menu.children.map(_ => this.renderItem(_))}
          </el-submenu>
        )
      } else {
        return menu.hidden || menu.nodeType == 3 ? null : (
          <el-menu-item index={menu.url}>
            {this.renderIcon(menu)}
            <span slot="title" class="title">
              {menu.text}
            </span>
          </el-menu-item>
        )
      }
    }
  },
  render() {
    return (
      <div class={{ expand: !this.isCollapse, sidebar: true }}>
        {this.showLogo && <logo collapse={this.isCollapse} class="logo-box" />}
        <el-scrollbar wrap-class="scrollbar-wrapper">
          <el-menu
            router
            default-active={this.activeMenu}
            collapse={this.isCollapse}
            unique-opened={false}
            collapse-transition={false}
            text-color="#fff"
            mode="vertical">
            {this.renderItem(this.menu)}
          </el-menu>
        </el-scrollbar>
      </div>
    )
  }
}
</script>
<style lang="scss" scoped>
::v-deep.sidebar {
  background: #316be9;
  &.expand {
    width: 260px;
  }
  display: flex;
  flex-direction: column;
  .logo-box {
    flex-shrink: 0;
  }
  .el-scrollbar {
    flex: 1;
    .el-menu {
      border-right: 0;
      background: none;
      .el-submenu__title {
        i {
          color: #fff;
        }
      }
      .el-submenu__title,
      .el-menu-item {
        margin-left: 10px;
        font-size: 16px;
      }

      .el-menu-item {
        &.is-active {
          color: #fff;
          background: #265dd7;
        }
      }
      .el-submenu__title:hover,
      .el-submenu__title:focus,
      .el-menu-item:hover,
      .el-menu-item:focus {
        outline: none;
        background-color: #265dd7;
      }
      .sub-el-icon,
      .sub-svg-icon {
        font-size: 18px;
        position: relative;
        right: 10px;
        & + .title {
          // padding-left: 10px;
        }
      }
    }
  }
}
</style>
