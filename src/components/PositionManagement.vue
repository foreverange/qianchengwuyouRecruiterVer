<template>
  <div style="width: 100vw; height: 100vh; display: flex; flex-direction: column;">
    <div class="bg1"></div>
    <!-- 导航栏 -->
    <recruiter-nav-bar></recruiter-nav-bar>
    <div class="button-bar-wrapper">
      <!-- 按钮栏 -->
      <div class="button-bar ">
        <div class="frame-style" style="display: flex; flex-direction: row; align-items: center">
          <div class="button"
               v-for="(button, index) in buttons"
               :key="index"
               @click="toggleButton(index)"
               :class="{ 'active': activeButton === index, 'selected': activeButton === index }">
            {{ button }}
          </div>
        </div>
        <div class="button publish-button" @click="showPublishModal">+发布职位</div>
      </div>
    </div>
    <div style="display: flex; flex-direction: row; margin-top: 5.5rem; width: 100%; overflow-x: auto;">
      <!-- 职位列表 -->
      <div class="job-list" style="flex: 1; overflow-y: auto;">
        <div class="job card-detail-style" v-for="job in filteredJobList" :key="job.id" :class="{ 'greyed-out': job.status !== '开放中' }">
          <a-checkbox v-model:checked="job.selected" @change="toggleBottomActions" class="job-checkbox"></a-checkbox>
          <div class="left-section">
            <div class="job-title">{{ job.title }}</div>
            <div class="keywords">
              <!-- 在每个信息之间插入竖线分隔符 -->
              <span class="location">{{ job.location }}</span>
              <span class="separator">|</span>
              <span class="experience">{{ job.experience }}</span>
              <span class="separator">|</span>
              <span class="education">{{ job.education }}</span>
              <span class="separator">|</span>
              <span class="salary">{{ job.salary }}</span>
            </div>
          </div>
          <div class="middle-section">
            <!-- "看过我"、"投递过"、"感兴趣"部分 -->
            <div class="stats-labels">
              <div class="stats1">
                <div>{{ job.views }}人</div>
                <div class="stat-text">看过我</div>
              </div>
              <div class="stats2">
                <div>{{ job.applications }}人</div>
                <div class="stat-text">投递过</div>
              </div>
              <div class="stats2">
                <div>{{ job.interested }}人</div>
                <div class="stat-text">感兴趣</div>
              </div>
            </div>
          </div>
          <div class="right-section">
            <div class="status" :class="{ 'greyed-out': job.status !== '开放中' }">{{ job.status }}</div>
            <div class="actions">
              <button class="editbutton" @click="editJob(job)" >编辑</button>
              <button class="openbutton" @click="openJob(job)"  v-if="job.status !== '开放中'">开放</button>
              <button class="closebutton" @click="closeJob(job)" v-else-if="job.status === '开放中'">关闭</button>
              <!-- 修改这里，添加点击按钮"···"后显示下拉框 -->
              <a-dropdown trigger="click">
                <template #overlay>
                  <a-menu>
                    <a-menu-item @click="deleteJob(job)">永久删除</a-menu-item>
                  </a-menu>
                </template>
                <button class="ellipsis-button">···</button>
              </a-dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部操作栏 -->
    <a-layout-footer class="footer bg5">
      <div class="button-wrapper-left">
        <a-button @click="selectAll" class="footer-button">全选</a-button>
      </div>
      <div class="button-wrapper-right">
        <a-button @click="openJobs" class="footer-button">开放</a-button>
        <a-button @click="closeJobs" class="footer-button">关闭</a-button>
        <a-button @click="deleteJobs" class="footer-button">永久删除</a-button>
      </div>
    </a-layout-footer>

    <!-- 发布职位悬浮窗 -->
    <div class="publish-modal" v-show="showPublishModalFlag">
      <!-- 这里放发布职位的表单 -->
      <button @click="hidePublishModal">关闭</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import '@/assets/global.css'
import RecruiterNavBar from '@/components/NavBar/RecruiterNavBar.vue'

const buttons = ['全部职位', '开放中', '待开放', '已关闭']
const filteredJobList = computed(() => {
  if (activeButton.value !== null && activeButton.value !== 0) {
    const status = ['全部职位', '开放中', '待开放', '已关闭'][activeButton.value]
    return jobList.value.filter(job => job.status === status)
  } else {
    // 如果 activeButton 为 null 或 0（表示选择了 "全部职位"），则返回完整的 jobList 列表
    return jobList.value
  }
})
const activeButton = ref(0)

const jobList = ref([
  { id: 1, title: '软件开发-运营开发方向', location: '北京', experience: '1-3年', education: '本科', salary: '8k-13k', views: 100, applications: 20, interested: 50, status: '开放中' },
  { id: 2, title: '软件开发-后台开发方向', location: '上海', experience: '应届生', education: '硕士', salary: '9k-15k', views: 120, applications: 30, interested: 60, status: '待开放' },
  { id: 3, title: '软件开发-移动客户端开发方向', location: '深圳', experience: '小于1年', education: '本科', salary: '7k-16k', views: 80, applications: 15, interested: 40, status: '已关闭' },
  { id: 4, title: '技术运营', location: '杭州', experience: '1-3年', education: '本科', salary: '30k-40k', views: 150, applications: 25, interested: 70, status: '开放中' },
  { id: 5, title: '技术研究-推荐算法方向', location: '北京', experience: '3-5年', education: '本科', salary: '10k-20k', views: 200, applications: 40, interested: 80, status: '开放中' },
  { id: 6, title: '技术研究-计算机视觉方向', location: '上海', experience: '10年以上', education: '博士', salary: '20k-35k', views: 250, applications: 50, interested: 100, status: '开放中' },
  { id: 7, title: '软件开发-前端开发方向', location: '深圳', experience: '3-5年', education: '本科', salary: '8k-12k', views: 150, applications: 30, interested: 70, status: '开放中' },
  { id: 8, title: '软件开发-数据工程', location: '北京', experience: '不限经验', education: '硕士', salary: '12k-15k', views: 180, applications: 35, interested: 75, status: '待开放' },
  { id: 9, title: '软件开发-云计算开发方向', location: '杭州', experience: '5-10年', education: '硕士', salary: '15k-30k', views: 120, applications: 20, interested: 60, status: '已关闭' },
  { id: 10, title: '技术研究-机器学习方向', location: '上海', experience: '在校生', education: '硕士', salary: '10k-18k', views: 220, applications: 45, interested: 90, status: '已关闭' },
  { id: 11, title: '软件开发-游戏引擎开发方向', location: '北京', experience: '5-10年', education: '本科', salary: '12k-20k', views: 180, applications: 30, interested: 80, status: '开放中' },
  { id: 12, title: 'UI开发', location: '上海', experience: '3-5年', education: '本科', salary: '6k-15k', views: 150, applications: 25, interested: 60, status: '待开放' },
  { id: 13, title: '技术研究-计算机图形学方向', location: '深圳', experience: '5-10年', education: '博士', salary: '10k-25k', views: 200, applications: 35, interested: 70, status: '开放中' },
  { id: 14, title: '硬件开发-芯片设计方向', location: '杭州', experience: '3-5年', education: '硕士', salary: '20k-40k', views: 160, applications: 30, interested: 65, status: '开放中' },
  { id: 15, title: '技术研究-多模态方向', location: '北京', experience: '3-5年', education: '硕士', salary: '20k-45k', views: 170, applications: 35, interested: 75, status: '待开放' }
])

const showPublishModalFlag = ref(false)
const toggleButton = (index) => {
  if (activeButton.value === index) {
    activeButton.value = null
  } else {
    activeButton.value = index
  }
}

const showPublishModal = () => {
  showPublishModalFlag.value = true
}

const hidePublishModal = () => {
  showPublishModalFlag.value = false
}

const openJob = (job) => {
  // 找到对应职位在 jobList 中的索引
  const index = jobList.value.findIndex(j => j.id === job.id)
  if (index !== -1) {
    // 如果当前职位状态为待开放或者已关闭，则将其状态改为开放中
    if (jobList.value[index].status === '待开放' || jobList.value[index].status === '已关闭') {
      jobList.value[index].status = '开放中'
    }
  }
}

const closeJob = (job) => {
  // 找到对应职位在 jobList 中的索引
  const index = jobList.value.findIndex(j => j.id === job.id)
  if (index !== -1) {
    // 将职位状态改为已关闭
    jobList.value[index].status = '已关闭'
  }
}

// 编辑职位功能
const editJob = (job) => {
  // 这里可以实现编辑职位的逻辑
  console.log('编辑职位', job)
}

// 永久删除功能
const deleteJob = (job) => {
  // 这里可以实现永久删除职位的逻辑
  const index = jobList.value.findIndex(j => j.id === job.id)
  if (index !== -1) {
    jobList.value.splice(index, 1)
  }
}

const showBottomActions = ref(false)

// 点击方框时显示底部操作框
const toggleBottomActions = () => {
  showBottomActions.value = !showBottomActions.value
}

// 全选功能
const selectAll = () => {
  // 检查是否已经全部选中
  const allSelected = jobList.value.every((job) => job.selected)

  // 如果已经全部选中，则执行取消选择操作；否则，执行全选操作
  if (allSelected) {
    jobList.value.forEach((job) => {
      job.selected = false
    })
  } else {
    jobList.value.forEach((job) => {
      job.selected = true
    })
  }
}

// 选中开放功能
const openJobs = () => {
  // 遍历选中的职位
  jobList.value.forEach(job => {
    if (job.selected && (job.status === '待开放' || job.status === '已关闭')) {
      // 将当前处于待开放或者已关闭状态的职位转为开放中
      job.status = '开放中'
    }
  })
}

// 选中关闭功能
const closeJobs = () => {
  // 遍历选中的职位
  jobList.value.forEach(job => {
    if (job.selected && job.status === '开放中') {
      // 将当前处于开放状态的职位转为已关闭
      job.status = '已关闭'
    }
  })
}

const deleteJobs = () => {
  // 找到所有选中的职位的索引
  const selectedJobIndexes = jobList.value.reduce((acc, job, index) => {
    if (job.selected) {
      acc.push(index)
    }
    return acc
  }, [])

  // 从 jobList 中删除选中的职位
  selectedJobIndexes.reverse().forEach(index => {
    jobList.value.splice(index, 1)
  })
}
</script>

<style scoped>
/* 样式可以根据需求进行调整 */
/* 顶部按钮栏固定在页面顶部 */
.button-bar-wrapper {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%; /* 设置宽度为100% */
  z-index: 999; /* 确保按钮栏在页面顶部显示 */
  margin-top:3.5rem;
}

/* 增加顶部按钮栏的样式 */
.button-bar {
  display: flex;
  width: 75%; /* 设置宽度为100% */
  align-items: center; /* 垂直居中 */
  margin-left: 3rem;
  position: relative; /* 让 .button-bar 成为定位上下文 */
}

.button {
  justify-content: center; /* 水平居中 */
  padding: 0.5rem 1rem; /* 调整水平方向的内边距，使按钮更宽 */
  margin: 0 1rem; /* 调整按钮之间的间距 */
  cursor: pointer;
  border-radius: 0.5rem; /* 圆角边框 */
}

.selected {
  color: var(--themeColor); /* 选中状态的按钮颜色 */
}

.publish-button {
  justify-content: center; /* 水平居中 */
  position: absolute;
  right: 3rem;
  padding: 0.5rem 1rem; /* 调整水平方向的内边距，使按钮更宽 */
  background-color: var(--themeColor);;
  color: #fff;
  border: none;
  border-radius: 0.5rem; /* 圆角边框 */
}

/* 设置职位列表为 Flex 布局，允许子元素换行，并在顶部留出一些间距 */
.job-list {
  display: flex; /* 使用 Flex 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  flex-wrap: wrap; /* 允许内容换行 */
  margin-top: 1.5rem;
  margin-bottom:3.5rem ;
}

.job-checkbox {
  margin-right: 1.5rem; /* 设置右边距为1rem，增加间距 */
}

/* 定义职位项的样式，使其成为 Flex 容器，占据整个行的宽度 */
.job {
  display: flex;
  flex: 0 0 calc(75% - 1.25rem);
  position: relative; /* 设置为相对定位 */
  border-radius: 0.5rem;
  padding: 2.2rem;/*框高*/
  margin: 0.625rem;
}

/*职业名称*/
.job-title {
  margin-top: -0.25rem; /* 将标题向上移动 0.25rem */
  font-weight: bold;
  font-size: 1.2rem; /* 调整字体大小 */
}

/* 设置地址、经验、教育、工资信息在左下角 */
.keywords {
  position: absolute;
  font-size: 0.9rem; /* 调整字体大小 */
  bottom:1.1rem;
}

.job-list .job:not(.greyed-out) .keywords{
  color: var(--greyFontColor125);
}

.separator {
  margin: 0.5rem 0.5rem; /* 调整竖线分隔符与信息之间的间距 */
}

/* 设置title和keywords对齐 */
.left-section{
  display: flex;
  align-items: baseline; /* 基线对齐 */
}

/* 设置职位项中间部分为 Flex 容器，并让其占据剩余空间 */
.middle-section {
  flex: 1;
}

.stats-labels {
  font-size: 0.95rem; /* 调整字体大小 */
  display: flex;
  margin-top: 0.5rem; /* 将标题向上移动 0.25rem */
  /* 添加水平方向的内边距 */
  padding: 0 1rem;
}

.job-list .job:not(.greyed-out) .stats-labels{
  color: var(--greyFontColor);
}

/* 调整投递过等内部元素之间的间距 */
.stats-labels > div {
  margin-right: 1.5rem; /* 调整水平方向的外边距 */
}

/* 定义职位项的左、中、右部分样式，让它们各自占据父容器相同宽度 */
.left-section, .middle-section, .right-section {
  flex: 1;
}

/* 将 status 不是 "开放中" 的条目文字颜色设置为灰色 */
.greyed-out {
  color: var(--greyFontColor03);
}

.right-section {
  display: flex;
  justify-content: space-between; /* 将内容分散对齐，第一个项目位于一行的开始，最后一个项目位于一行的结束 */
  align-items: center; /* 垂直居中 */
}

.job-list .job:not(.greyed-out) .openbutton{
  color: #ffffff;
}

.editbutton{
  color: var(--themeColor);
}

.job-list .job:not(.greyed-out) .closebutton{
  color: var(--themeColor);
}

.greyed-out .openbutton{
  color: var(--themeColor);
}

.greyed-out .closebutton{
  color: #ffffff;
}

.actions button {
  margin-left: 1rem; /* 调整按钮之间的间距 */
  border: none; /* 去掉边框 */
  background-color: transparent; /* 去掉背景色 */
}

.bottom-actions {
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
}

.bottom-actions button {
  margin: 0 0.5rem;
}

/* 设置发布职位悬浮窗在页面上垂直水平居中显示 */
.publish-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 10rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* 自定义底部操作栏的样式 */
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 3.5rem; /* 固定高度为2rem */
  background-color: #fff; /* 设置背景颜色为白色 */
  z-index: 999; /* 确保在其他元素之上 */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.4);
  background-size:cover;
  backdrop-filter: blur(10px);
  z-index: 999;
  transition: background-color 0.3s;
  box-shadow: 0 5px 10px 0 rgba(176,191,231,.5);
  padding: 0 16px;
}

/* 自定义底部操作栏按钮的样式 */
.footer-button {
  background-color: transparent; /* 设置背景颜色为透明 */
  padding: 0.3rem 1rem; /* 调整按钮内边距 */
  margin-left: 1.5rem;
  color: #000000; /* 修改字体颜色 */
  border: none;
  font-weight: 500;
}

/* 自定义左侧按钮包装器样式 */
.button-wrapper-left {
  flex: 1; /* 占据左侧 50% 的空间 */
  margin-left: 15rem;
}

/* 自定义右侧按钮包装器样式 */
.button-wrapper-right {
  flex: 3; /* 占据右侧 50% 的空间 */
  display: flex; /* 使用 Flex 布局 */
  justify-content: flex-end; /* 按钮右对齐 */
  margin-right: 15rem;
}

.ellipsis-button {
  background-color: transparent;
  border: none;
  color: #000;
  font-size: 1.2rem;
  cursor: pointer;
}

.stat-text{
  font-size: 0.85rem;
  margin-top: 0.3rem;
}
</style>
