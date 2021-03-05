/*
 * @Author: Friends233
 * @Date: 2020-11-26 09:55:37
 * @LastEditors: wenlin
 * @LastEditTime: 2020-12-02 21:00:54
 * @Description:
 */
import { MlTableProps } from '@cci/ml-table'
interface TagConfig {
  /** 标题 */
  title: string

  /** tag显示需要的字段名列表，默认主键 */
  fields?: any[]
}

export interface CustomDialogConfig {
  /** 弹窗的标题 */
  title: string

  /** 主键,默认id*/
  key?: string

  /** 回显的input框的内容,默认id*/
  inputLabel?: string

  /** 弹窗的width,默认1200px*/
  width?: string

  /** 是否显示tag列表,默认false */
  isTag?: boolean

  /** tag列表的配置 */
  tagConfig?: TagConfig

  /** 是否显示左边的树 ,默认false*/
  isTree?: boolean

  /** 左边的树的配置 */
  treeConfig?: any

  /** 默认选中的表格项 */
  // setList?: any[]

  /** 默认的input的 placeholder*/
  placeholder?: string

  /** 遮罩层是否插入至 body 元素上,默认true*/
  modalAppendToBody?: boolean

  /** 弹窗里的表格配置 */
  MlTableProps: MlTableProps
}
