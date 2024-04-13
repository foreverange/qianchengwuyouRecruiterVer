<template>
  <div style="width: 100vw; height: 100vh; display: flex; flex-direction: column;">
    <div class="bg1"></div>
    <!-- 导航栏 -->
    <recruiter-nav-bar></recruiter-nav-bar>
    <div class="button-bar-wrapper">
      <!-- 按钮栏 -->
      <div class="button-bar">
        <div class="frame-style" style="display: flex; flex-direction: row; align-items: center">
          <div class="button"
               v-for="(button, index) in buttons"
               :key="index"
               @click="toggleButton(index)"
               :class="{ 'active': activeButton === index, 'selected': activeButton === index }">
            {{ button }}
          </div>
        </div>
        <div class="jobfilter" style="display: flex; flex-direction: row; margin-left: 26rem;">
          <!-- 岗位筛选按钮 -->
          <FilterFilled style="margin-top: -0.4rem; font-size: 1.3rem; color: var(--themeColor);" />
          <!-- 使用 v-if 判断是否显示岗位筛选字样 -->
          <a-select class="jobSelector frame-style" v-model:value="selectPosition" placeholder="岗位筛选" style="width: 12rem">
            <a-select-option value="" disabled>岗位筛选</a-select-option>
            <a-select-option v-for="position in positions" :key="position" :value="position">{{ position }}</a-select-option>
          </a-select>
        </div>
      </div>
    </div>
    <div style="display: flex; flex-direction: row; margin-top: 7.5rem; width: 83%; overflow-x: auto;margin-left: 8rem">
      <div class="qianyou-list" style="flex: 1; overflow-y: auto; ">
          <!-- 直接引入 QianYouCard 组件 -->
        <QianYouCard v-for="(qianyou, index) in filteredQianyouData" :key="index" :qianyou="qianyou" @accept="handleAcceptQianyou" :@reject="handleRejectFromCard"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import '@/assets/global.css'
import RecruiterNavBar from '@/components/NavBar/RecruiterNavBar.vue'
import QianYouCard from '@/components/Tools/QianYouCard.vue'
import { FilterFilled } from '@ant-design/icons-vue'

const qianyouData = ref([
  {
    avatar: 'https://img2.imgtp.com/2024/04/12/wQaKOclD.png',
    id: 1,
    name: '王**',
    age: 25,
    education: '硕士',
    state: '毕业-寻找工作',
    status: '待处理',
    type: '全职',
    experience: '应届生',
    educationDetails: {
      university: '北京',
      major: '电子信息'
    },
    location: '深圳',
    position: '软件开发-前端开发方向',
    salary: '10k-20k',
    tags: ['HTML', 'CSS3', '大学英语六级'],
    skills: [
      { name: 'HTML', proficiency: '高级' },
      { name: 'CSS3', proficiency: '高级' },
      { name: '大学英语六级', proficiency: '456' }
    ],
    project: {
      name: '菁华学习行为分析系统',
      description: '参与开发了一个基于数据挖掘的学习行为分析系统'
    },
    internship: { },
    competence: 99.1,
    active: 99,
    jobKG: {
      nodes: [
        { id: 1, name: '软件开发-前端开发方向', category: 8, symbolSize: 30, description: null, fixed: true, x: 76, y: 141.53846153846155 },
        { id: 2, name: '职位需求', category: 1, symbolSize: 20, description: null },
        { id: 3, name: '软件开发-前端开发方向', category: 1, symbolSize: 20, description: null },
        { id: 4, name: '学历要求', category: 2, symbolSize: 20, description: null },
        { id: 5, name: '本科', category: 2, symbolSize: 20, description: null },
        { id: 6, name: '经验要求', category: 7, symbolSize: 20, description: null },
        { id: 7, name: '不限', category: 7, symbolSize: 20, description: null },
        { id: 8, name: '技能要求', category: 6, symbolSize: 20, description: null },
        { id: 9, name: '团队发展', category: 6, symbolSize: 20, description: null },
        { id: 10, name: '前端', category: 6, symbolSize: 20, description: null },
        { id: 11, name: 'JavaScript', category: 6, symbolSize: 20, description: null },
        { id: 12, name: 'HTML', category: 6, symbolSize: 20, description: null },
        { id: 13, name: 'CSS3', category: 6, symbolSize: 20, description: null }
      ],
      links: [
        { source: '8', target: '9', score: null },
        { source: '8', target: '10', score: null },
        { source: '8', target: '11', score: null },
        { source: '8', target: '12', score: null },
        { source: '8', target: '13', score: null },
        { source: '1', target: '2', score: null },
        { source: '1', target: '4', score: null },
        { source: '1', target: '6', score: null },
        { source: '1', target: '8', score: null },
        { source: '2', target: '3', score: null },
        { source: '4', target: '5', score: null },
        { source: '6', target: '7', score: null }
      ]
    },
    KG: {
      nodes: [
        { id: 100, name: '简历1', category: 0, symbolSize: 30, description: '简历1得分50.13257142857142427.6', fixed: true, x: 660.8695652173914, y: 141.53846153846155 },
        { id: 101, name: '期待岗位', category: 1, symbolSize: 20, description: '简历1的期望岗位' },
        { id: 102, name: '前端开发工程师', category: 1, symbolSize: 20, description: '期望岗位:前端开发工程师' },
        { id: 103, name: 'Java', category: 1, symbolSize: 20, description: '期望岗位:Java' },
        { id: 110, name: '教育经历', category: 2, symbolSize: 20, description: '简历1的教育经历70分' },
        { id: 111, name: '本科', category: 2, symbolSize: 20, description: '教育经历:本科' },
        { id: 112, name: '计算机科学与技术', category: 2, symbolSize: 20, description: null },
        { id: 113, name: '硕士', category: 2, symbolSize: 20, description: '教育经历:硕士' },
        { id: 114, name: '电子信息', category: 2, symbolSize: 20, description: null },
        { id: 120, name: '资格证书', category: 3, symbolSize: 20, description: null },
        { id: 121, name: '大学英语四级', category: 3, symbolSize: 15, description: null },
        { id: 122, name: '大学英语六级', category: 3, symbolSize: 15, description: null },
        { id: 130, name: '工作/实习经历', category: 4, symbolSize: 20, description: null },
        { id: 140, name: '项目经历', category: 5, symbolSize: 20, description: null },
        { id: 141, name: '语愈-基于多模态情感计算心理危机干预聊天机器人', category: 5, symbolSize: 20, description: null },
        { id: 142, name: '菁華学习行为分析系统', category: 5, symbolSize: 20, description: null },
        { id: 150, name: '技能标签', category: 6, symbolSize: 20, description: null },
        { id: 151, name: 'html', category: 6, symbolSize: 10, description: null },
        { id: 152, name: 'css', category: 6, symbolSize: 10, description: null }
      ],
      links: [
        { source: '100', target: '101', score: '' },
        { source: '101', target: '102', score: '' },
        { source: '101', target: '103', score: '' },
        { source: '100', target: '110', score: '70' },
        { source: '110', target: '111', score: '' },
        { source: '111', target: '112', score: '' },
        { source: '110', target: '113', score: '' },
        { source: '113', target: '114', score: '' },
        { source: '100', target: '120', score: '90' },
        { source: '120', target: '121', score: '' },
        { source: '120', target: '122', score: '' },
        { source: '100', target: '130', score: '60' },
        { source: '100', target: '140', score: '90' },
        { source: '140', target: '141', score: '' },
        { source: '140', target: '142', score: '' },
        { source: '100', target: '150', score: '80' },
        { source: '150', target: '151', score: '' },
        { source: '150', target: '152', score: '' }
      ]
    }
  },
  {
    avatar: 'https://s3.bmp.ovh/imgs/2024/04/08/0d8f4c8bae88b32c.png',
    id: 2,
    name: '王**',
    age: 22,
    education: '本科',
    state: '在校-寻找实习',
    status: '静候佳音',
    type: '实习',
    experience: '在校生',
    educationDetails: {
      university: '上海交通大学',
      major: '计算机工程'
    },
    location: '上海',
    position: '技术运营',
    salary: '10k-20k',
    tags: ['数据分析', '运营策略', '市场调研'],
    skills: [
      { name: '数据分析', proficiency: '中级' },
      { name: '运营策略', proficiency: '中级' },
      { name: '市场调研', proficiency: '中级' }
    ],
    project: {
      name: '社交媒体数据分析',
      description: '在大学期间进行的研究项目'
    },
    internship: {
      name: '技术运营实习',
      description: '在一家互联网初创公司进行的技术运营实习'
    },
    competence: 75.2,
    active: 70
  },
  {
    avatar: 'https://s3.bmp.ovh/imgs/2024/04/08/05d19b0323875adf.png',
    id: 3,
    name: '李**',
    age: 25,
    education: '硕士',
    state: '毕业-寻找工作',
    status: '已处理',
    type: '全职',
    experience: '应届生',
    educationDetails: {
      university: '北京航空航天大学',
      major: '计算机科学与技术'
    },
    location: '北京',
    position: '技术研究-推荐算法方向',
    salary: '30k-35k',
    tags: ['机器学习', '推荐系统', 'Python'],
    skills: [
      { name: '机器学习', proficiency: '高级' },
      { name: '推荐系统', proficiency: '高级' },
      { name: 'Python', proficiency: '高级' }
    ],
    project: {
      name: '电影推荐系统',
      description: '在上一家公司负责设计和开发了一个基于协同过滤的电影推荐系统'
    },
    internship: {
      name: '人工智能研究实习',
      description: '在一家研究机构进行的人工智能研究实习'
    },
    competence: 90.7,
    active: 85
  },
  {
    avatar: 'https://s3.bmp.ovh/imgs/2024/04/08/36d8e4bcaece31be.png',
    id: 4,
    name: '赵**',
    age: 22,
    education: '本科',
    state: '毕业-寻找工作',
    status: '静候佳音',
    type: '全职',
    experience: '应届生',
    educationDetails: {
      university: '哈尔滨工业大学',
      major: '计算机科学与技术'
    },
    location: '哈尔滨',
    position: '技术研究-计算机视觉方向',
    salary: '20k-25k',
    tags: ['图像处理', '模式识别', '深度学习'],
    skills: [
      { name: '图像处理', proficiency: '中级' },
      { name: '模式识别', proficiency: '中级' },
      { name: '深度学习', proficiency: '中级' }
    ],
    project: {
      name: '人脸识别系统',
      description: '在大学期间参与开发了一个基于深度学习的人脸识别系统'
    },
    internship: {
      name: '计算机视觉实习',
      description: '在一家人工智能公司进行的计算机视觉实习'
    },
    competence: 80.5,
    active: 75
  },
  {
    avatar: 'https://s3.bmp.ovh/imgs/2024/04/08/4ed188692b0cd15f.png',
    id: 5,
    name: '陈**',
    age: 21,
    education: '本科',
    state: '在校-寻找实习',
    status: '待处理',
    type: '实习',
    experience: '在校生',
    educationDetails: {
      university: '华南理工大学',
      major: '软件工程'
    },
    location: '广州',
    position: '软件开发-前端开发方向',
    salary: '8k-20k',
    tags: ['Web开发', '前端开发', 'Java'],
    skills: [
      { name: 'Web开发', proficiency: '中级' },
      { name: '前端开发', proficiency: '中级' },
      { name: 'Java', proficiency: '中级' }
    ],
    project: {
      name: '在线购物网站',
      description: '在大学期间参与开发了一个在线购物网站'
    },
    internship: {
      name: '软件开发实习',
      description: '在一家软件公司进行的软件开发实习'
    },
    competence: 75.4,
    active: 70
  },
  {
    avatar: 'https://s3.bmp.ovh/imgs/2024/04/08/cbf038a9dfdba231.png',
    id: 6,
    name: '刘**',
    age: 24,
    education: '本科',
    state: '在职-寻求机会',
    status: '静候佳音',
    type: '全职',
    experience: '3年',
    educationDetails: {
      university: '浙江大学',
      major: '软件工程'
    },
    location: '杭州',
    position: '软件开发-游戏引擎开发方向',
    salary: '15k-30k',
    tags: ['游戏开发', '图形学', 'C++'],
    skills: [
      { name: '游戏开发', proficiency: '中级' },
      { name: '图形学', proficiency: '中级' },
      { name: 'C++', proficiency: '中级' }
    ],
    project: {
      name: '3D游戏引擎',
      description: '在上一家游戏公司负责开发了一款3D游戏引擎'
    },
    internship: {
      name: '游戏开发实习',
      description: '在一家知名游戏公司进行的游戏开发实习'
    },
    competence: 80.2,
    active: 75
  },
  {
    avatar: 'https://s3.bmp.ovh/imgs/2024/04/08/05bef31157d6f81c.png',
    id: 7,
    name: '王**',
    age: 30,
    education: '本科',
    state: '离职-寻找工作',
    status: '已处理',
    type: '全职',
    experience: '8年',
    educationDetails: {
      university: '清华大学',
      major: '计算机科学与技术'
    },
    location: '北京',
    position: '技术研发-推荐算法方向',
    salary: '30k-40k',
    tags: ['大数据', '机器学习', '领导能力'],
    skills: [
      { name: '大数据', proficiency: '高级' },
      { name: '机器学习', proficiency: '高级' },
      { name: '领导能力', proficiency: '高级' }
    ],
    project: {
      name: '智能客服系统',
      description: '在上一家公司负责设计和管理了一个基于大数据和机器学习的智能客服系统'
    },
    internship: {
      name: '人工智能研究实习',
      description: '在一家研究机构进行的人工智能研究实习'
    },
    competence: 95.0,
    active: 90
  },
  {
    avatar: 'https://s3.bmp.ovh/imgs/2024/04/08/a23423ccc18b7244.png',
    id: 8,
    name: '张**',
    age: 27,
    education: '硕士',
    state: '在职-寻求机会',
    status: '待处理',
    type: '全职',
    experience: '4年',
    educationDetails: {
      university: '上海交通大学',
      major: '人工智能'
    },
    location: '上海',
    position: '技术研究-推荐算法方向',
    salary: '35k-40k',
    tags: ['数据分析', '机器学习', 'R'],
    skills: [
      { name: '数据分析', proficiency: '高级' },
      { name: '机器学习', proficiency: '高级' },
      { name: 'R', proficiency: '中级' }
    ],
    project: {
      name: '金融风控模型',
      description: '在上一家金融公司负责开发了一个基于机器学习的金融风控模型'
    },
    internship: {
      name: '数据科学实习',
      description: '在一家大数据公司进行的数据科学实习'
    },
    competence: 90.8,
    active: 85
  },
  {
    avatar: 'https://s3.bmp.ovh/imgs/2024/04/08/4d129e72136d7c04.png',
    id: 9,
    name: '李**',
    age: 28,
    education: '硕士',
    state: '在职-寻求机会',
    status: '待处理',
    type: '全职',
    experience: '5年',
    educationDetails: {
      university: '北京大学',
      major: '计算机科学与技术'
    },
    location: '北京',
    position: '技术研究-推荐算法方向',
    salary: '30k-35k',
    tags: ['大数据', '数据仓库', 'Python'],
    skills: [
      { name: '大数据', proficiency: '中级' },
      { name: '数据仓库', proficiency: '中级' },
      { name: 'Python', proficiency: '中级' }
    ],
    project: {
      name: '数据平台建设',
      description: '在上一家互联网公司负责构建和维护了一个大数据平台'
    },
    internship: {
      name: '数据工程实习',
      description: '在一家科技公司进行的数据工程实习'
    },
    competence: 80.4,
    active: 75
  },
  {
    avatar: 'https://s3.bmp.ovh/imgs/2024/04/08/0d8f4c8bae88b32c.png',
    id: 10,
    name: '赵**',
    age: 25,
    education: '本科',
    state: '毕业-寻找工作',
    status: '待处理',
    type: '全职',
    experience: '应届生',
    educationDetails: {
      university: '复旦大学',
      major: '计算机科学与技术'
    },
    location: '上海',
    position: '软件开发-运营开发方向',
    salary: '6k-15k',
    tags: ['Web开发', '前端开发', 'JavaScript'],
    skills: [
      { name: 'Web开发', proficiency: '中级' },
      { name: '前端开发', proficiency: '中级' },
      { name: 'JavaScript', proficiency: '中级' }
    ],
    project: {
      name: '在线教育平台',
      description: '大学期间参与开发了一个在线教育平台'
    },
    internship: {
      name: '前端开发实习',
      description: '在一家互联网公司进行的前端开发实习'
    },
    competence: 70.7,
    active: 65
  }
]
)

const buttons = ['全部', '静候佳音', '待处理', '已处理']
const activeButton = ref(0)
const positions = ['技术运营', '技术研究-推荐算法方向', '技术研究-计算机视觉方向', '技术研究-计算机图形学方向', '软件开发-运营开发方向', '软件开发-前端开发方向', '软件开发-游戏引擎开发方向', '硬件开发-芯片设计方向', '不限'] // 岗位选项
// 计算下拉框宽度和按钮高度
// 定义处理接受操作的方法
function handleAcceptQianyou (qianyouStatus) {
  console.log('接受操作:', qianyouStatus)
  // 在这里执行处理 qianyou 对象的逻辑，比如更新状态或移除对象
}

function handleRejectFromCard (qianyouStatus) {
  console.log('拒绝操作:', qianyouStatus)
  // 在这里执行处理 qianyou 对象的逻辑，比如更新状态或移除对象
}

const selectPosition = ref('') // 选中的城市
// 根据按钮状态过滤好友列表
// 在 filteredQianyouData 计算属性中添加岗位过滤逻辑
const filteredQianyouData = computed(() => {
  // 过滤按钮状态
  let filteredData = qianyouData.value
  filteredData = filteredData.filter(qianyou => qianyou.status !== '已拒绝')
  if (activeButton.value !== null && activeButton.value !== 0) {
    const status = ['全部', '静候佳音', '待处理', '已处理'][activeButton.value]
    filteredData = filteredData.filter(qianyou => qianyou.status === status)
  }
  // 过滤岗位
  if (selectPosition.value && selectPosition.value !== '不限') {
    filteredData = filteredData.filter(qianyou => qianyou.position === selectPosition.value)
  }
  return filteredData
})

// 切换按钮状态
function toggleButton (index) {
  activeButton.value = index
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

/* 添加岗位筛选按钮样式 */
.filter-button {
  margin-left: 30rem; /* 添加左侧间距 */
  justify-content: center; /* 水平居中 */
  background-color: var(--themeColor);;
  color: #fff;
  border: none;
  border-radius: 0.5rem; /* 圆角边框 */
  width: 8rem !important;
  align-items: center;
  padding: 0.2rem 0.5rem 0.2rem 0.5rem !important
}

/* 下拉框样式 */
.dropdown {
  margin-left: 30rem; /* 添加左侧间距 */
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none; /* 隐藏上边框 */
  border-radius: 0 0 0.5rem 0.5rem; /* 底部圆角 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影 */
}

.dropdown-item {
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f0f0f0; /* 鼠标悬停时的背景颜色 */
}

.qianyou-list {
  width: 80%; /* 占据整个屏幕的宽度 */
}

.qianyou-card {
  width: 100%; /* 占据整个页面的宽度 */
  margin-top: 1rem;
  margin-bottom: 0.8rem; /* 可以调整卡片之间的间距 */
  background-color: white; /* 确保卡片背景为白色 */
}

.frame-style{
  background:rgba(255,255,255, 0.9);
  border-radius:1rem;
  height: 2.6rem;
  margin-left:1rem;
  box-shadow: 0 5px 15px 0 rgba(176,191,231,.4);
}

.jobSelector :deep(.ant-select-selector) {
  font-size: 1.08rem !important;
  background: rgba(255, 255, 255, 0) !important;
  border: none !important;
  box-shadow: none !important;
  color:var(--greyFontColor);
  margin-top: 0.3rem;
}
</style>
