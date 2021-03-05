/*
 * @Author: ??
 * @Date: 2019-11-08 09:59:54
 * @LastEditors: wenlin
 * @LastEditTime: 2020-12-14 11:04:48
 * @Description: 提供一些公用的基础方法
 * js-cookie：操作cookie的js库  https://www.npmjs.com/package/js-cookie
 */
import request from '@/api/request'
import store from '@/store'


import { cloneDeep as deepClone, isEqual } from 'lodash'

export { deepClone, isEqual }

export function parseTime(time: Date | number | string, format = 'yyyy-mm-dd hh:ii:ss') {
  if (!time) return ''
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    //在IE或safari下 需要将 - 转换为 / 否则无法识别，后续可添加，暂时不添加此逻辑
    time = typeof time === 'string' ? parseInt(time) : time
    if (('' + time).length === 10) time = time * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/(y|m|d|h|i|s|a)+/gi, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}

export function formatTime(time: number, option: string) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d.getTime()) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

export function isJSON(val: string) {
  if (typeof val !== 'string') {
    return false
  }
  try {
    const obj = JSON.parse(val)
    if (Object.prototype.toString.call(obj) === '[object Object]') {
      return true
    } else {
      return false
    }
  } catch (e) {
    return false
  }
}


// 无树状结构数组转换树状节点方法
export function arrayToTree(treeArray: any, idKey = 'id', pidKey = 'pid', childrenKey = 'children') {
  const r = []
  const tmpMap: any = {}
  treeArray = deepClone(treeArray)

  for (let i = 0, l = treeArray.length; i < l; i++) {
    // 以每条数据的id作为obj的key值，数据作为value值存入到一个临时对象里面
    tmpMap[treeArray[i][idKey]] = treeArray[i]
  }

  for (let j = 0, l = treeArray.length; j < l; j++) {
    const key = tmpMap[treeArray[j][pidKey]]

    // 循环每一条数据的pid，假如这个临时对象有这个key值，就代表这个key对应的数据有children，需要Push进去
    if (key) {
      if (!key[childrenKey]) {
        key[childrenKey] = [treeArray[j]]
      } else {
        const obj: any = {}
        const bindArr = [...key[childrenKey], treeArray[j]].sort(item => item[childrenKey]).reverse()
        key[childrenKey] = bindArr.reduce((cur, next) => {
          obj[next[idKey]] ? '' : (obj[next[idKey]] = true && cur.push(next))
          return cur
        }, [])
      }
    } else {
      // 如果没有这个Key值，那就代表没有父级,直接放在最外层
      r.push(treeArray[j])
    }
  }
  return r
}

export function findValByKey(data: any, val: any, key = 'id', childrenKey = 'children'): any {
  for (const i in data) {
    if (data[i][key] && data[i][key] === val) {
      return data[i]
    }
    if (data[i][childrenKey] && data[i][childrenKey].length) {
      const result = findValByKey(data[i][childrenKey], val, key, childrenKey)
      if (result !== undefined) return result
    }
  }
}

// 根据返回的blob流来下载文件
export function createDownloadLink(res: any) {
  const downloadLink = window.document.createElement('a')
  let fileName = res.headers["content-disposition"] &&
    res.headers["content-disposition"]
      .split(";")[1]
      .split("filename=")[1]
      .replace(/^\"|\"$/g, "")
  try {
    fileName = decodeURI(fileName);
  } catch (e) { }
  const fileNameUnicode = res.headers && res.headers.hasOwnProperty('content-disposition') && res.headers["content-disposition"].split(";")[1].split("filename=")[1];
  if (fileNameUnicode) { //当存在 filename* 时，取filename* 并进行解码（为了解决中文乱码问题）
    fileName = decodeURIComponent(fileNameUnicode);
  }
  // const fileName =
  //   res.headers &&
  //   Object.prototype.hasOwnProperty.call(res.headers, 'content-disposition') &&
  //   res.headers['content-disposition'].match(/filename="(.+)"/)[1]
  const fileUrl = res.data && window.URL.createObjectURL(res.data)
  downloadLink.href = fileUrl
  downloadLink.download = fileName
  document.body.appendChild(downloadLink)
  downloadLink.click()
  document.body.removeChild(downloadLink)
  window.URL.revokeObjectURL(fileUrl)









}

// export function loadComponent(url) {
//   if (process.env.NODE_ENV === 'development') {
//     return require('@/views' + url).default
//   } else {
//     return () => import('@/views' + url)
//   }
// }

/**
 * Remove an item from an array
 */
export function remove(arr: Array<any>, item: number) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

// 数组去重
export function distinct(a: Array<any>, b: Array<any>, id: number) {
  const arr = a.concat(b)
  const arrId: Array<any> = []
  const result = []
  for (const i of arr) {
    if (arrId.length) {
      if (!arrId.includes(i[id])) {
        arrId.push(i[id])
        result.push(i)
      }
    } else {
      arrId.push(i[id])
      result.push(i)
    }
  }
  return result
}

// 数组求交集
export function repoVsArr(arr1: Array<any>, arr2: Array<any>, id: number) {
  const tempArr = []

  for (let i = 0; i < arr1.length; i++) {
    const fArr = arr1[i]
    for (let y = 0; y < arr2.length; y++) {
      const sArr = arr2[y]
      if (fArr[id] === sArr[id]) {
        tempArr.push(sArr)
        break
      }
    }
  }
  return tempArr
}

// 数组求差
export function diffVsArr(arr1: Array<any>, arr2: Array<any>, id: number) {
  const tempArr = arr1.slice()

  for (let i = 0; i < arr1.length; i++) {
    const fArr = arr1[i]
    for (let y = 0; y < arr2.length; y++) {
      const sArr = arr2[y]
      if (fArr[id] === sArr[id]) {
        let tempIndex = 0
        tempArr.filter((_v, index) => {
          if (fArr[id] === _v[id]) tempIndex = index
        })

        tempArr.splice(tempIndex, 1)
        break
      }
    }
  }
  return tempArr
}

/**
 * @description: 生成随机id
 * @return {String}
 */
export function createRandomId() {
  return (
    'id-' +
    (Math.random() * 10000000).toString(16).substr(0, 4) +
    '-' +
    new Date().getTime() +
    '-' +
    Math.random()
      .toString()
      .substr(2, 5)
  )
}

/**
 * @description: 获取host
 * @return: host
 */
export function getHost() {
  const _http = window.location.protocol
  const _hostname = window.location.hostname
  const _port = window.location.port
  let http = _http + '//' + _hostname + '/'
  if (_port) {
    http = _http + '//' + _hostname + ':' + _port + '/'
  }
  return http
}

/**
 * @description: 判断值是否为空,包括空[],{},'',不包括0
 * @param {any} str 所需判断的值
 * @return {Boolean} 是否为空
 */
export function isNull(str: any) {
  if (str === undefined || str === null || str === '') {
    return true
  } else if (Array.isArray(str) && str.length === 0) {
    return true
  } else if (typeof str === 'object' && Object.keys(str).length === 0) {
    return true
  }
  return false
}


/** 装饰器的节流 Throttle */
export function Throttle(delay: number): Function {
  return (target: Function, propertyKey: string, propertyDesciptor: PropertyDescriptor) => {
    const method = propertyDesciptor.value;
    let timer = null;
    propertyDesciptor.value = function(...args) {
      let _this = this
      if (timer) {
        return
      }
      timer = setTimeout(() => {
        method.call(_this, ...args)
        clearTimeout(timer)
        timer = null
      }, delay);
    }
    // return propertyDesciptor;
  };
}

// /** * 装饰器的防抖 debounce * @param delay */
// export function Debounce(delay: number): Function {
//   return (target: Function, propertyKey: string, propertyDesciptor: PropertyDescriptor) => {
//     const method = propertyDesciptor.value;
//     let timer = null;
//     propertyDesciptor.value = function(...args){
//       if (timer) {
//         clearTimeout(timer); timer = null;
//         timer = setTimeout(() => method(...args), delay);
//       }
//     }
//     // return propertyDesciptor;
//   };
// }

/**
 * @description: 获取URL后的参数值
 * @param {string} 参数名
 * @return: 值或null
 */
export function GetQueryString(name: string) {
  // const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  // const r = window.location.search.substr(1).match(reg)
  // if (r != null) return r[2]
  // return null
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  let search = window.location.search
  if (!search) {
    search = `?${window.location.href.split('?')[1]}`
  }
  const r = search.substr(1).match(reg)
  if (r != null) return r[2]
  return null
}

/**
 * @description: 文件下载
 * @param fileKey {number|string} 文件id
 */
export function downFileByFileKey(fileKey: number | string) {
  const downloadLink = window.document.createElement('a')
  const prefix = process.env.NODE_ENV === 'production' ? '/' : '/hechuan/'
  const fileUrl = `${prefix}filesys-perpc/download?diskFileId=${fileKey}&&accessToken=${store.getters.token}`
  downloadLink.href = fileUrl
  document.body.appendChild(downloadLink)
  downloadLink.click()
  document.body.removeChild(downloadLink)
  window.URL.revokeObjectURL(fileUrl)
}

/**
 * @description: 导出
 * @param url {string} 请求地址
 * @param params {obj} 导出参数
 * @author MrRabbit
 * @date 2020-11-28
 */
export function exportExcel(url: string, params: any) {
  return new Promise((resolve, reject) => {
    request.getBlob(url, params)
      .then(res => {
        if (res) {
          createDownloadLink(res)
          resolve(res)
        } else {
          reject({ message: 'nodata' })
        }
      })
      .catch(error => reject(error))
  })
}

/**
 * @description: 是否是图片
 * @param fileType {string} 文件类型
 * @author MrRabbit
 * @date 2020-12-3
 */
export function isImageType(fileType: string) {
  const IMG = ['jpg', 'jpeg', 'png', 'img']
  return IMG.includes(fileType.toLowerCase())
}

/**
 * 将英文字符转为中文
 * @param val 英文字符
 */
export function transferToChinese(val) {
  const obj = {
    0: '零',
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
    7: '七',
    8: '八',
    9: '九',
    10: '十',
    11: '十一月',
    12: '十二月'
  }
  return obj[val] || ''
}

// kb转换为 xxKB 或xxMB 或xxGB
export function transferToStorageWord(value) {
  if(!value) return '0KB'
  if (value >= 1024 && value < 1024 * 1024) {
    value = (value / 1024).toFixed(2) + "MB";
  } else if (value >= 1024 * 1024) {
    value = (value / 1024 / 1024).toFixed(2) + "GB";
  } else {
    value += 'KB'
  }
  return value;
}