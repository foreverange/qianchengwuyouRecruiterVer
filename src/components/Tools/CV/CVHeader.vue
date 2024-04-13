<template>
  <div class="CV-header" v-if="selectedCVData">
    <div class="header">
      <div v-if="!isEditing" class="header-header">{{ selectedCVData.CVName }}</div>
      <a-input v-else v-model:value="editableCVName" />
      <div style="margin-right: 0.5rem">
        <a-button v-if="!isEditing" @click="toggleEdit" type="text" class="text-button-style">编辑</a-button>
        <a-button v-else @click="saveEdit" type="text" class="text-button-style">保存</a-button>
        <a-button  @click="handleFileUpdate" type="text" class="text-button-style">导入</a-button>
      </div>
    </div>
    <div class="CV-score-bar">
      <div class="CV-score-text">当前简历得分&nbsp;&nbsp;</div>
      <div class="CV-score">{{ selectedCVData.score }}</div>
      <div style="font-size: 0.9rem;">分</div>
      <div class="CV-completeness-text"> 完整度&nbsp;&nbsp;</div>
      <div class="CV-completeness">{{ selectedCVData.completeness }}</div>
      <div style="font-size: 0.9rem;">%</div>
      <a-button @click="handleChangePersonaVisibleClick" style="padding:unset;margin-left: auto;font-size: 1.5rem;margin-bottom: 0.5rem"
                type="text" class="text-button-style"><RadarChartOutlined /></a-button>
      <a-button @click="handleChangeKGVisibleClick" style="font-size: 1.5rem;margin-bottom: 0.5rem;padding:unset;margin-left: 0.5rem"
         type="text" class="text-button-style"><DeploymentUnitOutlined /></a-button>
      <a-button type="text" class="text-button-style" @click="handleModify">生成详细报告</a-button>
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
import { defineEmits, defineProps, ref, toRefs } from 'vue'
import { DeploymentUnitOutlined, RadarChartOutlined } from '@ant-design/icons-vue'
import router from '@/router'
import CVKG from '@/components/Tools/KG/CVKG.vue'
// 新建（文件上传）
import { message } from 'ant-design-vue'
import axios from 'axios'
import CapacityBar from '@/components/Tools/Persona/CapacityBar.vue'
import PersonaDistribution from '@/components/Tools/Persona/PersonaDistribution.vue'
// import ScoreCircle from '@/components/Tools/Persona/ScoreCircle.vue'
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
const isEditing = ref(false) // 是否处于编辑状态
const editableCVName = ref(selectedCVData.value.CVName) // 编辑中的CVName
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
// 传值给后端获取详细报告
const handleModify = async () => {
  try {
    const { id, score, completeness, setting, KG, ...newData } = selectedCVData.value
    console.log('CV:CVHeader:修改简历请求', newData)
    // 显示加载状态
    const loadingKey = message.loading('正在生成详细报告，准备跳转...', 0)
    const response = await axios.post('http://127.0.0.1:5000/modifyCV', selectedCVData.value)
    // 关闭加载状态
    loadingKey()
    if (response.data) {
      const report = response.data
      // 跳转
      console.log('CV:CVHeader:修改简历获得', report)
      router.push({
        name: 'cvmodify',
        query: {
          jobIds: null,
          cv: selectedCVData.value.id,
          report: JSON.stringify(report)// 先做成字符串，传递过去后再解析
        }
      })
    } else {
      message.error('生成详细报告失败')
    }
  } catch (error) {
    console.error('生成详细报告错误:', error)
    message.error('生成详细报告错误')
  }
}

// 简历名修改
// 切换编辑状态
const toggleEdit = () => {
  isEditing.value = true
}
// 保存编辑
const emit = defineEmits(['update:CVName'])
const saveEdit = () => {
  isEditing.value = false
  selectedCVData.value.CVName = editableCVName.value
  emit('update:CVName', { id: selectedCVData.value.id, newName: editableCVName.value })
  console.log('CV:CVHeader: CVName Changed')
}
const handleFileUpdate = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.doc,.docx,.pdf,.png,.jpg'
  input.onchange = async (event) => {
    const file = event.target.files[0]
    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      try {
        const response = await axios.post('http://127.0.0.1:5000/fetchCV', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        if (response.data.success) {
          // 处理解析结果
          message.success('文件上传成功')
          // 添加新简历组件传值
          const newCVData = response.data
          props.addNewCV(newCVData)
        } else {
          message.error('文件上传失败')
        }
      } catch (error) {
        console.error('文件上传错误:', error)
        message.error('文件上传错误')
      }
    }
  }
  input.click()
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
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header-header {
  font-size: 1.15rem;
  font-weight: bold;
  color: var(--blackFontColor);
  margin-left: 0.1rem;
  margin-top:0.5rem;
  margin-bottom: 0.5rem;
}
.text-button-style{
  color: var(--themeColor);
}
:deep(.ant-btn-text:not(:disabled):hover){
  color: var(--themeColor075);
  background: rgba(255, 255, 255, 0) !important;
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
.CV-score-text,
.CV-completeness-text{
  margin-left: 0.9rem;
  font-size: 0.9rem;
}
.CV-score,
.CV-completeness {
  margin-right: 5px;
  color: var(--themeColor);
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
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
