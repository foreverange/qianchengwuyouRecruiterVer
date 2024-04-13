<template>
  <div class="user-page-job-card card-style bg5" @click="$emit('cardSelected', job)">
    <div class="job-header">
      <div class="job-title">{{ job.title }}</div>
      <span class="job-salary">{{ job.salary }}</span>
    </div>
    <div style="display: flex;flex-direction: row;margin-top:0.3rem">
      <div class="job-tags">
        <a-tag :bordered="false" v-for="tag in job.tags" :key="tag">{{ tag }}</a-tag>
      </div>
      <div class="job-match-container">
        <span class="job-match">胜任度</span>
        <span class="job-match-score">{{ job.matchScore }}</span>
      </div>
    </div>
    <div class="job-footer">
      <a-avatar size="small" :src="job.companyLogo" style="margin-right: 0.3rem;"/>
      <div>
        <span class="left-grey-info">{{ job.company }}&nbsp;&nbsp;</span>
        <span class="left-grey-info">{{ job.location }}&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
        <span class="left-grey-info">{{ job.hrName }}&nbsp;·&nbsp;</span>
        <span class="right-grey-info">{{ job.hrPosition }}</span>
      </div>
      <div style="margin-left: auto">
        <span class="right-grey-info" style="margin-right: 1rem">{{ job.lastActiveTime }}</span>
        <span class="right-grey-info">{{ getStateText(job.state) }}的岗位</span>
        <a-button class="withdraw-button-style" v-if="job.state === '已投递'" type="text"
                  size="small" @click.stop="confirmWithdraw" style="margin-left: 8px;">
          撤回</a-button>
        <a-button class="dislike-button-style" v-if="job.state === '喜欢'" type="text"
                  size="small" @click.stop="confirmDislike" style="margin-left: 8px;">
          取消</a-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, getCurrentInstance, toRefs } from 'vue'
import '@/assets/global.css'
import { Modal } from 'ant-design-vue'

const props = defineProps({
  job: {
    type: Object,
    required: true
  }
})
const stateText = {
  isLiked: '喜欢',
  isDisliked: '不喜欢',
  isSubmitted: '已投递',
  isRefused: '被拒绝',
  isSucceed: '签约成功'
}
const getStateText = (state) => {
  let text = ''
  if (state.isRefused === '被拒绝') {
    text = stateText.isRefused
  } else if (state.isSucceed === '签约成功') {
    text = stateText.isSucceed
  } else if (state.isSubmitted === '已投递') {
    text = stateText.isSubmitted
  } else if (state.isLiked === '喜欢该岗位') {
    text = stateText.isLiked
  } else { return text }
  return text
}
const { emit } = getCurrentInstance()
const { job } = toRefs(props)
const confirmWithdraw = () => { // 撤回弹窗
  Modal.confirm({
    title: '确认撤回简历？',
    okText: '确定',
    cancelText: '取消',
    onOk () {
      emit('withdrawJob', job.value)
    }
  })
}
const confirmDislike = () => { // 不再喜欢弹窗
  Modal.confirm({
    title: '不再喜欢该岗位？',
    okText: '确定',
    cancelText: '取消',
    onOk () {
      emit('withdrawJob', job.value)
    }
  })
}
</script>

<style scoped>
.user-page-job-card {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 7.75rem;
  padding: 1rem 1rem 0.3rem 1rem;
  border-radius: 0.7rem;
}
.user-page-job-card:hover,
.selected-card {
  background-image: url("https://img2.imgtp.com/2024/04/07/hYEDmFeW.png");
}

.user-page-job-card:hover .job-title,
.selected-card .job-title {
  color: var(--themeColor);
}
.user-page-job-card:hover .job-salary,
.selected-card .job-salary {
  color: var(--sararyColor08);
}
.user-page-job-card:hover .job-salary,
.selected-card .job-salary {
  color: var(--sararyColor08);
}
.card-style{
  box-shadow: 0 5px 15px 0 rgba(176,191,231,.3);
}
:hover.card-style,
.selected-card{
  border: var(--themeColor075) solid 1px;
  box-shadow: 0 10px 20px 0 rgba(176,191,231,.55);
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.job-title {
  margin-right: auto;
  font-size: 1rem;
  color: var(--greyFontColor125);
}

.job-salary {
  color: var(--sararyColor);
  font-size: 1.15rem;
}

.job-tags {
  margin-bottom: 0.5rem;
}

.job-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top:1rem;
}

.left-grey-info {
//color: var(--greyFontColor);
  color: var(--greyFontColor125);
  font-size: 0.75rem;
  margin-top:0.3rem;
}
.right-grey-info {
//color: var(--greyFontColor);
  color: var(--greyFontColor125);
  font-size: 0.75rem;
  margin-top:0.3rem;
  margin-right: auto;
}
.job-match-container {
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-top:-0.5rem;
}
.job-match {
//color: var(--greyFontColor);
  color: var(--greyFontColor125);
  font-size: 0.7rem;
  margin-top:0.3rem;
  margin-left: -2rem;
}
.job-match-score {
  color: var(--greyFontColor125);
  margin-left: 0.2rem;
  font-size: 1.15rem;
  margin-right: 0.2rem;
}
.withdraw-button-style ,
.dislike-button-style{
  border:none;
  color: var(--themeColor);
  background: none;
  padding:0.01rem 0.2rem;
}
:deep(.ant-btn.ant-btn-sm){
  font-size: 0.75rem;
}
.withdraw-button-style:hover,
.dislike-button-style:hover{
  color: var(--themeColor);
  background: var(--themeColor02);
}
</style>
