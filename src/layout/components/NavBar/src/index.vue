<script>
import { findValByKey } from '@/utils';
import Breadcrumb from './../../Breadcrumb';
export default {
  name: 'CHeader',
  components: { Breadcrumb },
  inject: ['reloadRouter'],
  data() {
    return {
      showTopMenu: true,
      msglen: 0,
      activeName: null,
      showMessage: false,
      oldActiveName: null
    };
  },
  computed: {
    nowUser() {
      return this.$store.getters.userName;
    },
    menu() {
      return this.$store.getters.menu || [];
    }
  },
  watch: {
    menu: {
      immediate: true,
      handler: function (r) {
        if (this.showTopMenu) {
          const item = r && r[0] ? r[0] : {};
          // 判断是否为首页，首页则配置到第一个导航栏
          if (this.$route.name && this.$route.name === 'index') {
            this.$store.commit('SET_SIDEBAR_ITEM', item);
          }
        } else {
          this.$store.commit('SET_SIDEBAR_ITEM', { id: 'main', children: r });
        }
      }
    },
    $route: {
      immediate: true,
      handler: function (r) {
        if (this.showTopMenu) {
          // 设置当前激活的top上的激活菜单
          const menu = findValByKey(this.menu, this.$route.path, 'url');
          if (menu && menu.pids && menu.pids[0]) {
            const find = this.menu.find(item => item.id == menu.pids[0]);
            if (find) {
              this.$store.commit('SET_SIDEBAR_ITEM', find);
              this.activeName = find.id;
            }
          }
        }
      }
    }
  },
  methods: {
    handleBulletChange(msglen) {
      this.msglen = msglen;
    },
    toggleMessageBox() {
      this.showMessage = !this.showMessage;
    },
    handleBeforeJump(activeName, oldActiveName) {
      this.oldActiveName = oldActiveName;
    },
    handleThirdSiteJump(url) {
      if (url && /^https?:\/\//.test(url)) {
        // 因为是跳转，所以去除iframe标志
        window.open(url, '_blank');
        return true;
      }
    },
    findFirstUrl(item) {
      if (!item.children || !item.children[0]) {
        if (item.location) {
          return item.location;
        }
        return item.url;
      } else {
        return item.children[0].url || item.children[0].children[0].url;
      }
    },
    handleRouteJump(tab) {
      const item = this.menu.find(_ => _.id === tab.name);
      // 选取第一个路由进行跳转
      const first = this.findFirstUrl(item);
      if (this.handleThirdSiteJump(first)) {
        // 重置tab
        this.$nextTick(() => {
          this.activeName = this.oldActiveName;
        });
        return;
      }
      this.$store.commit('SET_SIDEBAR_ITEM', item);
      try {
        this.$router.push(
          first,
          () => ({}),
          error => {
            if (error) {
              // vue-router 3.1.0+ push/replace cause NavigationDuplicated error
              // https://github.com/ElemeFE/element/issues/17044
              if (error.name === 'NavigationDuplicated') {
                this.reloadRouter();
                return;
              }
              console.error(error);
            }
          }
        );
      } catch (e) {
        console.error(e);
      }
    },
    signout() {
      this.$store
        .dispatch('FedLogOut')
        .then(data => {
          if (data.logoutType == 1) {
            this.closeMethods();
          } else {
            window.open(data.loginUrl, '_self');
            location.reload();
          }
          // this.$message.success('退出成功')
          // window.open(location.origin + process.env.BASE_URL + '#/login', '_self')
          // location.reload()
        })
        .catch(error => {
          console.error(error);
          this.$message.error('退出失败');
        });
    },
    closeMethods() {
      window.opener = null;
      window.open('', '_self', '');
      window.close(); // 以上三行可关闭单个页面
      window.open('', '_top');
      window.top.close();
      window.location.href = 'about:blank ';
      window.close(); // 上面两次关闭适用于FireFox等浏览器
    }
  }
};
</script>
<template>
  <div class="navbar-box">
    <div class="header">
      <div v-if="showTopMenu" class="top-menu">
        <el-tabs v-model="activeName" :before-leave="handleBeforeJump" class="custom-tab" @tab-click="handleRouteJump">
          <el-tab-pane v-for="(item, index) in menu" :key="index" :label="item.text" :name="item.id"></el-tab-pane>
        </el-tabs>
      </div>
      <ul class="content">
        <li class="item notice-wrapper">
          <el-badge class="bullet" :value="msglen" :max="99" @click.native.stop="toggleMessageBox">
            <svg-icon icon-class="notice" class="notice" />
          </el-badge>
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
    <div class="nav-box">
      <breadcrumb />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.navbar-box {
  height: 106px;
  // height: 64px;
  .header {
    display: flex;
    justify-content: flex-end;
    height: 64px;
    background: #3786fd;

    .top-menu {
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
            &::after {
              background-color: transparent;
            }
          }

          .el-tabs__active-bar {
            background: transparent;

            &::before {
              display: block;
              width: 24px;
              height: 3px;
              margin: 0 auto;
              content: '';
              background: #fff;
              border-radius: 3px;
              transform: translateY(-12px);
            }
          }

          .el-tabs__item {
            height: 64px;
            padding: 0 18px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-size: 16px;
            font-weight: 400;
            line-height: 64px;
            color: rgba(255, 255, 255, 0.8);
            text-align: center;

            &.is-active {
              font-weight: bold;
              color: #fff;
            }
          }
        }
      }

      .top-menu {
        padding: 0 18px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-size: 16px;
        font-weight: 400;
        line-height: 64px;
        color: rgba(255, 255, 255, 0.8);
        text-align: center;
        list-style: none;
        cursor: pointer;

        &.active {
          font-weight: bold;
          color: #fff;
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
          position: relative;
          margin-right: 26px;
          cursor: pointer;

          .message_box {
            position: absolute;
            top: 44px;
            right: 0;
            z-index: 99999;
          }

          .bullet {
            ::v-deep .el-badge__content {
              top: 2px;
              right: 6px;
            }
          }

          .notice {
            width: 24px;
            height: 24px;
            margin-right: 0;
          }
        }

        &.division {
          width: 1px;
          height: 12px;
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
          font-family: PingFangSC, PingFangSC-Regular;
          font-size: 14px;
          font-weight: 400;
          line-height: 24px;
          color: #fff;
          text-align: left;
        }
      }
    }
  }

  .nav-box {
    background: #fff;
  }
}
</style>
