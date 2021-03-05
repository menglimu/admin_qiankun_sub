import request from '../request'
import { ProxyAjax } from '@cci/lib-store'
export default class extends ProxyAjax {
  request(...args) {
    return request.apply(this, args)
  }
}

export function filterParam(data) {
  const _filterParam = [
    data => {
      const obj = {}
      for (const k in data) {
        if (data[k] !== undefined && data[k] !== '') {
          obj[k] = data[k]
        }
      }
      return obj
    }
  ]
  return _filterParam.reduce((data, fn) => fn(data), data)
}
