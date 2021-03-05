<script lang="tsx">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import Clickoutside from 'element-ui/src/utils/clickoutside'
import { getMsgInbox, getMsgCountStatus } from '@/api/modules/public'
import { parseTime } from '@/utils'

@Component({
  components: {},
  directives: {
    Clickoutside
  }
})
export default class Message extends Vue {
  @Prop({ type: Array, default: () => [] }) value: any[]
  @Prop({ type: Boolean, default: false }) isSingle: boolean
  @Prop({ type: Boolean }) showflag: boolean
  messageList = []
  bulletList = []
  interval = null
  nowRow: AnyObj = {}
  $refs: {
    detail: any
  }

  get frontmessaegList() {
    return this.messageList.slice(0, 5)
  }

  @Watch('showflag')
  onShowflagChange(val) {
    if (val) {
      this.messageList = []
      this.getTable()
    }
  }
  @Watch('bulletList')
  onBulletListChange(val) {
    this.$emit('bulletChange', val.length)
  }

  handleClickOutside() {
    this.$emit('viewmore')
  }

  calcStatus(status) {
    const list = ['未读', '已读']
    return list[status]
  }

  handleRead(row) {
    this.bulletList = this.bulletList.filter(item => {
      if (item.title == row.title && item.createTime == row.createTime) {
        return false
      }
      return true
    })
  }

  openDetail(item, index) {
    this.nowRow = item
    this.messageList.splice(index, 1)
    this.bulletList = this.messageList
    this.$refs.detail.open(this.nowRow.id)
  }

  praseDate(date) {
    if (!date) return ''
    date = date.replace(/-/g, '/')
    const _Date = new Date(date)
    const _time = _Date.getTime()
    const _Start = new Date().setHours(0, 0, 0, 0)
    if (_time - _Start < 24 * 60 * 60 * 1000 && _time - _Start > 0) {
      return parseTime(_Date, 'hh:ii')
    } else {
      const month = _Date.getMonth() + 1
      const day = _Date.getDate()
      return `${month}月${day}日`
    }
  }

  renderRow(item, index) {
    return (
      <div
        onClick={() => {
          this.openDetail(item, index)
        }}
        class="message_box_one">
        <span class="content">{item.title}</span>
        <span class="time">{this.praseDate(item.createTime)}</span>
        <span class="status">
          <i class={item.status == 1 ? 'active' : ''}></i>
          {this.calcStatus(item.status)}
        </span>
      </div>
    )
  }

  getTable() {
    getMsgInbox({
      status: 0,
      pageSize: 9999999,
      pageNum: 1
    }).then(res => {
      if (res && res.content) {
        const list = res.content || []
        this.messageList = list
        this.bulletList = list
      }
    })
  }

  getMsgCount() {
    if (this.showflag) {
      this.getTable()
      return
    }
    getMsgCountStatus().then(res => {
      if (res) {
        this.bulletList = res.sgUnreadMessageVos || []
      }
    })
  }

  clearLoopMsg() {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
  }

  loopMsg() {
    this.clearLoopMsg()
    this.getMsgCount()
    this.interval = setInterval(() => {
      this.getMsgCount()
    }, 10000)
  }

  handleViewMore() {
    this.$emit('viewmore')
    this.$router.push({
      path: '/systemsetting/msginbox'
    })
  }

  protected created() {
    this.loopMsg()
    ;(window as any).eventBus.$on('message_readed', this.handleRead)
  }

  protected beforeDestroy() {
    this.clearLoopMsg()
    ;(window as any).eventBus.$off('message_readed', this.handleRead)
  }

  protected render() {
    return (
      <div class="message_box_container" vClickoutside={this.handleClickOutside}>
        {this.frontmessaegList && this.frontmessaegList.length ? (
          <div class="message_box_inner">
            {this.frontmessaegList.map((item, index) => {
              return this.renderRow(item, index)
            })}
            <div class="more_info" onClick={this.handleViewMore}>
              查看更多消息
            </div>
          </div>
        ) : (
          <div class="noData">抱歉，暂无消息</div>
        )}
      </div>
    )
  }
}
</script>
<style lang="scss" scoped>
.message_box_container {
  width: 374px;
  background: #ffffff;
  padding: 0 16px 0;
  border-radius: 4px;
  box-shadow: 0px 4px 12px 0px rgba(94, 94, 94, 0.16);
  cursor: default;
  .noData {
    height: 86px;
    line-height: 86px;
    text-align: center;
    font-weight: 400;
    color: #999999;
  }
  .more_info {
    text-align: center;
    padding: 16px 0 16px;
    font-size: 14px;
    color: #3786fd;
    cursor: pointer;
  }
  .message_box_one {
    padding: 12px 4px 11px;
    border-bottom: 1px solid#EDEDED;
    font-size: 14px;
    line-height: 22px;
    display: flex;
    color: #333;
    align-items: center;
    .content {
      width: 182px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .time {
      width: 60px;
      margin: 0 12px 0 16px;
    }
    .status {
      i {
        display: inline-block;
        border-radius: 50%;
        vertical-align: middle;
        width: 6px;
        height: 6px;
        background: #ff5b63;
        margin-right: 5px;
        &.active {
          background: #d9d9d9;
        }
      }
    }
  }
}
</style>
