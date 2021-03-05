<template>
  <c-list :data-source="listData">
    <c-list-item slot="renderItem" slot-scope="item" @click="handleClick(item)">
      <div class="msg-list-item">
        <div>
          <i class="el-icon-tickets" />
          <span class="msg-red">[{{ item['gradeName'] }}]</span>
          <span>{{ item['messageTitle'] }}</span>
        </div>
        <div>
          <span>{{ item['sendTime'] }}</span>
          <span class="msg-right msg-red">{{ readType }}</span>
        </div>
      </div>
    </c-list-item>
  </c-list>
</template>

<script>
import CList from '@/components/List'

export default {
  name: 'MessageList',
  components: {
    CList,
    CListItem: CList.Item
  },
  props: {
    listData: {
      type: Array,
      default: () => []
    },
    readType: {
      type: String,
      default: '未读'
    }
  },
  methods: {
    handleClick(item) {
      this.$emit('click', item)
    }
  }
}
</script>
<style lang="scss">
.msg-list-item {
  :first-child {
    margin-bottom: 5px;
    cursor: pointer;
  }
  div {
    width: 270px;
    padding-right: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    i,
    span {
      margin: 5px;
    }
  }
}
.msg-right {
  float: right;
}
.msg-red {
  color: red;
}
</style>
