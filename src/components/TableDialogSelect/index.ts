/*
 * @Author: Friends233
 * @Date: 2020-11-27 11:49:16
 * @LastEditors: wenlin
 * @LastEditTime: 2020-12-15 15:29:16
 * @Description:
 */
import page from './src/index.vue'
export default page

import { MlTableProps } from '@cci/ml-table'
import { ElDialog } from 'element-ui/types/dialog'

type ElDialogProps = Partial<ElDialog>
export interface TableDialogSelectPropsCustom {
  clearable?: boolean
  placeholder?: string
  disabled?: boolean

  /** 是否多选,默认true */
  multiple?: boolean

  /** 是否显示全选所有数据，包含未查询的,默认false */
  isAllCheck?: boolean
  /** 选中所有选项输入框显示的文本,默认：'已选中当前筛选条件全部数据' */
  chekcedAllLabel?: string

  /** 回显的input框的内容的key,默认name*/
  labelKey?: string

  /** 是否显示tag列表,默认false */
  isTag?: boolean
  /** tage已选择列表的标题 */
  tagTitle?: string

  /** 主表格的配置项 */
  mlTableProps: MlTableProps

  /** 选中的项，应为对象数组 */
  value?: any[]
}

export interface TableDialogSelectProps extends TableDialogSelectPropsCustom, ElDialogProps {}
