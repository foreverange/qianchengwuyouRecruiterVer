<template>
  <div>
    <div id="eduLevelPieChart" :style="{ width: '20rem', height: '15rem' }"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const eduLevelData = ref([
  { value: 42.9, name: '本科', itemStyle: { color: '#8da4f7' } },
  { value: 16.3, name: '硕士', itemStyle: { color: '#fbd8c3' } },
  { value: 1.4, name: '博士', itemStyle: { color: '#f4a1ab' } },
  { value: 24.3, name: '大专', itemStyle: { color: '#ee6666' } },
  { value: 15.1, name: '其他', itemStyle: { color: '#9bcdff' } }
])

const drawEduLevelPieChart = () => {
  const pieChart = echarts.init(document.getElementById('eduLevelPieChart'))

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {d}%'
    },
    legend: {
      bottom: '0%',
      left: 'center',
      icon: 'circle'
    },
    series: [
      {
        name: '学历水平',
        type: 'pie',
        radius: '70%',
        data: eduLevelData.value,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }

  pieChart.setOption(option)
}

onMounted(() => {
  drawEduLevelPieChart()
})
</script>

<style scoped>
</style>
