<script>
import BaseSelect from './index.vue'
export default {
  name: 'DeptSelectSingle',
  mixins: [BaseSelect],
  data() {
    return {
      type: 'single',
      currentTreeRow: null
    }
  },
  methods: {
    renderContent(h, { data, node }) {
      const isCurrent = node.isCurrent
      const rightIcon = isCurrent ? <i style="color: #00BA64;" class="el-icon-check"></i> : null
      return (
        <span class="custom-tree-node">
          <span style="font-size:12px;margin-left:2px;">{data[this.treeProps.label]}</span>
          {rightIcon}
        </span>
      )
    },
    changeVal(val) {
      this.$emit('input', val)
      //同时调整
      this.setTreeSelect(val)
    },
    setTreeSelect(val) {
      if (val) {
        this.$refs.selectTree && this.$refs.selectTree.setCurrentKey(val)
      } else {
        this.$refs.selectTree && this.$refs.selectTree.setCurrentKey()
      }
      const current = this.$refs.selectTree?.getCurrentNode?.()
      this.setOptions(current ? [current] : [])
    },
    handleClear() {
      this.changeVal('')
    },
    checkChange(node, tree) {
      this.setOptions(tree.checkedNodes)
      if (!tree.checkedNodes.includes(node)) {
        //取消勾选
        this.inputval = ''
        this.changeVal(this.inputval)
      } else {
        //添加勾选
        this.inputval = node[this.treeProps.nodeKey]
        this.changeVal(this.inputval)
      }
    },
    handleTreeCurrentChange(data) {
      this.currentTreeRow = data
      this.$emit('input', data[this.treeProps.nodeKey])
      this.setOptions([data])
    }
  }
}
</script>
