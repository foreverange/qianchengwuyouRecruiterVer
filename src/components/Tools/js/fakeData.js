// jobData.js

export const fakeJobList = [
  {
    id: 0,
    workTime: '3天/周 3个月',
    tags: ['JavaScript', 'Vue.js', 'HTML/CSS'],
    title: '前端开发',
    salary: '20-40k',
    company: '签程无忧电子科技公司',
    location: '上海市',
    experience: '3-5 年',
    education: '本科',
    matchScore: '92',
    description: '招聘对象：2025年可拿毕业证国内本硕学生+2024年9月-2025年9月可拿毕业证海外本硕留学生（实习时长最低2个月，最长可任选从2024年6月延续到拿毕业证）\n' +
      '任职要求：1、计算机、软件、通信、数学、自动化等相关专业优先；\n' +
      '2、热爱研发，基础扎实，熟练掌握但不限Java/go/C++/C/Python等编程语言中的一种或数种，有良好的编程习惯；\n' +
      '3、认可签程无忧文化，具备独立工作能力、善于沟通，热衷新技术；\n' +
      '4、优选条件：\n' +
      '（1）熟悉TCP/IP协议及互联网常见应用和协议的原理；\n' +
      '（2）不满足课堂所学，在校期间积极参加校内外软件编程大赛；\n' +
      '\n' +
      '岗位福利：免费夜宵、班车，周二运动日，研究所多样兴趣社团，工作之余碰撞同好~\n',
    hrAvatar: 'https://via.placeholder.com/64',
    hrName: '李明',
    hrPosition: 'HR Manager',
    companyLogo: 'https://via.placeholder.com/32',
    lastActiveTime: '2024年3月27日',
    state: {
      isLiked: '喜欢',
      isDisliked: '不喜欢',
      isSubmitted: '投递简历',
      isRefused: '',
      isSucceed: ''
    },
    checked: false,
    KG: {
      nodes: [
        { name: '前端开发', symbolSize: 30, category: 8, description: '' },
        { name: '职位需求', symbolSize: 20, category: 1, description: '' },
        { name: '前端开发工程师', symbolSize: 20, category: 1, description: '' },
        { name: '学历要求', symbolSize: 20, category: 2, description: '' },
        { name: '本科', symbolSize: 20, category: 2, description: '' },
        { name: '经验要求', symbolSize: 20, category: 7, description: '' },
        { name: '3-5 年', symbolSize: 20, category: 7, description: '' },
        { name: '技能要求', symbolSize: 15, category: 6 },
        { name: 'JavaScript', symbolSize: 20, category: 6 },
        { name: 'Vue.js', symbolSize: 20, category: 6 },
        { name: 'HTML/CSS', symbolSize: 20, category: 6 }
      ],
      links: [
        { source: '前端开发', target: '职位需求', score: '' },
        { source: '职位需求', target: '前端开发工程师', score: '' },
        { source: '前端开发', target: '学历要求', score: '' },
        { source: '学历要求', target: '本科', score: '' },
        { source: '前端开发', target: '经验要求', score: '' },
        { source: '经验要求', target: '3-5 年', score: '' },
        { source: '前端开发', target: '技能要求', score: '' },
        { source: '技能要求', target: 'JavaScript', score: '' },
        { source: '技能要求', target: 'Vue.js', score: '' },
        { source: '技能要求', target: 'HTML/CSS', score: '' }
      ]
    }
  },
  {
    id: 1,
    workTime: '3天/周 3个月',
    tags: ['JavaScript', 'Vue.js'],
    title: '前端',
    salary: '20-40k',
    company: 'A公司',
    location: '上海市',
    experience: '3-5 年',
    education: '本科',
    matchScore: '89',
    description: '这里是职位描述...',
    hrAvatar: 'https://via.placeholder.com/64',
    hrName: '李明',
    hrPosition: 'HR Manager',
    companyLogo: 'https://via.placeholder.com/32',
    lastActiveTime: '2024年3月27日',
    state: {
      isLiked: '喜欢',
      isDisliked: '不喜欢',
      isSubmitted: '投递简历',
      isRefused: '',
      isSucceed: '签约成功'
    },
    checked: false,
    KG: {
      nodes: [
        { name: '前端', symbolSize: 30, category: 8, description: '' },
        { name: '职位需求', symbolSize: 20, category: 1, description: '' },
        { name: '前端开发工程师', symbolSize: 20, category: 1, description: '' },
        { name: '学历要求', symbolSize: 20, category: 2, description: '' },
        { name: '本科', symbolSize: 20, category: 2, description: '' },
        { name: '经验要求', symbolSize: 20, category: 7, description: '' },
        { name: '3-5 年', symbolSize: 20, category: 7, description: '' },
        { name: '技能要求', symbolSize: 15, category: 6 },
        { name: 'JavaScript', symbolSize: 20, category: 6 },
        { name: 'Vue.js', symbolSize: 20, category: 6 }
      ],
      links: [
        { source: '前端', target: '职位需求', score: '' },
        { source: '职位需求', target: '前端开发工程师', score: '' },
        { source: '前端', target: '学历要求', score: '' },
        { source: '学历要求', target: '本科', score: '' },
        { source: '前端', target: '经验要求', score: '' },
        { source: '经验要求', target: '3-5 年', score: '' },
        { source: '前端', target: '技能要求', score: '' },
        { source: '技能要求', target: 'JavaScript', score: '' },
        { source: '技能要求', target: 'Vue.js', score: '' }
      ]
    }
  },
  {
    id: 7,
    workTime: '3天/周 3个月',
    tags: ['HTML', 'CSS', 'JavaScript'],
    title: '前端开发（接受实习生）',
    salary: '不限',
    company: '遵义小红椒网络科技有限公司',
    location: '遵义市',
    experience: '在校生',
    education: '大专',
    matchScore: '92',
    description: '任职要求：1、精通HTML/CSS/JavaScript，有良好的编码习惯，有代码洁癖者优先；2、熟悉JS技术，包括AJAX、DOM、JSON、熟悉Vue；3、较强的学习能力、逻辑思维能力、良好的沟通能力、团队协作精神；4、有常见框架（uni/Element）项目经验者优先。5、熟悉小程序，公众号开发优先考虑招聘说明：优先考虑22年毕业生，要求有一定实践经验，肯吃苦，学习沟通能力强',
    hrAvatar: 'https://via.placeholder.com/64',
    hrName: '张先生',
    hrPosition: 'HR Manager',
    companyLogo: 'https://via.placeholder.com/32',
    lastActiveTime: '3日内活跃',
    state: {
      isLiked: '喜欢该岗位',
      isDisliked: '不喜欢',
      isSubmitted: '投递简历',
      isRefused: '',
      isSucceed: ''
    },
    checked: false,
    KG: {
      nodes: [
        { name: '前端开发（接受实习生）', symbolSize: 30, category: 8, description: '' },
        { name: '职位需求', symbolSize: 20, category: 1, description: '' },
        { name: '前端开发工程师', symbolSize: 15, category: 1, description: '' },
        { name: '学历要求', symbolSize: 20, category: 2, description: '' },
        { name: '大专', symbolSize: 15, category: 2, description: '' },
        { name: '经验要求', symbolSize: 20, category: 7, description: '' },
        { name: '在校生', symbolSize: 15, category: 7, description: '' },
        { name: '技能要求', symbolSize: 20, category: 6 },
        { name: 'HTML', symbolSize: 10, category: 6 },
        { name: 'CSS', symbolSize: 10, category: 6 },
        { name: 'JavaScript', symbolSize: 10, category: 6 }
      ],
      links: [
        { source: '前端开发（接受实习生）', target: '职位需求', score: '' },
        { source: '职位需求', target: '前端开发工程师', score: '' },
        { source: '前端开发（接受实习生）', target: '学历要求', score: '' },
        { source: '学历要求', target: '大专', score: '' },
        { source: '前端开发（接受实习生）', target: '经验要求', score: '' },
        { source: '经验要求', target: '在校生', score: '' },
        { source: '前端开发（接受实习生）', target: '技能要求', score: '' },
        { source: '技能要求', target: 'HTML', score: '' },
        { source: '技能要求', target: 'CSS', score: '' },
        { source: '技能要求', target: 'JavaScript', score: '' }
      ]
    }
  },
  {
    id: 3,
    workTime: '3天/周 3个月',
    tags: ['JavaScript', 'Vue.js', 'HTML/CSS'],
    title: 'C公司前端',
    salary: '2-4k',
    company: '签程无忧电子科技公司',
    location: '上海市',
    experience: '3-5 年',
    education: '本科',
    matchScore: '92',
    description: '这里是职位描述...',
    hrAvatar: 'https://via.placeholder.com/64',
    hrName: '77',
    hrPosition: 'HR Manager',
    companyLogo: 'https://via.placeholder.com/32',
    lastActiveTime: '2024年3月27日',
    state: {
      isLiked: '喜欢',
      isDisliked: '不喜欢',
      isSubmitted: '已投递',
      isRefused: '',
      isSucceed: ''
    },
    checked: false
  },
  {
    id: 4,
    workTime: '3天/周 3个月',
    tags: ['JavaScript', 'Vue.js', 'HTML/CSS'],
    title: 'DD公司科学家助理',
    salary: '1-3k',
    company: '签程无忧电子科技公司',
    location: '浙江省·杭州市·上城区',
    experience: '3-5 年',
    education: '本科',
    matchScore: '44',
    description: '这里是职位描述...',
    hrAvatar: 'https://via.placeholder.com/64',
    hrName: '李明',
    hrPosition: 'HR Manager',
    companyLogo: 'https://via.placeholder.com/32',
    lastActiveTime: '2024年3月27日',
    state: {
      isLiked: '喜欢',
      isDisliked: '不喜欢',
      isSubmitted: '已投递',
      isRefused: '被拒绝',
      isSucceed: ''
    },
    checked: false
  },
  {
    id: 5,
    workTime: '3天/周 3个月',
    tags: ['JavaScript', 'Vue.js', 'HTML/CSS'],
    title: 'FFF团火葬岗',
    salary: '20-40k',
    company: '签程无忧电子科技公司',
    location: '北京市',
    experience: '3-5 年',
    education: '本科',
    matchScore: '12',
    description: '这里是职位描述...',
    hrAvatar: 'https://via.placeholder.com/64',
    hrName: '李明',
    hrPosition: 'HR Manager',
    companyLogo: 'https://via.placeholder.com/32',
    lastActiveTime: '2024年3月27日',
    state: {
      isLiked: '喜欢',
      isDisliked: '不喜欢的岗位',
      isSubmitted: '已投递',
      isRefused: '',
      isSucceed: '签约成功'
    },
    checked: false
  }
]
export const fakeCVList = [
  {
    id: 0,
    CVName: '简历1',
    score: '70', // 简历得分
    completeness: '80', // 简历完整度
    name: '小明2',
    education: '本科',
    workExperience: '在校生',
    phone: '12345678901',
    email: 'xiaoming@example.com',
    expectList: [ // 期望岗位、城市
      {
        id: 1,
        searchJobType: '全职',
        jobType: '前端开发工程师',
        city: ''
      },
      {
        id: 2,
        searchJobType: null,
        jobType: 'Java',
        city: '浙江省'
      }],
    eduList: [ // 教育经历
      {
        id: 1,
        school: '电子科技大学',
        major: '计算机科学与技术',
        startTime: '2021',
        endTime: '2025',
        degree: '本科'
      },
      {
        id: 2,
        school: '杭州电子科技大学',
        major: '计算机科学与技术',
        startTime: '2021',
        endTime: '2025',
        degree: '本科'
      }],
    cerList: [ // 证书列表数据必须要一个label一个value
      {
        label: '大学英语四级',
        value: '大学英语四级'
      }],
    expList: [ // 工作实习经历
      {
        id: 1,
        companyName: '部落',
        role: '前端开发',
        startTime: '2023-02',
        endTime: '2023-04',
        description: '如果您出现头晕眼花，意识不清醒，或对灯光感到不适\n请配合医院工作人员的一切行为，相信我们\n严格保证所有文字文件都是使用打印，不允许出现任何手写的情况',
        achievement: '遇到任何问题可以联系执勤人员寻求帮助'
      },
      {
        id: 2,
        companyName: '联盟',
        role: '后端开发',
        startTime: '2099-02',
        endTime: '2023-04',
        description: '1. 游客声称自己已经迷路\n2. 游客的距离感或时间感存在极大误差\n3. 游客坚称自己被人跟踪\n',
        achievement: '你看到的是真实的吗？'
      }],
    projectList: [
      {
        id: 1,
        title: '项目1',
        role: '前端开发工程师',
        startTime: '2023-02',
        endTime: '2023-04',
        description: '1. 生态公益林区，严格防范火患，请不要携带火种，刀具，危险物品上山。\n2. 山林危险，请不要随意离开登山健身步道。\n3. 水深危险，请不要在沿途的溪流或水潭中游玩。',
        achievement: '上线使用5人次，获得参与奖'
      },
      {
        id: 2,
        title: '项目2',
        role: '前端开发工程师',
        startTime: '2023-02',
        endTime: '2023-04',
        description: '签程无忧是一款基于知识图谱的大学生就业能力评价和职位推荐系统\n1. 爱护环境，请为山林留下养料。\n2. 亲近自然，本处免费开放游泳。\n3. 树林中存在通往杭电的小道，您可以尝试通行，但后果自负。',
        achievement: '上线使用5人次，获得参与奖'
      }],
    skillList: [
      {
        id: 1,
        skillName: 'PHP',
        skillDegree: '精通'
      },
      {
        id: 2,
        skillName: 'Python',
        skillDegree: '熟练'
      }],
    additional: '垃圾桶里不能有垃圾，如果您发现您的垃圾桶里有垃圾，请尽快将垃圾清空至走廊尽头的垃圾桶里',
    setting: {
      CVIsVisible: false,
      nameIsVisible: true,
      emailIsVisible: true,
      eduIsVisible: false
    },
    KG: {
      nodes: [
        { id: 91, name: '简历1', symbolSize: 30, category: 0, description: '简历1得分70分' },
        { id: 92, name: '期望岗位', symbolSize: 20, category: 1, description: '简历1的期望岗位' },
        { id: 93, name: '前端开发工程师', symbolSize: 20, category: 1, description: '期望岗位：前端开发工程师' },
        { id: 94, name: 'Java', symbolSize: 20, category: 1, description: '期望岗位：Java' },
        { id: 95, name: '教育经历', symbolSize: 20, category: 2, description: '简历1的教育经历85分' },
        { id: 96, name: '本科', symbolSize: 20, category: 2, description: '教育经历：本科' },
        { id: 97, name: '电子科技大学', symbolSize: 20, category: 2 },
        { id: 98, name: '杭州电子科技大学', symbolSize: 20, category: 2 },
        { id: 99, name: '资格证书', symbolSize: 15, category: 3 },
        { id: 100, name: '大学英语四级', symbolSize: 20, category: 3 },
        { id: 101, name: '工作/实习经历', symbolSize: 20, category: 4 },
        { id: 102, name: '部落', symbolSize: 20, category: 4 },
        { id: 103, name: '联盟', symbolSize: 20, category: 4 },
        { id: 104, name: '项目经历', symbolSize: 20, category: 5 },
        { id: 105, name: '项目1', symbolSize: 20, category: 5 },
        { id: 106, name: '项目2', symbolSize: 20, category: 5 },
        { id: 107, name: '技能标签', symbolSize: 20, category: 6 },
        { id: 108, name: 'PHP', symbolSize: 10, category: 6 },
        { id: 109, name: 'Python', symbolSize: 10, category: 6 },
        { id: 110, name: '工作经验', symbolSize: 20, category: 7 },
        { id: 111, name: '在校生', symbolSize: 10, category: 7 }
      ],
      links: [
        { source: '91', target: '92', score: '' },
        { source: '92', target: '93', score: '' },
        { source: '92', target: '94', score: '' },
        { source: '91', target: '95', score: '85' },
        { source: '95', target: '96', score: '' },
        { source: '96', target: '97', score: '' },
        { source: '96', target: '98', score: '' },
        { source: '91', target: '99', score: '70' },
        { source: '99', target: '100', score: '' },
        { source: '91', target: '101', score: '90' },
        { source: '101', target: '102', score: '' },
        { source: '101', target: '103', score: '' },
        { source: '91', target: '104', score: '92' },
        { source: '104', target: '105', score: '' },
        { source: '104', target: '106', score: '' },
        { source: '91', target: '107', score: '85' },
        { source: '107', target: '108', score: '' },
        { source: '107', target: '109', score: '' },
        { source: '91', target: '110', score: '' },
        { source: '110', target: '111', score: '' }
      ]
    }
  },
  {
    id: 1,
    CVName: '简历13',
    score: '74', // 简历得分
    completeness: '82', // 简历完整度
    name: '小明13',
    education: '本科',
    workExperience: '在校生',
    phone: '12345678901',
    email: 'xiaoming@example.com',
    expectList: [ // 期望岗位、城市
      {
        id: 1,
        searchJobType: '全职',
        jobType: '前端开发工程师',
        city: '浙江省'
      },
      {
        id: 2,
        searchJobType: null,
        jobType: 'Java',
        city: '浙江省·杭州市'
      }],
    eduList: [ // 教育经历
      {
        id: 1,
        school: '杭州电子科技大学',
        major: '计算机科学与技术',
        startTime: '2021',
        endTime: '2025',
        degree: '本科'
      }],
    cerList: [ // 证书列表数据必须要一个label一个value
      {
        label: '雅思',
        value: '雅思'
      },
      {
        label: '大学英语六级',
        value: '大学英语六级'
      }],
    expList: [ // 工作实习经历
      {
        id: 1,
        companyName: '签程无忧部落',
        role: '前端开发',
        startTime: '2023-02',
        endTime: '2023-04',
        description: '如果您出现头晕眼花，意识不清醒，或对灯光感到不适\n请配合医院工作人员的一切行为，相信我们\n严格保证所有文字文件都是使用打印，不允许出现任何手写的情况',
        achievement: '遇到任何问题可以联系执勤人员寻求帮助'
      },
      {
        id: 2,
        companyName: '签程无忧联盟',
        role: '后端开发',
        startTime: '2023-02',
        endTime: '2023-04',
        description: '1. 游客声称自己已经迷路\n2. 游客的距离感或时间感存在极大误差\n3. 游客坚称自己被人跟踪\n',
        achievement: '您已经运动 4800步'
      }],
    projectList: [
      {
        id: 1,
        title: '签程无忧',
        role: '前端开发工程师',
        startTime: '2023-02',
        endTime: '2023-04',
        description: '1. 生态公益林区，严格防范火患，请不要携带火种，刀具，危险物品上山。\n2. 山林危险，请不要随意离开登山健身步道。\n3. 水深危险，请不要在沿途的溪流或水潭中游玩。',
        achievement: '上线使用5人次，获得参与奖'
      },
      {
        id: 2,
        title: '签程无忧pro',
        role: '前端开发工程师',
        startTime: '2023-02',
        endTime: '2023-04',
        description: '签程无忧是一款基于知识图谱的大学生就业能力评价和职位推荐系统\n1. 爱护环境，请为山林留下养料。\n2. 亲近自然，本处免费开放游泳。\n3. 树林中存在通往杭电的小道，您可以尝试通行，但后果自负。',
        achievement: '上线使用5人次，获得参与奖'
      }],
    skillList: [
      {
        id: 1,
        skillName: 'Java',
        skillDegree: '熟练'
      },
      {
        id: 2,
        skillName: 'Python',
        skillDegree: '熟练'
      }],
    additional: '大型无害垃圾务必进行分割处理，为了医院运行稳定，由专门的医生负责\n如果必要的话，请在临时休息室就寝',
    setting: {
      CVIsVisible: false,
      nameIsVisible: true,
      emailIsVisible: true,
      eduIsVisible: true
    },
    KG: {
      nodes: [
        { name: '简历13', symbolSize: 30, category: 0, description: '简历3得分70分' },
        { name: '期望岗位', symbolSize: 20, category: 1, description: '简历3的期望岗位' },
        { name: '前端开发工程师', symbolSize: 20, category: 1, description: '期望岗位：前端开发工程师' },
        { name: 'Java', symbolSize: 20, category: 1, description: '期望岗位：Java' },
        { name: '教育经历', symbolSize: 20, category: 2, description: '简历1的教育经历85分' },
        { name: '本科', symbolSize: 20, category: 2, description: '教育经历：本科' },
        { name: '杭州电子科技大学', symbolSize: 20, category: 2 },
        { name: '资格证书', symbolSize: 15, category: 3 },
        { name: '雅思', symbolSize: 20, category: 3 },
        { name: '大学英语六级', symbolSize: 20, category: 3 },
        { name: '工作/实习经历', symbolSize: 20, category: 4 },
        { name: '签程无忧部落', symbolSize: 20, category: 4 },
        { name: '签程无忧联盟', symbolSize: 20, category: 4 },
        { name: '项目经历', symbolSize: 20, category: 5 },
        { name: '签程无忧', symbolSize: 20, category: 5 },
        { name: '签程无忧pro', symbolSize: 20, category: 5 },
        { name: '技能标签', symbolSize: 20, category: 6 },
        { name: 'Java', symbolSize: 10, category: 6 },
        { name: 'Python', symbolSize: 10, category: 6 },
        { name: '工作经验', symbolSize: 20, category: 7 },
        { name: '在校生', symbolSize: 10, category: 7 }
      ],
      links: [
        { source: '简历13', target: '期望岗位', score: '' },
        { source: '期望岗位', target: '前端开发工程师', score: '' },
        { source: '期望岗位', target: 'Java', score: '' },
        { source: '简历13', target: '教育经历', score: '85' },
        { source: '教育经历', target: '本科', score: '' },
        { source: '本科', target: '杭州电子科技大学', score: '' },
        { source: '本科', target: '杭州电子科技大学', score: '' },
        { source: '简历13', target: '资格证书', score: '70' },
        { source: '资格证书', target: '雅思', score: '' },
        { source: '资格证书', target: '大学英语六级', score: '' },
        { source: '简历13', target: '工作/实习经历', score: '90' },
        { source: '工作/实习经历', target: '签程无忧部落', score: '' },
        { source: '工作/实习经历', target: '签程无忧联盟', score: '' },
        { source: '简历13', target: '项目经历', score: '92' },
        { source: '项目经历', target: '签程无忧', score: '' },
        { source: '项目经历', target: '签程无忧pro', score: '' },
        { source: '简历13', target: '技能标签', score: '85' },
        { source: '技能标签', target: 'Java', score: '' },
        { source: '技能标签', target: 'Python', score: '' },
        { source: '简历1', target: '工作经验', score: '' },
        { source: '工作经验', target: '在校生', score: '' }
      ]
    }
  }
]
// 用户数据列表
export const fakeUserList = [
  {
    id: 1,
    name: '王小明',
    age: '21',
    birthYear: '2003',
    education: '本科',
    school: '杭州电子科技大学',
    major: '计算机科学与技术',
    expJobType: '前端开发工程师',
    expCity: '浙江省·杭州市',
    state: '在校-寻找实习',
    lastActive: '8天前活跃'
  }]
