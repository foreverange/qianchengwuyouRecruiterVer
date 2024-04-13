<template>
  <div>
    <div id="ageDistribution" :style="{ width: '20rem', height: '15rem' }"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const ageData = ref({
  item: ['30岁以下', '30-39岁', '40-49岁', '50岁以上'],
  num: [18.5, 27.6, 25.1, 28.8]
})

const drawAgeDistribution = () => {
  const dom = document.getElementById('ageDistribution')
  const ageDistribution = echarts.init(dom)
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
        return params[0].name + ': ' + params[0].value + '%'
      }
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '8%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      data: ageData.value.item,
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: {
        color: '#666'
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
          offset: 0.5, color: '#8da4f7'
        }, {
          offset: 1, color: '#fbd8c3'
        }],
        global: false
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
        data: ageData.value.num,
        z: 10
      }
    ]
  }
  ageDistribution.setOption(option)
}

onMounted(drawAgeDistribution)
</script>
