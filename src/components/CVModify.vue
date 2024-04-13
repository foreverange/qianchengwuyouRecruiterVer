<template>
  <div>
    <div class="bg1"></div>
    <div style="margin-top:0.5rem">
<!--      TODO：更新得分逻辑-->
      <div class="cvm-container">
        <!--        顶部：得分条-->
        <div class="cvm-top-bar">
          <div class="CV-score-bar">
            <div class="CV-name">{{ selectedCVData.CVName }}的详细报告</div>
            <div class="CV-score-text">得分&nbsp;&nbsp;</div>
            <div class="CV-score">{{ selectedCVData.score }}</div>
            <div style="font-size: 0.9rem;">分</div>
            <div class="CV-completeness-text"> 完整度&nbsp;&nbsp;</div>
            <div class="CV-completeness">{{ selectedCVData.completeness }}</div>
            <div style="font-size: 0.9rem;">%</div>
<!--            <a-button @click="handleChangeKGVisibleClick" style="margin-left: auto;font-size: 1.5rem;margin-bottom: 1.1rem"-->
<!--                      type="text" class="text-button-style"><DeploymentUnitOutlined /></a-button>-->
          </div>
<!--          <div v-if="isKGVisible" class="CV-KG">-->
<!--            暂时不要这里的知识图谱了-->
<!--          </div>-->
        </div>
        <!--        总体评价-->
        <div class="cvm-card-container">
          <div class="cvm-card-header">
            <div class="cvm-card-header-text">总体评价</div>
            <div class="cvm-card-header-content-text">
              {{ commentData.totalComment }}
            </div>
          </div>
          <div style="display: flex;flex-direction: row">
            <!--            左：对应评价-->
            <div class="cvm-comment-list">
              <div class="cvm-comment-list-header">
                <div class="cvm-comment-list-header-text ver-bar-2">基本信息</div>
              </div>
              <div class="cvm-comment-list-content">
                <div class="cvm-comment-list-content-text">{{commentData.baseInfoComment}}</div>
              </div>
              <div class="cvm-comment-list-header">
                <div class="cvm-comment-list-header-text ver-bar-2">期望岗位</div>
              </div>
              <div class="cvm-comment-list-content">
                <div class="cvm-comment-list-content-text">{{commentData.expectionComment}}</div>
              </div>
              <div class="cvm-comment-list-header">
                <div class="cvm-comment-list-header-text ver-bar-2">教育经历</div>
              </div>
              <div class="cvm-comment-list-content">
                <div class="cvm-comment-list-content-text">{{commentData.educationComment}}</div>
              </div>
              <div class="cvm-comment-list-header">
                <div class="cvm-comment-list-header-text ver-bar-2">资格证书</div>
              </div>
              <div class="cvm-comment-list-content">
                <div class="cvm-comment-list-content-text">{{commentData.certificationComment}}</div>
              </div>
              <div class="cvm-comment-list-header">
                <div class="cvm-comment-list-header-text ver-bar-2">实习/工作经历</div>
              </div>
              <div class="cvm-comment-list-content">
                <div class="cvm-comment-list-content-text">{{commentData.experienceComment}}</div>
              </div>
              <div class="cvm-comment-list-header">
                <div class="cvm-comment-list-header-text ver-bar-2">项目经历</div>
              </div>
              <div class="cvm-comment-list-content">
                <div class="cvm-comment-list-content-text">{{commentData.projectComment}}</div>
              </div>
              <div class="cvm-comment-list-header">
                <div class="cvm-comment-list-header-text ver-bar-2">专业技能</div>
              </div>
              <div class="cvm-comment-list-content">
                <div class="cvm-comment-list-content-text">{{commentData.skillComment}}</div>
              </div>
              <div class="cvm-comment-list-header">
                <div class="cvm-comment-list-header-text ver-bar-2">附加信息</div>
              </div>
              <div class="cvm-comment-list-content">
                <div class="cvm-comment-list-content-text">{{commentData.additionalComment}}</div>
              </div>
            </div>
            <!--            右：可修改简历-->
            <div class="cvm-card-list">
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
          </div>
        </div>
<!--        <p>传递id测试: {{ props.jobIds||'无' }}</p>-->
<!--        <p>传递CV测试: {{ props.cv||'无' }}</p>-->
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'
// import { DeploymentUnitOutlined } from '@ant-design/icons-vue'
import { fakeCVList } from '@/components/Tools/js/fakeData'
import CVBaseInfo from '@/components/Tools/CV/CVBaseInfo.vue'
import CVExperience from '@/components/Tools/CV/CVExperience.vue'
import CVSkill from '@/components/Tools/CV/CVSkill.vue'
import CVException from '@/components/Tools/CV/CVExpection.vue'
import CVProject from '@/components/Tools/CV/CVProject.vue'
import CVAdditional from '@/components/Tools/CV/CVAdditional.vue'
import CVCertification from '@/components/Tools/CV/CVCertification.vue'
import CVEducation from '@/components/Tools/CV/CVEducation.vue' // 对接前的模拟数据
// 跳转传值
const props = defineProps({
  jobIds: {
    type: Array,
    required: true,
    default: () => []
  },
  cv: {
    type: String,
    required: true,
    default: ''
  },
  report: {
    type: String,
    required: true,
    default: ''
  }
})
// 相关数据
// 简历数据
const CVListData = ref(fakeCVList)
const selectedCVData = ref(null)
selectedCVData.value = CVListData.value.find((cv, index) => index.toString() === props.cv)
// 路由传值
const commentData = JSON.parse(props.report)// 解析成json

// const commentData = ref({
//   totalComment: '你是卫生委员，一位通过班级正常选举流程选举出来的卫生委员，请牢记自己的班级、姓名与身份，避免任何人取代你，你的职责不只是检查教室与宿舍卫生，还要严格保护同学们的生命安全，在发生危机情况或者令人难以保持镇定的情况时，允许为了保护自己或者同学们的生命安全而使用暴力或者一切手段，允许在你所认识的老师或者班委、学生会同学所下达的命令与本守则严重不符且充满危险时，动用一切手段保护自己和同学们的生命安全',
//   baseInfoComment: '如果本班卫生委员向你汇报有同学对地面上的饮料痕迹提出疑问，记下这个同学的名字，比对是否为本班同学，如果是，向辅导员汇报该同学的名字',
//   expectionComment: '应检查二级学院下达的通知是否地点与时间正确，如果正确，是安全的，如果时间或地点不符合，扣留此文件通知',
//   educationComment: '请每隔两周确认卫生委员的精神状况',
//   certificationComment: '你是班长，一位通过正常选举流程选举出来的班长，请时刻认知你的身份与姓名，确保班内没有人替代你',
//   experienceComment: '诉诸暴力是保护你生命安全与认知的最后手段，在非最后情况下，请尽量选择无视或者正常角度去看',
//   projectComment: '在此行动结束后闻到登记表上充满了消毒水的味道是正常的',
//   skillComment: '请牢记本校的建筑分布图与道路分布，你有权力阻止任何本班同学前往在本准则背面所画的建筑分布图上没有标识的建筑',
//   additionalComment: '只要你确认卫生委员的样子符合你所认知的他的样子，你就可以相信他，卫生委员一般由班内最忠诚机敏的同学担任'
// })
// 点按icon，是否展开简历图谱
// const isKGVisible = ref(false)
// const handleChangeKGVisibleClick = () => {
//   isKGVisible.value = !isKGVisible.value
//   console.log('CV：展开知识图谱状态改变：' + isKGVisible.value)
// }
// 评价相关
</script>

<style scoped>
.cvm-container {
  width: 98vw;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */

}
.cvm-top-bar{
  width: 68%;
  margin-left: unset;
  margin-top:0.2%;
  font-size: 1rem !important;
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
  background:white;
  background-size:100%;
  display: flex;
  align-items: center;
}
.CV-score-bar >*{
  margin-top: 0.2rem;
}
.CV-name{
  font-size: 1.05rem;
  margin: 0.4rem 1rem 0.25rem;
}
.CV-score-text,
.CV-completeness-text{
  font-size: 0.9rem;
}
.CV-completeness-text{
  font-size: 0.9rem;
  margin-left: 1rem;
}
.CV-score,
.CV-completeness {
  margin-right: 0.5rem;
  color: var(--themeColor);
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.CV-KG {
  height: 10rem;
  justify-content: center;
  display: flex;
  align-items: center;
  background: white;
}

.cvm-card-container {
  position: relative;
  width: 70%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
}
.cvm-card-header {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
  background: white;
  border-radius: 0.7rem;
  box-shadow: 0 5px 15px 0 rgba(176,191,231,.4);
}
.cvm-card-header-text {
  font-size: 1rem;
  font-weight: bold;
  color: var(--blackFontColor);
  margin-left: 1rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
}
.cvm-card-header-content-text {
  padding-bottom: 1.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 0.95rem;
  color: var(--greyFontColor);
  margin-left: 0.5rem;
  white-space: pre-wrap;/*使其换行*/
}
.cvm-comment-list{
  width: 37%;
  box-shadow: 0 5px 15px 0 rgba(176,191,231,.4);
  background: white;
  padding: 1rem;
  border-radius: 1rem;
  margin-right: 3%;
}
.cvm-comment-list-header{
  margin-left: 0.2rem;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
}
.cvm-comment-list-header-text {
  font-size: 0.87rem;
  color: var(--greyFontColor);
}

.cvm-comment-list-content {
  background-color: var(--themeLightBlue);
  line-height: 130%;
  border-radius: 0.7rem;
  padding: 1rem;
  margin-bottom: 1rem;
}
.cvm-comment-list-content-text {
  color: var(--blackFontColor);
  font-size: 0.87rem;
  white-space: pre-wrap;/*使其换行*/
}
.cvm-card-list > *{
  box-shadow: unset;
  border-radius:unset;
}
.cvm-card-list{
  width: 100%;
  box-shadow: 0 5px 15px 0 rgba(176,191,231,.4);
  padding: 1rem;
  background: white;
  border-radius: 1rem;
}
</style>
