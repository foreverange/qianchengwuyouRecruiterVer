<template>
  <div className="bg1"></div>
  <RecruiterNavBar></RecruiterNavBar>
  <div className="trending-charts-container">
    <div className="chart-row">
      <div className="chart-item glass-bg">
        <div className="glass-inner">
          <div className="chart-title ver-bar-2">签友学历分布</div>
          <EduLevelPieChart></EduLevelPieChart>
        </div>
      </div>
      <div className="chart-item glass-bg">
        <div className="glass-inner">
          <div className="chart-title ver-bar-2">签友年龄分布</div>
          <AgeDistribution></AgeDistribution>
        </div>
      </div>
      <div className="chart-item glass-bg">
        <div className="glass-inner">
          <div className="chart-title ver-bar-2">签友专业分布</div>
          <MajorNightingaleChart></MajorNightingaleChart>
        </div>
      </div>
      <div className="chart-item glass-bg">
        <div className="glass-inner">
          <div className="chart-title ver-bar-2">签友人数趋势</div>
          <BoomTrendChart></BoomTrendChart>
        </div>
      </div>
    </div>
    <div className="chart-row">
      <div className="chart-item glass-bg">
        <div className="glass-inner">
          <div className="chart-title ver-bar-2">热门城市</div>
          <HotCityBarChart></HotCityBarChart>
        </div>
      </div>
      <div className="chart-item glass-bg">
        <div className="glass-inner">
          <div className="chart-title ver-bar-2">热门职位类型</div>
          <HotJobTypeBubbleChart></HotJobTypeBubbleChart>
        </div>
      </div>
      <div className="chart-item glass-bg">
        <div className="glass-inner">
          <div className="chart-title ver-bar-2">热门技能</div>
          <SkillCloud></SkillCloud>
        </div>
      </div>
      <div className="chart-item glass-bg">
        <div className="glass-inner">
          <div className="chart-title ver-bar-2">热门公司</div>
          <HotCompanyDiskUsage></HotCompanyDiskUsage>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import '@/assets/global.css'
import HotCityBarChart from '@/components/TrendingPage/HotCityBarChart.vue'
import EduLevelPieChart from '@/components/TrendingPage/EduLevelPieChart.vue'
import AgeDistribution from '@/components/TrendingPage/AgeDistribution.vue'
import HotCompanyDiskUsage from '@/components/TrendingPage/HotCompanyDiskUsage.vue'
import SkillCloud from '@/components/TrendingPage/SkillCloud.vue'
import BoomTrendChart from '@/components/TrendingPage/BoomTrendChart.vue'
import HotJobTypeBubbleChart from '@/components/TrendingPage/HotJobTypeBubbleChart.vue'
import MajorNightingaleChart from '@/components/TrendingPage/MajorNightingaleChart.vue'
import RecruiterNavBar from '@/components/NavBar/RecruiterNavBar.vue'
</script>

<style scoped>
.trending-charts-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: calc(100vh - 3.5rem);
  margin-top: 3rem;
  padding: 2rem 1.3rem;
}

.chart-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
}

.chart-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 0.2rem;
  flex: 1;
}

.chart-title {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.glass-bg {
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0.4)
  );
  backdrop-filter: blur(10px);
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0 5px 15px 0 rgba(176, 191, 231, .3);
  background: rgba(255, 255, 255, 0.3);
}

.glass-bg:hover {
  box-shadow: 0 5px 20px 0 rgba(176, 191, 231, .4);
}

.glass-inner {
  position: relative;
  padding: 1rem;
}
</style>
