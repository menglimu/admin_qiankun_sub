import { Loading } from 'element-ui'

let loadingInstance = null
let timer = null

export default {
  open(options = {}) {

    const _option = Object.assign({
      lock: true,
      text: '加载中...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    }, options)

    loadingInstance = Loading.service(_option)

    // 超时关
    timer = window.setTimeout(() => {
      this.close()
    }, 1000 * 60 * 2)
  },
  close() {
    loadingInstance && loadingInstance.close()
    this.clearTimer()
  },
  clearTimer() {
    if (timer) {
      window.clearTimeout(timer)
      timer = null
    }
  }
}