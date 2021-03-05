<script lang="tsx">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { ElTree, TreeData } from 'element-ui/types/tree'
import { ElSelect } from 'element-ui/types/select'
@Component({
  name: 'SelectTree',
  components: {}
})
export default class SelectTree extends Vue {
  @Prop({ type: String, default: 'label' }) optionLabel: string
  @Prop({ type: String, default: 'id' }) optionValue: string
  @Prop({ type: String, default: 'children' }) optionChildren: string
  @Prop({}) value?: string | number
  @Prop({ type: Array, default: (): any[] => [] }) options: any[]

  valueId: string | number // 初始值
  valueTitle = ''
  defaultExpandedKey: (string | number)[] = []

  $refs: {
    selectTree: ElTree<any, any>
    select: ElSelect
  }

  @Watch('value', { immediate: true })
  onValueChange() {
    if (this.valueId === this.value) {
      return
    }
    this.valueId = this.value || ''
    this.$nextTick(() => this.initHandle())
  }
  @Watch('options', { deep: true })
  onOpitonsChange() {
    this.$nextTick(() => this.initHandle())
  }

  get treeProps() {
    return {
      value: this.optionValue, // ID字段名
      label: this.optionLabel, // 显示名称
      children: this.optionChildren // 子级字段名
    }
  }

  // 初始化值
  initHandle() {
    if (this.valueId && this.options.length > 0) {
      if (!this.$refs.selectTree.getNode(this.valueId)) {
        return
      }
      this.valueTitle = this.$refs.selectTree.getNode(this.valueId).data[this.optionLabel] // 初始化显示
      this.$refs.selectTree.setCurrentKey(this.valueId) // 设置默认选中
      this.defaultExpandedKey = [this.valueId] // 设置默认展开
    } else {
      this.valueTitle = this.valueId + ''
    }
  }
  clearValue() {
    this.valueTitle = ''
    this.valueId = ''
    this.defaultExpandedKey = []
    this.$refs.selectTree.setCurrentKey(null) // 设置默认选中
  }
  // 切换选项
  handleNodeClick(node: TreeData) {
    if (node.disabled) {
      return
    }
    this.valueTitle = node[this.optionLabel]
    this.valueId = node[this.optionValue]
    this.$emit('input', this.valueId)
    this.defaultExpandedKey = []
    if (!node[this.optionChildren] || node[this.optionChildren].length === 0) {
      this.hideTree()
    }
  }
  // 清除选中
  clearHandle() {
    this.clearValue()
    this.$emit('input', null)
  }
  hideTree() {
    this.$refs.select.blur()
  }

  protected render() {
    return (
      <c-select ref="select" attrs={this.$attrs} value={this.valueTitle} onClear={this.clearHandle}>
        <c-option value={this.valueTitle} label={this.valueTitle}>
          <c-tree
            ref="selectTree"
            {...{ props: { props: this.treeProps }, attrs: this.$attrs, on: { 'node-click': this.handleNodeClick } }}
            data={this.options}
            node-key={this.optionValue}
            default-expanded-keys={this.defaultExpandedKey}
            nativeOnDblclick={this.hideTree}
          />
        </c-option>
      </c-select>
    )
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: auto;
  padding: 0;
}
.el-select-dropdown__item.selected {
  font-weight: normal;
}
ul li >>> .el-tree .el-tree-node__content {
  height: auto;
}
.el-tree-node__label {
  font-weight: normal;
}
::v-deep .el-tree {
  .is-current .el-tree-node__label {
    color: #409eff;
    font-weight: 700;
  }
  .is-current .el-tree-node__children .el-tree-node__label {
    color: #606266;
    font-weight: normal;
  }
  .el-tree-node[aria-disabled='true'] {
    // background: #edf2fc !important;
    // background: none !important;
    > .el-tree-node__content {
      background: none !important;
      cursor: not-allowed;
      > .el-tree-node__label {
        color: #c0c4cc !important;
      }
    }
  }
}

/* 开发禁用 */
/* .el-tree-node:focus>.el-tree-node__content{
    background-color:transparent;
    background-color: #f5f7fa;
    color: #c0c4cc;
    cursor: not-allowed;
  }
  .el-tree-node__content:hover{
    background-color: #f5f7fa;
  } */
</style>
