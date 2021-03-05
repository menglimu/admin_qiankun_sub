<script>
import { getOrganizationStructureTree, getPersonList } from '@/api/modules/public'
export default {
  props: {
    isSingle: {
      type: Boolean,
      default: false
    },
    showTag: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      searchInputTable: '',
      searchInputTree: '',
      selectionList: [], //已选择的人员
      tableConfig: {
        stripe: false,
        outerBtn: [],
        innerBtn: [],
        searchConfig: {},
        searchData: {},
        config: {
          index: false,
          selection: true,
          initSearch: false,
          api: {
            list: params => {
              const deptlist = this.getSelectedTreeDept()
              return new Promise((resolve, reject) => {
                // 如果无单位则返空，不请求
                // if (!deptList) {
                //   return resolve({
                //     content: [],
                //     total: 0
                //   })
                // }
                getPersonList({
                  deptIds: deptlist,
                  keyword: this.searchInputTable,
                  ...params
                })
                  .then(res => {
                    if (res) {
                      resolve(res)
                      //确认勾选状态
                      this.$nextTick(() => {
                        this.toggleTableCheck()
                      })
                    } else {
                      reject()
                    }
                  })
                  .catch(_ => reject(_))
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
      },
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      treeData: [],
      ids: [],
      deptList: null,
      showdialog: false
    }
  },
  watch: {
    searchInputTable(val, oldval) {
      if (!val && oldval) {
        this.getTable()
      }
    },
    searchInputTree(val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    renderTree() {
      return (
        <div class="left_tree">
          <div class="left_tree_top">
            组织架构
            <span onClick={this.handleSelectAll}>全选</span>
          </div>
          <div class="left_tree_bottom">
            <c-input
              ref="searchInput"
              class="search-input"
              value={this.searchInputTree}
              placeholder="搜索单位"
              size="small"
              on-input={event => {
                this.searchInputTree = event
              }}
              nativeOnKeydown={ev => {
                ev.keyCode === 13 ? this.handleInputTreeClick(ev, this.searchInputTree) : null
              }}>
              <i
                slot="suffix"
                class="el-input__icon el-icon-search"
                on-click={ev => this.handleInputTreeClick(ev, this.searchInputTree)}></i>
            </c-input>
            <div class="tree_container">
              <c-tree
                ref="tree"
                data={this.treeData}
                show-checkbox
                node-key="id"
                onCheck={this.checkChange}
                props={this.defaultProps}
                filter-node-method={this.filterNode}
                render-content={this.renderContent}
              />
            </div>
          </div>
        </div>
      )
    },
    renderTable() {
      return (
        <div class="right_table">
          <c-input
            ref="searchInput"
            class="search-input"
            style="width: 240px;"
            value={this.searchInputTable}
            placeholder="搜索人员"
            size="small"
            on-input={event => {
              this.searchInputTable = event
            }}
            nativeOnKeydown={ev => {
              ev.keyCode === 13 ? this.handleInputTableClick(ev, this.searchInputTable) : null
            }}>
            <i
              slot="suffix"
              class="el-input__icon el-icon-search"
              on-click={ev => this.handleInputTableClick(ev, this.searchInputTable)}></i>
          </c-input>
          <MlTable
            ref="table"
            height="370px"
            onSelect={this.handleSelectChange}
            on-selection-change={this.handleSelectionChange}
            {...{ attrs: this.tableConfig }}></MlTable>
        </div>
      )
    },
    getTree() {
      getOrganizationStructureTree().then(res => {
        if (res) {
          this.treeData = res
          this.ids = this.treeData.map(_item => _item.id)
          this.toggleTreeCheck()
          this.getTable()
          //勾选之前选过的
        } else {
          this.$message.error(res.message)
        }
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.deptName.indexOf(value) !== -1
    },
    toggleTreeCheck() {
      if (this.deptlist && this.deptlist[0]) {
        this.$refs.tree.setCheckedKeys(this.deptlist.map(item => item.id))
      }
    },
    getTable() {
      this.$refs.table.onSearch()
    },
    toggleTableCheck() {
      const Ids = this.selectionList.map(item => {
        return item.id
      })
      const tableData = this.$refs.table.data
      const store = [...this.selectionList]
      this.$refs.table.$refs.table.clearSelection()
      this.$nextTick(() => {
        this.selectionList = store
      })
      tableData.forEach(row => {
        if (Ids.includes(row.id)) {
          //设置selectionList内的值
          const findindex = Ids.indexOf(row.id)
          if (findindex > -1) {
            this.selectionList[findindex] = { ...row }
          }
          this.$refs.table.$refs.table.toggleRowSelection(row, true)
        } else {
          this.$refs.table.$refs.table.toggleRowSelection(row, false)
        }
      })
    },
    handleTagDel(item) {
      const tableData = this.$refs.table.data
      tableData.forEach(row => {
        if (item.id === row.id) {
          this.$refs.table.$refs.table.toggleRowSelection(row, false)
        }
      })
    },
    renderContent(h, { data }) {
      return (
        <span class="custom-tree-node">
          <span style="font-size:12px;margin-left:2px;">{data.deptName}</span>
        </span>
      )
    },
    handleSelectAll() {
      this.$refs.tree.setCheckedKeys(this.ids)
      this.getTable()
    },
    getSelectedTreeDept() {
      const nodes = this.$refs.tree.getCheckedNodes()
      return nodes.map(_ => _.id).join(',')
    },
    handleSelectionChange(val) {
      //如果是表格中的内容则通过判断清除
      val = val || []
      const tableData = this.$refs.table.data || []
      const ids = val.map(item => item.id)
      const reduceDataids = tableData.filter(item => !ids.includes(item.id)).map(item => item.id)
      const reducedData = this.selectionList.filter(item => {
        //删除减少的
        return !reduceDataids.includes(item.id)
      })
      const nowData = reducedData.concat(val)
      //去重
      const obj = {}
      const outList = []
      nowData.forEach(item => {
        if (!obj[item.id]) {
          outList.push(item)
          obj[item.id] = item
        }
      })
      this.selectionList = outList
    },
    handleSelectChange() {
      return false
    },
    extractDepts(node) {
      const ids = []
      if (node.id) {
        ids.push(node.id)
      }
      if (node.children && node.children.length) {
        this.extractChildDepts(node.children, ids)
      }
      return ids
    },
    extractChildDepts(children, ids) {
      children.forEach(_item => {
        if (_item.id) {
          ids.push(_item.id)
        }

        if (_item.children && _item.children.length) {
          return this.extractChildDepts(_item.children, ids)
        }
      })
    },
    checkChange(node, tree) {
      if (!tree.checkedNodes.includes(node)) {
        //取消勾选
        const depts = this.extractDepts(node)
        //遍历node 取消selectionList中已勾选的
        this.selectionList = this.selectionList.filter(item => {
          return !depts.includes(item.deptId)
        })
      } else {
        //添加勾选
        //添加 selectionList勾选
      }
      this.getTable()
    },
    handleInputTableClick(e, value) {
      this.getTable()
    },
    handleInputTreeClick(e, value) {
      this.$refs.tree.filter(value)
    },
    handleConfirm() {
      const deptlist = this.getTreeNodes().map(item => {
        return {
          id: item.id,
          deptName: item.deptName
        }
      })
      this.$emit('selected', this.selectionList.concat([]), deptlist)
      this.showdialog = false
    },
    //获取树的选择状态
    getTreeNodes() {
      const nodes = this.$refs.tree.getCheckedNodes()
      return nodes
    },
    open(deptlist, selectionList) {
      if (deptlist) {
        this.deptlist = deptlist
      }
      this.selectionList = selectionList || []
      this.searchInputTable = ''
      this.searchInputTree = ''
      this.showdialog = true
      this.getTree()
    }
  },
  render(h) {
    return (
      <c-dialog
        visible={this.showdialog}
        {...{ on: { 'update:visible': e => (this.showdialog = e) } }}
        title="选择人员"
        width="950px"
        class="ml-dialog">
        {this.showdialog ? (
          <div class={['person_select_container', this.isSingle ? 'single' : '']}>
            <div class="two-columns">
              <div class="left">{this.renderTree(h)}</div>
              <div class="right">{this.renderTable(h)}</div>
            </div>
          </div>
        ) : null}
        {this.showTag ? (
          <div class="tag-list">
            <h3 class="tag-list-label">已分配人员({this.selectionList.length})</h3>
            {this.selectionList.map((item, index) => {
              return (
                <c-tag
                  disable-transitions={true}
                  key={item.id}
                  closable
                  {...{
                    on: {
                      close: () => {
                        this.selectionList.splice(index, 1)
                        this.handleTagDel(item)
                      }
                    }
                  }}>
                  {item.userName}
                </c-tag>
              )
            })}
          </div>
        ) : null}
        <span slot="footer" class="dialog-footer">
          <c-button type="primary" size="small" onClick={this.handleConfirm}>
            确定
          </c-button>
          <c-button
            size="small"
            onClick={() => {
              this.showdialog = false
            }}>
            取消
          </c-button>
        </span>
      </c-dialog>
    )
  },
  created() {
    // this.getTree()
  }
}
</script>
<style lang="scss" scoped>
.tag-list {
  width: 100%;
  min-height: 100px;
  padding: 18px;
  padding-left: 8px;
  border: 1px solid rgb(223, 220, 220);
  position: relative;
  margin-top: 15px;
  &-label {
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: white;
    position: absolute;
    top: -17px;
    left: 50px;
  }
  .el-tag {
    float: left;
    margin-left: 10px;
  }
}
.person_select_container {
  width: 100%;
  height: 500px;
  .two-columns {
    display: flex;
    flex-direction: row;
  }
  .left {
    width: 250px;
    flex-shrink: 0;
    padding-top: 7px;
    margin-right: 16px;
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
      .tree_container {
        flex: 1;
        overflow: auto;
        margin-top: 10px;
      }
    }
  }
  .right {
    flex: 1;
    padding-top: 25px;
    overflow: hidden;
    .right_table {
      text-align: right;
      .search-input {
        margin-bottom: 16px;
      }
    }
  }
}
</style>
