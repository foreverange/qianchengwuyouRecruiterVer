<template>
  <div>
    <div id="scoreGauge" :style="{ width: '20rem', height: '15rem' }"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import resources from '@/assets/resources'

const scoreData = ref({
  score: 0.991
})

const drawScoreGauge = () => {
  const scoreGauge = echarts.init(document.getElementById('scoreGauge'))
  const option = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        center: ['45%', '70%'],
        radius: '80%',
        min: 0,
        max: 1,
        splitNumber: 5,
        axisLine: {
          lineStyle: {
            width: 10,
            color: [
              [0.20, '#ee6666'],
              [0.40, '#f4a1ab'],
              [0.60, '#fbd8c3'],
              [0.80, '#8da4f7'],
              [1, resources.themeColor075]
            ]
          }
        },
        pointer: {
          icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
          length: '14%',
          width: 20,
          offsetCenter: [0, '-60%'],
          itemStyle: {
            color: 'inherit'
          }
        },
        axisTick: {
          length: 3,
          lineStyle: {
            color: 'inherit',
            width: 1
          }
        },
        splitLine: {
          length: 5,
          lineStyle: {
            color: 'inherit',
            width: 1
          }
        },
        axisLabel: {
          show: false,
          color: '#464646',
          fontSize: 10,
          distance: -260,
          rotate: 'tangential',
          formatter: function (value) {
            if (value === 0.875) {
              return 'A'
            } else if (value === 0.625) {
              return 'B'
            } else if (value === 0.375) {
              return 'C'
            } else if (value === 0.125) {
              return 'D'
            }
            return ''
          }
        },
        detail: {
          fontSize: 30,
          offsetCenter: [0, '-15%'],
          valueAnimation: true,
          formatter: function (value) {
            return Math.round(value * 100) + '分'
          },
          color: resources.themeColor
        },
        data: [scoreData.value.score]
      }
    ]
  }
  scoreGauge.setOption(option)
}

onMounted(() => {
  drawScoreGauge()
})
</script>

<style>
/* Your styles here */
</style>
