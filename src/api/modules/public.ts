import request from "@/api/request";
import StoreDict from "@/store/modules/dict";

// 获取字典类型
export function getDictByType(type: string) {
  return request.get(`/evaluate-api/v1/common/dictionary/byType?type=${type}`);
}

// 获取组织结构
export function getOrganizationStructureTree() {
  // 统一从字典中取,2小时刷新一次
  return StoreDict.getDeptTree();
  // return request.get(`/userc-api/v1/userc/dept/tree`)
}

// 获取部门树
export function getDeptTree(params?) {
  return request.get(`/userc-api/v1/userc/dept/tree`, params);
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
  return request.get(`/userc-api/v1/userc/user/page`, params);
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
  return request.get(`/userc-api/v1/userc/user/page/currentAndAllSubDeptUser`, params);
}

/**
 * @description: 获取图片地址
 * @param fileKey {string} 图片id
 * @param accessToken {string} 票据
 * @author MrRabbit
 * @date 2020-12-4
 */
export function getImageSrc(fileKey: string, accessToken: string) {
  return request.get(`/filesys-perpc/checkImg?accessToken=${accessToken}&diskFileId=${fileKey}`);
}
