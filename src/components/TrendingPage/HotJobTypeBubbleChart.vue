<template>
  <div>
    <div id="bubbleChart" :style="{ width: '20rem', height: '15rem' }"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const industries = ref(['互联网', '电子', '机械', '医疗', '房地产', '能源', '汽车', '金融'])
const jobCounts = ref([1688, 1235, 1181, 915, 844, 797, 658, 574])

const colorList = [
  '#ee6666',
  '#f4a1ab',
  '#fbd8c3',
  '#8da4f7'
]

const drawBubbleChart = () => {
  const dom = document.getElementById('bubbleChart')
  const bubbleChart = echarts.init(dom)

  const data = industries.value.map((industry, index) => ({
    name: industry,
    value: [index, jobCounts.value[index]]
  }))

  const option = {
    title: {
      left: 'center',
      textStyle: {
        color: colorList[0]
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}'
    },
    xAxis: {
      type: 'category',
      data: industries.value,
      axisLabel: {
        interval: 0,
        formatter: function (value) {
          return value.split('').join('\n')
        },
        textStyle: {
          lineHeight: 14
        }
      },
      axisLine: {
        lineStyle: {
          color: colorList[1]
        }
      }
    },
    yAxis: {
      type: 'value',
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
        type: 'scatter',
        data: data,
        symbolSize: val => val[1] / 10,
        itemStyle: {
          color: colorList[3]
        },
        emphasis: {
          itemStyle: {
            color: colorList[0]
          }
        }
      }
    ],
    grid: {
      top: '10%',
      bottom: '20%',
      left: '10%',
      right: '10%'
    }
  }

  bubbleChart.setOption(option)
}

onMounted(drawBubbleChart)
</script>
