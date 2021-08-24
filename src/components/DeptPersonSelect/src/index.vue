<!--
 * @Author: wenlin
 * @Date: 2020-12-02 11:17:39
 * @LastEditors: wenlin
 * @LastEditTime: 2020-12-26 10:41:44
 * @Description:  人员部门选择组件
-->
<script lang="tsx">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import TableDialogSelect, { TableDialogSelectProps } from '@/components/TableDialogSelect'
import CustomTree from '@/components/CustomTree'
import { getOrganizationStructureTree, getPersonList, getPersonListCurrentAndAllSub } from '@/api/modules/public'
import { MlTreeProp } from '@/components/CustomTree'
import merge from 'webpack-merge'
import { deepClone } from '@/utils'

@Component({
  components: { TableDialogSelect, CustomTree }
})
export default class DeptPersonSelect extends Vue {
  @Prop({ type: Boolean, default: false }) clearable: boolean
  @Prop({ type: String, default: '请选择人员' }) placeholder: string
  @Prop({ type: Boolean, default: false }) disabled: boolean
  /** 弹窗的title */
  @Prop({ type: String, default: '选择部门人员' }) readonly title!: string

  /** 关联部门和人员。关联后，必须选择部门后，才能选择人员 */
  @Prop({ type: Boolean, default: false }) relationDept: boolean

  /** 树形选择组件相关的配置项 */
  @Prop({ type: Object, default: () => ({}) }) treeProp: MlTreeProp
  /** 弹窗表格组件选择相关参数的prop */
  @Prop({ type: Object, default: () => ({}) }) tableSelectProp: TableDialogSelectProps

  /** 是否输出部门相关数据，默认false */
  @Prop({ type: Boolean, default: false }) isDeptData: boolean
  /** 是否显示部门数据 */
  @Prop({ type: Boolean, default: false }) isDeptShow: boolean
  /** 自定义部门数据获取接口 */
  @Prop({ type: Function }) getTreeData: { (): any }
  /**  政法委科室单独处理  */
  @Prop({ type: Boolean, default: false }) isLegalDept: boolean

  @Prop() value

  treeData = []
  treeCheckeds = []
  expandedKeys = []

  personCheckeds = []

  userNameKey = ''
  dialogConfig: TableDialogSelectProps

  $refs: {
    mltree: CustomTree
    tableDialogSelect: TableDialogSelect
  }

  get treeProp_(): MlTreeProp {
    const treeProp: MlTreeProp = {
      defaultExpandAll: false,
      isNodeValue: true,
      checkStrictly: true,
      showSearch: true,
      defaultExpandedKeys: this.expandedKeys
    }
    return merge(treeProp, this.treeProp)
  }

  @Watch('treeProp.value', { immediate: true })
  onTreePropValueChange() {
    if (this.treeProp && this.treeProp.value && Array.isArray(this.treeProp.value)) {
      this.treeCheckeds = this.treeProp.value.map(_ => (typeof _ === 'object' ? _ : { id: _ }))
    }
  }

  @Watch('treeCheckeds')
  onTreeCheckChange() {
    // 该逻辑在回显会引起，人员的部门id不存在的情况时，被过滤掉的bug，建议开启tags，让用户手动取消
    if (this.relationDept) {
      this.personCheckeds = this.personCheckeds.filter(person => {
        return this.treeCheckeds.some(dept => dept.id == person.deptId)
      })
    }
    this.$refs.tableDialogSelect?.mlTable?.onSearch?.()
  }

  @Watch('value', { immediate: true, deep: true })
  onValueChange(val) {
    const value = deepClone(val)
    if (this.isDeptData && value) {
      this.treeCheckeds = value.department || []
      this.personCheckeds = value.person || []
    } else {
      this.personCheckeds = value || []
    }
  }

  async created() {
    this.dialogConfig = {
      title: this.title,
      clearable: this.clearable,
      placeholder: this.placeholder,
      disabled: this.disabled,
      labelKey: 'userName',
      isTag: true,
      width: '1060px',
      ...this.tableSelectProp,
      mlTableProps: {
        config: {
          api: {
            list: params => {
              // 如果无单位则返空，不请求
              if (this.relationDept && (!this.treeCheckeds || this.treeCheckeds.length === 0)) {
                return Promise.resolve({
                  content: [],
                  total: 0
                })
              }
              //政法委科室单独处理
              if (this.isLegalDept && (!this.treeCheckeds || this.treeCheckeds.length === 0)) {
                if (this.treeData && this.treeData[0]) {
                  return getPersonListCurrentAndAllSub({
                    ...params,
                    keyword: this.userNameKey,
                    deptIds: this.treeData.map(_ => (typeof _ === 'object' ? _.id : _)).join(',')
                  })
                } else {
                  return Promise.resolve({
                    content: [],
                    total: 0
                  })
                }
              }
              return getPersonList({
                ...params,
                keyword: this.userNameKey,
                deptIds: this.treeCheckeds.map(_ => (typeof _ === 'object' ? _.id : _)).join(',')
              })
            }
          },
          columns: [
            { type: 'string', label: '姓名', prop: 'userName' },
            { type: 'string', label: '账号', prop: 'userAccount' },
            { type: 'string', label: '职务', prop: 'userDuty' },
            { type: 'string', label: '联系方式', prop: 'phone' },
            { type: 'string', label: '人员所属部门', prop: 'deptName' }
          ]
        }
      }
    }
    let treeData = []
    if (!this.getTreeData) {
      treeData = await getOrganizationStructureTree()
    } else {
      treeData = await this.getTreeData()
    }
    if (process.env.VUE_APP_DEPT_OPTIMIZATION_FLAG) {
      this.expandedKeys = treeData && treeData[0] && [treeData[0].id]
    }
    this.treeData = treeData
  }
  handleSelectAll() {
    this.$refs.mltree.setAllChecked()
    // this.$refs.tree.setCheckedKeys(this.ids)
  }
  onInputTree(val) {
    this.treeCheckeds = val
  }

  search() {
    if (this.relationDept && (!this.treeCheckeds || this.treeCheckeds.length === 0)) {
      this.$message.error('请先选择部门')
      return
    }
    this.$refs.tableDialogSelect.mlTable.onSearch()
  }

  onCancel() {
    this.onValueChange(this.value)
  }

  onSure(val) {
    this.personCheckeds = val
    if (this.isDeptData) {
      this.$emit('input', { department: this.treeCheckeds, person: this.personCheckeds })
    } else {
      this.$emit('input', val)
    }

    this.$nextTick(() => {
      const parent = this.$parent as any
      try {
        parent.elForm.validateField(parent.prop)
      } catch (error) {
        console.info('DepPersonSelect调用formItem的validateField失败')
      }
    })
  }

  renderShowValue() {
    const value = this.value
    let treeCheckeds = []
    let personCheckeds = []
    if (this.isDeptData && value) {
      treeCheckeds = value.department || []
      personCheckeds = value.person || []
    } else {
      personCheckeds = value || []
    }
    const depts = treeCheckeds.map(_ => _.deptName).join(',')
    const names = personCheckeds.map(_ => _.userName).join(',')
    if (this.isDeptShow) {
      return (
        <div class="show-labels">
          <c-input placeholder="请选择部门" size="small" class="show-labels-dept" value={depts}></c-input>
          <c-input
            attrs={this.$attrs}
            placeholder="请选择人员"
            size="small"
            class="show-labels-name"
            value={names}></c-input>
        </div>
      )
    }
    // return <c-input clearable={this.clearable} placeholder={this.placeholder} attrs={this.$attrs} value={names} />
  }

  renderDept() {
    return (
      <div class="left_tree">
        <div class="left_tree_top">
          组织架构
          {this.treeProp_.multiple && <span onClick={this.handleSelectAll}>全选</span>}
        </div>
        <CustomTree
          ref="mltree"
          options={this.treeData}
          optionLabel="deptName"
          {...{
            attrs: this.treeProp_,
            on: { ...this.$listeners, input: this.onInputTree }
          }}
          value={this.treeCheckeds}
          class="left_tree_bottom"></CustomTree>
      </div>
    )
  }
  renderTableSearch() {
    return (
      <div class="search-input-box">
        <c-input
          class="search-input"
          placeholder="搜索人员"
          v-model={this.userNameKey}
          size="small"
          nativeOnKeyup={ev => {
            ev.keyCode === 13 && this.search()
            ev.stopPropagation()
          }}>
          <i slot="suffix" class="el-input__icon el-icon-search" on-click={this.search}></i>
        </c-input>
      </div>
    )
  }
  protected render() {
    return (
      <TableDialogSelect
        ref="tableDialogSelect"
        attrs={this.dialogConfig}
        value={this.personCheckeds}
        on-input={this.onSure}
        on-cancel={this.onCancel}
        scopedSlots={{
          left: this.renderDept,
          top: this.renderTableSearch,
          default: this.$scopedSlots.default ? this.$scopedSlots.default : this.isDeptShow ? this.renderShowValue : null
        }}></TableDialogSelect>
    )
  }
}
</script>
<style lang="scss" scoped>
.show-labels {
  &-dept,
  &-name {
    width: 200px;
    margin-right: 20px;
  }
}
.search-input-box {
  text-align: right;
  margin-bottom: 5px;
  .search-input {
    width: 240px;
  }
}

.left_tree {
  width: 250px;
  flex-shrink: 0;
  padding-top: 7px;
  margin-right: 16px;
  margin-top: -37px;
  .left_tree_top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 8px;
    font-size: 12px;
    text-align: left;
    color: #333333;
    font-weight: 600;
    line-height: 17px;
    span {
      color: #3786fd;
      font-weight: 400;
      cursor: pointer;
    }
  }
  .left_tree_bottom {
    width: 100%;
    height: 460px;
    border: 1px solid #e6e6e6;
    border-radius: 2px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    overflow: auto;
  }
}
</style>
