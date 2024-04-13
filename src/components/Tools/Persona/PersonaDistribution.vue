<template>
  <div>
    <div id="personaDistribution" :style="{ width: '20rem', height: '15rem' }"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import resources from '@/assets/resources'

// Define persona distribution with fixed values
const personaData = ref({
  item: ['沉稳型', '进取型', '细节型', '领导型', '创造型'],
  num: [25, 35, 5, 10, 10]
})

const drawPersonaDistribution = () => {
  const dom = document.getElementById('personaDistribution')
  const personaDistribution = echarts.init(dom)
  const option = {
    textStyle: {
      fontFamily: 'opposans'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'none'
      },
      formatter: function (params) {
        return params[0].name + ': ' + params[0].value
      }
    },
    xAxis: {
      data: personaData.value.item,
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: {
        color: resources.greyFontColor
      }
    },
    yAxis: {
      splitLine: { show: false },
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: { show: false }
    },
    color: [
      {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
          offset: 0.5, color: resources.themeColor // 0% 处的颜色
        }, {
          offset: 1, color: '#f4a1ab' // 100% 处的颜色
        }],
        global: false // 缺省为 false
      }
    ],
    series: [
      {
        name: 'hill',
        type: 'pictorialBar',
        barCategoryGap: '-230%',
        symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
        itemStyle: {
          opacity: 0.75
        },
        emphasis: {
          itemStyle: {
            opacity: 1
          }
        },
        data: personaData.value.num,
        z: 10
      }
    ]
  }
  personaDistribution.setOption(option)
}

onMounted(drawPersonaDistribution)
</script>
