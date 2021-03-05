<script>
import Breadcrumb from '@/components/Breadcrumb'
import TagsView from './TagsView'
export default {
  name: 'nav-bar',
  provide() {
    return {
      layout: this
    }
  },
  components: {
    Breadcrumb,
    TagsView
  },
  computed: {
    menu() {
      return this.$store.getters.menu
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: {
      immediate: true,
      handler: function(r) {
        const meta = this.$route.meta || {}
        const { pids, id, pidsByPath } = meta
        const name = this.$route.name
        this.rid = id
        this.sidebarItem = this.getMenuByID(this.menu, (pids && pids[0]) || id)
        // console.log("router::::", this.$route.meta)

        this.menuLevel = pidsByPath === true ? this.buildMenuLevelByPath() : this.buildMenuLevel(this.$route.meta)
        this.buildIframeList(this.$route.path, name)
        this.sidebarItem = Object.keys(this.sidebarItem).length ? this.sidebarItem : { id: 0 }
      }
    }
  },
  data() {
    return {
      menuLevel: [],
      removeKey: [],
      sidebarItem: null,
      iframes: [],
      hideMenu: false
    }
  },
  render() {
    return (
      <div class="nav-bar-container">
        {/*<tags-view ref="tag" onTagChange={($event)=>this.handleMenuChange('tag',$event)} v-show={!this.hideMenu}/>*/}
        <Breadcrumb items={this.menuLevel} />
      </div>
    )
  },
  methods: {
    getMenuByID(menus, id) {
      if (!id) {
        return { id: 0 }
      }
      if (menus && Object.prototype.toString.call(menus) === '[object Array]') {
        for (let i = 0, len = menus.length; i < len; i++) {
          if (menus[i].id === id) {
            return menus[i]
          }
        }
      }
      return { id: 0 }
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
          console.log(this.iframes, 'iframes::::::')
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
      return list
    },
    buildMenuLevelByPath() {
      const path = this.$route.path.split('/')
      const list = []
      for (let i = 1, len = path.length; i < len; i++) {
        const str = path.slice(0, i + 1).join('/')
        const route = this.$router.matcher.match(`${str}`)
        if (route.name) {
          list.push(Object.assign(route.meta, { url: route.path }))
        }
      }
      return list
    },
    removeKeepaliveCacheByKey(key, name, url) {
      // 清除 keepalive 缓存
      if (key) {
        this.removeKey = [key]
      }
      // 清除Iframe页面
      if (url && name) {
        for (let i = 0, len = this.iframes.length; i < len; i++) {
          let arr = this.iframes[i]
          if (arr.name === name && arr.url === url) {
            arr = null
            this.iframes.splice(i, 1)
            break
          }
          arr = null
        }
      }
    },
    handleMenuChange(type, menu) {
      const url = menu.url || menu.path
      const id = menu.id
      // const pids = menu.pids
      if (this.rid === id) {
        return
      }
      this.rid = id
      /**
       * 实现首页隐藏 左侧菜单栏（首页的id为0）
       */
      // if (id !== 0) {
      //   this.hideMenu = false
      // } else {
      //   this.hideMenu = true
      // }
      if (type === 'topMenu') {
        this.sidebarItem = menu
        this.menuLevel = [menu]
        // } else if (type === 'tag') {
        //   this.sidebarItem = this.getMenuByID(this.menu, pids && pids[0] || id)
      }
      this.sidebarItem = Object.keys(this.sidebarItem).length ? this.sidebarItem : { id: 0 }
      if (url) {
        this.showEmpty = false
        this.$router.push({ path: url })
      } else {
        this.showEmpty = true
        if (menu.nodeType === 2) {
          this.$message({
            message: '页面地址无法访问,错误代码(001001)',
            type: 'warning',
            duration: 3 * 1000
          })
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.nav-bar-container {
  width: 100%;
  background: #fff;
}
</style>
