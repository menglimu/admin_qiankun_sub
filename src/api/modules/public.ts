/*
 * @Author: wenlin
 * @Date: 2020-11-16 17:55:17
 * @LastEditors: wenlin
 * @LastEditTime: 2020-11-18 10:59:19
 * @Description: 公共接口
 */
import request from '@/api/request'
import store from '@/store'
// 获取重点项目列表, 项目列表
export function getStructureList() {
  return request.get('/evaluate-api/v1/evaluate.grade/sg-evaluate-grade/getStructureList')
}

//重点任务列表
export function getKeytaskList() {
  return request.get(`/evaluate-api/v1/evaluate/special/keyproject/sgKeyProject/getKeyTask`)
}

// 获取字典类型
export function getDictByType(type: string) {
  return request.get(`/evaluate-api/v1/common/dictionary/byType?type=${type}`)
}

// 获取组织结构
export function getOrganizationStructureTree() {
  //统一从字典中取,2小时刷新一次
  return store.dispatch('getDeptTree')
  // return request.get(`/userc-api/v1/userc/dept/tree`)
}

//获取部门树
export function getDeptTree(params?) {
  return request.get(`/userc-api/v1/userc/dept/tree`, params)
}

// 获取政法委部门树
export function getLawGovDeptTree() {
  return new Promise((resolve, reject) => {
    request
      .get(`/userc-api/v1/userc/dept/zfwList`)
      .then(res => {
        if (res) {
          resolve([res])
        } else {
          reject()
        }
      })
      .catch(() => reject())
  })
}

// 获取人员列表 - 当前部门的人员
/**
 *
 * @param params
 * deptIds: 部门id 多个用 ,号隔开
 * keyword: 关键字
 * page相关同表格组件
 */
export function getPersonList(params) {
  return request.get(`/userc-api/v1/userc/user/page`, params)
}

// 用户列表-当前和所有级子部门用户
/**
 *
 * @param params
 * deptIds: 部门id 多个用 ,号隔开
 * keyword: 关键字
 * page相关同表格组件
 */
export function getPersonListCurrentAndAllSub(params) {
  return request.get(`/userc-api/v1/userc/user/page/currentAndAllSubDeptUser`, params)
}

/**
 * 获取（项目、重点任务、分解任务）3层树
 */
export function getStructureTree() {
  return request.get(`/evaluate-api/v1/evaluate/indicator/indicator/onlyStructureTree`)
}

//收件列表
export function getMsgInbox(params) {
  return request.get('/evaluate-api/v1/sys.message/sg-message-inbox/InboxPageList', params)
}

//收件详情
export function getMsgInDetail(id) {
  return request.get(`/evaluate-api/v1/sys.message/sg-message-inbox/${id}`)
}

//未读消息状态信息
export function getMsgCountStatus() {
  return request.get(`/evaluate-api/v1/sys.message/sg-message-inbox/unreadMessage`)
}

/**
 * @description: 获取图片地址
 * @param fileKey {string} 图片id
 * @param accessToken {string} 票据
 * @author MrRabbit
 * @date 2020-12-4
 */
export function getImageSrc(fileKey: string, accessToken: string) {
  return request.get(`/filesys-perpc/checkImg?accessToken=${accessToken}&diskFileId=${fileKey}`)
}
