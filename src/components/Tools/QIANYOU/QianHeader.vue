<template>
  <div class="CV-header" v-if="selectedCVData">
    <div class="CV-score-bar">
      <a-button @click="handleChangePersonaVisibleClick" style="padding:unset;margin-left: auto;font-size: 1.5rem;margin-bottom: 0.5rem"
                type="text" class="text-button-style"><RadarChartOutlined /></a-button>
      <a-button @click="handleChangeKGVisibleClick" style="font-size: 1.5rem;margin-bottom: 0.5rem;padding:unset;margin-left: 0.5rem"
                type="text" class="text-button-style"><DeploymentUnitOutlined /></a-button>
    </div>
    <div v-if="isKGVisible" class="CV-KG" >
      <CVKG :selectedCVData="selectedCVData" />
    </div>
    <div v-if="isPersonaVisible" class="CV-Persona" >
      <div style="display:flex;flex-direction: row;">
        <div class="CV-Persona-header-text ver-bar-3" >简历得分</div>
        <div class="CV-Persona-header-text ver-bar-3" >简历完整度</div>
      </div>
      <div style="display:flex;flex-direction: row;">
        <ScoreGauge style="margin-top: -1rem"/>
        <CompleteRadar style="margin-left: 1rem"/>
      </div>
      <div style="display:flex;flex-direction: row;margin-top:-2rem !important;">
        <div class="CV-Persona-header-text ver-bar-3">能力分析</div>
        <div class="CV-Persona-header-text ver-bar-3">性格成分</div>
      </div>
      <div style="display:flex;flex-direction: row;margin-top:1rem">
        <!--        <ScoreCircle />-->
        <CapacityBar />
        <PersonaDistribution style="margin-left: 1rem"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, toRefs } from 'vue'
import { DeploymentUnitOutlined, RadarChartOutlined } from '@ant-design/icons-vue'
import CVKG from '@/components/Tools/QIANYOU/QianJobKG.vue'
import CapacityBar from '@/components/Tools/Persona/CapacityBar.vue'
import PersonaDistribution from '@/components/Tools/Persona/PersonaDistribution.vue'
import ScoreGauge from '@/components/Tools/Persona/ScoreGauge.vue'
import CompleteRadar from '@/components/Tools/Persona/CompleteRadar.vue'
// 父组件传值
const props = defineProps({
  selectedCVData: {
    type: Object,
    required: true,
    default: () => ({
      CVName: '',
      score: '',
      completeness: ''
    })
  },
  addNewCV: {
    type: Function
  }
})
const { selectedCVData } = toRefs(props)
// 简历的得分和完整度
// 点按icon，是否展开简历图谱
const isKGVisible = ref(false)
const handleChangeKGVisibleClick = () => {
  isKGVisible.value = !isKGVisible.value
  console.log('CV：展开知识图谱状态改变：' + isKGVisible.value)
}
// 点按icon展开persona
const isPersonaVisible = ref(false)
const handleChangePersonaVisibleClick = () => {
  isPersonaVisible.value = !isPersonaVisible.value
  console.log('CV：展开Persona状态改变：' + isPersonaVisible.value)
}

</script>

<style scoped>
.CV-header {
  position: relative;
  box-shadow: 0 5px 5px 0 rgba(176,191,231,.4);
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 0.7rem;
  background: white;
}

.text-button-style{
  color: var(--themeColor);
}
:deep(.ant-btn-text:not(:disabled):hover){
  color: var(--themeColor075);
}
.CV-score-bar {
  margin-top: 10px;
  height: 2.9rem;
  border-radius: 1rem;
  width: 100%;
  background-image: url('https://s21.ax1x.com/2024/03/20/pFWjQf0.png');
  background-size:100%;
  display: flex;
  align-items: center;
}

.CV-KG {
  margin-top: 0.5rem;
  border: var(--themeLightBlue) 2px solid;
  height: 30rem;
  width: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
}
.CV-Persona {
  margin-top: 0.5rem;
  border: var(--themeLightBlue) 2px solid;
  height: 30rem;
  width: 100%;
  display: flex;
  flex-direction: column;
}

:deep(.ant-input){
  border-radius: 0.8rem;
  border-color: white;
  box-shadow: 0 5px 5px 0 rgba(176,191,231,.25);
  background: rgba(255, 255, 255);
  border-width: 0.08rem;
  width: 10rem;
}
:deep(.ant-input:hover){
  box-shadow: 0 5px 10px 0 rgba(176,191,231,.5);
}
.CV-Persona-header-text{
  z-index: 2;
  margin-top: 0.5rem;
  margin-left: 0.7rem;
  margin-right: 15rem;
  color:var(--greyFontColor);
}
</style>
