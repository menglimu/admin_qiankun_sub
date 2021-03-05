/*
 * @Author: MrRabbit
 * @Date: 2020-01-13 14:41:50
 * @LastEditors: MrRabbit
 * @LastEditTime: 2020-11-27 11:54:28
 * @Description:
 */
// import MD5 from 'crypto-js/md5'
import axios from 'axios'
import request from '@/api/request'

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '/' : '/hechuan/'

export function loginByCode(code: string, state) {
  return axios.get(`/oauth-api/v1/authorizeCode`, {
    params: {
      code,
      state
    }
  })
}

export function getUserDetail() {
  return request.get(`/oauth-api/v1/userInfo`)
}

export function login(username: string, password: string, projectId?: string) {
  return axios.post('/oauth-api/v1/login', {
    userAccount: username,
    password: password
  })
  console.log('模拟登陆', username, password, projectId)
  // 模拟登陆
  return Promise.resolve({
    status: true,
    data: {
      code: '200',
      data: {
        userId: 121270,
        userNo: 'zsc0008',
        userName: '区级指挥长',
        deptId: 1,
        deptName: '市数字城管',
        sex: 1,
        ownRoles: '',
        currentSiteId: 258,
        currentSiteName: '决策分析平台',
        platformId: 72,
        groupId: 1,
        groupNo: '0000',
        groupName: '宜宾统一认证平台',
        fullPath: '宜宾统一认证平台'
      },
      message: '获取用户信息成功',
      accessToken: '2fc696da-87ac-4ba5-b9f2-c3e55a7bfbf1'
    },
    error: null
  })
  // return axios({
  //   url: config.login,
  //   method: 'post',
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded'
  //   },
  //   data: {
  //     'userNo': username,
  //     'password': MD5(password).toString(),
  //     'projectId': projectId
  //   }
  // })
}

export function logout() {
  return request.post(`/oauth-api/v1/logout`)
}
