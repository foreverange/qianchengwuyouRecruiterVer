<template>
  <div class="CV-edu">
    <div class="CV-edu-header">
      <div class="CV-edu-header-text ver-bar-1">教育经历</div>
      <a-button type="text" class="CV-edu-header-edit-btn"
                @click="handleEditClick(null)"><EditOutlined />
      </a-button>
    </div>
<!--    教育经历内容列表-->
    <div class="CV-edu-content" v-if="!CVEduIsEdit">
      <div @click="handleEditClick(item)" class="CV-edu-content-item" v-for="item in selectedCVData.eduList" :key="item" >
        <div style="display: flex;flex-direction: row;margin-left: 1rem">
          <div style="margin-right: 1rem"> {{ item.school }} </div>
          <div class="split-line"></div>
          <div style="margin-right: 1rem">{{ item.major }}</div>
          <div class="split-line"></div>
          <div style="margin-right: 1rem">{{ item.startTime }}~{{ item.endTime }}</div>
          <div class="split-line"></div>
          <div >{{ item.degree }}</div>
        </div>
      </div>
    </div>
    <!-- 教育经历编辑区域 -->
    <div v-if="CVEduIsEdit">
      <!-- 编辑窗口 -->
      <div style="display: flex;flex-direction: row">
        <SchoolACInput v-model:school="CVEduEditItem.school"
                       @update:school="handleSchoolUpdate"></SchoolACInput>
        <MajorACInput v-model:major="CVEduEditItem.major" style="margin-left: 1rem"
                       @update:major="handleMajorUpdate"></MajorACInput>
        <StartTimeSelector v-model:startTime="CVEduEditItem.startTime"
                      @update:startTime="handleStartTimeUpdate"></StartTimeSelector>
        <EndTimeSelector v-model:endTime="CVEduEditItem.endTime"
                           @update:endTime="handleEndTimeUpdate"></EndTimeSelector>
        <EducationSelector v-model:currentEducation="CVEduEditItem.degree"
                           @update:education="handleEducationUpdate"></EducationSelector>
      </div>
      <div class="CV-edu-op-btn">
        <a-button style="margin-left: auto" type="primary" @click="handleSaveEditClick" >保存</a-button>
        <a-button class="CV-edu-op-btn-item" danger v-if="CVEduEditItem.id" @click="handleDeleteEditClick">删除</a-button>
        <a-button class="CV-edu-op-btn-item" @click="handleCancelEditClick">取消</a-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, toRefs } from 'vue'
import { EditOutlined } from '@ant-design/icons-vue'
import SchoolACInput from '@/components/Tools/CV/SchoolACInput.vue'
import MajorACInput from '@/components/Tools/CV/MajorACInput.vue'
import StartTimeSelector from '@/components/Tools/CV/StartTimeSelector.vue'
import EndTimeSelector from '@/components/Tools/CV/EndTimeSelector.vue'
import EducationSelector from '@/components/Tools/MainPage/EducationSelector.vue'
// 父组件传值
const props = defineProps({
  selectedCVData: {
    type: Object,
    required: true,
    default: () => ({
      eduList: []
    })
  }
})
const { selectedCVData } = toRefs(props)

// 编辑区域
// 编辑状态和编辑数据
const CVEduIsEdit = ref(false)
const CVEduEditItem = ref({ school: null, major: null, startTime: null, endTime: null, degree: null })
// 子组件更新项
const handleSchoolUpdate = (newSchool) => {
  CVEduEditItem.value.school = newSchool
  console.log('CV:CVEdu:school:', newSchool)
}
const handleMajorUpdate = (newMajor) => {
  CVEduEditItem.value.major = newMajor
  console.log('CV:CVEdu:major:', newMajor)
}
const handleStartTimeUpdate = (newTime) => {
  CVEduEditItem.value.startTime = newTime
  console.log('CV:CVEdu:startTime:', newTime)
}
const handleEndTimeUpdate = (newTime) => {
  CVEduEditItem.value.endTime = newTime
  console.log('CV:CVEdu:endTime:', newTime)
}
const handleEducationUpdate = (newDegree) => {
  CVEduEditItem.value.degree = newDegree
  console.log('CV:CVEdu:degree:', newDegree)
}
// 编辑和新增逻辑
function handleEditClick (item) {
  if (item) {
    CVEduEditItem.value = { ...item }
  } else {
    CVEduEditItem.value = { id: null, searchJobType: null, jobType: null, city: [] } // 新增岗位
  }
  CVEduIsEdit.value = true
  console.log('CV:Education edit')
}
// 保存逻辑
function handleSaveEditClick () {
  if (CVEduEditItem.value.id) { // 保存已存在的教育经历
    const index = selectedCVData.value.eduList.findIndex(item => item.id === CVEduEditItem.value.id)
    if (index !== -1) {
      selectedCVData.value.eduList[index] = { ...CVEduEditItem.value }
    }
  } else { // 新增教育经历
    const maxId = selectedCVData.value.eduList.reduce((max, item) => item.id > max ? item.id : max, 0) // 顺序id
    CVEduEditItem.value.id = maxId + 1
    selectedCVData.value.eduList.push(CVEduEditItem.value)
  }
  CVEduIsEdit.value = false
  console.log('CV:Education save')
}
// 取消逻辑
function handleCancelEditClick () {
  CVEduIsEdit.value = false
  console.log('CV:Education cancel')
}
// 删除逻辑
function handleDeleteEditClick () {
  selectedCVData.value.eduList = selectedCVData.value.eduList.filter(item => item.id !== CVEduEditItem.value.id)
  CVEduIsEdit.value = false
  console.log('CV:Education delete')
}
</script>

<style scoped>
.CV-edu {
  position: relative;
  box-shadow: 0 5px 5px 0 rgba(176,191,231,.4);
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 0.7rem;
  background: white;
}
.CV-edu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.CV-edu-header-text {
  font-size: 1rem;
  color: var(--blackFontColor);
  margin-left: 0.1rem;
  margin-bottom: 0.5rem;
}
.CV-edu-header-edit-btn {
  margin-left: auto;
  margin-top:-0.7rem;
  color: var(--themeColor);
}
:deep(.ant-btn-text:not(:disabled):hover){
  color: var(--themeColor075);
  background: rgba(255, 255, 255, 0) !important;
}
.CV-edu-content {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  margin-left: 1rem;
  font-size: 0.9rem;
}
.CV-edu-content-item {
  align-items: center;
  width: 80%;
  height: 2rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: row;
}
.CV-edu-content-item:hover {
  color: var(--themeColor);
  background: var(--themeColor01);
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
.CV-edu-op-btn{
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
}
.CV-edu-op-btn-item{
  margin-left: 0.5rem;
}
</style>
