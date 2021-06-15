<script>
export default {
  name: 'details-info',
  props: {
    visible: Boolean,
    title: String,
    config: {
      type: Object,
      default: () => ({
        data: {
          key: 123
        },
        options: [
          {
            label: '详情1：',
            prop: 'key',
            width: '50%' // 默认50%
          }
        ]
      })
    }
  },
  computed: {
    infoData() {
      return this.config.data || {}
    },
    infoOptions() {
      return this.config.options || []
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  watch: {
    visible(val) {
      this.dialogVisible = val
    },
    dialogVisible(val) {
      this.$emit('update:visible', val)
    }
  },
  methods: {
    renderItem(h, item, customRender, formatter) {
      if (customRender) {
        return customRender(h, item)
      } else {
        const content = formatter && typeof formatter === 'function' ? formatter(item) : item
        if (typeof content === 'number') {
          return <span class="value">{content}</span>
        }
        return <span class="value">{content || '--'}</span>
      }
    }
  },
  render(h) {
    return (
      <el-dialog
        class="ml-dialog"
        title={this.title}
        visible={this.dialogVisible}
        {...{ on: { 'update:visible': e => (this.dialogVisible = e) } }}>
        <div class="global_detail_mask_inner">
          <div class="content">
            {this._l(this.infoOptions, item => (
              <div
                class={['item', item.className]}
                style={{
                  width: item.width
                }}>
                <span class="label">{item.label}</span>
                {this.renderItem(h, this.infoData[item.prop], item.customRender, item.formatter)}
              </div>
            ))}
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            size="small"
            onClick={() => {
              this.dialogVisible = false
            }}>
            关 闭
          </el-button>
        </span>
      </el-dialog>
    )
  }
}
</script>
<style lang="scss">
.global_detail_mask_inner {
  .content {
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 50%;
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      color: #666666;
      line-height: 32px;
      display: flex;
      .label {
        flex: none;
        margin-right: 10px;
      }
      .value {
        flex: 1;
        overflow: hidden;
        margin-right: 4px;
      }
    }
  }
}
</style>

<style lang="scss" scoped></style>
