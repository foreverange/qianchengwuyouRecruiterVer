<template>
  <div>
    <div id="CapacityBar" :style="{ width: '20rem', height: '13rem'}"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'
import resources from '@/assets/resources'

const capacityName = ref([
  '解决问题能力',
  '团队合作能力',
  '跨文化能力', // 语言
  '学习能力', // 教育
  '工作能力', // 几个项目
  '管理能力'
])

const capacityRate = ref([
  12,
  19,
  25,
  35,
  -43,
  6
])

let CapacityBar

function drawCapacityBar () {
  CapacityBar = echarts.init(document.getElementById('CapacityBar'))
  const option = {
    textStyle: {
      fontFamily: 'opposans'
    },
    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
      { offset: 0.2, color: resources.themeColor },
      { offset: 0.5, color: resources.themeColor075 },
      { offset: 0.8, color: resources.themeColor075 }
    ]),
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      top: 20,
      bottom: 20
    },
    xAxis: {
      type: 'value',
      position: 'top',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      },
      min: -60,
      max: 60
    },
    yAxis: {
      type: 'category',
      axisLine: { show: false },
      axisLabel: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
      data: capacityName.value
    },
    series: [
      {
        name: '相比同类求职者',
        type: 'bar',
        stack: 'Total',
        barCategoryGap: '20%', // 条与条之间的间隔大小
        label: {
          show: true,
          formatter: '{b}',
          textStyle: {
            fontSize: 12,
            textBorderWidth: 2
          }
        },
        data: capacityRate.value.map(rate => ({
          value: rate,
          label: {
            textStyle: {
              color: '#ffffff',
              textBorderWidth: 2,
              textBorderColor: '#081c41',
              fontWeight: 'bold'
            }
          }
        })),
        itemStyle: {
          normal: {
            barBorderRadius: [15, 5, 15, 5]
          }
        }
      }
    ]
  }
  CapacityBar.setOption(option)
}
onMounted(() => {
  drawCapacityBar()
})

watch([capacityName, capacityRate], () => {
  drawCapacityBar()
})
</script>
