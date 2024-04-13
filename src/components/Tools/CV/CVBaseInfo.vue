<template>
  <div class="basic-info">
    <div class="basic-info-header">
      <div class="basic-info-header-text ver-bar-1">基本信息</div>
      <a-button type="text" class="basic-info-header-edit-btn" @click="handleEditClick">
        <EditOutlined />
      </a-button>
    </div>
    <!-- 基本信息内容 -->
    <div class="basic-info-content" v-if="!basicInfoIsEdit">
      <div class="basic-info-content-item" @click="handleEditClick">
        <div style="display: flex; flex-direction: column; width: 100%">
          <div style="display: flex; flex-direction: row;">
            <!-- 姓名 -->
            <div class="basic-info-content-item-piece">
              <UserOutlined class="basic-info-icon-style"/>
              <div class="basic-info-desc-content">{{ selectedCVData.name ? selectedCVData.name : '未知姓名' }}</div>
            </div>
            <!-- 学历 -->
            <div class="basic-info-content-item-piece" style="margin-left: 3rem">
              <ScheduleOutlined class="basic-info-icon-style"/>
              <div class="basic-info-desc-content">{{ selectedCVData.education ? selectedCVData.education : '未知学历' }}</div>
            </div>
            <!-- 经验 -->
            <div class="basic-info-content-item-piece" style="margin-left: 3rem">
              <LaptopOutlined  class="basic-info-icon-style"/>
              <div class="basic-info-desc-content">{{ selectedCVData.workExperience ? selectedCVData.workExperience : '未知工作经验' }}</div>
            </div>
          </div>
          <div style="display: flex; flex-direction: row;margin-top:0.2rem">
            <!-- 电话 -->
            <div class="basic-info-content-item-piece">
              <PhoneOutlined class="basic-info-icon-style"/>
              <div class="basic-info-desc-content">
                {{ selectedCVData.phone
                ? selectedCVData.phone.slice(0, 3) + ' ***** ' + selectedCVData.phone.slice(-3)
                : '未知电话' }}
              </div>
            </div>
            <!-- 邮箱 -->
            <div class="basic-info-content-item-piece" style="margin-left: 1rem">
              <MailOutlined class="basic-info-icon-style"/>
              <div class="basic-info-desc-content">
                {{ selectedCVData.email
                ? selectedCVData.email.slice(0, 3) + ' ***** @' + selectedCVData.email.split('@')[1]
                : '未知邮箱' }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 基本信息编辑区域 -->
    <div v-if="basicInfoIsEdit" class="basic-info-edit">
      <a-form layout="vertical">
        <div style="display: flex;flex-direction: row">
          <a-form-item label="姓名" style="width: 15rem">
            <a-input v-model:value="selectedCVData.name" />
          </a-form-item>
          <a-form-item label="学历" style="width:unset;margin-left: 2rem">
            <EducationSelector style="margin-left: -0.2rem;width: 7rem" v-model:currentEducation="selectedCVData.education" @update:education="handleEducationUpdate"
            ></EducationSelector>
          </a-form-item>
          <a-form-item label="经验" style="width:unset;margin-left: 2rem">
            <WorkExperienceSelector style="margin-left: -0.2rem;width: 7rem" v-model:currentWorkExperience="selectedCVData.workExperience" @update:workExperience="handleWorkExperienceUpdate"
            ></WorkExperienceSelector>
          </a-form-item>
        </div>
        <div style="display: flex;flex-direction: row">
          <a-form-item label="电话" style="width: 15rem">
            <a-input v-model:value="selectedCVData.phone" />
          </a-form-item>
          <a-form-item label="邮箱" style="width: 15rem;margin-left: 2rem">
            <a-input v-model:value="selectedCVData.email" />
          </a-form-item>
        </div>
      </a-form>
      <div class="basic-info-op-btn">
        <a-button style="margin-left: auto" type="primary" @click="handleSaveEditClick">保存</a-button>
        <a-button class="basic-info-op-btn-item" @click="handleCancelEditClick">取消</a-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs, defineProps } from 'vue'
import { EditOutlined, UserOutlined, PhoneOutlined, ScheduleOutlined, MailOutlined, LaptopOutlined } from '@ant-design/icons-vue'
import EducationSelector from '@/components/Tools/MainPage/EducationSelector.vue'
import WorkExperienceSelector from '@/components/Tools/MainPage/WorkExperienceSelector.vue'
// 父组件传值
const props = defineProps({
  selectedCVData: {
    type: Object,
    required: true,
    default: () => ({
      name: ''
    })
  }
})
const { selectedCVData } = toRefs(props)
// 来自子组件的更新
const handleEducationUpdate = (value) => {
  selectedCVData.value.education = value
  console.log('CV:baseInfo:education updated:' + value)
}
const handleWorkExperienceUpdate = (value) => {
  selectedCVData.value.workExperience = value
  console.log('CV:baseInfo:workExperience updated:' + value)
}
// 编辑状态
const basicInfoIsEdit = ref(false)

// 编辑逻辑
function handleEditClick () {
  basicInfoIsEdit.value = true
}

// 保存逻辑
function handleSaveEditClick () {
  basicInfoIsEdit.value = false
}

// 取消逻辑
function handleCancelEditClick () {
  basicInfoIsEdit.value = false
}
</script>

<style scoped>
.basic-info {
  position: relative;
  box-shadow: 0 5px 5px 0 rgba(176,191,231,.4);
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 0.7rem;
  background: white;
}
.basic-info-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.basic-info-header-text {
  font-size: 1rem;
  //font-weight: bold;
  color: var(--blackFontColor);
  margin-left: 0.1rem;
  margin-bottom: 0.5rem;
}
.basic-info-header-edit-btn {
  margin-left: auto;
  margin-top: -0.7rem;
  color: var(--themeColor);
}
.basic-info-icon-style{
  color: var(--greyFontColor075);
  font-size: 1rem;
  margin-right: 1rem;
  margin-left: 1rem;
}
:deep(.ant-btn-text:not(:disabled):hover) {
  color: var(--themeColor075);
  background: rgba(255, 255, 255, 0) !important;
}
.basic-info-content {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  margin-left: 1rem;
}
.basic-info-content-item {
  align-items: center;
  width: 95%;
  height: max-content;
  padding: 0.5rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: row;
}
.basic-info-content-item:hover {
  background: var(--themeColor01);
}
.basic-info-content-item:hover .basic-info-desc-content,
.basic-info-content-item:hover .basic-info-icon-style{
  color: var(--themeColor);
}
.basic-info-content-item-piece {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 0.5rem;
}
.basic-info-desc-title {
  font-weight: bold;
  margin-right: 0.5rem;
}
.basic-info-desc-content {
  line-height: 1.3rem;
}
.basic-info-op-btn {
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
}
.basic-info-op-btn-item {
  margin-left: 0.5rem;
}
.basic-info-edit {
  margin-left: 1.5rem;
  margin-top: 1rem;
}
</style>
