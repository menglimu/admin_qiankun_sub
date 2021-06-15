<!--
 * @Author: wenlin
 * @Date: 2020-05-22 17:58:48
 * @LastEditors: wenlin
 * @LastEditTime: 2020-12-11 18:51:22
 * @Description:
-->
<script lang="tsx">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { CreateElement } from 'vue'
import { ElTree } from 'element-ui/types/tree'

@Component({
  name: 'CustomTree',
  components: {}
})
export default class MlTree extends Vue {
  @Prop({ type: String, default: 'label' }) optionLabel: string
  @Prop({ type: String, default: 'id' }) optionValue: string
  @Prop({ type: String, default: 'children' }) optionChildren: string
  @Prop({ type: Array, default: (): any[] => [] }) value: any[]
  @Prop({ type: Array, default: (): any[] => [] }) options: any[]
  @Prop({ type: Function }) renderContent
  @Prop({ type: Boolean, default: true }) multiple: boolean
  @Prop({ type: Boolean, default: false }) showSearch: boolean
  @Prop({ type: String, default: '搜索' }) searchPlaceholder: string
  @Prop({ type: Boolean, default: false }) disabled: boolean
  /** value是否返回整个对象的数组 */
  @Prop({ type: Boolean, default: false }) isNodeValue: boolean

  @Prop({ type: Function, default: null }) filterNode: { (value, data): boolean }
  /** 当树加载后全选树 */
  @Prop({ type: Boolean, default: false }) selectTreeAtFirst: boolean

  searchInputTree = ''

  $refs: {
    elTree: ElTree<string, AnyObj>
  }

  get checkStrictlyInital() {
    if (this.multiple === false) {
      return true
    }
    const checkStrictly = this.$attrs['check-strictly'] || this.$attrs.checkStrictly

    return checkStrictly !== undefined ? checkStrictly : false
  }

  get checkStrictly() {
    if (this.checkStrictlyInital === 'custom') {
      return true
    } else {
      return this.checkStrictlyInital
    }
  }

  customRenderContent(h, { node, data, store }) {
    if (this.renderContent) {
      return this.renderContent(h, { node, data, store })
    }
    if (this.checkStrictlyInital === 'custom') {
      const fn = (h, { node, data, store }) => {
        const handleClick = e => {
          e && e.stopPropagation()
          const ids = this.getChildrenIds(node)
          const before = this.$refs.elTree.getCheckedKeys()
          this.$refs.elTree.setCheckedKeys([...new Set(before.concat(ids))])
          this.submit()
        }
        const btn = (
          <span class="custom-el-tree-btn" onClick={handleClick}>
            全选
          </span>
        )
        const disabled = this.disabled || data.disabled
        return (
          <span class="el-tree-node__label">
            {data[this.optionLabel]}
            {disabled ? null : btn}
          </span>
        )
      }
      return fn(h, { node, data, store })
    }
    return null
  }

  filterNodeCustom(value, data) {
    if (!value) return true
    return data[this.optionLabel].indexOf(value) !== -1
  }

  get treeProps() {
    return {
      value: this.optionValue, // ID字段名
      label: this.optionLabel, // 显示名称
      children: this.optionChildren, // 子级字段名
      disabled: data => {
        return this.disabled || data.disabled
      }
    }
  }
  @Watch('value', { immediate: true })
  onValueChange() {
    this.$nextTick(() => this.initHandle())
  }
  @Watch('options', { deep: true })
  onOptionsChange() {
    this.$nextTick(() => {
      if (!this.setTreeChecked(this.value || [])[0] && this.selectTreeAtFirst && this.multiple) {
        this.setAllChecked()
      }
    })
  }
  // 初始化值
  initHandle() {
    this.setTreeChecked(this.value || []) // 设置默认选中
  }

  getParentIds(node) {
    const arr = []
    const key = this.optionValue
    const traverse = function(node, arr) {
      const parent = node.parent
      if (node.data[key]) {
        arr.push(node.data[key])
      }
      if (parent) {
        traverse(parent, arr)
      }
    }
    traverse(node, arr)
    return arr
  }
  getChildrenIds(node) {
    const arr = []
    const key = this.optionValue
    const traverse = function(node, arr) {
      const childNodes = node.childNodes || []
      if (node.data[key]) {
        arr.push(node.data[key])
      }
      childNodes.forEach(child => {
        traverse(child, arr)
      })
    }
    traverse(node, arr)
    return arr
  }
  getChildrenIdsMain(node) {
    const key = this.optionValue
    const arr = []
    const traverse = function(node, arr) {
      const childNodes = node.children || []
      if (node[key]) {
        arr.push(node[key])
      }
      childNodes.forEach(child => {
        traverse(child, arr)
      })
    }
    traverse(node, arr)
    return arr
  }
  setTreeChecked(value) {
    if (this.$refs.elTree) {
      if (!this.multiple) {
        const keys = this.isNodeValue ? value.map(_ => _[this.optionValue]) : value
        this.$refs.elTree.setCurrentKey(keys[0])
        return keys
      }
      const keys = this.isNodeValue ? value.map(_ => _[this.optionValue]) : value
      this.$refs.elTree.setCheckedKeys(keys)
      return keys
    }
  }
  // 切换选项
  handleCheckChange(node, tree) {
    if (this.multiple === false && tree.checkedNodes.includes(node)) {
      this.$refs.elTree.setCheckedKeys([node[this.optionValue]])
    } else if (this.checkStrictlyInital === 'custom') {
      if (!tree.checkedNodes.includes(node)) {
        //取消勾选-取消子项以及自己
        const ids = this.getChildrenIdsMain(node)
        this.$refs.elTree.setCheckedKeys(tree.checkedKeys.filter(item => !ids.includes(item)))
      } else {
        //添加勾选
        //需要确认所有父节点都勾选了
        const nodesMap = (this.$refs.elTree.store as any).nodesMap
        if (nodesMap[node[this.optionValue]]) {
          const nowNode = nodesMap[node[this.optionValue]]
          const parentIds = this.getParentIds(nowNode)
          const ids = [...new Set(tree.checkedKeys.concat(parentIds))] as string[]
          this.$refs.elTree.setCheckedKeys(ids)
        }
        // console.log(nodesMap, '-nodesMap')
        // console.log(node, '-node')
        // console.log(tree, '-tree')
      }
    }
    this.submit()
  }

  handleCurrentChange(data) {
    if (this.multiple) return
    if (this.disabled) {
      const keys = this.isNodeValue ? this.value.map(_ => _[this.optionValue]) : this.value
      this.$refs.elTree.setCurrentKey(keys[0])
      return
    }
    this.submit()
  }

  setAllChecked() {
    if (this.checkStrictly) {
      const nodesMap = (this.$refs.elTree.store as any).nodesMap
      const keys = Object.keys(nodesMap).map(item => item)
      this.$refs.elTree.setCheckedKeys(keys)
    } else {
      this.$refs.elTree.setCheckedNodes(this.options)
    }
    this.submit()
  }

  // 完成选择后的提交
  submit() {
    if (!this.multiple) {
      if (this.isNodeValue) {
        this.$emit('input', [this.$refs.elTree.getCurrentNode()])
      } else {
        this.$emit('input', [this.$refs.elTree.getCurrentKey()])
      }
      return
    }
    if (this.isNodeValue) {
      this.$emit('input', this.$refs.elTree.getCheckedNodes())
    } else {
      this.$emit('input', this.$refs.elTree.getCheckedKeys())
    }
  }

  handleInputTreeClick() {
    this.$refs.elTree.filter(this.searchInputTree)
  }
  renderSearch() {
    return (
      <el-input
        ref="searchInput"
        class="search-input"
        v-model={this.searchInputTree}
        placeholder={this.searchPlaceholder}
        size="small"
        nativeOnKeydown={ev => {
          ev.keyCode === 13 ? this.handleInputTreeClick() : null
        }}>
        <i slot="suffix" class="el-input__icon el-icon-search" on-click={this.handleInputTreeClick}></i>
      </el-input>
    )
  }

  protected render(h: CreateElement) {
    return (
      <div>
        {this.showSearch && this.renderSearch()}
        <el-tree
          class={['custom_tree', !this.multiple ? 'isSingle' : '']}
          ref="elTree"
          data={this.options}
          {...{
            props: {
              props: this.treeProps,
              checkStrictly: this.checkStrictly,
              showCheckbox: this.multiple,
              highlightCurrent: !this.multiple,
              renderContent:
                this.renderContent || this.checkStrictlyInital === 'custom' ? this.customRenderContent : null,
              'filter-node-method': this.filterNode ? this.filterNode : this.filterNodeCustom
            },
            attrs: this.$attrs,
            on: { ...this.$listeners, check: this.handleCheckChange, 'current-change': this.handleCurrentChange }
          }}
          node-key={this.treeProps.value}
          show-checkbox
        />
      </div>
    )
  }
}
</script>

<style lang="scss">
.custom_tree.isSingle {
  .el-tree-node[aria-disabled='true'] {
    &.is-current {
      > .el-tree-node__content {
        background: #eff5ff !important;
        cursor: not-allowed;
        > .el-tree-node__label {
          color: #606266 !important;
        }
      }
    }
    > .el-tree-node__content {
      background: none !important;
      cursor: not-allowed;
      > .el-tree-node__label {
        color: #c0c4cc !important;
      }
    }
  }
}
.el-tree-node__content {
  &:hover {
    .custom-el-tree-btn {
      display: inline-block;
    }
  }
  .custom-el-tree-btn {
    display: none;
    margin-left: 10px;
    color: #ffffff;
    background: #409eff;
    padding: 0 5px;
    border-radius: 2px;
  }
}
</style>
