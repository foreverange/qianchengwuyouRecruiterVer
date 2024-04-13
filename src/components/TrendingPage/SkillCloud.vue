<template>
  <div>
    <div id="skillCloud" :style="{ width: '20rem', height: '15rem' }"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import 'echarts-wordcloud'

const skillData = ref([
  { name: 'Java', value: 41 },
  { name: 'Python', value: 27 },
  { name: 'C++', value: 21 },
  { name: 'C', value: 18 },
  { name: 'JavaScript', value: 17 },
  { name: 'HTML', value: 11 },
  { name: 'CSS', value: 11 },
  { name: 'C#', value: 9 },
  { name: 'SQL', value: 7 },
  { name: 'Bash', value: 6 },
  { name: 'Shell', value: 6 },
  { name: 'PowerShell', value: 6 },
  { name: 'Go', value: 3 },
  { name: 'Ruby', value: 1 }
])

const colorList = [
  '#ee6666',
  '#f4a1ab',
  '#fbd8c3',
  '#8da4f7',
  '#9bcdff'
]

const drawSkillCloud = () => {
  const dom = document.getElementById('skillCloud')
  const skillChart = echarts.init(dom)

  const option = {
    textStyle: {
      fontFamily: 'opposans'
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        type: 'wordCloud',
        shape: 'circle',
        left: 'center',
        top: 'center',
        width: '100%',
        height: '100%',
        right: null,
        bottom: null,
        sizeRange: [12, 60],
        rotationRange: [0, 0],
        rotationStep: 45,
        gridSize: 12,
        drawOutOfBound: false,
        textStyle: {
          fontFamily: 'opposans',
          fontWeight: 'bold',
          emphasis: {
            shadowBlur: 10,
            shadowColor: '#333'
          }
        },
        data: skillData.value.map(item => {
          return {
            ...item,
            textStyle: {
              color: colorList[Math.floor(Math.random() * colorList.length)]
            }
          }
        })
      }
    ]
  }

  skillChart.setOption(option)
}

onMounted(drawSkillCloud)
</script>
