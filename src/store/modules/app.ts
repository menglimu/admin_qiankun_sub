/*
 * @Author: wenlin
 * @Date: 2020-04-24 15:29:37
 * @LastEditors: wenlin
 * @LastEditTime: 2020-11-17 11:02:51
 * @Description: 全局公共变量
 */

import { Module } from 'vuex'
import { MenuAsync } from '@/types'
interface App {
  historyPage: MenuAsync[]
}
const app: Module<App, {}> = {}

export default app
