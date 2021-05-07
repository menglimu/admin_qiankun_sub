<script lang="tsx">
import { defineComponent } from '@vue/composition-api'

/** 测试页面 */
export default defineComponent({
  name: 'Demo',
  data() {
    return {
      a: 123
    }
  },
  methods: {
    onClick() {
      this.a++
      console.log(12356)
    }
  },
  render() {
    return <div onClick={this.onClick}>测试页{this.a}</div>
  }
})
</script>
<style lang="scss" scoped></style>
