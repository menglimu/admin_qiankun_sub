//
<!--
//  * @Author: Friends233
//  * @Date: 2020-11-26 09:26:40
//  * @LastEditors: wenlin
//  * @LastEditTime: 2020-12-26 10:42:39
//  * @Description: 
//  * 占用了 CustomheaderTable 的 afterGetList
//  * TODO： 必选
// -->
//
<script lang="tsx">
// import { Component, Prop, Vue, Watch, Provide } from 'vue-property-decorator'
// import { deepClone, isEqual } from '@/utils/index'
// import { MlTable, MlTableProps } from '@cci/ml-table'
// import merge from 'webpack-merge'
// import { TableDialogSelectPropsCustom } from '..'

// @Component({
//   name: 'TableDialogSelect',
//   components: {}
// })
// export default class TableDialogSelect extends Vue implements TableDialogSelectPropsCustom {
//   @Prop({ type: Boolean, default: false }) clearable: boolean
//   @Prop({ type: Boolean, default: false }) disabled: boolean
//   @Prop({ type: String, default: '请选择' }) placeholder: string

//   /** 是否多选,默认true */
//   @Prop({ type: Boolean, default: true }) multiple: boolean

//   /** 是否显示全选所有数据，包含未查询的,默认false */
//   @Prop({ type: Boolean, default: false }) isAllCheck: boolean
//   /** 选中所有选项输入框显示的文本 */
//   @Prop({ type: String, default: '' }) chekcedAllLabel: string

//   /** 回显的input框的内容的key,默认name*/
//   @Prop({ type: String, default: 'name' }) labelKey: string

//   /** 是否显示tag列表,默认false */
//   @Prop({ type: Boolean, default: false }) isTag: boolean
//   /** tage已选择列表的标题 */
//   @Prop({ type: String, default: '已选择' }) tagTitle: string

//   /** 主表格的配置项 */
//   @Prop({ type: Object, default: () => ({}) }) mlTableProps: MlTableProps

//   /** 选中的项，应为对象数组 */
//   @Prop({ type: Array, default: () => [] }) value: any[]

//   $refs: {
//     mlTable: MlTable
//   }
//   /** 弹窗显示与否 */
//   visible = false
//   /** 已选择的人员 */
//   selectionList: any[] = []
//   /** 表格对象 */
//   mlTable: MlTable

//   checking = false
//   dataLength = 0

//   // 重写 表单的provide 防止 input等进行特殊处理
//   @Provide()
//   elForm = null
//   @Provide()
//   elFormItem = null

//   get tableKey() {
//     return this.mlTableProps?.config?.tableKey || 'id'
//   }

//   get dialogProp() {
//     const dialogProp = {
//       // 放至body。第一次显示前默认不会加载。改为放至组件
//       modalAppendToBody: false,
//       appendToBody: true,
//       width: '1200px',
//       title: '请选择'
//     }
//     return Object.assign(dialogProp, this.$attrs)
//   }

//   get mlTableProps_() {
//     const tableConfig = {
//       afterGetList: this.toggleTableCheck,
//       outerBtn: [],
//       config: {
//         nodeData: {
//           attrs: { height: '377px' }
//         }
//       },
//       paginationConfig: {
//         pagerCount: 5
//       }
//     }
//     if (this.isAllCheck) {
//       tableConfig.outerBtn = [
//         { evtType: 'checkAll', size: 'small', name: '全选所有', type: 'primary', loading: this.checking }
//       ]
//     }
//     return merge(tableConfig, this.mlTableProps)
//   }

//   get dataListNames() {
//     if (this.isAllCheck && this.value?.length !== 0 && this.value?.length === this.dataLength && this.chekcedAllLabel) {
//       return this.chekcedAllLabel
//     }
//     return this.value && this.value.map(item => item[this.labelKey]).join(',')
//   }

//   @Watch('value', { deep: true, immediate: true })
//   fn(val) {
//     if (isEqual(this.selectionList, val)) return
//     this.selectionList = deepClone(val) || []
//     this.checkSelectionStatus()
//   }

//   mounted() {
//     this.initTable()
//   }

//   refreshTable() {
//     if (this.$refs.mlTable) {
//       this.$refs.mlTable.refresh()
//     }
//   }
//   initTable() {
//     this.mlTable = this.$refs.mlTable
//     this.checkSelectionStatus()
//   }
//   showDialog() {
//     if (this.mlTable) {
//       this.checkSelectionStatus()
//     }
//     this.visible = true
//     this.refreshTable()
//     this.$nextTick(() => {
//       if (!this.mlTable) {
//         this.initTable()
//       }
//     })
//   }
//   hideDialog() {
//     this.selectionList = deepClone(this.value) || []
//     this.visible = false
//     this.$emit('cancel', this.selectionList.concat([]))
//   }
//   onShowDialog(e: MouseEvent) {
//     if (this.disabled) {
//       return
//     }
//     if (!this.$scopedSlots.default && (e.target as any).tagName !== 'INPUT') {
//       return
//     }
//     this.showDialog()
//   }
//   handleConfirm() {
//     this.$emit('input', this.selectionList.concat([]))
//     this.$nextTick(() => {
//       const parent = this.$parent as any
//       try {
//         parent.elForm.validateField(parent.prop)
//       } catch (error) {
//         console.info('调用formItem的validateField失败')
//       }
//       this.visible = false
//     })
//   }
//   /** 设置表格已选的数据，不会改变value的值 */
//   setSelectionList(data: any[] = []) {
//     this.selectionList = data
//     this.checkSelectionStatus()
//   }

//   // 输入框清除按钮
//   onClearInput() {
//     this.setSelectionList()
//     this.$emit('input', this.selectionList)
//   }
//   // 删除下方的tag标签的某一项
//   onTagClose(item, index) {
//     this.selectionList.splice(index, 1)
//     this.removeRowChecked(item)
//   }

//   // 选择当前selection在表格中
//   checkSelectionStatus() {
//     // const elSelection: AnyObj[] = (this.mlTable.elTable as any).selection
//     // const key = this.tableKey
//     this.$nextTick(() => {
//       if (!this.mlTable) return
//       this.mlTable.elTable.clearSelection()

//       this.selectionList.forEach(row => {
//         const dataRow = this.mlTable.elTable.data.find(_ => _[this.tableKey] === row[this.tableKey])
//         // console.log(JSON.stringify(row))
//         if (dataRow) {
//           this.mlTable.elTable.toggleRowSelection(dataRow, true)
//         } else {
//           this.mlTable.elTable.toggleRowSelection(row, true)
//         }

//         // if (elSelection.every(_ => _[key] !== row[key])) {
//         // }
//       })
//     })
//   }

//   // 选中所有数据。并且会触发改变当前value的值
//   setAllChecked() {
//     this.getAllDataChecked(true)
//   }
//   // 从后台获取所有数据，并选中
//   async getAllDataChecked(isEmit = false) {
//     if (!this.mlTableProps?.config) return
//     await setTimeout(() => Promise.resolve(), 0)
//     this.checking = true
//     const res = await this.mlTableProps?.config?.api?.list?.({
//       pageSize: 99999,
//       pageNum: 1,
//       ...(this.mlTableProps?.searchData || {})
//     })
//     this.checking = false

//     const data = res.content || []
//     this.selectionList.forEach(item => {
//       if (!data.find(_ => _[this.tableKey] === item[this.tableKey])) {
//         data.push(item)
//       }
//     })

//     this.dataLength = res.total
//     // const allChecked = res.content.map(item => ({
//     //   [this.tableKey]: item[this.tableKey],
//     //   [this.labelKey]: item[this.labelKey]
//     // }))
//     this.setSelectionList(res.content)
//     if (isEmit) {
//       this.$emit('input', this.selectionList.concat([]))
//     }
//   }

//   onCheckAll() {
//     this.getAllDataChecked()
//   }

//   // 表格获取数据后，切换数据的选中状态
//   toggleTableCheck(type?, res?) {
//     // 选所有数据的时候。获取数据的总长度，根据长度简单判断是否选择当前选中和后端数据一致
//     if (res && this.isAllCheck) {
//       this.dataLength = res.total
//     }
//     if (!this.mlTable) {
//       return
//     }
//     const tableData = this.mlTable.data
//     const elSelection: AnyObj[] = (this.mlTable.elTable as any).selection
//     const key = this.tableKey
//     this.$nextTick(() => {
//       tableData.forEach(row => {
//         // if (this.selectionList.some(_ => _[key] === row[key])) {
//         //   this.mlTable.elTable.toggleRowSelection(
//         //     this.selectionList.find(_ => _[key] === row[key]),
//         //     false
//         //   )
//         //   this.mlTable.elTable.toggleRowSelection(row, true)
//         // }
//         /**
//          * 上面的if的另一种逻辑。会强制改变选中的值为整个对象。但是会造成选中的排序有问题。
//          * 下面写法之前选中的值不是整个对象。出现了问题。现在测试无该问题
//          */
//         if (this.selectionList.some(_ => _[key] === row[key]) && elSelection.every(_ => _[key] !== row[key])) {
//           this.mlTable.elTable.toggleRowSelection(row, true)
//         } else if (elSelection.some(_ => _[key] === row[key]) && this.selectionList.every(_ => _[key] !== row[key])) {
//           this.mlTable.elTable.toggleRowSelection(row, false)
//         }
//       })
//       this.$emit('tableLoaded', this.selectionList, this.value, tableData)
//     })
//   }
//   // 清楚某一行的校验
//   removeRowChecked(data) {
//     const key = this.tableKey
//     const elSelection: AnyObj[] = (this.mlTable.elTable as any).selection
//     const row = elSelection.find(_ => _[key] === data[key])
//     if (row) {
//       this.mlTable.elTable.toggleRowSelection(row, false)
//     }
//   }

//   onSelectRow(selection, row) {
//     if (this.multiple) {
//       this.selectionList = selection
//     } else {
//       if (selection?.length > 1) {
//         this.mlTable.elTable.clearSelection()
//         this.mlTable.elTable.toggleRowSelection(row, true)
//         this.selectionList = [row]
//       } else {
//         this.selectionList = selection
//       }
//     }
//   }
//   onSelectAll(selection) {
//     this.selectionList = selection
//   }

//   renderBottomTag() {
//     return (
//       <div class="tag-list">
//         <h3 class="tag-list-label">
//           {this.tagTitle}({this.selectionList.length})
//         </h3>
//         <div class="tag-list-box">
//           {this.selectionList.map((item, index) => {
//             return (
//               <c-tag key={item[this.tableKey]} on-close={() => this.onTagClose(item, index)} closable>
//                 {item[this.labelKey]}
//               </c-tag>
//             )
//           })}
//         </div>
//       </div>
//     )
//   }

//   protected render() {
//     return (
//       <div class="dialog-wrapper">
//         <div onClick={this.onShowDialog} class="open-dialog">
//           {this.$scopedSlots.default ? (
//             this.$scopedSlots.default(this.value)
//           ) : (
//             <c-input
//               size="small"
//               clearable={this.clearable}
//               disabled={this.disabled}
//               placeholder={this.placeholder}
//               on-clear={this.onClearInput}
//               class="open-input"
//               value={this.dataListNames}></c-input>
//           )}
//         </div>
//         <c-dialog
//           class="ml-dialog"
//           visible={this.visible}
//           attrs={this.dialogProp}
//           {...{ on: { 'update:visible': this.hideDialog } }}>
//           <div slot="footer" class="dialog-foot">
//             {this.$scopedSlots.top && this.$scopedSlots.top({ value: this.value, checkeds: this.selectionList })}
//             <div class="content-wrapper">
//               {this.$scopedSlots.left && this.$scopedSlots.left({ value: this.value, checkeds: this.selectionList })}
//               <ml-table
//                 ref="mlTable"
//                 class={{ single: !this.multiple }}
//                 // onSelect={this.handleSelectChange}
//                 // on-selection-change={this.handleSelectionChange}
//                 on-select={this.onSelectRow}
//                 on-select-all={this.onSelectAll}
//                 on-checkAll={this.onCheckAll}
//                 {...{ attrs: this.mlTableProps_ }}></ml-table>
//             </div>
//             {this.isTag && this.renderBottomTag()}
//             <div class="btn-wrapper">
//               <c-button onClick={this.handleConfirm} type="primary" size="small">
//                 确定
//               </c-button>
//               <c-button onClick={this.hideDialog} size="small">
//                 取消
//               </c-button>
//             </div>
//           </div>
//         </c-dialog>
//       </div>
//     )
//   }
// }
//
</script>
//
<style lang="scss" scoped>
// .dialog-foot {
//   text-align: left;
// }
// .dialog-wrapper {
//   ::v-deep .ml-base-table .ml-table-search {
//     width: 100%;
//   }
//   .open-dialog {
//     display: inline-block;
//     width: 100%;
//   }
// }

// ::v-deep .el-dialog {
//   .el-dialog__body {
//     padding: 0;
//   }
//   .el-dialog__footer {
//     position: relative;
//   }
//   .tag-list {
//     margin-top: 20px;
//     width: 100%;
//     padding: 18px;
//     padding-left: 8px;
//     border: 1px solid rgb(223, 220, 220);
//     position: relative;
//     &-label {
//       padding: 0 10px;
//       height: 30px;
//       line-height: 30px;
//       text-align: center;
//       background-color: white;
//       position: absolute;
//       top: -17px;
//       left: 50px;
//     }
//     &-box {
//       min-height: 100px;
//       max-height: 200px;
//       overflow-y: auto;
//     }
//     .el-tag {
//       float: left;
//       margin-left: 10px;
//       margin-bottom: 10px;
//     }
//   }
//   .btn-wrapper {
//     margin-top: 15px;
//     text-align: center;
//   }
//   .ml-table-pagination {
//     width: 100%;
//   }

//   .content-wrapper {
//     display: flex;
//     .ml-table {
//       flex: 1;
//       overflow: hidden;
//       .outer-btn-box {
//         position: absolute;
//         top: 10px;
//       }
//       &.single .el-table__header .el-checkbox {
//         //找到表头那一行，然后把里面的复选框隐藏掉
//         display: none !important;
//       }
//     }
//   }
// }
//
</style>
//
<style lang="scss">
// .open-input {
//   .el-input__inner {
//     cursor: pointer;
//   }
// }
//
</style>
