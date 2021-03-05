<!--
 * @Author: wenlin
 * @Date: 2020-11-23 16:13:06
 * @LastEditors: wenlin
 * @LastEditTime: 2020-12-09 17:17:07
 * @Description:  人员选择输入框
-->
<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'
import PersonSelect from '@/components/PersonSelect'
import PersonSelectSingle from '@/components/PersonSelect/src/single.vue'

@Component({
  components: { PersonSelect, PersonSelectSingle }
})
export default class PersonSelectInput extends Vue {
  @Prop({ type: Array, default: () => [] }) value: any[]
  @Prop({ type: Boolean, default: false }) isSingle: boolean
  $refs: {
    personSelect: any
  }

  get choosedUsers() {
    return this.value || []
  }

  get names() {
    return this.choosedUsers.map(item => item.userName).join('、')
  }

  onChoose() {
    this.$refs.personSelect.open([], this.choosedUsers)
  }
  onChoosedUsers(data) {
    this.$emit('input', data)
    this.$nextTick(() => {
      // const e = document.createEvent('blur')
      // e.initEvent('blur')
      // this.$el.dispatchEvent(e)
      try {
        const parent = this.$parent as any
        parent.elForm.validateField(parent.prop)
      } catch (error) {
        console.error(error)
      }
    })

    // this.choosedUsers = data
  }
  protected render() {
    const pSelect = this.isSingle ? 'personSelectSingle' : 'personSelect'
    return (
      <div>
        <c-input
          {...{ attrs: this.$attrs, props: { ...this.$props, ...this.$attrs, value: this.names } }}
          placeholder="请选择人员"
          nativeOn-click={this.onChoose}></c-input>
        <pSelect isSingle={this.isSingle} ref="personSelect" on-selected={this.onChoosedUsers} />
      </div>
    )
  }
}
</script>
<style lang="scss" scoped></style>
