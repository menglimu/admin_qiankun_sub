import store from '@/store'
import { AxiosRequestConfigAll } from '@/types'
import { Message, MessageBox } from '@cci/cui'
import axios, { AxiosPromise, Method } from 'axios'
import qs from 'qs'
import merge from 'webpack-merge'
import router from '@/router'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/' : '/hechuan/',
  timeout: 60 * 1000 // 请求超时时间
})
// service.defaults.transformRequest = function(data, headers) {
//   console.log(data)
//   return data
// }

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 设置全局设置token头
    const accessToken = store.getters.token
    if (accessToken && !config.headers.hasOwnProperty('accessToken')) {
      config.headers['accessToken'] = accessToken // 让每个请求携带自定义token 请根据实际情况自行修改
    }

    if (
      config.headers['Content-Type'] === 'application/x-www-form-urlencoded' &&
      config.data &&
      Object.prototype.toString.call(config.data) === '[object Object]'
    ) {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// TODO: 可配置，不使用 返回 公共处理
// 响应拦截器
let alerted = false
service.interceptors.response.use(
  res => {
    if (res.status === 200) {
      if ((res.config as AxiosRequestConfigAll).getAllResponse) {
        return res.data
      }
      const { code, data, status } = res.data
      if (code === 200 || status) {
        return data
      } else if (code === 401 && router?.currentRoute?.fullPath !== '/login') {
        const msg = '你已被登出，可以取消继续留在该页面，或者重新登录'
        if (!alerted) {
          alerted = true
          MessageBox.confirm(msg, '确定登出', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              alerted = false
              if (process.env.NODE_ENV === 'development') {
                store.dispatch('FedLogOut')
                location.href = location.origin + process.env.BASE_URL + '#/login'
                location.reload()
                return
              }
              try {
                location.href = data.url
              } catch (error) {
                console.log(error)
              }
            })
            .catch(() => {
              alerted = false
            })
        }
        return Promise.reject(data)
      } else if (code === 403 || code === 500) {
        Message.error(res.data.message)
        return Promise.reject(data)
      } else {
        return res
      }
    } else {
      Message.error('网络请求超时，请稍后再试')
      return Promise.reject(res)
    }
  },
  err => {
    console.log('网络异常')
    return Promise.reject(err)
  }
)
// 参数的混合等操作
function ajax<R>(method: Method, url: string, params?: AnyObj, options?: AxiosRequestConfigAll): AxiosPromise<R> | R {
  let config: AxiosRequestConfigAll = {
    url: url,
    method: method || 'get'
  }
  switch (method) {
    case 'get':
    case 'delete':
      config.params = { ...(params || {}), _t: new Date().getTime() }
      break
    case 'post':
    case 'put':
      config.data = params
      break
  }
  if (options) {
    config = merge(config, options)
  }
  return service(config)
}

// 请求封装
export default {
  service(options: AxiosRequestConfigAll) {
    //用于自定义其他扩展，或调用方法
    return service(options)
  },
  /**
   * @description: get请求
   * @param {String} url 接口地址
   * @param {Object} params 请求参数
   * @param {Object} options axios的完全配置，会和前面的进行合并，options的优先级更高
   * @return {Promise} Promise对象
   */
  get<R = any>(url: string, params?: AnyObj, options?: AxiosRequestConfigAll): AxiosPromise<R> | R {
    return ajax<R>('get', url, params, options)
  },

  getBlob<R = any>(url: string, params?: AnyObj, options: AxiosRequestConfigAll = {}): AxiosPromise<R> | R {
    options.responseType = 'blob'
    options.timeout = 60 * 1000
    return ajax<R>('get', url, params, options)
  },

  post<R = any>(url: string, params?: AnyObj, options?: AxiosRequestConfigAll): AxiosPromise<R> | R {
    return ajax<R>('post', url, params, options)
  },

  put<R = any>(url: string, params?: AnyObj, options?: AxiosRequestConfigAll): AxiosPromise<R> | R {
    return ajax<R>('put', url, params, options)
  },

  delete<R = any>(url: string, params?: AnyObj, options?: AxiosRequestConfigAll): AxiosPromise<R> | R {
    return ajax('put', url, params, options)
  }
}
