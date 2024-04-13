<template>
  <div>
    <div id="hotCityBarChart" :style="{ width: '20rem', height: '15rem' }"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const hotCityData = ref([
  { value: 11.13, name: '上海' },
  { value: 9.00, name: '北京' },
  { value: 6.93, name: '深圳' },
  { value: 5.27, name: '广州' },
  { value: 4.50, name: '杭州' },
  { value: 3.89, name: '成都' }
])

const drawHotCityBarChart = () => {
  const barChart = echarts.init(document.getElementById('hotCityBarChart'))

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: (params) => {
        return params[0].name + '招聘数量占比： ' + (params[0].value).toFixed(2) + '%'
      }
    },
    grid: {
      left: '5%',
      right: '4%',
      bottom: '8%',
      top: '8%',
      containLabel: true
    },
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category',
      data: hotCityData.value.map(item => item.name)
    },
    series: [{
      name: '招聘数量占比',
      type: 'bar',
      data: hotCityData.value.map(item => item.value),
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: 'rgba(141,164,247,0.6)' },
          { offset: 1, color: '#8da4f7' }
        ]),
        borderRadius: [0, 10, 10, 0]
      }
    }]
  }

  barChart.setOption(option)
}

onMounted(() => {
  drawHotCityBarChart()
})
</script>

<style scoped>
/* Your styles here */
</style>
