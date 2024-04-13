<template>
  <div>
    <div id="majorDistribution" :style="{ width: '20rem', height: '15rem' }"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const majorData = ref([
  { name: '计算机类', value: 33.64 },
  { name: '电子类', value: 24.61 },
  { name: '机械类', value: 23.53 },
  { name: '其他', value: 18.22 }
])

const colorList = [
  '#ee6666',
  '#f4a1ab',
  '#fbd8c3',
  '#8da4f7'
]

const drawMajorDistribution = () => {
  const dom = document.getElementById('majorDistribution')
  const chart = echarts.init(dom)

  const option = {
    title: {
      left: 'center',
      top: 20,
      textStyle: {
        color: colorList[0]
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      bottom: 10,
      left: 'center',
      data: majorData.value.map(item => item.name),
      icon: 'circle'
    },
    series: [
      {
        name: '专业',
        type: 'pie',
        radius: ['20%', '80%'],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        label: {
          color: 'rgba(0, 0, 0, 0.8)'
        },
        labelLine: {
          smooth: 0.2,
          length: 5,
          length2: 10
        },
        data: majorData.value.map((item, index) => ({
          ...item,
          itemStyle: {
            color: colorList[index % colorList.length]
          }
        }))
      }
    ]
  }

  chart.setOption(option)
}

onMounted(drawMajorDistribution)
</script>
