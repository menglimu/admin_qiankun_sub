<script>
import BaseSelect from './index.vue'
export default {
  name: 'PersonSelectSingle',
  mixins: [BaseSelect],
  methods: {
    handleSelectionChange() {
      // this.selectionList = val
      return false
    },
    handleSelectChange(selection, row) {
      this.$refs.table.$refs.table.clearSelection()
      if (selection && selection[0]) {
        this.$refs.table.$refs.table.toggleRowSelection(row, true)
        this.selectionList = [row]
      } else {
        this.selectionList = []
      }
    }
  }
}
</script>

<style lang="scss">
.person_select_container.single .el-table__header .el-checkbox {
  //找到表头那一行，然后把里面的复选框隐藏掉
  display: none !important;
}
</style>
