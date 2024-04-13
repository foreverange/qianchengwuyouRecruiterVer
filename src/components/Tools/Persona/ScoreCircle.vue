<template>
  <div id="scoreCircle" :style="{ width: '15rem', height: '15rem' }"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import * as echarts from 'echarts'
import resources from '@/assets/resources'

const scoreList = [
  { value: 30, name: '作业' }, // 假设值
  { value: 10, name: '签到' }, // 假设值
  { value: 35, name: '考试' }, // 假设值
  { value: 15, name: '讨论' }, // 假设值
  { value: 5, name: '任务点' }, // 假设值
  { value: 5, name: '未获得' } // 计算得出
]

const drawScoreCircle = () => {
  const scoreCircle = echarts.init(document.getElementById('scoreCircle'))
  const option = {
    tooltip: {
      trigger: 'item'
    },
    color: [resources.themeColor075, '#8f9cf3', '#fbd8c3', '#f4a1ab', '#e08c89', '#8da4f7'],
    series: [
      {
        name: '综合成绩',
        type: 'pie',
        radius: ['55%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 0,
          borderColor: '#fff',
          borderWidth: 0
        },
        label: {
          show: false,
          color: '#404042',
          fontSize: 16,
          position: 'center'
        },
        emphasis: {
          label: {
            show: false,
            fontSize: 16,
            fontWeight: 'normal'
          }
        },
        labelLine: {
          show: false
        },
        data: scoreList
      }
    ]
  }
  scoreCircle.setOption(option)
}

onMounted(() => {
  drawScoreCircle()
})
</script>

<style scoped>

</style>
