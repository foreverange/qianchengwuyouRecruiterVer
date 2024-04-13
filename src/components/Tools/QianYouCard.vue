<template>
  <div class="qianyou-card card-detail-style">
    <!-- 头像部分 -->
    <div class="qianyou-avatar">
      <img :src="qianyou.avatar" alt="Avatar">
    </div>
    <!-- 详细信息部分 -->
    <div class="qianyou-details">
      <div style="display: flex;flex-direction: row">
        <div class="qianyou-name">{{ qianyou.name }}</div>
        <div class="qianyou-state">{{ qianyou.state }}</div>
      </div>
      <!-- 年龄、学历、状态（在校/在职--寻找工作/实习） -->
      <div class="qianyou-info">
        <div>{{ qianyou.age }}岁</div>
        <div class="split-line"></div>
        <div>{{ qianyou.education }}</div>
        <div class="split-line"></div>
        <div>{{ qianyou.educationDetails.university }} · {{ qianyou.educationDetails.major }}</div>
      </div>
      <!-- 期望工作部分 -->
      <div class="qianyou-expection">
        <StarFilled style="font-size: 0.9rem;color: var(--greyFontColor03)"/>
        <div class="qianyou-expection-header" style="margin-left: 0.5rem">期望： </div>
        <div class="qianyou-expection-text">{{ qianyou.location }} · {{ qianyou.position }}</div>
        <PayCircleFilled style="font-size: 0.9rem;color: var(--greyFontColor03);margin-left: 0.8rem"/>
        <div class="qianyou-expection-header" style="margin-left: 0.5rem">薪资： </div>
        <div class="qianyou-expection-text"> {{ qianyou.salary }}</div>

      </div>
      <!-- 专业技能部分 -->
      <div class="qianyou-skills">
        <div class="job-tags">
          <a-tag
            :bordered="false"
            v-for="tag in qianyou.tags"
            :key="tag"
            class="tags-style"
          >{{ tag }}</a-tag
          >
        </div>
      </div>
    </div>
    <!-- 经历部分 -->
    <div class="qianyou-experience">
      <div style="display: flex;flex-direction: row;">
        <ScheduleFilled style="margin-top:-0.4rem;font-size: 0.9rem;color: var(--greyFontColor03)"/>
        <div class="qianyou-expection-header" style="margin-left: 0.5rem;margin-bottom: 0.3rem">项目经历：</div>
      </div>
      <div style="margin-top:-0.2rem">
        <div class="qianyou-project-text">
            {{ qianyou.project.description?qianyou.project.description:"无" }}
        </div>
      </div>
      <div style="display: flex;flex-direction: row;margin-top:0.5rem">
        <ReconciliationFilled style="margin-top:-0.4rem;font-size: 0.9rem;color: var(--greyFontColor03)"/>
        <div class="qianyou-expection-header" style="margin-left: 0.5rem;margin-bottom: 0.3rem">实习经历：</div>
      </div>
      <div style="margin-top:-0.2rem">
        <div class="qianyou-project-text">
          {{ qianyou.internship.description?qianyou.internship.description:"无" }}
        </div>
      </div>
    </div>
    <!-- 新模块 -->
    <div style="display: flex;flex-direction: column;">
      <div class="qianyou-new-module">
        <a-button @click="handleChangePersonaVisibleClick" style="padding:unset;margin-left: auto;font-size: 1.5rem;margin-bottom: 1rem"
                  type="text" class="text-button-style"><RadarChartOutlined /></a-button>
        <a-button @click="handleChangeKGVisibleClick" style="font-size: 1.5rem;padding:unset;margin-left: 0.3rem;margin-bottom: 1rem"
                  type="text" class="text-button-style"><DeploymentUnitOutlined /></a-button>
        <a-button
          v-if="qianyou.status === '请求简历'"
          type="text"
          class="button-style submit-button-style"
          :class="{ 'submit-button-style-active': state.isSubmitted }"
          @click="handleSubmit"
        >
          <template #icon><SendOutlined /></template>
          {{ submitButtonText }}
        </a-button>
        <a-button
          v-else-if="qianyou.status === '静候佳音'"
          type="text"
          class="button-style submit-button-style"
          @click="handleWaiting"
        >
          <template #icon><HistoryOutlined /></template>
          静候佳音
        </a-button>
        <a-button
          v-if="qianyou.status === '待处理'"
          type="text"
          class="button-style submit-button-style"
          @click="handleAccept"
        >
          <template #icon><CheckOutlined /></template>
          接受
        </a-button>
        <a-button
          v-if="qianyou.status === '待处理'"
          type="text"
          class="button-style submit-button-style"
          @click="handleReject"
        >
          <template #icon><CloseOutlined /></template>
          拒绝
        </a-button>
        <a-button
          v-if="qianyou.status === '已处理'"
          type="text"
          class="button-style submit-button-style"
          @click="handleView"
        >
          <template #icon><FileSearchOutlined /></template>
          查看简历
        </a-button>
      </div>
      <div class="qianyou-competence">
        <div class="competence-header" style="  margin-left: -2rem;">
          胜任度:
        </div>
        <div class="competence-text">
          {{ qianyou.competence }}
        </div>
        <div class="competence-header">
          分
        </div>
      </div>
    </div>
  </div>
  <div v-if="isKGVisible" class="CV-KG">
    <QianJobKG :selectedCVData="selectedCVData"
           :selectedCardData="selectedCardData"
    ></QianJobKG>
  </div>
  <div v-if="isPersonaVisible" class="CV-Persona">
    <div style="display:flex;flex-direction: row;margin-left: 6.5rem">
      <div class="CV-Persona-header-text ver-bar-3" >胜任度得分</div>
      <div class="CV-Persona-header-text ver-bar-3">能力分析</div>
      <div class="CV-Persona-header-text ver-bar-3">性格成分</div>
    </div>
    <div style="display:flex;flex-direction: row;margin-left: 6.5rem">
      <ScoreGauge style="margin-top: -1rem"/>
      <CapacityBar />
      <PersonaDistribution style="margin-left: 1rem"/>
    </div>
  </div>
</template>

<script setup>
import '@/assets/global.css'
import { defineProps, ref, defineEmits, toRefs } from 'vue'
import {
  StarFilled,
  PayCircleFilled,
  ScheduleFilled,
  ReconciliationFilled,
  SendOutlined,
  DeploymentUnitOutlined,
  RadarChartOutlined,
  HistoryOutlined,
  CheckOutlined,
  CloseOutlined,
  FileSearchOutlined
} from '@ant-design/icons-vue'

import QianJobKG from '@/components/Tools/QIANYOU/QianJobKG.vue'
import CapacityBar from '@/components/Tools/Persona/CapacityBar.vue'
import PersonaDistribution from '@/components/Tools/Persona/PersonaDistribution.vue'
import ScoreGauge from '@/components/Tools/Persona/ScoreGauge.vue'
const submitButtonText = ref('请求简历')
// const requestResume = (qianyou) => {
//   // 这里可以放置请求简历的逻辑
//   console.log('请求简历', qianyou)
// }
// 喜欢，请求简历
const state = ref({
  isLiked: false,
  isDisliked: false,
  isSubmitted: false
})

// 父组件传值
const props = defineProps({
  qianyou: {
    type: Object,
    required: true
  },
  selectedCardData: {
    type: Object,
    required: true
  },
  addNewCV: {
    type: Function
  }
})
const { qianyou } = toRefs(props)
const selectedCardData = ref(qianyou.value.jobKG)
const selectedCVData = ref(qianyou.value.KG)

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
// const { qianyou } = toRefs(props)
const emit = defineEmits(['update:accept', 'update:submit', 'update:reject'])
const handleAccept = () => {
  // 更新 qianyou 的 status 属性为 '已处理'
  qianyou.value.status = '已处理'
  // 触发事件，通知父组件处理当前 qianyou 对象
  emit('update:accept', qianyou.value)
}

const handleSubmit = () => {
  // 更新 qianyou 的 status 属性为 '已处理'
  qianyou.value.status = '静候佳音'
  // 触发事件，通知父组件处理当前 qianyou 对象
  emit('update:submit', qianyou.value)
}

const handleReject = () => {
  qianyou.value.status = '已拒绝'
  emit('update:reject', qianyou.value) // 触发 reject 事件，并将求职者对象传递给父组件
}
</script>

<style scoped>
.qianyou-card {
  border-radius: 1rem;
  display: flex;
  margin-bottom: 20px;
  height: 10rem;
}

.qianyou-avatar {
  margin-left: 3rem;
  width: 12%;
  display: flex;
  justify-content: center; /* 图片水平居中 */
  align-items: center; /* 图片垂直居中 */
}

.qianyou-avatar img {
  width: 3.5rem; /* 图片最大宽度为容器宽度 */
  height: 3.5rem; /* 图片最大高度为容器高度 */
  border-radius: 5px;
  margin-top:-3rem;
}

.qianyou-details {
  width: 40%;
  padding-top: 1.5rem;
}

.qianyou-name {
  font-size: 1.15rem;
  margin-bottom: 5px;
}
.qianyou-state{
  font-size:0.8rem;
  margin-top:0.3rem;
  margin-left: 1rem;
  color: var(--greyFontColor075);
}

.qianyou-info {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 5px;
  font-size:0.9rem;
  color:var(--blackFontColor);
  margin-top:0.6rem;
}

.qianyou-info > div {
  margin-right: 10px;
}

.qianyou-education,
.qianyou-skills {
  margin-top: 0.8rem;
}

.qianyou-skills div {
  display: inline-block;
  margin-right: 10px;
}

.qianyou-experience {
  width: 35%;
  margin-top:1.7rem;
  margin-left: 1rem;
}

.qianyou-new-module {
  display: flex;
  flex-direction: row;
  top:35%;
  margin-right: 1rem;
  position: relative;
  align-items: center;
}

.split-line {
  position: relative;
  margin-right: 1rem;
}

.split-line:after{
  content: "";
  position: absolute;
  top: 50%;
  right: 0;
  margin-top: -6px;
  width: 1px;
  height: 12px;
  background-color: #ccc;
}

.qianyou-expection{
  margin-top:0.6rem;
  display: flex;
  flex-direction: row;
}

.qianyou-expection-header{
  color: var(--greyFontColor075);
  font-size: 0.9rem;
  margin-top: 0.2rem;
}

.qianyou-expection-text{
  color: var(--blackFontColor);
  font-size: 0.9rem;
  margin-top: 0.2rem;
}

.qianyou-project-text{
  margin-left: 1.5rem;
  font-size: 0.9rem;
  line-height: 1.4rem;
}

:deep(.ant-btn){
  padding: 0.2rem 0.5rem 0.2rem 0.5rem !important;
}
.button-style{
  margin-left: 0.7rem !important;
}
.submit-button-style{
  background: var(--themeColor) !important;
  color: white !important;
}
.submit-button-style:hover{
  background: var(--themeColor075) !important;
  color: white !important;
}

.qianyou-competence{
  display: flex;
  flex-direction: row;
  margin-top:auto;
  margin-left: auto;
  margin-right: 1rem;
  margin-bottom: 0.5rem;
}
.competence-header {
  color: var(--greyFontColor);
  font-size: 0.7rem;
  margin-top:0.3rem;
}
.competence-text {
  color: var(--greyFontColor);
  margin-left: 0.2rem;
  font-size: 1.15rem;
  margin-right: 0.2rem;
}

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
  margin-right: 14rem;
  margin-bottom: 1.3rem;
  color:var(--greyFontColor);
}

</style>
