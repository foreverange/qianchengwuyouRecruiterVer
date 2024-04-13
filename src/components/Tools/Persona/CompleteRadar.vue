<template>
  <div>
    <div id="ScoreRadar" :style="{ width: '20rem', height: '13rem' }"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'
import resources from '@/assets/resources'

const myComplete = ref([100, 60, 90, 50, 60, 0, 80, 100])

const completeList = ref([
  { name: '基本信息', max: 100 },
  { name: '期望岗位', max: 100 },
  { name: '教育经历', max: 100 },
  { name: '资格证书', max: 100 },
  { name: '工作/实习经历', max: 100 },
  { name: '项目经历', max: 100 },
  { name: '技能标签', max: 100 }
])

let completeRadar

function drawScoreRadar () {
  completeRadar = echarts.init(document.getElementById('ScoreRadar'))
  const option = {
    tooltip: {
      trigger: 'item'
    },
    color: [resources.themeColor075],
    legend: {
      y: 'bottom',
      data: ['简历完整度'],
      textStyle: {
        fontSize: 10 // 减小图例字体大小
      }
    },
    radar: {
      shape: 'circle',
      indicator: completeList.value,
      name: {
        textStyle: {
          color: resources.greyFontColor,
          fontFamily: 'opposans',
          fontSize: 12 // 减小指示器文字字体大小
        }
      },
      radius: '70%' // 使用百分比定义雷达图半径
    },
    series: [
      {
        name: '综合能力',
        type: 'radar',
        data: [
          {
            value: myComplete.value,
            name: '我的能力',
            areaStyle: {
              color: resources.themeColor01
            }
          }
        ]
      }
    ]
  }
  completeRadar.setOption(option)
}

onMounted(() => {
  drawScoreRadar()
})

watch([myComplete, completeList], () => {
  drawScoreRadar()
})
</script>
