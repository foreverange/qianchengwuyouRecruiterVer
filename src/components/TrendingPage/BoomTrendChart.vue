<template>
  <div>
    <div id="trendChart" :style="{ width: '20rem', height: '15rem' }"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const years = ref(['2019', '2020', '2021', '2022', '2023'])
const trendData = ref([83, 87, 91, 108, 116])

const colorList = [
  '#ee6666',
  '#f4a1ab',
  '#fbd8c3',
  '#8da4f7'
]

const drawTrendChart = () => {
  const dom = document.getElementById('trendChart')
  const trendChart = echarts.init(dom)

  const option = {
    title: {
      left: 'center',
      textStyle: {
        color: colorList[0]
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: years.value,
      axisLine: {
        lineStyle: {
          color: colorList[1]
        }
      }
    },
    yAxis: {
      type: 'value',
      min: 80,
      max: 130,
      axisLine: {
        lineStyle: {
          color: colorList[1]
        }
      },
      splitLine: {
        lineStyle: {
          color: colorList[2]
        }
      }
    },
    series: [
      {
        data: trendData.value,
        type: 'line',
        smooth: true,
        lineStyle: {
          color: colorList[0],
          width: 3
        },
        itemStyle: {
          color: colorList[3]
        }
      }
    ]
  }

  const mediaOption = {
    media: [
      {
        query: {
          minWidth: 0,
          maxWidth: 20 * 16, // 20rem = 20 * 16px
          minHeight: 0,
          maxHeight: 20 * 16 // 20rem = 20 * 16px
        },
        option: {
          grid: {
            top: '15%',
            bottom: '15%',
            left: '15%',
            right: '15%'
          }
        }
      }
    ]
  }

  trendChart.setOption(option)
  trendChart.setOption(mediaOption)
}

onMounted(drawTrendChart)
</script>
