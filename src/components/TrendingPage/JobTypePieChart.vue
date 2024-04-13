<template>
  <div>
    <div id="jobTypePieChart" :style="{ width: '20rem', height: '15rem' }"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const jobTypeData = ref([
  { value: 1048, name: '技术', itemStyle: { color: '#8da4f7' } },
  { value: 735, name: '产品', itemStyle: { color: '#fbd8c3' } },
  { value: 580, name: '运营', itemStyle: { color: '#f4a1ab' } },
  { value: 484, name: '设计', itemStyle: { color: '#ee6666' } },
  { value: 300, name: '市场', itemStyle: { color: '#5470c6' } }
])

const drawJobTypePieChart = () => {
  const pieChart = echarts.init(document.getElementById('jobTypePieChart'))

  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      bottom: '0%',
      left: 'center',
      icon: 'circle'
    },
    series: [{
      name: '岗位类型',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 20,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: jobTypeData.value
    }]
  }

  pieChart.setOption(option)
}

onMounted(() => {
  drawJobTypePieChart()
})
</script>

<style scoped>
</style>
