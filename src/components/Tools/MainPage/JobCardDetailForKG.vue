<template>
  <div class="job-card-detail-for-KG card-detail-style-for-KG">
    <div class="job-title-and-actions">
      <div style="display: flex;flex-direction: row">
        <div class="job-title">{{ job.title }}</div>
        <div class="job-salary">{{ job.salary }}</div>
      </div>
      <div class="actions-buttons">
        <a-button
          type="text"
          class="button-style dislike-button-style"
          :class="{ 'dislike-button-style-active': state.isDisliked }"
          danger
          @click="handleDislike"
        >
          {{ dislikeButtonText }}
        </a-button>
        <a-button
          type="text"
          class="button-style like-button-style"
          :class="{ 'like-button-style-active': state.isLiked }"
          @click="handleLike"
        >
          <template #icon><HeartOutlined /></template>
          {{ likeButtonText }}
        </a-button>
        <a-button
          type="text"
          class="button-style submit-button-style"
          :class="{ 'submit-button-style-active': state.isSubmitted }"
          @click="handleSubmit"
        >
          <template #icon><SendOutlined /></template>
          {{ submitButtonText }}
        </a-button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { defineProps, ref, defineEmits, reactive, watch } from 'vue'
import '../css/scrollBar.css'
import '@/assets/global.css'
import { HeartOutlined, SendOutlined } from '@ant-design/icons-vue'
import { cloneDeep } from 'lodash'

const props = defineProps({
  job: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:job'])

const jobCopy = reactive(cloneDeep(props.job))

const state = ref({
  isLiked: false,
  isDisliked: false,
  isSubmitted: false
})
const likeButtonText = ref(state.value.isLiked ? '喜欢该岗位' : '喜欢')
const dislikeButtonText = ref(state.value.isDisliked ? '不喜欢的岗位' : '不喜欢')
const submitButtonText = ref(state.value.isSubmitted ? '已投递' : '投递简历')
watch(
  () => props.job,
  (newJob) => {
    console.log(`JobCardDetail: job changed, id: ${newJob.id}`)
    state.value.isLiked = newJob.state.isLiked === '喜欢该岗位'
    likeButtonText.value = state.value.isLiked ? '喜欢该岗位' : '喜欢'
    state.value.isDisliked = newJob.state.isDisliked === '不喜欢的岗位'
    dislikeButtonText.value = state.value.isDisliked ? '不喜欢的岗位' : '不喜欢'
    state.value.isSubmitted = newJob.state.isSubmitted === '已投递'
    submitButtonText.value = state.value.isSubmitted ? '已投递' : '投递简历'
  },
  { deep: true }
)

const handleLike = () => {
  state.value.isLiked = !state.value.isLiked
  console.log('MainPage:like:', state.value.isLiked)
  jobCopy.state.isLiked = state.value.isLiked ? '喜欢该岗位' : '喜欢'
  emit('update:job', jobCopy)
  likeButtonText.value = state.value.isLiked ? '喜欢该岗位' : '喜欢'
}

const handleDislike = () => {
  state.value.isDisliked = !state.value.isDisliked
  console.log('MainPage:dislike:', state.value.isDisliked)
  jobCopy.state.isDisliked = state.value.isDisliked ? '不喜欢的岗位' : '不喜欢'
  emit('update:job', jobCopy)
  dislikeButtonText.value = state.value.isDisliked ? '不喜欢的岗位' : '不喜欢'
}

const handleSubmit = () => {
  state.value.isSubmitted = !state.value.isSubmitted
  console.log('MainPage:submit:', state.value.isSubmitted)
  jobCopy.state.isSubmitted = state.value.isSubmitted ? '已投递' : '投递简历'
  emit('update:job', jobCopy)
  submitButtonText.value = state.value.isSubmitted ? '已投递' : '投递简历'
}
</script>

<style scoped >
.card-detail-style-for-KG{
  background: rgba(255, 255, 255, 0.9);
}
.job-card-detail-for-KG {
  padding-right: 2.5rem;

  height: 4rem;
  border-radius: 15px;
}

.job-title-and-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

}

.job-title {
  font-weight: bold;
  color: var(--greyFontColor125);
  font-size: 1.15rem;
  margin-bottom: 10px;
}

.job-salary {
  font-weight: bold;
  color: var(--sararyColor);
  font-size: 1.1rem;
  margin-left: 1.5rem;
  margin-top: 0.1rem
}

.actions-buttons a-button {
  margin-right: 1rem;
}

:deep(.ant-btn){
  padding: 0.2rem 0.5rem 0.2rem 0.5rem;
}

.button-style{
  margin-left: 0.7rem;
}
.dislike-button-style{
  border-color: var(--sararyColor);
  color: var(--sararyColor);
  background: var(--sararyColor0001);
}
.dislike-button-style:hover{
  border-color: var(--sararyColor125);
  color: var(--sararyColor125);
  background: var(--sararyColor001);
}
.like-button-style{
  border-color: var(--themeColor);
  color: var(--themeColor);
  background: var(--themeColor001);
}
.like-button-style:hover{
  border-color: var(--themeColor);
  color: var(--themeColor);
  background: var(--themeColor01);
}
.submit-button-style{
  background: var(--themeColor);
  color: white;
}
.submit-button-style:hover{
  background: var(--themeColor075);
  color: white;
}
.dislike-button-style-active {
  border-color: var(--sararyColor125);
  color: var(--sararyColor125);
  background: var(--sararyColor001);
}

.like-button-style-active {
  border-color: var(--themeColor);
  color: var(--themeColor);
  background: var(--themeColor01);
}
</style>
