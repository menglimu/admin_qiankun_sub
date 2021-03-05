/*
 * @Author: your name
 * @Date: 2020-11-18 16:50:51
 * @LastEditTime: 2021-01-13 12:45:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hcsg_evaluation_web\src\views\assessmentmanagement\home\src\api.js
 */
import request from '@/api/request'

// 获取首页指标状态及分数
export const getStatusScore = () => request.get(`/evaluate-api/v1/home/statusScore`)

// 获取首页通知公告列表
export const getMsgList = params => request.get(`/evaluate-api/v1/home/msgList`, params)

/**
 * @desc  获取首页信息报送/信息采用
 * @author Bali
 * @date 2020-12-14
 */
export const getWorkMsgList = params => request.get(`/evaluate-api/v1/home/workMsgList`, params)

/**
 * @desc  获取首页交办内容表格
 * @author Bali
 * @date 2020-12-14
 */
export const getTaskList = params => request.get(`/evaluate-api/v1/home/taskList`, params)

/**
 * @desc  获取首页图表数据
 * @author Bali
 * @date 2020-12-14
 */
export const getChartData = () => request.get(`/evaluate-api/v1/home/shareData`)

/**
 * @desc  获取工作交流表（弹窗
 * @author Bali
 * @date 2020-12-15
 */
export const getBaseInfoPage = params =>
  request.get(`/evaluate-api/v1/sys/workexchange/sgWorkBasicInfo/BaseInfoPage`, params)

/**
 * @desc  获取通知公告表（弹窗
 * @author Bali
 * @date 2020-12-15
 */
export const getInboxPageList = params => request.post(`/evaluate-api/servicecenter/query/1000000000`, params)

/**
 * @desc  获取通知公告 公告信息详情
 * @author Bali
 * @date 2020-12-15
 */
export const getNoticeInfo = id =>
  request.post('/evaluate-api/servicecenter/query/1000000003', {
    idEmMail: id
  })

/**
 * @desc  获取通知公告 信息共享（工作交流）详情
 * @author Bali
 * @date 2020-12-16
 */
export const getMsgInfo = params => request.get(`/evaluate-api/v1/sys/workexchange/sgWorkBasicInfo/getBaseInfo`, params)

/**
 * @desc  获取交办主表详情
 * @author Bali
 * @date 2020-12-16
 */
export const getWorkInfo = params => request.get(`/evaluate-api/v1/assign/assign/info/${params}`)

/**
 *  @date 2020-12-31
 *  @authur bali
 *  @description 处理（完成）任务
 */
export const handleMyTask = params => request.post('/evaluate-api/v1/assign/assign/completeMyTask', params)
