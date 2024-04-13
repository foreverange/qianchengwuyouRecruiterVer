<template>
  <div class="CV-exp">
    <div class="CV-exp-header">
      <div class="CV-exp-header-text ver-bar-1">实习/工作经历</div>
      <a-button type="text" class="CV-exp-header-edit-btn"
                @click="handleEditClick(null)"><EditOutlined />
      </a-button>
    </div>
    <!--    实习工作经历内容列表-->
    <div class="CV-exp-content" v-if="!CVExpIsEdit">
      <div @click="handleEditClick(item)" class="CV-exp-content-item" v-for="item in selectedCVData.expList" :key="item" >
        <div style="display: flex;flex-direction: column;width: 100%">
          <!--          第一栏，公司名和职位名-->
          <div class="CV-exp-content-item-piece" style="margin-bottom: 0.7rem">
            <div class="CV-exp-companyName"> {{ item.companyName }} </div>
            <div class="split-line"></div>
            <div class="CV-exp-role">{{ item.role }}</div>
            <div class="CV-exp-time-container">
              <div class="CV-exp-time">{{ item.startTime }}&nbsp;~&nbsp;{{ item.endTime }}</div>
            </div>
          </div>
          <!--          第二栏，工作描述-->
          <div class="CV-exp-content-item-piece">
            <div class="CV-exp-desc-title">内容：</div>
            <div class="CV-exp-desc-content">{{item.description}}</div>
          </div>
          <!--          第三栏，业绩-->
          <div class="CV-exp-content-item-piece">
            <div class="CV-exp-desc-title">业绩：</div>
            <div class="CV-exp-desc-content">{{item.achievement}}</div>
          </div>
          <div style="height: 0.5rem"></div>
        </div>
      </div>
    </div>
    <!--    实习工作经历编辑区域-->
    <div v-if="CVExpIsEdit" class="CV-exp-edit">
      <a-form model="CVExpEditItem" layout="vertical" >
        <div style="display: flex;flex-direction: row">
          <a-form-item label="公司名称" style="width: 15rem">
            <a-input v-model:value="CVExpEditItem.companyName" />
          </a-form-item>
          <a-form-item label="职位名称" style="width: 15rem;margin-left: 2rem">
            <a-input v-model:value="CVExpEditItem.role" />
          </a-form-item>
        </div>
        <div style="display: flex;flex-direction: row">
          <a-form-item label="开始时间" style="width: 9rem">
            <a-date-picker v-model:value="CVExpEditItem.startTime" picker="month"  placeholder="开始时间" />
          </a-form-item>
          <a-form-item label="结束时间" style="width: 9rem;margin-left: 2rem">
            <a-date-picker v-model:value="CVExpEditItem.endTime" picker="month"  placeholder="结束时间"/>
          </a-form-item>
        </div>
        <a-form-item label="工作描述" style="width: 40rem">
          <a-textarea v-model:value="CVExpEditItem.description" :rows=3 />
        </a-form-item>
        <a-form-item label="工作业绩" style="width: 40rem">
          <a-textarea v-model:value="CVExpEditItem.achievement" :rows=3 />
        </a-form-item>
      </a-form>
      <div class="CV-exp-op-btn">
        <a-button style="margin-left: auto" type="primary" @click="handleSaveEditClick">保存</a-button>
        <a-button class="CV-exp-op-btn-item" danger v-if="CVExpEditItem.id" @click="handleDeleteEditClick">删除</a-button>
        <a-button class="CV-exp-op-btn-item" @click="handleCancelEditClick">取消</a-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs, defineProps } from 'vue'
import { EditOutlined } from '@ant-design/icons-vue'
// 时间选择器用
import dayjs from 'dayjs'
// 父组件传值
const props = defineProps({
  selectedCVData: {
    type: Object,
    required: true,
    default: () => ({
      expList: []
    })
  }
})
const { selectedCVData } = toRefs(props)

// 编辑区域
// 编辑状态和编辑数据
const CVExpIsEdit = ref(false)
const CVExpEditItem = ref({
  companyName: null,
  role: null,
  startTime: null,
  endTime: null,
  description: null,
  achievement: null
})
// 编辑和新增逻辑
function handleEditClick (item) {
  if (item) {
    CVExpEditItem.value = {
      ...item,
      startTime: dayjs(item.startTime),
      endTime: dayjs(item.endTime)
    }
  } else {
    CVExpEditItem.value = { id: null, companyName: null, role: null, startTime: null, endTime: null, description: null, achievement: null } // 新增实习工作经历
  }
  CVExpIsEdit.value = true
  console.log('CV:Experience edit')
}
// 保存逻辑
function handleSaveEditClick () {
  // 转日期
  const formattedStartTime = CVExpEditItem.value.startTime ? dayjs(CVExpEditItem.value.startTime).format('YYYY-MM') : ''
  const formattedEndTime = CVExpEditItem.value.endTime ? dayjs(CVExpEditItem.value.endTime).format('YYYY-MM') : ''
  if (CVExpEditItem.value.id) { // 保存已存在的工作经历
    const index = selectedCVData.value.expList.findIndex(item => item.id === CVExpEditItem.value.id)
    if (index !== -1) {
      selectedCVData.value.expList[index] = {
        ...CVExpEditItem.value,
        startTime: formattedStartTime,
        endTime: formattedEndTime
      }
    }
  } else { // 新增工作经历
    // CVExpEditItem.value.id = Date.now()  用时间戳作为新项的id
    const maxId = selectedCVData.value.expList.reduce((max, item) => item.id > max ? item.id : max, 0) // 顺序id
    const newItem = {
      ...CVExpEditItem.value,
      id: maxId + 1,
      startTime: formattedStartTime,
      endTime: formattedEndTime
    }
    selectedCVData.value.expList.push(newItem)
  }
  CVExpIsEdit.value = false
  console.log('CV:Experience save')
}
// 取消逻辑
function handleCancelEditClick () {
  CVExpIsEdit.value = false
  console.log('CV:Experience cancel')
}
// 删除逻辑
function handleDeleteEditClick () {
  selectedCVData.value.expList = selectedCVData.value.expList.filter(item => item.id !== CVExpEditItem.value.id)
  CVExpIsEdit.value = false
  console.log('CV:Experience delete')
}
</script>

<style scoped>
.CV-exp {
  position: relative;
  box-shadow: 0 5px 5px 0 rgba(176,191,231,.4);
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 0.7rem;
  background: white;
}
.CV-exp-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.CV-exp-header-text {
  font-size: 1rem;
  color: var(--blackFontColor);
  margin-left: 0.1rem;
  margin-bottom: 0.5rem;
}
.CV-exp-header-edit-btn {
  margin-left: auto;
  margin-top:-0.7rem;
  color: var(--themeColor);
}
:deep(.ant-btn-text:not(:disabled):hover){
  color: var(--themeColor075);
  background: rgba(255, 255, 255, 0) !important;
}
.CV-exp-content {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  margin-left: 1rem;
}
.CV-exp-companyName{
  font-size: 1rem;
  margin-right: 0.5rem;
}
.CV-exp-role{
  font-size: 1rem;
}
.CV-exp-time{
  font-size: 0.9rem;
  color: var(--greyFontColor);
  text-align: right;
}
.CV-exp-time-container {
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
}
.CV-exp-content-item {
  align-items: center;
  width: 95%;
  height: max-content;
  padding: 0.5rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: row;
}
.CV-exp-content-item:hover {
  background: var(--themeColor01);
}
.CV-exp-content-item:hover .CV-exp-companyName,
.CV-exp-content-item:hover .CV-exp-role,
.CV-exp-content-item:hover .CV-exp-time{
  color: var(--themeColor);
}
.CV-exp-content-item-piece {
  display: flex;
  flex-direction: row;
  margin-top:0.5rem;
}
.CV-exp-desc-title{
  min-width: 3.3rem;
  font-weight: bold;
  font-size: 0.9rem;
}
.CV-exp-desc-content{
  font-size: 0.9rem;
  color: var(--greyFontColor);
  white-space: pre-wrap;/*使其换行*/
  line-height: 1.3rem;
  margin-top: -0.15rem;
}
.split-line {
  position: relative;
  margin-right: 0.5rem;
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
.CV-exp-op-btn{
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
}
.CV-exp-op-btn-item{
  margin-left: 0.5rem;
}
.CV-exp-edit{
  margin-left: 1.5rem;
  margin-top: 1rem;
}
</style>
