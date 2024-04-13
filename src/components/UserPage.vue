<template>
  <div>
    <div class="bg1"></div>
    <SeekerNavBar></SeekerNavBar>
    <div style="margin-top:3.5rem">
      <div class="user-container">
          <!--          用户卡片-->
          <UserCard :userInfo="userInfo"
                    @update:userInfo="handleUserInfoUpdate"
          ></UserCard>
        <a-radio-group v-model:value="currentType" style="font-family: opposans sans-serif !important;"
                       @update:modelValue="handleTypeUpdate" class="frame-style user-bar" >
          <a-radio-button value="已投递" style="margin-top: 0.4rem;margin-left: 2rem">已投递</a-radio-button>
          <a-radio-button value="被拒绝" style="margin-left: 1rem">被拒绝</a-radio-button>
          <a-radio-button value="签约成功" style="margin-left: 1rem">签约成功</a-radio-button>
          <a-radio-button value="喜欢" style="margin-left: 1rem">喜欢岗位</a-radio-button>
          <a-radio-button value="设置" style="margin-left: 1rem">设置</a-radio-button>
        </a-radio-group>
        <div style="margin-top:2rem" class="card-container">
          <div v-for="job in filteredJobList" :key="job.id">
            <UserPageJobCard
              :job="job"
              @dislikeJob ="handleDislikeJob"
              @withdrawJob="handleWithdrawJob"
              style="margin-bottom: 1.3rem;"
            ></UserPageJobCard>
          </div>
        </div>
        <div v-if="currentType==='设置'" style="  width: 80%;">
          <UserSetting />
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import '@/assets/global.css'
import SeekerNavBar from '@/components/NavBar/SeekerNavBar.vue'
import UserCard from '@/components/Tools/UserPage/UserCard.vue'
import { computed, ref } from 'vue'
import UserPageJobCard from '@/components/Tools/UserPage/UserPageJobCard.vue'
import { fakeJobList, fakeUserList } from './Tools/js/fakeData'
import UserSetting from '@/components/Tools/UserPage/UserSetting.vue'
// 顶部用户信息
// TODO:登录逻辑完成后这里应该修改
const userInfo = ref(fakeUserList[0])
const handleUserInfoUpdate = (value) => {
  userInfo.value = value
  console.log('UserPage:userInfo updated:' + value)
}
// bar
const currentType = ref('已投递')
const handleTypeUpdate = (value) => {
  currentType.value = value
  console.log('UserPage:currentType updated:' + value)
}
// card
const jobList = ref(fakeJobList)

const filteredJobList = computed(() => {
  if (currentType.value === '设置') {
    return []
  } else if (currentType.value === '已投递') {
    return jobList.value.filter(job => job.state.isSubmitted === '已投递' && job.state.isRefused === '' && job.state.isSucceed === '')
  } else if (currentType.value === '被拒绝') {
    return jobList.value.filter(job => job.state.isRefused === '被拒绝')
  } else if (currentType.value === '签约成功') {
    return jobList.value.filter(job => job.state.isSucceed === '签约成功')
  } else if (currentType.value === '喜欢') {
    return jobList.value.filter(job => job.state.isLiked === '喜欢该岗位')
  } else return []
})
const handleWithdrawJob = (jobToWithdraw) => {
  jobList.value = jobList.value.filter(job => job !== jobToWithdraw)
  console.log('UserPage:withdraw submit')
}
const handleDislikeJob = (jobToDislike) => {
  jobList.value = jobList.value.filter(job => job !== jobToDislike)
  console.log('UserPage:dislike job')
}
</script>

<style scoped>
.user-container {
  width: 98vw;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */

}
.user-bar{
  width: 80%;
  margin-left: unset;
  margin-top:2%;
  font-size: 1rem !important;
}

:deep(.ant-radio-button-wrapper){
  border: none !important;
  box-shadow: none !important;
  font-size:1rem !important;
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
  font-weight: bold;
  color: var(--themeColor);
}
.card-container{
  width: 80%;
}
</style>
