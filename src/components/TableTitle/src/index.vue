<script lang="tsx">
import { Vue, Component, Prop, VModel, Emit } from 'vue-property-decorator'

@Component({
  name: 'TableTitle'
})
export default class TableTitle extends Vue {
  @Prop({ type: String, default: '' }) title!: string
  @Prop({ type: String, default: '输入关键字模糊搜索' }) placeholder!: string
  @VModel({ type: String, default: '' }) searchValue!: string

  @Emit('search')
  onSearch() {
    return this.searchValue
  }

  protected render() {
    return (
      <div class="table-title">
        <span class="title">{this.title}</span>
        <c-input class="c-input" v-model={this.searchValue} size="small" placeholder={this.placeholder}>
          <i class="el-input__icon el-icon-search" slot="suffix" onClick={this.onSearch} />
        </c-input>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
.table-title {
  display: flex;
  justify-content: space-between;
  .title {
    font-size: 16px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    text-align: left;
    color: #333333;
    line-height: 22px;
  }
  .c-input {
    width: 206px;
  }
}
</style>
