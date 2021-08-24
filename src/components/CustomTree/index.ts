/*
 * @Author: wenlin
 * @Date: 2020-11-30 15:35:46
 * @LastEditors: wenlin
 * @LastEditTime: 2020-12-11 18:12:43
 * @Description:
 */
import { ElTree } from 'element-ui/types/tree'
/** 转发所有属性为可选 */
export type Partial<T> = {
  [P in keyof T]?: T[P]
}

export interface MlTreeProp<K = string, D = AnyObj> extends Partial<ElTree<K, D>> {
  /** 下拉显示的名字key 默认label */
  optionLabel?: string

  /** 下拉取值得key 默认id */
  optionValue?: string

  /** 树形的children取值 默认children */
  optionChildren?: string

  /** 选中的值 */
  value?: any[]

  /** 操作的选项的树形数据 */
  options?: any[]

  /** 自定义树的renderContent */
  // renderContent?(h, { node, data, store }): VNode | Element

  /** 是否可多选，默认true */
  multiple?: boolean

  /** 时候显示搜索框，默认true */
  showSearch?: boolean

  /** tree上面的搜索框的placeholder */
  searchPlaceholder?: string

  /** 禁用 */
  disabled?: boolean

  /** value是否返回整个对象的数组，默认false */
  isNodeValue?: boolean

  /** 搜索的自定义过滤 */
  filterNode?: { (value, data): boolean }
}

import page from './src/index.vue'
export default page
