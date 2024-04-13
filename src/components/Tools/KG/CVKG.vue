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
import { ref, defineProps, toRefs, watch, onMounted } from 'vue'
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

// 注册ECharts组件
use([GraphChart, TitleComponent, TooltipComponent, LegendComponent, CanvasRenderer])

// 接收父组件props
const props = defineProps({
  selectedCVData: {
    type: Object,
    required: true
  }
})

const { selectedCVData } = toRefs(props)

// ECharts实例引用
const echartsRef = ref(null)

// 创建节点和边的响应式数据
const nodes = ref([])
const links = ref([])
const centerNode = ref('')

// 定义watch观察selectedCVData的变化，并更新图表数据和配置
watch(selectedCVData, (newValue) => {
  // 更新中心点名称
  centerNode.value = newValue.CVName.toString()
  // 更新节点和边数据
  nodes.value = [...newValue.KG.nodes]
  links.value = [...newValue.KG.links]
  // 调用图表更新函数
  updateChartOption()
}, { deep: true })

// 更新图表配置的函数
function updateChartOption () {
  if (echartsRef.value) {
    // 使用nodes.value.slice()来获得非响应式的数组副本
    echartsRef.value.setOption({
      title: {
        // text: '简历知识图谱'
      },
      legend: {
        top: '90%', // 图例底部居中
        left: 'center',
        icon: 'circle', // 圆形图例
        data: [centerNode.value, '期望', '教育', '证书', '经历', '项目', '技能']
      },
      textStyle: {
        fontFamily: 'opposans' // 全局字体样式
      },
      tooltip: {
        formatter: function (x) {
          return x.data.description // 悬浮框显示内容
        }
      },
      series: [{
        type: 'graph',
        layout: 'force',
        force: {
          repulsion: 300, // 增加将会拉长线
          gravity: 0.1,
          edgeLength: [10, 20]
        },
        animation: false,
        label: {
          show: true,
          position: 'right'
        },
        edgeLabel: {
          fontSize: 8,
          normal: {
            show: true,
            formatter: (params) => params.data.score
          }
        },
        draggable: true,
        roam: true,
        scaleLimit: {
          min: 0.1,
          max: 2
        },
        data: nodes.value.slice(), // 获取副本，避免引用响应式数据
        links: links.value.slice(), // 获取副本
        categories: [
          { name: centerNode.value, itemStyle: { color: getRadialGradient('#a9adf9', resources.themeColor), borderWidth: 1, borderColor: resources.themeColor } },
          { name: '期望', itemStyle: { color: getLinearGradient('#ee6666', '#fbd8c3') } },
          { name: '教育', itemStyle: { color: getLinearGradient('#fec27d', '#f8d6ce') } },
          { name: '证书', itemStyle: { color: getLinearGradient('#92abf0', '#b1e9f7') } },
          { name: '经历', itemStyle: { color: getLinearGradient('#64b8b8', '#cdf0b0') } },
          { name: '项目', itemStyle: { color: getLinearGradient('#7fc984', '#f6fbbb') } },
          { name: '技能', itemStyle: { color: getLinearGradient('#92a2e9', '#c1e1f1') } },
          { name: '经验', itemStyle: { color: getLinearGradient('#9adffa', '#aab6e1') } }
        ]
      }]
    })
  }
}
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
// 组件挂载时执行图表初始化，watch无法做到
onMounted(() => {
  // 设置初始中心节点名称和节点、链路数据
  centerNode.value = selectedCVData.value.CVName.toString()
  nodes.value = selectedCVData.value.KG.nodes
  links.value = selectedCVData.value.KG.links
  updateChartOption() // 使用初始数据更新图表

  // 更新图表大小以匹配容器
  if (echartsRef.value) {
    echartsRef.value.resize()
  }
})
</script>

<style scoped>
.relation-graph {
  height: 30rem;
  width: 100%;
}
</style>
