<script>
import echarts from 'echarts'

export default {
  name: 'Chart',
  props: {
    option: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  mounted() {
    this.initChart()
    this.$watch(
      'option',
      () => {
        this.initChart()
      },
      {
        deep: true
      }
    )
    window.addEventListener('resize', this.resizeChart)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeChart)
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el)
      this.chart.setOption(this.option)
      this.$emit('init', this.chart)
    },
    resizeChart() {
      this.chart.resize()
    }
  },
  render() {
    return <div class="chart"></div>
  },
  data() {
    return {
      chart: null
    }
  }
}
</script>
<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
