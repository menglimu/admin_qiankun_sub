<script>
import { getOrganizationStructureTree } from '@/api/modules/public'
import { deepClone } from '@/utils'
export default {
  props: {
    value: {},
    treeGet: {
      type: Function
    },
    treeProps: {
      type: Object,
      default: () => {
        return {
          children: 'children',
          label: 'deptName',
          nodeKey: 'id'
        }
      }
    },
    placeholder: {
      default: ''
    },
    searchplaceholder: {
      default: '根据搜索单位名称模糊搜索'
    }
  },
  data() {
    return {
      type: 'multiple',
      treeData: [],
      inputval: [],
      searchinput: '',
      checkedOptions: []
    }
  },
  watch: {
    value: {
      handler(val) {
        this.inputval = deepClone(val)
        this.setTreeSelect(val)
      },
      deep: true,
      immediate: true
    },
    searchinput: {
      handler(val) {
        this.$refs.selectTree.filter(val)
      }
    },
    treeData: {
      handler() {
        this.$nextTick(() => {
          this.setTreeSelect(this.value)
        })
      }
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data[this.treeProps.label].indexOf(value) !== -1
    },
    changeVal(val) {
      this.$emit('input', [...val])
      //同时调整
      this.$nextTick(() => {
        try {
          this.$parent.elForm.validateField(this.$parent.prop)
        } catch (error) {
          console.error(error)
        }
      })
      this.setTreeSelect([...val])
    },
    handleInputClick(e) {
      e && e.stopPropagation()
    },
    setTreeSelect(val) {
      if (this.$refs.selectTree) {
        this.$refs.selectTree.setCheckedKeys(val)
        this.setOptions(this.$refs.selectTree?.getCheckedNodes?.() || [])
      }
    },
    async getTree() {
      if (this.treeGet) {
        this.treeData = await this.treeGet()
      } else {
        this.treeData = await getOrganizationStructureTree()
      }
    },
    renderContent(h, { data }) {
      return (
        <span class="custom-tree-node">
          <span style="font-size:12px;margin-left:2px;">{data[this.treeProps.label]}</span>
        </span>
      )
    },
    setOptions(data) {
      this.checkedOptions = data
    },
    checkChange(node, tree) {
      this.setOptions(tree.checkedNodes)
      if (!tree.checkedNodes.includes(node)) {
        //取消勾选
        if (Object.prototype.toString.call(this.inputval) !== '[object Array]') {
          this.inputval = []
        } else {
          this.inputval = this.inputval.filter(item => item !== node[this.treeProps.nodeKey])
        }
        this.changeVal(this.inputval)
      } else {
        //添加勾选
        if (Object.prototype.toString.call(this.inputval) !== '[object Array]') {
          this.inputval = [node[this.treeProps.nodeKey]]
        } else {
          this.inputval.push(node[this.treeProps.nodeKey])
        }
        this.changeVal(this.inputval)
      }
    },
    handleClear() {
      this.changeVal([])
    },
    handleTreeCurrentChange() {
      return false
    }
  },
  created() {
    this.getTree()
  },
  render() {
    return (
      <c-select
        ref="select"
        onChange={this.changeVal}
        clearable
        multiple={this.type === 'multiple' ? true : false}
        onClear={this.handleClear}
        attrs={{ ...this.$props, ...this.$attrs }}
        placeholder={this.placeholder}
        v-model={this.inputval}>
        <c-option value={-1} label={-1}>
          <c-input
            ref="input"
            nativeOnClick={this.handleInputClick}
            placeholder={this.searchplaceholder}
            v-model={this.searchinput}
          />
        </c-option>
        {this.treeData.length ? (
          <c-option value={-2} label={-2}>
            <c-tree
              render-content={this.renderContent}
              node-key={this.treeProps.nodeKey}
              show-checkbox={this.type === 'multiple'}
              check-strictly
              ref="selectTree"
              highlight-current={this.type !== 'multiple'}
              onCheck={this.checkChange}
              filter-node-method={this.filterNode}
              {...{ props: { props: this.treeProps } }}
              data={this.treeData}
              on-current-change={this.handleTreeCurrentChange}
            />
          </c-option>
        ) : null}
        {this.checkedOptions.map(item => {
          return (
            <c-option
              label={item[this.treeProps.label]}
              value={item[this.treeProps.nodeKey]}
              key={item[this.treeProps.nodeKey]}>
              <span style="display: none"></span>
            </c-option>
          )
        })}
      </c-select>
    )
  }
}
</script>

<style lang="scss" scoped>
.inputwith_select {
  width: 100%;
}
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
</style>
