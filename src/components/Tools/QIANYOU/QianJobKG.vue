<template>
  <v-chart
    ref="echartsRef"
    class="relation-graph"
    :option="chartOption"
    :autoresize="true"
  ></v-chart>
</template>

<script setup>
import resources from '@/assets/resources'
import { ref, defineProps, toRefs, watch, onMounted, computed } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { GraphChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import * as echarts from 'echarts'

// 更新函数
function updateChartData (cvData, cardData) {
  if (cvData) {
    centerNode.value = `CV_${cvData.CVName}`
    console.log(cvData)
    nodes.value = cvData.nodes
    links.value = cvData.links
    nodes.value.forEach((node) => {
      if (node.id === 100) {
        node.fixed = true // 设置固定属性为true
        node.x = echartsRef.value.getWidth() / 1.15
        node.y = echartsRef.value.getHeight() / 2.6
      }
    })
  }
  if (cardData) {
    centerNode2.value = `Card_${cardData.title}`
    nodes2.value = cardData.nodes
    links2.value = cardData.links
    nodes2.value.forEach((node) => {
      if (node.id === 1) {
        node.fixed = true // 设置固定属性为true
        node.x = echartsRef.value.getWidth() / 10
        node.y = echartsRef.value.getHeight() / 2.6
      }
    })
  }
}

// 注册ECharts组件
use([GraphChart, TitleComponent, TooltipComponent, LegendComponent, CanvasRenderer])

// 接收父组件props
const props = defineProps({
  selectedCVData: {
    type: Object,
    required: true
  },
  selectedCardData: {
    type: Object,
    required: true
  }
})

const { selectedCVData, selectedCardData } = toRefs(props)

// ECharts实例引用
const echartsRef = ref(null)

// 创建节点和边的响应式数据
const nodes = ref([])
const links = ref([])
const nodes2 = ref([])
const links2 = ref([])
const centerNode = ref('')
const centerNode2 = ref('')

// 定义watch观察selectedCVData的变化,并更新图表数据和配置
watch(selectedCardData, (newValue) => {
  updateChartData(selectedCVData.value, newValue)
}, { deep: true })
watch(selectedCVData, (newValue) => {
  updateChartData(newValue, selectedCardData.value)
}, { deep: true })

// 更新图表配置的函数(换计算属性保证更新)
const chartOption = computed(() => {
  return {
    title: {
      // text: '简历知识图谱'
    },
    legend: {
      top: '90%', // 图例底部居中
      left: 'center',
      icon: 'circle', // 圆形图例
      data: ['期望', '教育', '证书', '经历', '项目', '技能', '经验']
    },
    textStyle: {
      fontFamily: 'opposans' // 全局字体样式
    },
    tooltip: {
      formatter: function (params) {
        // 检查name是否存在,如果不存在则返回空字符串
        if (params.data.name) {
          return `${params.data.name} ${params.data.description || ''}`
        }
        return ''
      }
    },
    series: [{
      type: 'graph',
      layout: 'force',
      force: {
        repulsion: 180, // 增加将会拉长线
        gravity: 0.1,
        edgeLength: [10, 10]
        // layoutAnimation: false // 拖动后不会变回去
      },
      animation: false,
      label: {
        show: true,
        position: 'right',
        formatter: function (params) {
          // 检查name是否存在,如果不存在则返回空字符串
          if (params.data.name) {
            return params.data.name
          }
          return ''
        }
      },
      edgeLabel: {
        fontSize: 8
        // fontSize: 8,
        // normal: {
        //   show: true,
        //   formatter: (params) => params.data.score
        // }
      },
      draggable: true,
      roam: true,
      scaleLimit: {
        min: 0.1,
        max: 2
      },
      data: nodes.value.slice().concat(nodes2.value.slice()), // 获取副本，避免引用响应式数据
      links: links.value.slice().concat(links2.value.slice()), // 获取副本
      categories: [
        {
          name: centerNode.value,
          itemStyle: {
            color: getRadialGradient('#a9adf9', resources.themeColor),
            borderWidth: 1,
            borderColor: resources.themeColor
          }
        },
        { name: '期望', itemStyle: { color: getLinearGradient('#ee6666', '#fbd8c3') } },
        { name: '教育', itemStyle: { color: getLinearGradient('#fec27d', '#f8d6ce') } },
        { name: '证书', itemStyle: { color: getLinearGradient('#92abf0', '#b1e9f7') } },
        { name: '经历', itemStyle: { color: getLinearGradient('#64b8b8', '#cdf0b0') } },
        { name: '项目', itemStyle: { color: getLinearGradient('#7fc984', '#f6fbbb') } },
        { name: '技能', itemStyle: { color: getLinearGradient('#92a2e9', '#c1e1f1') } },
        { name: '经验', itemStyle: { color: getLinearGradient('#65b2c7', '#c0edfd') } },
        {
          name: centerNode2.value,
          itemStyle: {
            color: getRadialGradient('rgba(233,153,197,0.5)', resources.subThemeColor),
            borderWidth: 1,
            borderColor: resources.subThemeColor
          }
        }
      ]
    }]
  }
})

// 线性渐变函数
function getLinearGradient (color1, color2) {
  return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
    { offset: 0, color: color1 },
    { offset: 1, color: color2 }
  ])
}

// 辐射渐变
function getRadialGradient (color1, color2) {
  return new echarts.graphic.RadialGradient(0.5, 0.5, 1.0, [
    {
      offset: 0,
      color: color1
    },
    {
      offset: 1,
      color: color2
    }
  ])
}

// 组件挂载时执行图表初始化,watch无法做到
onMounted(() => {
  // console.log(selectedCVData.value, selectedCardData.value)
  updateChartData(selectedCVData.value, selectedCardData.value)
})
</script>

<style scoped>
.relation-graph {
  height: 23rem;
  width: 100%;
}
</style>
