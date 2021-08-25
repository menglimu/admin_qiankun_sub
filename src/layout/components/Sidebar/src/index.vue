<script>
import { parseUrl } from "@/router/permission";

export default {
  inject: ["reloadRouter"],
  data() {
    return {
      isCollapse: false,
      menuData: [],
      menuCache: []
    };
  },

  computed: {
    menu() {
      const obj = this.$store.getters.sidebarItem || {};
      return Object.keys(obj).length
        ? obj
        : {
            id: 0
          };
    },
    subMenu() {
      return this.menu?.children || [];
    }
  },
  methods: {
    handleMenuClick(data) {
      if (data === this.$route.name) {
        this.reloadRouter();
      }
    },
    // onSelect(index, indexPath) {
    //   // console.log("click", index, indexPath)
    // },
    r(h, subMenu) {
      const name = subMenu.pids ? subMenu.pids.concat(subMenu.id).join("-") : subMenu.id;
      const children =
        Object.prototype.toString.call(subMenu.children) === "[object Array]"
          ? subMenu.children.filter(item => {
              return item.nodeType !== 3;
            })
          : [];
      const id = subMenu.id;
      if (id) {
        this.menuCache[id] = subMenu;
      }
      if (children?.length) {
        return (
          <el-submenu index={subMenu.path}>
            <template slot="title">
              {/* <svg-icon class="menu_icon" icon-class={subMenu.icon} /> */}
              <span>{subMenu.text}</span>
            </template>
            {children.map(item => {
              return this.r(h, item);
            })}
          </el-submenu>
        );
      }

      return (
        <router-link to={{ path: url }}>
          <el-menu-item index={id} class="submenu-title-noDropdown">
            <template slot="title">
              <span>{subMenu.text}</span>
            </template>
          </el-menu-item>
        </router-link>
      );
      // TODO:
      return (
        <router-link to={{ name }}>
          <el-menu-item index={name} class="submenu-title-noDropdown">
            {/* <svg-icon class="menu_icon" icon-class={subMenu.icon || ''} /> */}
            <span slot="title">{subMenu.text}</span>
          </el-menu-item>
        </router-link>
      );

      return (
        <el-menu-item index={id} class="submenu-title-noDropdown">
          <template slot="title">
            {/* <svg-icon class="menu_icon" icon-class={subMenu.icon || ''} /> */}
            <span>{subMenu.text}</span>
          </template>
        </el-menu-item>
      );
    }
  },

  render(h) {
    return (
      <div key={this.menu.id} class={"sidebar " + (this.isCollapse ? "isCollapse" : "")}>
        <div class="sidebar-header">
          <svg-icon icon-class="nav_title" class="title" />
        </div>
        {/* background-color="#001B31"
          text-color="#FFFFFF"
          active-text-color="#FFFFFF" */}
        <el-menu
          mode="vertical"
          class="custom-menu"
          unique-opened
          default-active={this.$route.path}
          collapse={this.isCollapse}
          on-select={this.handleMenuClick}
        >
          {this._l(this.subMenu, item => {
            return this.r(h, item);
          })}
        </el-menu>
        {/* <span title={this.isCollapse ? '展开' : '收起'}>
          <svg-icon
            class={'collapse ' + (this.isCollapse ? 'isCollapse' : '')}
            icon-class="collapse"
            nativeOnClick={() => {
              this.isCollapse = !this.isCollapse
            }}
          />
        </span> */}
      </div>
    );
  }
};
</script>

<style lang="scss" scoped>
.sidebar {
  position: relative;
  width: 256px;
  height: 100%;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.09);

  &.isCollapse {
    width: 64px;
  }

  ::v-deep .custom-menu {
    border-right: none;

    .el-menu-item {
      height: 40px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-size: 14px;
      font-weight: 400;
      line-height: 40px;
      color: #666;
      text-align: left;
    }

    .el-submenu {
      .el-submenu__title {
        height: 40px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-size: 14px;
        font-weight: 400;
        line-height: 40px;
        color: #666;
        text-align: left;
        // padding-left: 24px !important;
      }

      &:hover {
        background: #f8f8f8;
      }

      .el-menu {
        background: rgb(248, 248, 248);

        .el-menu-item {
          height: 40px;
          font-family: PingFangSC, PingFangSC-Regular;
          // background: #f8f8f8;
          font-size: 14px;
          font-weight: 400;
          line-height: 40px;
          color: #666;
          text-align: left;
          // padding-left: 36px !important;

          &:hover {
            background: #e7f0fe;
          }
        }
      }
    }

    .router-link-exact-active.router-link-active {
      position: relative;
      display: flex;
      align-items: center;
      padding-left: 0 !important;
      color: #3786fd;
      background: #e7f0fe;

      > .el-menu-item {
        // background: none !important;
      }

      &::before {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        width: 4px;
        height: 40px;
        content: "";
        background: #3786fd;
      }
    }
  }

  .menu_icon {
    width: 20px;
    height: 20px;
    margin-right: 16px;
    vertical-align: middle;
  }

  &-header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 64px;
    background: #2778f0;

    .title {
      width: 143px;
      height: 23px;
    }
  }

  .collapse {
    position: absolute;
    top: 18px;
    right: -44px;
    cursor: pointer;

    &.isCollapse {
      transform: rotate(180deg);
    }
  }
}
</style>
