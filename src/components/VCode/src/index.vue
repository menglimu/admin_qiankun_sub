<!--
 * @Author: wenlin
 * @Date: 2020-12-07 15:03:59
 * @LastEditors: wenlin
 * @LastEditTime: 2020-12-07 15:12:12
 * @Description:  验证码组件
-->
<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class VerifyCode extends Vue {
  protected render() {
    return (
      <div class="verify-code">
        <c-input attrs={this.$attrs} placeholder="请输入手机中收到的6位短信验证码" />
        <c-button class="verify-code-btn" attrs={this.$attrs} type="primary" size="small">
          发送验证码
        </c-button>
      </div>
    )
  }
}
</script>
<style lang="scss" scoped>
.verify-code {
  display: flex;
  &-btn {
    width: 102px;
    margin-left: 16px;
  }
}
</style>
