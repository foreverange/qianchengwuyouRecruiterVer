<template>
  <div>
    <div id="diskUsage" :style="{ width: '20rem', height: '15rem' }"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const diskData = ref([
  { name: '阿里巴巴', value: 150 },
  { name: '华为', value: 130 },
  { name: '网易', value: 120 },
  { name: '快手', value: 100 },
  { name: '滴滴', value: 90 },
  { name: '天猫', value: 80 },
  { name: '饿了么', value: 70 },
  { name: '京东', value: 60 },
  { name: '腾讯', value: 50 },
  { name: '阿里健康', value: 40 }
])

const colorList = [
  '#ee6666',
  '#f4a1ab',
  '#fbd8c3',
  '#8da4f7',
  '#9bcdff'
]

const drawDiskUsage = () => {
  const dom = document.getElementById('diskUsage')
  const diskUsage = echarts.init(dom)

  const option = {
    textStyle: {
      fontFamily: 'opposans'
    },
    tooltip: {
      trigger: 'item'
    },

    series: [
      {
        name: '互联网',
        type: 'treemap',
        visibleMin: 300,
        label: {
          show: true,
          formatter: '{b}'
        },
        levels: [
          {
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 3,
              gapWidth: 3
            }
          },
          {
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1,
              gapWidth: 1
            }
          }
        ],
        data: diskData.value.map((item, index) => ({
          ...item,
          itemStyle: {
            color: colorList[index % colorList.length]
          }
        }))
      }
    ]
  }

  diskUsage.setOption(option)
}

onMounted(drawDiskUsage)
</script>
