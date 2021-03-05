// 项目工程  所有公共的类型定义文件
import { RouteConfigSingleView } from 'vue-router/types/router'
import { AxiosRequestConfig } from 'axios'

/** 转发所有属性为可选 */
export type Partial<T> = {
  [P in keyof T]?: T[P]
}

/**
 * @description: 路由接口
 * @author: mrRabbit
 * @date: 2020-11-09 13:03
 */
export interface RouteCustom extends RouteConfigSingleView {
  name: string
  path: string
  chunkName?: string
  hidden?: boolean
  icon?: string
  noDropdown?: boolean
}
/**
 * @description: 菜单接口
 * @author: mrRabbit
 * @date: 2020-11-09 13:03
 */
export interface MenuAsync {
  expanded: boolean
  helpUrl?: string
  icon?: string
  id: string
  leaf: boolean
  nodeType?: number
  openNew?: boolean
  orderNo?: number
  pids?: string[]
  systemType?: number
  text: string
  url: string
  children: MenuAsync[]
}

/**
 * @description: Tab接口
 * @author: mrRabbit
 * @date: 2020-11-12 15:03
 */
export interface Tabs {
  name: string
  label: string
}

export interface AxiosRequestConfigAll extends AxiosRequestConfig {
  getAllResponse?: true
}
