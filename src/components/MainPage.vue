<template>
  <div style="position: relative;">
    <div class="bg1"></div>
    <SeekerNavBar></SeekerNavBar>
    <div style="margin-top:3.5rem">
      <!--      第一栏-->
      <div style="display: flex;flex-direction: row;margin-left:7rem;margin-top:4rem;width: 83vw">
        <!--        checkjobtype 推荐职位或全部职位-->
        <a-radio-group v-model:value="currentCheckJobType" @update:modelValue="handleCheckJobTypeUpdate" class="frame-style" >
          <a-radio-button value="推荐职位" style="margin-top: 0.3rem" >推荐职位</a-radio-button>
          <a-radio-button value="全部职位" style="margin-top: 0.3rem">全部职位</a-radio-button>
        </a-radio-group>
        <!--        cvselector 选择简历-->
        <CVSelector v-model:currentCV="currentCV" :CVList="CVList" @update:CV="handleCVUpdate"
        ></CVSelector>
        <!--        recommendselector 选择推荐方式-->
        <RecommendSelector v-model:currentRecommend="currentRecommend" @update:recommend="handleRecommendUpdate" style="margin-right: auto"
        ></RecommendSelector>
        <!--        视图选择-->
        <a-radio-group v-model:value="currentView" class="frame-style" style="margin-left: auto">
          <a-radio-button value="详细"><MenuOutlined style="margin-top:0.7rem"/></a-radio-button>
          <a-radio-button value="图谱"><DeploymentUnitOutlined /></a-radio-button>
        </a-radio-group>
        <!--        换一批-->
        <div class="frame-style" style="">
          <a-radio-button @click="handleRefresh" value="换一批"><RedoOutlined style="margin-top:0.7rem;margin-right: 0.7rem"/>换一批</a-radio-button>
        </div>
        <!--        筛选折叠按钮，感觉用处不大不要了-->
        <!--        <div class="frame-style" style="">-->
        <!--          <a-radio-button value="详细" style="margin-top:0.3rem">筛选</a-radio-button>-->
        <!--        </div>-->
      </div>
      <!--      第二栏（搜索框）-->
      <div style="display: flex;flex-direction: row;margin-left:8rem;margin-top:1rem;width: 82vw">
        <a-input
          v-model:value="currentSearch"
          @input="handleSearchUpdate($event.target.value)"
          placeholder="搜索职位/公司"
          size="large"
        />
      </div>
      <!--      第三栏（更多的筛选，有的写起来很繁琐先摆个样子）-->
      <div style="display: flex;flex-direction: row;margin-left:8rem;margin-top:1rem;width: 82vw">
        <!--        1.城市选择器，缺不限-->
        <div style="width: 12.5rem"><CitySelector
          v-model:city="currentCity" @update:city="handleCityUpdate"
        ></CitySelector></div>
        <!--        5.工作类型选择器-->
        <JobTypeSelector v-model:currentJobType="currentJobType" @update:jobType="handleJobTypeUpdate"
        ></JobTypeSelector>
        <!--        2.求职类型选择器-->
        <SearchJobTypeSelector v-model:currentSearchJobType="currentSearchJobType" @update:searchJobType="handleSearchJobTypeUpdate"
        ></SearchJobTypeSelector>
        <!--        3.工作经验选择器-->
        <WorkExperienceSelector v-model:currentWorkExperience="currentWorkExperience" @update:workExperience="handleWorkExperienceUpdate"
        ></WorkExperienceSelector>
        <!--        4.学历选择器-->
        <EducationSelector v-model:currentEducation="currentEducation" @update:education="handleEducationUpdate"
        ></EducationSelector>
        <!--        6.公司规模选择器-->
        <CompanySizeSelector v-model:currentCompanySize="currentCompanySize" @update:companySize="handleCompanySizeUpdate"
        ></CompanySizeSelector>
        <!--        7.去改简历-->
        <div class="modify-small-frame-style" style="margin-left: auto;">
          <a-radio-button @click="handleModify" value="去改简历" :disabled="!hasCheckedJob" class="modify-button">
              <div style="font-size: 0.95rem;margin-top:0.1rem;font-family: opposans,serif">帮改简历</div>
          </a-radio-button>
        </div>
      </div>
      <!--      下方：职位卡片们-->
      <div style="display: flex;flex-direction: row;margin-left:4rem;margin-top:0.5rem;width: 90vw">
        <!--        左边：卡片-->
        <div class="card-list" style="display: flex;flex-direction: column;margin-left:2rem;margin-top:1rem;max-height: 60vh;overflow-y: scroll;overscroll-behavior: contain;">
          <div v-for="job in jobList" :key="job.id" class="job-card-wrapper">
            <a-checkbox v-model:checked="job.checked" class="job-checkbox"></a-checkbox>
            <JobCard
              :job="job"
              :class="{ 'selected-card': job.id === selectedCardIndex }"
              style="margin-bottom: 1.3rem;width: 26vw"
              @click="selectCard(job.id)"
              @cardSelected="handleSelectedCard"
            ></JobCard>
          </div>
        </div>
        <!--        右边：详细内容-->
        <div style="margin-left:2rem;margin-top:1rem;">
          <JobCardDetail :job="jobList[selectedCardIndex]" @update:job="updateJob"
                         style="width: 54vw" v-if="currentView === '详细'"></JobCardDetail>
          <div class="JobKG-container bg3 card-detail-style" v-if="currentView !== '详细'">
            <JobCardDetailForKG :job="jobList[selectedCardIndex]" @update:job="updateJob"
                           style="width: 54vw;" v-if="currentView === '图谱'"></JobCardDetailForKG>
            <JobKG :selectedCVData="selectedCVData"
            :selectedCardData="selectedCardData"
            ></JobKG>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import '@/assets/global.css'
import SeekerNavBar from '@/components/NavBar/SeekerNavBar.vue'
import { computed, ref, watch } from 'vue'
import { MenuOutlined, DeploymentUnitOutlined, RedoOutlined } from '@ant-design/icons-vue'
import CitySelector from '@/components/Tools/MainPage/CitySelector.vue'
import CVSelector from '@/components/Tools/MainPage/CVSelector.vue'
import SearchJobTypeSelector from '@/components/Tools/MainPage/SearchJobTypeSelector.vue'
import WorkExperienceSelector from '@/components/Tools/MainPage/WorkExperienceSelector.vue'
import EducationSelector from '@/components/Tools/MainPage/EducationSelector.vue'
import JobTypeSelector from '@/components/Tools/MainPage/JobTypeSelector.vue'
import JobCard from '@/components/Tools/MainPage/JobCard.vue'
import JobCardDetail from '@/components/Tools/MainPage/JobCardDetail.vue'
import CompanySizeSelector from '@/components/Tools/MainPage/CompanySizeSelector.vue'
// 对接
import { postFilteredCards, postRefreshedCards } from '@/api/functions'
// 对接前的模拟数据
import { fakeCVList, fakeJobList } from '@/components/Tools/js/fakeData'
import RecommendSelector from '@/components/Tools/MainPage/RecommendSelector.vue'
import router from '@/router'
import JobKG from '@/components/Tools/KG/JobKG.vue'
import { message } from 'ant-design-vue'
import axios from 'axios'
import JobCardDetailForKG from '@/components/Tools/MainPage/JobCardDetailForKG.vue'
const jobList = ref(fakeJobList)
const CVList = ref(fakeCVList)

// checkjobtype 推荐职位或全部职位
const currentCheckJobType = ref('全部职位')
const handleCheckJobTypeUpdate = (value) => {
  currentCheckJobType.value = value
  fetchFilteredData()
  console.log('MainPage:checkJobType updated:' + value)
}
// cvselector 选择简历
const currentCV = ref(CVList.value[0].CVName)
const selectedCVData = ref(CVList.value[0])
watch(selectedCVData, (newVal, oldVal) => {
  console.log('selectedCVData changed:', newVal)
})
const handleCVUpdate = (value) => {
  currentCV.value = value
  selectedCVData.value = CVList.value.find(item => item.CVName === currentCV.value)
  fetchFilteredData()
  console.log('MainPage:CV updated:' + value)
}
// recommendselector 选择推荐方式
const currentRecommend = ref('签程推荐')
const handleRecommendUpdate = (value) => {
  currentRecommend.value = value
  fetchFilteredData()
  console.log('MainPage:recommend updated:' + value)
}
// 选择视图
const currentView = ref('详细')
// 换一批
const handleRefresh = async () => {
  try {
    const response = await postRefreshedCards()
    // 处理响应数据
    console.log(response.data)
  } catch (error) {
    // 处理错误
    console.error(error)
  }
  console.log('MainPage:换一批')
}
// 搜索框内容
const currentSearch = ref('')
const handleSearchUpdate = (value) => {
  currentSearch.value = value
  fetchFilteredData()
  console.log('MainPage:search updated:' + value)
}
// 城市选择和变化
const currentCity = ref([])
const handleCityUpdate = (value) => {
  currentCity.value = value
  fetchFilteredData()
  console.log('MainPage:city updated:' + value)
}
// 职位类型选择
const currentJobType = ref()
const handleJobTypeUpdate = (value) => {
  currentJobType.value = value
  fetchFilteredData()
  console.log('MainPage:jobType updated:' + value)
}
// 求职类型选择
const currentSearchJobType = ref()
const handleSearchJobTypeUpdate = (value) => {
  currentSearchJobType.value = value
  fetchFilteredData()
  console.log('MainPage:searchJobType updated:' + value)
}
// 工作经验选择
const currentWorkExperience = ref()
const handleWorkExperienceUpdate = (value) => {
  currentWorkExperience.value = value
  fetchFilteredData()
  console.log('MainPage:workExperience updated:' + value)
}
// 学历选择
const currentEducation = ref()
const handleEducationUpdate = (value) => {
  currentEducation.value = value
  fetchFilteredData()
  console.log('MainPage:education updated:' + value)
}
// 公司规模选择器
const currentCompanySize = ref()
const handleCompanySizeUpdate = (value) => {
  currentCompanySize.value = value
  fetchFilteredData()
  console.log('MainPage:company size updated:' + value)
}
// checkbox选择
const hasCheckedJob = computed(() => {
  return jobList.value.some(job => job.checked)
})
const handleModify = async () => {
  try {
    const { id, score, completeness, setting, KG, ...newCVData } = selectedCVData.value
    const selectedJobIds = jobList.value.filter(job => job.checked).map(job => job.id)
    const selectedJob = jobList.value.filter(job => job.checked)
    const newJobData = selectedJob.map(({ KG, ...rest }) => rest)

    console.log('MainPage:带job的修改简历请求', newCVData, newJobData)
    // 显示加载状态
    const loadingKey = message.loading('正在生成针对选中岗位的简历修改建议，请稍候...', 0)
    const response = await axios.post('http://127.0.0.1:5000/modifyCVWithJob', {
      selectedCVData: newCVData,
      selectedJobData: newJobData
    })
    // 关闭加载状态
    loadingKey()
    if (response.data) {
      const report = response.data
      // 跳转
      console.log('CV:CVHeader:修改简历获得', report)
      router.push({
        name: 'cvmodify',
        query: {
          jobIds: selectedJobIds,
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

// 卡片选择（不是卡片的选框选择）
const selectedCardIndex = ref(0)
const selectedCardData = ref(jobList.value[0])
const selectCard = (index) => {
  selectedCardIndex.value = index
  selectedCardData.value = jobList.value.find(item => item.id === index)
  console.log('MainPage:selectCard updated:' + index)
}
watch(selectedCardData, (newVal, oldVal) => {
  console.log('selectedCardData changed:', newVal)
})
const handleSelectedCard = (value) => {
}
const fetchFilteredData = async () => {
  try {
    const data = {
      checkJobType: currentCheckJobType.value,
      cv: currentCV.value,
      search: currentSearch.value,
      city: currentCity.value,
      jobType: currentJobType.value,
      searchJobType: currentSearchJobType.value,
      workExperience: currentWorkExperience.value,
      education: currentEducation.value,
      companySize: currentCompanySize.value,
      recommend: currentRecommend.value
    }
    const response = await postFilteredCards(data)
    // 处理响应数据
    console.log(response.data)
  } catch (error) {
    // 处理错误
    console.error(error)
  }
}
// 卡片明细更新（按了按钮）
const updateJob = (updatedJob) => {
  const index = jobList.value.findIndex((job) => job.id === updatedJob.id)
  console.log('MainPage:Card state changed:', index, updatedJob.state)
  if (index !== -1) {
    jobList.value[index] = updatedJob
  }
}

</script>

<style scoped>
.card-list::-webkit-scrollbar {
  display: none;
}
:deep .ant-menu-item-selected {
  font-weight: bold !important;
}

:deep(.ant-radio-button-wrapper){
  border: none !important;
  box-shadow: none !important;
  font-size:1.15rem !important;
  color:var(--greyFontColor);
  background: rgba(255, 255, 255, 0);
}
:deep(.ant-radio-button-wrapper:hover){
  color: var(--themeColor);
}
:deep(.ant-radio-button-wrapper:not(:first-child)::before){
  background: rgba(255, 255, 255, 0) !important;
}
:deep(.ant-radio-button-wrapper-checked){
  color: var(--themeColor);
}
:deep(.ant-radio-button-wrapper-disabled){
  color:var(--greyFontColor05) !important;
  background: rgba(255, 255, 255, 0) !important;
}
:deep(.ant-radio-button-wrapper-disabled:hover){
  color:var(--greyFontColor05) !important;
  background: rgba(255, 255, 255, 0) !important;
}
:deep(.ant-input){
  border-radius: 0.8rem;
  border-color: white;
  box-shadow: 0 5px 5px 0 rgba(176,191,231,.25);
  background: rgba(255, 255, 255);
  border-width: 0.08rem;
}
:deep(.ant-input:hover){
  box-shadow: 0 5px 10px 0 rgba(176,191,231,.5);
}
.job-card-wrapper {
  position: relative;
  padding-left: 2rem;
}
.job-checkbox {
  position: absolute;
  top: 40%;
  left: 0;
  transform: translateY(-50%);
  z-index: 1;
}
.JobKG-container{
  width: 54vw;
  height: 28rem;
  padding: 1.25rem;
  border-radius: 15px;
  margin-bottom: 20px;
}

.modify-button:hover{
  font-weight: bold;
  color:white;
  background-size: 100% 100% !important;
  background: url("https://s21.ax1x.com/2024/04/07/pFq60m9.jpg");
}
</style>
