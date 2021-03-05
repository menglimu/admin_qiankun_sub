<template>
  <c-dialog class="ml-dialog" :visible.sync="dialogVisible" width="568px" title="消息详情">
    <div class="msg_detail_mask_inner">
      <div class="msg_header">
        <div class="left">
          <img src="@/assets/user_defaultavatar.png" alt="" />
          {{ this.rowDetail.typeName }}
        </div>
        <div class="right">
          {{ this.rowDetail.createTime }}
        </div>
      </div>
      <div class="content">
        <p><span>来自:</span>{{ this.rowDetail.fromUserName }}</p>
        <p><span>标题:</span>{{ title }}</p>
        <p><span>时间:</span>{{ this.rowDetail.planTime }}<i></i><span>地点:</span>{{ this.rowDetail.planAddress }}</p>
      </div>
      <div class="comment">{{ this.rowDetail.content }}</div>
    </div>
    <span slot="footer" class="dialog-footer">
      <c-button size="small" type="primary" @click="dialogVisible = false">知道了</c-button>
    </span>
  </c-dialog>
</template>

<script>
import { getMsgInDetail } from '@/api/modules/public'
export default {
  props: ['row'],
  data() {
    return {
      dialogVisible: false,
      rowDetail: {}
    }
  },
  computed: {
    title() {
      if (this.rowDetail.dataType === 'email') {
        return `您有新的公告:${this.rowDetail.title}`
      } else {
        return this.rowDetail.title
      }
    }
  },
  methods: {
    getDetail() {
      getMsgInDetail(this.row.id).then(res => {
        if (res) {
          this.rowDetail = res
          window.eventBus.$emit('ViewMsgDetail')
        }
      })
    },
    open() {
      this.getDetail()
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss">
.msg_detail_mask_inner {
  padding: 0px 26px 0;
  .msg_header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    .left {
      img {
        width: 36px;
        height: 36px;
        display: inline-block;
        vertical-align: top;
        margin-right: 16px;
      }
      line-height: 36px;
      color: #333333;
    }
    .right {
      line-height: 36px;
      color: #c0c0c0;
    }
  }
  .content {
    color: #333333;
    > p {
      margin-bottom: 8px;
    }
    span {
      margin-right: 5px;
    }
    i {
      margin-right: 12px;
    }
  }
  .comment {
    width: 100%;
    height: 74px;
    border: 1px solid #d9d9d9;
    padding: 8px 16px;
    overflow: auto;
    color: #333333;
  }
}
</style>

<style lang="scss" scoped></style>
