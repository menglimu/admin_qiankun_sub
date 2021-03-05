<template>
  <div class="layout">
    <div class="siderbar">
      <siderbar :menu="sidebarItem" />
    </div>
    <div class="container">
      <div class="header">
        <header-layout />
      </div>
      <div class="nav-bar">
        <navbar />
      </div>
      <div class="container-mid">
        <router-view v-if="isRouterAlive" class="container-page" />
      </div>
    </div>
  </div>
</template>

<script>
import Siderbar from './Sidebar'
import HeaderLayout from './Header'
import Navbar from './NavBar'

export default {
  name: 'Layout',
  components: {
    Siderbar,
    HeaderLayout,
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
  computed: {
    menu() {
      return this.$store.getters.menu
    },
    sidebarItem() {
      const obj = this.$store.getters.sidebarItem || {}
      return Object.keys(obj).length
        ? obj
        : {
            id: 0
          }
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: {
      immediate: true,
      handler: function(r) {
        const meta = this.$route.meta || {}

        const { id, pidsByPath } = meta // pids暂时没用
        const name = this.$route.name
        // const pids = this.$route.meta && this.$route.meta.pids
        // const id = this.$route.meta && this.$route.meta.id
        // const topId = pids && pids[0] || (~id && id)
        // if (this.rid === id) {
        //   return
        // }
        this.rid = id
        // // this.sidebarItem = this.getMenuByID(this.menu, (pids && pids[0]) || id);
        // const thismenu1 = this.menu.filter(item => item.id === "COMPLEXCOMMAND")
        // // console.log(thismenu)
        // // this.sidebarItem = this.menu[1].children.filter( item => item.id === 'Screen01.03')[0]
        // // console.log(this.menu,"m")
        // // console.log(this.sidebarItem,"s")
        // const thismenu = thismenu1[0].children
        // this.sidebarItem = thismenu1[0]
        // console.log(thismenu1[0], '-sidebarItem')
        this.menuLevel = pidsByPath === true ? this.buildMenuLevelByPath() : this.buildMenuLevel(this.$route.meta)
        this.buildIframeList(this.$route.path, name)
        this.showEmpty = false
        if (r.meta && r.meta.hideMenu === true) {
          this.hideMenu = true
        } else {
          this.hideMenu = false
        }
      }
    }
  },
  methods: {
    reloadRouter() {
      this.isRouterAlive = false
      this.$nextTick(() => (this.isRouterAlive = true))
    },
    getMenuByID(menus, id) {
      if (!id) {
        return {
          id: 0
        }
      }
      if (menus && Object.prototype.toString.call(menus) === '[object Array]') {
        for (let i = 0, len = menus.length; i < len; i++) {
          if (menus[i].id === id) {
            return menus[i]
          }
        }
      }
      return {
        id: 0
      }
    },
    buildIframeList(url, name) {
      if (url.substring(0, 8) === '/iframe/') {
        let isInCache = false
        this.isIframe = true
        this.iframes.forEach(p => {
          if (p.name === name && p.url === url) {
            isInCache = true
            p.show = true
          } else {
            p.show = false
          }
        })
        if (!isInCache) {
          this.iframes.push({
            show: true,
            url,
            name
          })
        }
        isInCache = null
      } else {
        this.isIframe = false
      }
    },
    buildMenuLevel(menu) {
      if (!menu) {
        return
      }
      const pids = menu.pids
      const len = (pids && Object.prototype.toString.call(pids) === '[object Array]' && pids.length) || 0
      const list = new Array(len + 1)
      for (let i = 0; i < len; i++) {
        if (i === 0) {
          list[i] = this.sidebarItem // getMenuByID(this.menu, pids[i])
        } else if (list[i - 1] && list[i - 1].children) {
          list[i] = this.getMenuByID(list[i - 1].children, pids[i])
        }
      }
      list[len] = menu
      const listfilter = list.filter(item => item.id !== 'COMPLEXCOMMAND')
      return listfilter
    },
    buildMenuLevelByPath() {
      const path = this.$route.path.split('/')
      const list = []
      for (let i = 1, len = path.length; i < len; i++) {
        const str = path.slice(0, i + 1).join('/')
        const route = this.$router.matcher.match(`${str}`)
        if (route.name) {
          list.push(
            Object.assign(route.meta, {
              url: route.path
            })
          )
        }
      }
      return list
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
  .container {
    flex: auto;
    display: flex;
    flex-direction: column;
    flex-direction: column;
    overflow-x: hidden;
    background: #f5f7f9;
    // padding: 0 20px 20px 20px;
    .header {
      flex: none;
      height: 64px;
      // padding-left: 25px;
    }
    &-mid {
      flex: 1;
      background: #ffffff;
      border-radius: 6px;
      // padding: 20px;
      overflow: hidden;
      .container-page {
        background: #f0f2f5;
        overflow-y: auto;
        // padding: 20px;
      }
    }
  }
}
</style>
