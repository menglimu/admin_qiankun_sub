/*
 * @Author: jackshen
 * @Date:
 * @LastEditors: Please set LastEditors
 * @LastEditTime:
 * @Description: 全局列表持久化管理
 */
import storage from '@/utils/storage/local'

const app = {
  state: {
    headerConfig: storage.get('headerConfig') || {} // 历史记录
  },
  getters: {
    headerConfig: state => {
      return state.headerConfig || {}
    }
  },
  mutations: {
    SET_HEADER_CONFIG(state, { uniquekey, headerConfigOne, userId }) {
      if (!uniquekey) {
        console.error('请设置uniquekey')
        return
      }
      if (!headerConfigOne) {
        console.error('请设置header的值')
        return
      }
      if (userId === undefined || userId === null) {
        console.error('无userId,无法自定义配置')
        return
      }
      if (!state.headerConfig['userId_' + userId]) {
        state.headerConfig['userId_' + userId] = {
          [uniquekey]: headerConfigOne
        }
      } else {
        state.headerConfig['userId_' + userId][uniquekey] = headerConfigOne
      }
      //同时持久化
      storage.set('headerConfig', state.headerConfig)
    }
  },
  actions: {
    SET_HEADER_CONFIG({ commit, rootGetters }, data) {
      commit('SET_HEADER_CONFIG', {
        ...data,
        userId: rootGetters.userId
      })
    }
  }
}

export default app
