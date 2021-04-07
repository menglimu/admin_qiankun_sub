/*
 * @Author: wenlin
 * @Date: 2020-04-24 15:29:36
 * @LastEditors: wenlin
 * @LastEditTime: 2020-12-25 09:52:44
 * @Description:
 * 用户权限判断，通过触发store的user模块来进行，触发完成后，监测到菜单进行注入
 */

// import 'babel-polyfill'
import './public-path'
import Vue from 'vue'
import store from '@/store'
import router from './router/index'
import App from './App.vue'

import '@/styles/src/index.scss' // global css

import { GetQueryString } from './utils'
import { Message } from '@cci/cui'

import 'nprogress/nprogress.css' // Progress 进度条样式

import '@/directives'

// cui 公司内部ui框架，基于elementui
import cui from '@cci/cui'
Vue.use(cui)
// 公司elementui版本过低，需要使用其他的，按需引入
import { Image } from 'element-ui'
Vue.use(Image)
// 基于cui和elementui的基础组件
import MlForm from '@cci/ml-form'
import MlTable from '@cci/ml-table'
Vue.use(MlForm)
Vue.use(MlTable)

import '@/icons' // icon

// 重写c-ui的 confirm 修改默认提示的样式
const baseConfirm = Vue.prototype.$confirm
Vue.prototype.$confirm = function(...params) {
  if (params.length === 1) {
    return baseConfirm(params[0], '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
  } else {
    return baseConfirm(...params)
  }
}

/* 单点登录未完成 */
// 是否使用 cas 认证
const isCasLogin = process.env.VUE_APP_CAS === '1'
Vue.config.productionTip = false
;(window as any).eventBus = new Vue()

import { Route, NavigationGuardNext } from 'vue-router'
async function casLogin(to: Route, from: Route, next: NavigationGuardNext<Vue>) {
  if (to.path.includes('/login')) {
    next()
    return
  }
  const code = GetQueryString('code')
  const username = GetQueryString('username')
  const password = GetQueryString('password')
  // 如果有初始链接中有code,则去取用户信息,如果没有则读取本地
  try {
    if (code) {
      const state = GetQueryString('state')
      await store.dispatch('CasLogin', { code, state })
      // next({ path: '/', replace: true })
      location.href = location.origin + process.env.BASE_URL + '#/'
      return
    } else if (username && password) {
      await store.dispatch('Login', { username, password })
      // next({ path: '/', replace: true })
      location.href = location.origin + process.env.BASE_URL + '#/'
      return
    } else {
      // const token = storage.get('accessToken')
      // // 防止篡改，先不存用户信息在本地
      // if (!token) {
      //   throw '未登录'
      // } else {
      const token = store.getters.token
      if (!token) {
        await store.dispatch('RE_LOADUSER')
        // await store.dispatch('GetUserDetail')
        // 这里使用to加载页面失败，采用push的方式
        next(to.path)
        return
      }
      // }
    }
    next()
  } catch (error) {
    console.log(error)
    const canLogin = false //默认去到登录页
    if (process.env.NODE_ENV === 'development' || canLogin) {
      next('/login')
      return Promise.resolve()
    }
    Message.error('验证失败,请重新登录')
    next()
  }
}

// 如果走cas认证
if (isCasLogin) {
  router.beforeEach(casLogin)
} else {
  // 模拟登录
  store.dispatch('MockLogin')
}

let instance = null
function render(props: any = {}) {
  const { container } = props
  instance = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}
// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}
export async function bootstrap() {
  console.log('[vue] vue app bootstraped')
}
export async function mount(props) {
  console.log('[vue] props from main framework', props)
  render(props)
}
export async function unmount() {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
  // router = null
}
