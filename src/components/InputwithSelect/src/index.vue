<script>
export default {
  props: {
    value: { default: '' },
    options: {
      type: Array,
      default: () => []
    },
    placeholder: {
      default: '请选择'
    },
    textareaplaceholder: {
      default: ''
    }
  },
  data() {
    return {
      selectVal: '',
      inputval: ''
    }
  },
  watch: {
    value: {
      handler(val) {
        this.inputval = val
      },
      immediate: true
    }
  },
  methods: {
    changeVal(val) {
      this.$emit('input', val)
    },
    handleSelectChange(val) {
      const finded = this.options.find(item => {
        return item.value === val
      })
      if (finded) {
        this.inputval = finded.label
        this.$emit('input', this.inputval)
      }
      this.selectVal = ''
    }
  },
  render() {
    return (
      <div class="inputwith_select">
        <el-select
          popperClass={'el-select_popper'}
          onChange={this.handleSelectChange}
          v-model={this.selectVal}
          placeholder={this.placeholder}>
          {this.options.map(item => {
            return <el-option key={item.value} label={item.label} value={item.value}></el-option>
          })}
        </el-select>
        <el-input
          onChange={this.changeVal}
          type="textarea"
          resize="none"
          placeholder={this.textareaplaceholder}
          v-model={this.inputval}></el-input>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
.inputwith_select {
  width: 100%;
}
</style>
