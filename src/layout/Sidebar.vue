<script>
import { parseUrl } from '@/permission'

// function parseUrl(url) {
//   if (Object.prototype.toString.call(url) !== '[object String]') {
//     return { url: '', isExternal: false }
//   }
//   if (/^https?:\/\//.test(url)) {
//     return {
//       url: '/iframe/' + encodeURIComponent(url),
//       isExternal: true
//     }
//   } else if (url.substring(0, 8) === '/iframe/') {
//     return {
//       url,
//       isExternal: true
//     }
//   } else if (url.charAt(0) === '/') {
//     return {
//       url: url.toLocaleLowerCase(),
//       isExternal: false
//     }
//   } else {
//     return { url: '', isExternal: false }
//   }
// }
export default {
  props: {
    menu: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isCollapse: false,
      menuData: [],
      menuCache: []
    }
  },
  computed: {
    subMenu() {
      return this.menu.children
    }
  },
  inject: ['reloadRouter'],
  methods: {
    handleMenuClick(data) {
      if (data === this.$route.name) {
        this.reloadRouter()
      }
    },
    // onSelect(index, indexPath) {
    //   // console.log("click", index, indexPath)
    // },
    r(h, subMenu) {
      const { url, isExternal } = parseUrl(subMenu.url)
      const name = subMenu.pids ? subMenu.pids.concat(subMenu.id).join('-') : subMenu.id
      const children =
        Object.prototype.toString.call(subMenu.children) === '[object Array]'
          ? subMenu.children.filter(item => {
              return item.nodeType !== 3
            })
          : []
      const id = subMenu.id
      if (id) {
        this.menuCache[id] = subMenu
      }
      if (children && children.length) {
        return (
          <c-submenu index={id}>
            <template slot="title">
              {/*<svg-icon class="menu_icon" icon-class={subMenu.icon} />*/}
              <span>{subMenu.text}</span>
            </template>
            {children.map(item => {
              return this.r(h, item)
            })}
          </c-submenu>
        )
      } else if (url) {
        if (isExternal) {
          return (
            <router-link to={{ path: url }}>
              <c-menu-item index={id} class="submenu-title-noDropdown">
                <template slot="title">
                  <span>{subMenu.text}</span>
                </template>
              </c-menu-item>
            </router-link>
          )
        }
        return (
          <router-link to={{ name }}>
            <c-menu-item index={name} class="submenu-title-noDropdown">
              {/*<svg-icon class="menu_icon" icon-class={subMenu.icon || ''} />*/}
              <span slot="title">{subMenu.text}</span>
            </c-menu-item>
          </router-link>
        )
      } else {
        return (
          <c-menu-item index={id} class="submenu-title-noDropdown">
            <template slot="title">
              {/*<svg-icon class="menu_icon" icon-class={subMenu.icon || ''} />*/}
              <span>{subMenu.text}</span>
            </template>
          </c-menu-item>
        )
      }
    }
  },

  render(h) {
    return (
      <div key={this.menu.id} class={'sidebar ' + (this.isCollapse ? 'isCollapse' : '')}>
        <div class="sidebar-header">
          <svg-icon icon-class="nav_title" class="title" />
        </div>
        {/*background-color="#001B31"
          text-color="#FFFFFF"
          active-text-color="#FFFFFF"*/}
        <c-menu
          mode="vertical"
          class="custom-menu"
          unique-opened
          default-active={this.$route.name}
          collapse={this.isCollapse}
          on-select={this.handleMenuClick}>
          {this._l(this.subMenu, item => {
            return this.r(h, item)
          })}
        </c-menu>
        {/*<span title={this.isCollapse ? '展开' : '收起'}>
          <svg-icon
            class={'collapse ' + (this.isCollapse ? 'isCollapse' : '')}
            icon-class="collapse"
            nativeOnClick={() => {
              this.isCollapse = !this.isCollapse
            }}
          />
        </span>*/}
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
// .el-menu-vertical-demo:not(.el-menu--collapse) {
//   width: 256px;
//   min-height: 400px;
// }
// .el-menu {
//   border-right: 0px;
// }

// .el-submenu__title:hover {
//   outline: none;
//   // background: rgba(55,134,253,0.12);
//   background: red;
// }
// .el-submenu__title:hover {
//   background-color: green;
// }
// .el-submenu{
//   &.is-active{
//     .el-submenu__title{
//       background: red;
//     }
//   }
// }
// .el-menu{
//   color: red;
//   .el-menu-item {
//     font-size: 14px;
//     font-family: PingFangSC, PingFangSC-Regular;
//     font-weight: 400;
//     text-align: left;
//     color: red;
//     &.is-active{
//       position: relative;
//       background: rgba(55,134,253,0.12);
//       color: #3786fd;
//       &::before {
//         content: '';
//         position: absolute;
//         left: 0;
//         top: 0;
//         background: #d9f0f7;
//         height: 100%;
//         width: 3px;
//       }
//     }
//   }
// }

.sidebar {
  width: 256px;
  height: 100%;
  position: relative;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.09);
  &.isCollapse {
    width: 64px;
  }
  ::v-deep .custom-menu {
    border-right: none;
    .el-menu-item {
      font-size: 14px;
      height: 40px;
      line-height: 40px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #666;
      // padding-left: 24px !important;
      // &.is-active {
      //   display: flex;
      //   align-items: center;
      // background: none !important;
      //   color: #3786fd;
      //   padding-left: 0px !important;
      //   &::before {
      //     width: 4px;
      //     height: 40px;
      //     background: #3786fd;
      //     content: '';
      //     margin-right: 36px;
      //   }
      // }
    }
    .el-submenu {
      .el-submenu__title {
        font-size: 14px;
        height: 40px;
        line-height: 40px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: left;
        color: #666;
        // padding-left: 24px !important;
      }
      &.is-active {
      }
      &:hover {
        background: #f8f8f8;
      }
      .el-menu {
        background: rgb(248, 248, 248);
        .el-menu-item {
          height: 40px;
          line-height: 40px;
          // background: #f8f8f8;
          font-size: 14px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: left;
          color: #666;
          // padding-left: 36px !important;

          &:hover {
            background: #e7f0fe;
          }
        }
      }
    }

    .router-link-exact-active.router-link-active {
      display: flex;
      position: relative;
      align-items: center;
      background: #e7f0fe;
      color: #3786fd;
      padding-left: 0px !important;
      > .el-menu-item {
        // background: none !important;
      }
      &::before {
        width: 4px;
        height: 40px;
        background: #3786fd;
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        z-index: 10;
      }
    }
  }
  .menu_icon {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    margin-right: 16px;
  }
  &-header {
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
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
