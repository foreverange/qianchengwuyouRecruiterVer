<template>
  <div style="position: relative;">
    <!-- 背景图层 -->
    <div class="bg1"></div>
    <RecruiterNavBar></RecruiterNavBar>
    <div style="margin-top: 3.5rem;">
      <!-- 第一栏 -->
      <div style="display: flex; flex-direction: row; margin-left: 7rem; margin-top: 4rem;">
        <!-- 推荐签友或全部签友选择 -->
        <a-radio-group v-model:value="currentCheckType" @update:modelValue="handleCheckTypeUpdate" class="frame-style">
          <a-radio-button value="recommended" style="margin-top: 0.3rem">推荐签友</a-radio-button>
          <a-radio-button value="all">全部签友</a-radio-button>
        </a-radio-group>
        <a-space class="frame-style">
          <a-select
            ref="select1"
            class="recommendSelector"
            v-model:value="currentRecommend"
            style="width: 11rem; "
            :options="recommendSelectorItems"
          ></a-select>
        </a-space>
        <!-- 换一批按钮 -->
        <div class="frame-style" style="margin-left: 45rem;">
          <a-radio-button @click="handleRefresh" value="换一批" class="refresh-btn">
            <RedoOutlined style="margin-top: 0.7rem;"/>
            换一批
          </a-radio-button>
        </div>
      </div>

      <!-- 第二栏 -->
      <div style="display: flex; flex-direction: row; margin-left: 8rem; margin-top: 1rem;">
        <!-- 搜索框 -->
        <div style="flex: 1;">
          <a-input
            v-model:value="searchKeyword"
            @input="handleSearchUpdate($event.target.value)"
            placeholder="搜索求职者"
            size="large"
          />
        </div>

        <!-- 筛选按钮 -->
        <div class="frame-style" style="">
          <a-radio-button @click="showFilterPopup = true" style="margin-top: 0.3rem">筛选</a-radio-button>
        </div>
      </div>

      <!-- 第三栏 -->
      <div style="display: flex; flex-direction: row; margin-left: 8rem; margin-top: 1rem;">
        <div class="qianyou-list">
          <QianYouCard v-for="(qianyou, index) in filteredQianyouData" :key="index" :qianyou="qianyou" @accept="handleSubmit" />
        </div>
      </div>
    </div>

    <!-- 筛选浮窗 -->
    <div v-if="showFilterPopup" class="filter-popup">
      <div class="filter-popup-content">
        <div class="filter-popup-content-content">
        <!-- 筛选条件 -->
          <h3>筛选条件</h3>

          <!-- 岗位选择框 -->
          <div class="filter-row">
            <span class="filter-label">岗位：</span>
            <a-select style="width: 12rem !important;" v-model:value="selectedPosition" placeholder="选择岗位">
              <!-- 添加默认选项 -->
              <a-select-option value="" disabled>选择岗位</a-select-option>
              <a-select-option value="不限">不限</a-select-option>
              <a-select-option value="技术运营">技术运营</a-select-option>
              <a-select-option value="技术研究-推荐算法方向">技术研究-推荐算法方向</a-select-option>
              <a-select-option value="技术研究-计算机视觉方向">技术研究-计算机视觉方向</a-select-option>
              <a-select-option value="技术研究-计算机图形学方向">技术研究-计算机图形学方向</a-select-option>
              <a-select-option value="软件开发-运营开发方向">软件开发-运营开发方向</a-select-option>
              <a-select-option value="软件开发-前端开发方向">软件开发-前端开发方向</a-select-option>
              <a-select-option value="软件开发-游戏引擎开发方向">软件开发-游戏引擎开发方向</a-select-option>
              <a-select-option value="硬件开发-芯片设计方向">硬件开发-芯片设计方向</a-select-option>
            </a-select>
          </div>

          <!-- 城市选择框 -->
          <div class="filter-row">
            <span class="filter-label">城市：</span>
            <a-select style="width: 7rem !important;" v-model:value="selectedCity" placeholder="选择城市">
              <!-- 添加默认选项 -->
              <a-select-option value="" disabled>选择城市</a-select-option>
              <a-select-option value="北京">北京</a-select-option>
              <a-select-option value="上海">上海</a-select-option>
              <a-select-option value="杭州">杭州</a-select-option>
              <a-select-option value="深圳">深圳</a-select-option>
            </a-select>
          </div>

          <!-- 年龄范围选择 -->
          <div class="filter-row">
            <span class="filter-label">年龄范围：</span>
            <a-input-number v-model:value="minAge" :min="18" :max="60" placeholder="最小年龄" style="width: 100px;"></a-input-number>
            <span style="margin: 0 0.5rem;">-</span>
            <a-input-number v-model:value="maxAge" :min="18" :max="60" placeholder="最大年龄" style="width: 100px;"></a-input-number>
          </div>

          <!-- 学历选择框 -->
          <div class="filter-row">
            <span class="filter-label">学历：</span>
            <a-checkbox-group v-model:value="selectedEducations">
              <a-checkbox value="初中及以下">初中及以下</a-checkbox>
              <a-checkbox value="中专">中专</a-checkbox>
              <a-checkbox value="高中">高中</a-checkbox>
              <a-checkbox value="大专">大专</a-checkbox>
              <a-checkbox value="本科">本科</a-checkbox>
              <a-checkbox value="硕士">硕士研究生</a-checkbox>
              <a-checkbox value="博士">博士研究生</a-checkbox>
            </a-checkbox-group>
          </div>

          <!-- 专业选择框 -->
          <div class="filter-row" style="display: flex;">
            <span class="filter-label" style="flex: 0 0 7rem;">专业：</span>

            <!-- 专业大类选择框 -->
            <a-select v-model:value="selectedMajorCategory" placeholder="选择专业大类" style="flex: 1;">
              <a-select-option v-for="category in majorCategories" :key="category.className" :value="category.className">
                {{ category.className }}
              </a-select-option>
            </a-select>

            <!-- 具体专业选择框 -->
            <a-select v-model:value="selectedMajor" :disabled="!selectedMajorCategory" placeholder="选择具体专业" style="flex: 1; margin-left: 1rem;">
              <a-select-option v-for="major in selectedMajorOptions" :key="major" :value="major">
                {{ major }}
              </a-select-option>
            </a-select>
          </div>

          <!-- 薪资要求范围选择 -->
          <div class="filter-row">
            <span class="filter-label">薪资要求范围：</span>
            <a-input-number v-model:value="minSalary" :min="0" :max="1000000000" placeholder="最低薪资" style="width: 120px;"></a-input-number>
            <span style="margin: 0 0.5rem;">-</span>
            <a-input-number v-model:value="maxSalary" :min="0" :max="1000000000" placeholder="最高薪资" style="width: 120px;"></a-input-number>
          </div>

          <!-- 工作经验选择框 -->
          <div class="filter-row">
            <span class="filter-label">工作经验：</span>
            <a-select style="width: 7rem !important;" v-model:value="selectedExperience" placeholder="选择工作经验">
              <a-select-option value="在校生">在校生</a-select-option>
              <a-select-option value="应届生">应届生</a-select-option>
              <a-select-option value="小于1年">小于1年</a-select-option>
              <a-select-option value="1-3年">1-3年</a-select-option>
              <a-select-option value="3-5年">3-5年</a-select-option>
              <a-select-option value="5-10年">5-10年</a-select-option>
              <a-select-option value="10年以上">10年以上</a-select-option>
              <a-select-option value="不限经验">不限经验</a-select-option>
            </a-select>
          </div>

          <!-- 求职状态选择 -->
          <div class="filter-row">
            <span class="filter-label">求职状态：</span>
            <a-select style="width: 10rem !important" v-model:value="selectedStatus" placeholder="选择求职状态">
              <a-select-option value="不限">不限</a-select-option>
              <a-select-option value="在校-寻找实习">在校-寻找实习</a-select-option>
              <a-select-option value="毕业-寻找工作">毕业-寻找工作</a-select-option>
              <a-select-option value="离职-寻找工作">离职-寻找工作</a-select-option>
              <a-select-option value="在职-寻求机会">在职-寻求机会</a-select-option>
              <!-- 可添加其他求职状态选项 -->
            </a-select>
          </div>

          <!-- 求职类型选择框 -->
          <div class="filter-row">
            <span class="filter-label">求职类型：</span>
            <a-select v-model:value="selectedJobType" placeholder="选择求职类型">
              <a-select-option value="全职">全职</a-select-option>
              <a-select-option value="兼职">兼职</a-select-option>
              <a-select-option value="实习">实习</a-select-option>
              <a-select-option value="不限">不限</a-select-option>
              <!-- 其他求职类型选项 -->
            </a-select>
          </div>

          <!-- 专业技能输入框 -->
          <div class="filter-row">
            <span class="filter-label">专业技能：</span>
            <a-checkbox-group v-model:value="selectedSkills">
              <a-checkbox v-for="skill in skillsData" :key="skill.value" :value="skill.value" style="margin-top: 1rem">{{ skill.label }}</a-checkbox>
            </a-checkbox-group>
          </div>

          <!-- 其他技能输入框 -->
          <div class="filter-row">
            <span class="filter-label">其他技能：</span>
            <a-checkbox-group v-model:value="selectedOtherSkills">
              <a-checkbox v-for="skill in otherSkills" :key="skill.name" :value="skill.name" style="margin-top: 1rem">{{ skill.name }}</a-checkbox>
            </a-checkbox-group>
          </div>

          <!-- 胜任度分数范围选择 -->
          <div class="filter-row">
            <span class="filter-label">胜任度分数范围：</span>
            <a-input-number v-model:value="minCompetence" :min="0" :max="100" placeholder="最低胜任度分数" style="width: 120px;"></a-input-number>
            <span style="margin: 0 0.5rem;">-</span>
            <a-input-number v-model:value="maxCompetence" :min="0" :max="100" placeholder="最高胜任度分数" style="width: 120px;"></a-input-number>
          </div>

          <!-- 确定和关闭按钮 -->
          <div class="filter-buttons">
            <a-button type="primary" @click="applyFilters"  style="margin-right: 1rem;">确定</a-button>
            <a-button @click="showFilterPopup = false">关闭</a-button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import '@/assets/global.css'
import RecruiterNavBar from '@/components/NavBar/RecruiterNavBar.vue'
import QianYouCard from '@/components/Tools/QianYouCard.vue'
import { ref, computed, watch } from 'vue'
import { RedoOutlined } from '@ant-design/icons-vue'
import skillsData from '@/components/Tools/json/简略技能.json'
import otherSkillsData from '@/components/Tools/json/简略资格证书.json'
import majorData from '@/components/Tools/json/大学学科.json'

const selectedMajor = ref('')
const majorCategories = ref(majorData)

const selectedMajorCategory = ref('')
const selectedMajorOptions = ref([])

// 监听专业类别变化
watch(selectedMajorCategory, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    const selectedCategory = majorCategories.value.find(category => category.className === newVal)
    if (selectedCategory) {
      selectedMajorOptions.value = selectedCategory.class.map(major => major.name)
    }
  }
})

const selectedPosition = ref('不限') // 选中的岗位
const selectedCity = ref('') // 选中的城市
const selectedSkills = ref([]) // 选中的专业技能
const selectedOtherSkills = ref([]) // 选中的其他技能
const currentCheckType = ref('recommended') // 当前选中的签友类型
const searchKeyword = ref('') // 当前搜索关键字
const showFilterPopup = ref(false) // 控制筛选浮窗显示与隐藏
const selectedEducations = ref([])
const minAge = ref(18)
const maxAge = ref(60)
const minSalary = ref(0)
const maxSalary = ref(1000000000)
const selectedStatus = ref('不限')
const selectedJobType = ref('不限')
const minCompetence = ref(0) // 默认最低胜任度分数为0
const maxCompetence = ref(100)
const selectedExperience = ref('不限') // 选中的工作经验范围

const qianyouData = ref([
  {
    avatar: 'https://img2.imgtp.com/2024/04/12/wQaKOclD.png',
    id: 1,
    name: '王**',
    age: 25,
    education: '硕士',
    state: '毕业-寻找工作',
    status: '请求简历',
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
    avatar: 'https://s3.bmp.ovh/imgs/2024/04/08/05d19b0323875adf.png',
    id: 2,
    name: '李**',
    age: 22,
    education: '本科',
    state: '毕业-寻找工作',
    type: '全职',
    experience: '应届生',
    educationDetails: {
      university: '北京大学',
      major: '软件工程'
    },
    location: '北京',
    position: '软件开发-前端开发方向',
    salary: '10k-15k',
    tags: ['Python', 'Django', 'Linux'],
    skills: [
      { name: 'Python', proficiency: '中级' },
      { name: 'Django', proficiency: '中级' },
      { name: 'Linux', proficiency: '中级' }
    ],
    project: {
      name: '在线音乐平台',
      description: '使用Python和Django开发的在线音乐平台'
    },
    internship: { },
    competence: 92.1,
    active: 81,
    status: '请求简历'
  },
  {
    avatar: 'https://s3.bmp.ovh/imgs/2024/04/08/36d8e4bcaece31be.png',
    id: 3,
    name: '王**',
    age: 25,
    education: '硕士',
    state: '毕业-寻找工作',
    type: '全职',
    experience: '应届生',
    educationDetails: {
      university: '上海交通大学',
      major: '计算机科学与工程'
    },
    location: '上海',
    position: '软件开发-后端开发方向',
    salary: '8k-15k',
    tags: ['C++', 'Linux', '数据结构'],
    skills: [
      { name: 'C++', proficiency: '高级' },
      { name: 'Linux', proficiency: '中级' },
      { name: '数据结构', proficiency: '高级' }
    ],
    project: {},
    internship: {
      name: '软件工程实习',
      description: '在一家知名科技公司进行的软件工程实习'
    },
    competence: 95.7,
    active: 88,
    status: '请求简历'
  },
  {
    avatar: 'https://s3.bmp.ovh/imgs/2024/04/08/4ed188692b0cd15f.png',
    id: 4,
    name: '陈**',
    age: 22,
    education: '本科',
    state: '在校-寻找实习',
    type: '实习',
    experience: '在校生',
    educationDetails: {
      university: '华中科技大学',
      major: '软件工程'
    },
    location: '上海',
    position: '软件开发-前端开发方向',
    salary: '8k-20k',
    tags: ['JavaScript', 'React', 'CSS'],
    skills: [
      { name: 'JavaScript', proficiency: '中级' },
      { name: 'React', proficiency: '中级' },
      { name: 'CSS', proficiency: '中级' }
    ],
    project: {
      name: '在线教育平台',
      description: '使用React和JavaScript开发的在线教育平台'
    },
    internship: {
      name: '前端开发实习',
      description: '在一家互联网公司进行的前端开发实习'
    },
    competence: 85.9,
    active: 79,
    status: '请求简历'
  },
  {
    avatar: 'https://s3.bmp.ovh/imgs/2024/04/08/cbf038a9dfdba231.png',
    id: 5,
    name: '刘**',
    age: 27,
    education: '本科',
    state: '在职-寻求机会',
    type: '全职',
    experience: '4年',
    educationDetails: {
      university: '北京航空航天大学',
      major: '软件工程'
    },
    location: '北京',
    position: '技术运营',
    salary: '6k-12k',
    tags: ['Python', '数据分析', '项目管理'],
    skills: [
      { name: 'Python', proficiency: '中级' },
      { name: '数据分析', proficiency: '中级' },
      { name: '项目管理', proficiency: '高级' }
    ],
    project: {
      name: '数据分析平台',
      description: '负责设计和开发基于Python的数据分析平台'
    },
    internship: {
      name: '软件开发实习',
      description: '在一家知名科技公司进行的软件开发实习'
    },
    competence: 90,
    active: 82,
    status: '请求简历'
  },
  {
    avatar: 'https://s3.bmp.ovh/imgs/2024/04/08/4ed188692b0cd15f.png',
    id: 6,
    name: '张**',
    age: 28,
    education: '硕士',
    state: '在职-寻求机会',
    type: '全职',
    experience: '5年',
    educationDetails: {
      university: '上海交通大学',
      major: '计算机科学与工程'
    },
    location: '上海',
    position: '未知',
    salary: '10k-20k',
    tags: ['机器学习', '推荐系统', '数据挖掘'],
    skills: [
      { name: '机器学习', proficiency: '高级' },
      { name: '推荐系统', proficiency: '高级' },
      { name: '数据挖掘', proficiency: '高级' }
    ],
    project: {
      name: '个性化推荐系统',
      description: '研发了一种基于机器学习的个性化推荐系统'
    },
    internship: {
      name: '研究助理',
      description: '在一家科研机构从事推荐算法研究'
    },
    competence: 92.3,
    active: 90,
    status: '请求简历'
  },
  {
    avatar: 'https://s3.bmp.ovh/imgs/2024/04/08/05bef31157d6f81c.png',
    id: 7,
    name: '李**',
    age: 21,
    education: '本科',
    state: '在校-寻找实习',
    type: '实习',
    experience: '在校生',
    educationDetails: {
      university: '华南理工大学',
      major: '计算机科学与技术'
    },
    location: '杭州',
    position: '软件开发-前端开发方向',
    salary: '8k-19k',
    tags: ['Java', 'JavaScript', '数据库'],
    skills: [
      { name: 'Java', proficiency: '中级' },
      { name: 'JavaScript', proficiency: '中级' },
      { name: '数据库', proficiency: '中级' }
    ],
    project: {
      name: '在线学习平台',
      description: '使用Java和JavaScript开发的在线学习平台'
    },
    internship: {
      name: '软件开发实习',
      description: '在一家知名互联网公司进行的软件开发实习'
    },
    competence: 88.7,
    active: 75,
    status: '请求简历'
  },
  {
    avatar: 'https://s3.bmp.ovh/imgs/2024/04/08/a23423ccc18b7244.png',
    id: 8,
    name: '陈**',
    age: 29,
    education: '硕士',
    state: '在职-寻求机会',
    type: '全职',
    experience: '6年',
    educationDetails: {
      university: '厦门大学',
      major: '计算机科学与技术'
    },
    location: '北京',
    position: '技术研究-计算机视觉方向',
    salary: '30k-35k',
    tags: ['计算机视觉', '图像处理', '深度学习'],
    skills: [
      { name: '计算机视觉', proficiency: '高级' },
      { name: '图像处理', proficiency: '高级' },
      { name: '深度学习', proficiency: '高级' }
    ],
    project: {
      name: '目标检测系统',
      description: '开发了一个基于计算机视觉的目标检测系统'
    },
    internship: {
      name: '研究助理',
      description: '在一家科研机构从事计算机视觉研究'
    },
    competence: 92.1,
    active: 90,
    status: '请求简历'
  },
  {
    avatar: 'https://s3.bmp.ovh/imgs/2024/04/08/4ed188692b0cd15f.png',
    id: 9,
    name: '王**',
    age: 30,
    education: '硕士',
    state: '在职-寻求机会',
    type: '全职',
    experience: '7年',
    educationDetails: {
      university: '清华大学',
      major: '微电子学与固体电子学'
    },
    location: '北京',
    position: '硬件开发-芯片设计方向',
    salary: '20k-35k',
    tags: ['芯片设计', 'Verilog', 'FPGA'],
    skills: [
      { name: '芯片设计', proficiency: '高级' },
      { name: 'Verilog', proficiency: '高级' },
      { name: 'FPGA', proficiency: '高级' }
    ],
    project: {
      name: '高性能处理器设计',
      description: '参与了一款高性能处理器的设计与验证'
    },
    internship: {
      name: '芯片设计实习',
      description: '在一家知名半导体公司进行的芯片设计实习'
    },
    competence: 95.0,
    active: 95,
    status: '请求简历'
  },
  {
    avatar: 'https://s3.bmp.ovh/imgs/2024/04/08/05bef31157d6f81c.png',
    id: 10,
    name: '张**',
    age: 26,
    education: '本科',
    state: '离职-寻找工作',
    type: '全职',
    experience: '4年',
    educationDetails: {
      university: '上海科技大学',
      major: '电子信息科学与技术'
    },
    location: '上海',
    position: '软件开发-游戏引擎开发方向',
    salary: '20k-25k',
    tags: ['游戏开发', 'C++', '图形渲染'],
    skills: [
      { name: '游戏开发', proficiency: '中级' },
      { name: 'C++', proficiency: '中级' },
      { name: '图形渲染', proficiency: '中级' }
    ],
    project: {
      name: '3D游戏引擎开发',
      description: '参与开发了一款基于C++的3D游戏引擎'
    },
    internship: {
      name: '游戏开发实习',
      description: '在一家游戏公司进行的游戏开发实习'
    },
    competence: 88.6,
    active: 80,
    status: '请求简历'
  },
  {
    avatar: 'https://s3.bmp.ovh/imgs/2024/04/08/05d19b0323875adf.png',
    id: 11,
    name: '李**',
    age: 25,
    education: '硕士',
    state: '在校-寻找实习',
    type: '实习',
    experience: '在校生',
    educationDetails: {
      university: '北京大学',
      major: '市场营销'
    },
    location: '北京',
    position: '市场营销-品牌推广方向',
    salary: '30k-35k',
    tags: ['品牌推广', '市场调研', '广告策划'],
    skills: [
      { name: '品牌推广', proficiency: '高级' },
      { name: '市场调研', proficiency: '高级' },
      { name: '广告策划', proficiency: '高级' }
    ],
    project: {
      name: '品牌推广活动',
      description: '负责策划和执行一系列品牌推广活动'
    },
    internship: {
      name: '市场营销实习',
      description: '在一家知名消费品公司进行的市场营销实习'
    },
    competence: 75.2,
    active: 90,
    status: '请求简历'
  },
  {
    avatar: 'https://s3.bmp.ovh/imgs/2024/04/08/4ed188692b0cd15f.png',
    id: 12,
    name: '王**',
    age: 27,
    education: '本科',
    state: '在职-寻求机会',
    type: '全职',
    experience: '5年',
    educationDetails: {
      university: '上海复旦大学',
      major: '市场营销'
    },
    location: '上海',
    position: '市场营销-数字营销方向',
    salary: '25k-30k',
    tags: ['数字营销', '社交媒体', '数据分析'],
    skills: [
      { name: '数字营销', proficiency: '中级' },
      { name: '社交媒体', proficiency: '中级' },
      { name: '数据分析', proficiency: '中级' }
    ],
    project: {
      name: '数字营销策略',
      description: '负责制定和执行数字营销策略，提升品牌曝光度'
    },
    internship: {
      name: '市场营销实习',
      description: '在一家数字营销机构进行的市场营销实习'
    },
    competence: 60.6,
    active: 85,
    status: '请求简历'
  },
  {
    avatar: 'https://s3.bmp.ovh/imgs/2024/04/08/4d129e72136d7c04.png',
    id: 13,
    name: '张**',
    age: 28,
    education: '本科',
    state: '在职-寻求机会',
    type: '全职',
    experience: '5年',
    educationDetails: {
      university: '华东师范大学',
      major: '人力资源管理'
    },
    location: '上海',
    position: '人力资源-招聘方向',
    salary: '6k-18k',
    tags: ['招聘', '人才管理', '面试'],
    skills: [
      { name: '招聘', proficiency: '高级' },
      { name: '人才管理', proficiency: '高级' },
      { name: '面试', proficiency: '高级' }
    ],
    project: {
      name: '招聘流程优化',
      description: '负责优化公司的招聘流程，提高招聘效率'
    },
    internship: {
      name: '人力资源实习',
      description: '在一家知名企业的人力资源部门进行的实习'
    },
    competence: 77.2,
    active: 85,
    status: '请求简历'
  },
  {
    avatar: 'https://s3.bmp.ovh/imgs/2024/04/08/0d8f4c8bae88b32c.png',
    id: 14,
    name: '刘**',
    age: 31,
    education: '硕士',
    state: '在职-寻求机会',
    type: '全职',
    experience: '7年',
    educationDetails: {
      university: '北京大学',
      major: '人力资源管理'
    },
    location: '北京',
    position: '人力资源-培训发展方向',
    salary: '25k-30k',
    tags: ['培训', '绩效管理', '员工发展'],
    skills: [
      { name: '培训', proficiency: '高级' },
      { name: '绩效管理', proficiency: '高级' },
      { name: '员工发展', proficiency: '高级' }
    ],
    project: {
      name: '员工培训计划',
      description: '负责制定和实施公司的员工培训计划'
    },
    internship: {
      name: '人力资源实习',
      description: '在一家跨国公司的人力资源部门进行的实习'
    },
    competence: 71.2,
    active: 90,
    status: '请求简历'
  },
  {
    avatar: 'https://s3.bmp.ovh/imgs/2024/04/08/4d129e72136d7c04.png',
    id: 15,
    name: '陈**',
    age: 22,
    education: '本科',
    state: '毕业-寻找工作',
    type: '全职',
    experience: '应届生',
    educationDetails: {
      university: '北京邮电大学',
      major: '计算机科学与技术'
    },
    location: '北京',
    position: '软件开发-后端开发方向',
    salary: '8k-20k',
    tags: ['Java', 'Spring', '数据库'],
    skills: [
      { name: 'Java', proficiency: '高级' },
      { name: 'Spring', proficiency: '高级' },
      { name: '数据库', proficiency: '高级' }
    ],
    project: {
      name: '电商平台后端开发',
      description: '参与开发了一款电商平台的后端系统，负责核心功能的实现'
    },
    internship: {
      name: '软件开发实习',
      description: '在一家互联网公司进行的软件开发实习'
    },
    competence: 92.1,
    active: 88,
    status: '请求简历'
  },
  {
    avatar: 'https://s3.bmp.ovh/imgs/2024/04/08/05bef31157d6f81c.png',
    id: 16,
    name: '李**',
    age: 25,
    education: '硕士',
    state: '毕业-寻找工作',
    type: '全职',
    experience: '应届生',
    educationDetails: {
      university: '上海交通大学',
      major: '计算机工程'
    },
    location: '上海',
    position: '软件开发-前端开发方向',
    salary: '10k-20k',
    tags: ['JavaScript', 'React', '前端框架'],
    skills: [
      { name: 'JavaScript', proficiency: '高级' },
      { name: 'React', proficiency: '高级' },
      { name: '前端框架', proficiency: '高级' }
    ],
    project: {
      name: '企业级前端应用开发',
      description: '参与开发了一款复杂的企业级前端应用，负责页面交互和数据展示'
    },
    internship: {
      name: '前端开发实习',
      description: '在一家互联网公司进行的前端开发实习'
    },
    competence: 90.2,
    active: 90,
    status: '请求简历'
  },
  {
    avatar: 'https://s3.bmp.ovh/imgs/2024/04/08/a23423ccc18b7244.png',
    id: 17,
    name: '王**',
    age: 26,
    education: '本科',
    state: '在职-寻求机会',
    type: '全职',
    experience: '3年',
    educationDetails: {
      university: '清华大学',
      major: '软件工程'
    },
    location: '北京',
    position: '技术研究-推荐算法方向',
    salary: '25k-30k',
    tags: ['数据分析', 'Python', '机器学习'],
    skills: [
      { name: '数据分析', proficiency: '高级' },
      { name: 'Python', proficiency: '高级' },
      { name: '机器学习', proficiency: '中级' }
    ],
    project: {
      name: '用户行为分析',
      description: '负责对用户行为数据进行分析，提供业务决策支持'
    },
    internship: {
      name: '数据分析实习',
      description: '在一家大数据公司进行的数据分析实习'
    },
    competence: 88.3,
    active: 85,
    status: '请求简历'
  },
  {
    avatar: 'https://s3.bmp.ovh/imgs/2024/04/08/05d19b0323875adf.png',
    id: 18,
    name: '刘**',
    age: 29,
    education: '硕士',
    state: '在职-寻求机会',
    type: '全职',
    experience: '5年',
    educationDetails: {
      university: '复旦大学',
      major: '计算机应用技术'
    },
    location: '上海',
    position: '技术研究-推荐算法方向',
    salary: '30k-35k',
    tags: ['大数据', '数据仓库', 'ETL'],
    skills: [
      { name: '大数据', proficiency: '高级' },
      { name: '数据仓库', proficiency: '高级' },
      { name: 'ETL', proficiency: '高级' }
    ],
    project: {
      name: '数据平台建设',
      description: '参与构建和维护公司的数据平台，负责数据处理和数据流程优化'
    },
    internship: {
      name: '数据工程实习',
      description: '在一家科技公司进行的数据工程实习'
    },
    competence: 88.5,
    active: 90,
    status: '请求简历'
  },
  {
    avatar: 'https://s3.bmp.ovh/imgs/2024/04/08/4d129e72136d7c04.png',
    id: 19,
    name: '杨**',
    age: 25,
    education: '本科',
    state: '离职-寻找工作',
    type: '全职',
    experience: '2年',
    educationDetails: {
      university: '上海交通大学',
      major: '计算机科学与技术'
    },
    location: '上海',
    position: '网络安全工程师',
    salary: '20k-25k',
    tags: ['网络安全', '漏洞分析', '安全策略'],
    skills: [
      { name: '网络安全', proficiency: '高级' },
      { name: '漏洞分析', proficiency: '中级' },
      { name: '安全策略', proficiency: '中级' }
    ],
    project: {
      name: '网络安全风险评估',
      description: '负责进行网络安全风险评估，提出安全改进建议'
    },
    internship: {
      name: '网络安全实习',
      description: '在一家互联网公司进行的网络安全实习'
    },
    competence: 85.7,
    active: 80,
    status: '请求简历'
  },
  {
    avatar: 'https://s3.bmp.ovh/imgs/2024/04/08/36d8e4bcaece31be.png',
    id: 20,
    name: '张**',
    age: 28,
    education: '硕士',
    state: '离职-寻找工作',
    type: '全职',
    experience: '4年',
    educationDetails: {
      university: '清华大学',
      major: '信息安全'
    },
    location: '北京',
    position: '系统架构师',
    salary: '40k-50k',
    tags: ['系统架构', '云计算', '微服务'],
    skills: [
      { name: '系统架构', proficiency: '高级' },
      { name: '云计算', proficiency: '高级' },
      { name: '微服务', proficiency: '高级' }
    ],
    project: {
      name: '大规模分布式系统设计',
      description: '参与设计和构建了一款大规模分布式系统，负责系统架构和技术选型'
    },
    internship: {
      name: '系统架构实习',
      description: '在一家科技公司进行的系统架构实习'
    },
    competence: 92.6,
    active: 90,
    status: '请求简历'
  }
]
)
// TODO：请求数据
// const fetchUserData = async () => {
//   try {
//     const data = {
//     }
//     const response = await postUserData(data)
//     // 处理响应数据
//     console.log(response.data)
//     qianyouData.value = response.data
//   } catch (error) {
//     // 处理错误
//     console.error(error)
//   }
// }
// // 页面渲染时获取数据
// onMounted(() => {
//   fetchUserData()
// })

const otherSkills = ref([])

// 将其他技能数据赋值给otherSkills
otherSkills.value = otherSkillsData.certification.flatMap(category =>
  category.list.map(certification => ({
    name: certification.name,
    abbreviation: certification.abbreviation
  }))
)

const currentRecommend = ref('签程推荐')
const recommendSelectorItems = ref([
  {
    value: '签程推荐',
    label: '签程推荐'
  },
  {
    value: '按胜任度推荐',
    label: '按胜任度推荐'
  },
  {
    value: '按签友活跃度',
    label: '按签友活跃度'
  }
])

// 根据选择过滤求职者数据
const filteredQianyouData = computed(() => {
  let filteredData = qianyouData.value.slice() // 创建数据副本以避免直接修改源数据
  // 根据当前选择的推荐方式进行排序
  if (currentRecommend.value === '签程推荐') {
    // 按照胜任度（competence）占比80%和活跃度（active）占比20%的方式进行排序
    filteredData.sort((a, b) => {
      const aScore = a.competence * 0.8 + a.active * 0.2
      const bScore = b.competence * 0.8 + b.active * 0.2
      return bScore - aScore
    })
  } else if (currentRecommend.value === '按胜任度推荐') {
    // 按照胜任度大小从大到小进行排序
    filteredData.sort((a, b) => b.competence - a.competence)
  } else if (currentRecommend.value === '按签友活跃度') {
    // 按照活跃度从大到小进行排序
    filteredData.sort((a, b) => b.active - a.active)
  }
  if (selectedPosition.value !== '不限') {
    filteredData = filteredData.filter(qianyou => qianyou.position === selectedPosition.value)
  }
  // 根据选择的城市过滤数据
  if (selectedCity.value) {
    filteredData = filteredData.filter(qianyou => qianyou.location === selectedCity.value)
  }
  // 根据选择的年龄过滤数据
  filteredData = filteredData.filter(qianyou => qianyou.age >= minAge.value && qianyou.age <= maxAge.value)
  // 根据选择的学历过滤数据
  if (selectedEducations.value.length > 0) {
    filteredData = filteredData.filter(qianyou => selectedEducations.value.includes(qianyou.education))
  }
  // 根据专业筛选
  if (selectedMajor.value) {
    filteredData = filteredData.filter(qianyou => qianyou.educationDetails.major === selectedMajor.value)
  }
  // 根据薪资要求范围过滤数据
  filteredData = filteredData.filter(qianyou => {
    const [min, max] = qianyou.salary.split('-').map(s => parseInt(s.replace('k', '')) * 1000) // 解析薪资范围，并转换为数字
    return minSalary.value <= max && maxSalary.value >= min // 检查是否在薪资范围内
  })
  // 根据选择的工作经验过滤求职者数据
  filteredData = filteredData.filter(qianyou => {
    if (selectedExperience.value === '不限经验') {
      return true // 不限经验，不做过滤
    } else if (selectedExperience.value === '在校生') {
      return qianyou.experience === '在校生'
    } else if (selectedExperience.value === '应届生') {
      return qianyou.experience === '应届生'
    } else if (selectedExperience.value === '小于1年') {
      return parseInt(qianyou.experience) < 1
    } else if (selectedExperience.value === '1-3年') {
      return parseInt(qianyou.experience) >= 1 && parseInt(qianyou.experience) <= 3
    } else if (selectedExperience.value === '3-5年') {
      return parseInt(qianyou.experience) >= 3 && parseInt(qianyou.experience) <= 5
    } else if (selectedExperience.value === '5-10年') {
      return parseInt(qianyou.experience) >= 5 && parseInt(qianyou.experience) <= 10
    } else if (selectedExperience.value === '10年以上') {
      return parseInt(qianyou.experience) >= 10
    } else return true
  })
  // 根据求职状态过滤数据
  if (selectedStatus.value !== '不限') {
    filteredData = filteredData.filter(qianyou => qianyou.state === selectedStatus.value)
  }
  // 根据求职类型过滤数据
  if (selectedJobType.value !== '不限') {
    filteredData = filteredData.filter(qianyou => qianyou.type === selectedJobType.value)
  }
  // 根据选择的专业技能过滤数据
  if (selectedSkills.value.length > 0) {
    filteredData = filteredData.filter(qianyou => {
      // 判断求职者是否具有所选的任何一个专业技能
      return selectedSkills.value.some(skill => qianyou.skills.map(s => s.name).includes(skill))
    })
  }
  // 根据用户选择的其他技能过滤数据
  if (selectedOtherSkills.value.length > 0) {
    filteredData = filteredData.filter(qianyou => {
      // 判断求职者是否具有所选的任何一个其他技能
      return selectedOtherSkills.value.some(skill => qianyou.skills.map(s => s.name).includes(skill))
    })
  }
  // 根据胜任度分数过滤数据
  filteredData = filteredData.filter(qianyou => {
    const competence = qianyou.competence
    return competence >= minCompetence.value && competence <= maxCompetence.value
  })
  // 添加搜索逻辑，根据搜索关键字过滤数据
  if (searchKeyword.value.trim() !== '') {
    const keyword = searchKeyword.value.trim().toLowerCase() // 将搜索关键字转换为小写并去除两端空格
    filteredData = filteredData.filter(qianyou => {
      // 在这里定义您的搜索逻辑，您可以根据姓名、位置、岗位等字段进行搜索
      return (
        qianyou.name.toLowerCase().includes(keyword) || // 根据姓名搜索
        qianyou.location.toLowerCase().includes(keyword) || // 根据位置搜索
        qianyou.position.toLowerCase().includes(keyword) ||// 根据岗位搜索
        qianyou.educationDetails.university.toLowerCase().includes(keyword) ||// 根据学校搜索
        qianyou.educationDetails.major.toLowerCase().includes(keyword) // 根据专业搜索
        // 添加其他字段的搜索逻辑
      )
    })
  }
  // 其他筛选条件可以在此处继续添加
  return filteredData
})

const applyFilters = () => {
  // 根据选择的筛选条件对求职者数据进行过滤
  filteredQianyouData.value = qianyouData.value.filter(qianyou => {
    // 在这里添加您的筛选逻辑，根据选择的条件过滤求职者数据
    // 示例：根据选中的岗位进行过滤
    return qianyou.position === selectedPosition.value
  })
  // 关闭筛选浮窗
  showFilterPopup.value = false
}

// 处理签友类型更新
const handleCheckTypeUpdate = (value) => {
  currentCheckType.value = value
}

// 处理搜索更新
const handleSearchUpdate = (value) => {
  searchKeyword.value = value
}

// 维护一个变量存储当前显示的求职者列表
const displayedQianyouData = ref([])

// 初始化时从总数据源中选择一批求职者数据显示
displayedQianyouData.value = qianyouData.value.slice(0, 3)

// 处理换一批操作
const handleRefresh = () => {
  // 重新选择一批不同于当前显示的求职者数据
  const startIndex = Math.floor(Math.random() * (qianyouData.value.length - 3)) // 随机选择起始索引
  displayedQianyouData.value = qianyouData.value.slice(startIndex, startIndex + 3)
  console.log('按钮被点击了') // 确保按钮点击事件被正确触发
}

function handleSubmit (qianyouStatus) {
  console.log('提交操作:', qianyouStatus)
  // 在这里执行处理 qianyou 对象的逻辑，比如更新状态或移除对象
}
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}

.qianyou-list {
  display: flex;
  flex-direction: column;
  width: 100%; /* 占据整个页面的宽度 */
}

.qianyou-card {
  width: 100%; /* 占据整个页面的宽度 */
  margin-top: 1rem;
  margin-bottom: 0.8rem; /* 可以调整卡片之间的间距 */
  background-color: white; /* 确保卡片背景为白色 */
}

:deep(.ant-radio-button-wrapper){
  border: none !important;
  box-shadow: none !important;
  font-size: 1.15rem !important;
  color: var(--greyFontColor);
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

:deep(.ant-input){
  border-radius: 0.8rem;
  border-color: white;
  box-shadow: 0 5px 5px 0 rgba(176, 191, 231, .25);
  background: rgba(255, 255, 255);
  border-width: 0.08rem;
}

:deep(.ant-input:hover){
  box-shadow: 0 5px 10px 0 rgba(176, 191, 231, .5);
}

/* 筛选浮窗样式 */
.filter-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.filter-popup-content {
  max-width: 50rem;
  max-height: 80vh; /* 设置最大高度为视口高度的70% */
  padding: 0rem 3.5rem 2.2rem 3.5rem;
}

.filter-popup-content-content {
  border-top: 3rem solid white; /* 添加白色的上边框 */
  max-width: 45rem;
  max-height: calc(70vh - 4.2rem); /* 设置最大高度为视口高度的70%，减去标题和底部的内边距 */
  overflow-y: auto; /* 允许垂直滚动 */
  background: white;
  padding: 0rem 3.5rem 2.2rem 3.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  line-height: 2rem;
}

/* 筛选条件行样式 */
.filter-row {
  margin-bottom: 1rem;
}

/* 筛选条件标签样式 */
.filter-label {
  margin-right: 1rem;
}

/* 确定和关闭按钮样式 */
.filter-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 3rem;
}

.recommendSelector :deep(.ant-select-selector) {
  font-size: 1.08rem !important;
  background: rgba(255, 255, 255, 0) !important;
  border: none !important;
  box-shadow: none !important;
  color:var(--greyFontColor);
}
</style>
