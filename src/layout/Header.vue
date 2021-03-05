<template>
  <div class="header">
    <div class="nav-box" v-if="showTopMenu">
      <c-tabs v-model="activeName" @tab-click="handleRouteJump" class="custom-tab">
        <c-tab-pane :label="item.text" :name="item.id" v-for="(item, index) in menu" :key="index"></c-tab-pane>
      </c-tabs>
    </div>
    <ul class="content">
      <li class="item notice-wrapper">
        <c-badge class="bullet" @click.native.stop="toggleMessageBox" :value="msglen" :max="99">
          <svg-icon icon-class="notice" class="notice" />
        </c-badge>
        <message
          @bulletChange="handleBulletChange"
          :showflag="showMessage"
          @viewmore="showMessage = false"
          v-show="showMessage"
          class="message_box"
        />
      </li>
      <li class="item">
        <svg-icon icon-class="avatar" class="avatar" />
        <span class="text">{{ nowUser }}</span>
      </li>
      <li class="item division"></li>
      <li class="item signout" @click="signout">
        <span class="text signout-text">退出</span>
      </li>
    </ul>
  </div>
</template>

<script>
import Message from './Message/index.js'
import { findValByKey } from '@/utils'
export default {
  name: 'CHeader',
  components: {
    Message
  },
  data() {
    return {
      showTopMenu: true,
      msglen: 0,
      activeName: null,
      showMessage: false
    }
  },
  inject: ['reloadRouter'],
  computed: {
    nowUser() {
      return this.$store.getters.userName
    },
    menu() {
      return this.$store.getters.menu || []
    }
  },
  methods: {
    handleBulletChange(msglen) {
      this.msglen = msglen
    },
    toggleMessageBox() {
      this.showMessage = !this.showMessage
    },
    handleRouteJump(tab) {
      const item = this.menu.find(_ => _.id === tab.name)
      //选取第一个路由进行跳转
      this.$store.commit('SET_SIDEBAR_ITEM', item)
      const first = item.children[0].url || item.children[0].children[0].url
      try {
        this.$router.push(
          first,
          () => ({}),
          error => {
            if (error) {
              // vue-router 3.1.0+ push/replace cause NavigationDuplicated error
              // https://github.com/ElemeFE/element/issues/17044
              if (error.name === 'NavigationDuplicated') {
                this.reloadRouter()
                return
              }
              console.error(error)
            }
          }
        )
      } catch (e) {
        console.error(e)
      }
    },
    checkActive(item) {
      const meta = this.$route.meta || {}
      return meta.id && meta.id == item.id
      // return meta.id && meta.id.indexOf(item.id) > -1
    },
    handleCollapse() {
      this.$store.commit('TOGGLE_MAIN_SIDER')
    },
    signout() {
      this.$store
        .dispatch('FedLogOut')
        .then(data => {
          if (data.logoutType == 1) {
            this.closeMethods()
          } else {
            window.open(data.loginUrl, '_self')
            location.reload()
          }
          // this.$message.success('退出成功')
          // window.open(location.origin + process.env.BASE_URL + '#/login', '_self')
          // location.reload()
        })
        .catch(error => {
          console.error(error)
          this.$message.error('退出失败')
        })
    },
    closeMethods() {
      window.opener = null
      window.open('', '_self', '')
      window.close() // 以上三行可关闭单个页面
      window.open('', '_top')
      window.top.close()
      window.location.href = 'about:blank '
      window.close() // 上面两次关闭适用于FireFox等浏览器
    }
  },
  watch: {
    menu: {
      immediate: true,
      handler: function(r) {
        if (this.showTopMenu) {
          const item = r && r[0] ? r[0] : {}
          //判断是否为首页，首页则配置到第一个导航栏
          if (this.$route.name && this.$route.name === 'index') {
            this.$store.commit('SET_SIDEBAR_ITEM', item)
          }
        } else {
          console.log(r)
          this.$store.commit('SET_SIDEBAR_ITEM', { id: 'main', children: r })
        }
      }
    },
    $route: {
      immediate: true,
      handler: function(r) {
        if (this.showTopMenu) {
          const menu = findValByKey(this.menu, this.$route.path, 'url')

          if (menu && menu.pids && menu.pids[0]) {
            const find = this.menu.find(item => item.id == menu.pids[0])
            if (find) {
              this.$store.commit('SET_SIDEBAR_ITEM', find)
              this.activeName = find.id
            }
          }
        }
        // if (this.menu && this.menu[0] && meta.id) {
        //   // const find = this.menu.find(item => meta.id.indexOf(item.id) > -1)
        //   // find && this.$store.commit('SET_SIDEBAR_ITEM', find)
        //   // this.activeName = find.id
        // }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: flex-end;
  height: 64px;
  background: #3786fd;
  .nav-box {
    flex: 1;
    margin-left: 18px;
    // display: flex;
    // flex-direction: row;
    // justify-content: flex-start;
    .custom-tab {
      height: 64px;
      ::v-deep .el-tabs__header {
        margin: 0;
        .el-tabs__nav-wrap {
          &:after {
            background-color: transparent;
          }
        }
        .el-tabs__active-bar {
          background: transparent;
          &::before {
            content: '';
            height: 3px;
            border-radius: 3px;
            width: 24px;
            display: block;
            margin: 0 auto;
            transform: translateY(-12px);
            background: #fff;
          }
        }
        .el-tabs__item {
          height: 64px;
          line-height: 64px;
          font-size: 16px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: center;
          color: rgba(255, 255, 255, 0.8);
          padding: 0 18px;
          &.is-active {
            color: #fff;
            font-weight: bold;
          }
        }
      }
    }
    .top-menu {
      list-style: none;
      line-height: 64px;
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: center;
      color: rgba(255, 255, 255, 0.8);
      padding: 0 18px;
      cursor: pointer;
      &.active {
        color: #fff;
        font-weight: bold;
      }
    }
  }
  .content {
    display: flex;
    align-items: center;
    padding-right: 32px;
    .item {
      display: flex;
      align-items: center;
      list-style: none;
      &.notice-wrapper {
        margin-right: 26px;
        position: relative;
        cursor: pointer;
        .message_box {
          position: absolute;
          top: 44px;
          right: 0;
          z-index: 99999;
        }
        .bullet {
          ::v-deep .el-badge__content {
            right: 6px;
            top: 2px;
          }
        }
        .notice {
          width: 24px;
          height: 24px;
          margin-right: 0;
        }
      }
      &.division {
        height: 12px;
        width: 1px;
        margin: 0 12px;
        background: rgba(255, 255, 255, 0.4);
      }
      &.signout {
        cursor: pointer;
      }
      .avatar {
        width: 24px;
        height: 24px;
        margin-right: 8px;
      }
      .text {
        font-size: 14px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: left;
        color: #fff;
        line-height: 24px;
      }
    }
  }
}
</style>
