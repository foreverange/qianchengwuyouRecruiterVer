<template>
  <div>
    <div class="bg1"></div>
    <SeekerNavBar></SeekerNavBar>
    <div style="margin-top:3.5rem">
      <div class="cv-container">
        <div class="cv-left">
<!--          左上：简历列表-->
          <CVList :CVListData="processedCVList"
            v-model:currentSelectedCV="currentSelectedCV"
                  @newCV="addNewCV"
                  @update:currentSelectedCV="handleSelectedCVUpdate"/>
<!--          左下：简历目录-->
          <CVCatalogue class="cv-catalogue-sticky"
            :modelValue="currentSelectedCata" @update:selectedCata="handleSelectedCataUpdate"/>
        </div>
        <div class="cv-center">
<!--          简历头-->
          <CVHeader @update:CVName="handleCVNameUpdate"
                    :selectedCVData="selectedCVData" :addNewCV="addNewCV" id="CVHeader"/>
<!--          简历基本信息-->
          <CVBaseInfo :selectedCVData="selectedCVData" id="CVBaseInfo"/>
<!--          期望岗位-->
          <CVException :selectedCVData="selectedCVData" id="CVException"/>
<!--          教育经历-->
          <CVEducation :selectedCVData="selectedCVData" id="CVEducation"/>
<!--          资格证书-->
          <CVCertification :selectedCVData="selectedCVData" id="CVCertification"/>
<!--          工作实习经历-->
          <CVExperience :selectedCVData="selectedCVData" id="CVExperience"/>
<!--          项目经历-->
          <CVProject :selectedCVData="selectedCVData" id="CVProject"/>
<!--          专业技能-->
          <CVSkill :selectedCVData="selectedCVData" id="CVSkill"/>
<!--          附加信息-->
          <CVAdditional :selectedCVData="selectedCVData" id="CVAdditional"/>
        </div>
        <div class="cv-right">
          <!--          右上：聊天-->
          <CVChat />
          <!--          右下：设置-->
          <CVSetting :selectedCVData="selectedCVData" class="cv-catalogue-sticky" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SeekerNavBar from '@/components/NavBar/SeekerNavBar.vue'
import CVList from '@/components/Tools/CV/CVList.vue'
import CVHeader from '@/components/Tools/CV/CVHeader.vue'
import CVBaseInfo from '@/components/Tools/CV/CVBaseInfo.vue'
import CVEducation from '@/components/Tools/CV/CVEducation.vue'
import CVCertification from '@/components/Tools/CV/CVCertification.vue'
import CVExperience from '@/components/Tools/CV/CVExperience.vue'
import CVProject from '@/components/Tools/CV/CVProject.vue'
import CVSkill from '@/components/Tools/CV/CVSkill.vue'
import CVException from '@/components/Tools/CV/CVExpection.vue'
import CVCatalogue from '@/components/Tools/CV/CVCatalogue.vue'
import CVAdditional from '@/components/Tools/CV/CVAdditional.vue'
import { computed, ref, watch } from 'vue'
import CVSetting from '@/components/Tools/CV/CVSetting.vue'
import CVChat from '@/components/Tools/CV/CVChat.vue'
import { fakeCVList } from '@/components/Tools/js/fakeData'
// 对接前的模拟数据
const CVListData = ref(fakeCVList)
// 当前简历名
const handleCVNameUpdate = (updatedCV) => {
  const CVIndex = CVListData.value.findIndex(cv => cv.id === updatedCV.id)
  if (CVIndex !== -1) {
    CVListData.value[CVIndex].CVName = updatedCV.newName
  }
}
// 对CVList传值
const processedCVList = ref([])
processedCVList.value = CVListData.value.map((cv, index) => ({
  key: index.toString(),
  label: cv.CVName,
  title: cv.CVName
}))
// CVListData发生变化，更新 processedCVList
watch(CVListData, (newCVListData) => {
  processedCVList.value = newCVListData.map((cv, index) => ({
    key: cv.id.toString(),
    label: cv.CVName,
    title: cv.CVName
  }))
  console.log('CV:processedCVList update', processedCVList.value)
}, { deep: true })
// 左上：简历列表
const currentSelectedCV = ref(['0'])
const handleSelectedCVUpdate = (value) => {
  currentSelectedCV.value = value
  console.log('CV:selectedCV updated:' + value)
}
// 左下：目录
const currentSelectedCata = ref([])
const handleSelectedCataUpdate = (value) => {
  currentSelectedCata.value = value
  console.log('CV:selectedCata updated:' + value)
}
// 传递给其他组件
const selectedCVData = computed(() => {
  return CVListData.value.find((cv) => cv.id.toString() === currentSelectedCV.value[0])
})
// selectedCVData.value = CVListData.value.find((cv, index) => index.toString() === '0')
watch(currentSelectedCV, (newValue) => {
  selectedCVData.value = CVListData.value.find((cv, index) => index.toString() === newValue[0])
})
// 增加新的简历（上传）
const addNewCV = (newCVData) => {
  // 生成新的简历对象
  const newCV = {
    id: Date.now().toString(), // 使用当前时间戳作为唯一的 id
    CVName: '新的简历',
    // 需要后端传值，后面的懒得写了
    score: 72,
    completeness: 60,
    name: '小明',
    setting: {
      CVIsVisible: false,
      nameIsVisible: true,
      emailIsVisible: true,
      eduIsVisible: true
    }
  }
  CVListData.value.push(newCV)
  processedCVList.value = CVListData.value.map((cv, index) => ({
    key: cv.id.toString(),
    label: cv.CVName,
    title: cv.CVName
  }))
  currentSelectedCV.value = [newCV.id.toString()]
  console.log('CV:addCV:', currentSelectedCV.value, CVListData.value)
}
</script>

<style scoped>
.cv-container {
  width: 98vw;
  display: flex;
  flex-direction: row;
}

.cv-left {
  width: 15%;
  display: flex;
  flex-direction: column;
  margin-left:7rem;
  padding: 1rem;
}
.cv-right {
  width: 18%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
}
.cv-catalogue-sticky {
  position: sticky !important;
  top: 3.5rem;
  z-index: 999;
}

.cv-center {
  width: 53%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.cv-left > * {
  margin-bottom: 0.5rem;
}
.cv-center > *{
  margin-bottom: 0.5rem;
}
.cv-right > * {
  margin-bottom: 0.5rem;
}
</style>
