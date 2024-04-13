<template>
  <div class="setting-card">
    <div class="setting-header ver-bar-1">简历设置</div>
    <div class="list-items">
      <a-form model="UserSettingCard" class="setting-item">
        <a-form-item class="setting-item-piece">
          <div class="setting-item-piece-label">隐藏所有简历</div>
          <a-switch class="setting-item-piece-op" size="small" v-model:checked="privateSetting.onCVVisibleChange" @change="updateCVVisibility" />
        </a-form-item>
        <a-form-item class="setting-item-piece">
          <div class="setting-item-piece-label">隐藏我的活跃情况</div>
          <a-switch class="setting-item-piece-op" size="small" v-model:checked="privateSetting.onHideActivityChange" @change="updateActivityVisibility" />
        </a-form-item>
        <a-form-item class="setting-item-piece">
          <div class="setting-item-piece-label">隐藏我的学历</div>
          <a-switch class="setting-item-piece-op" size="small" v-model:checked="privateSetting.onHidePreferenceChange" @change="updatePreferenceVisibility" />
        </a-form-item>
      </a-form>
    </div>
    <div class="setting-header ver-bar-1" >公司屏蔽设置</div>
    <div  class="setting-section">
      <a-auto-complete
        class="company-search small-frame-style"
        placeholder="在此搜索公司关键词"
        v-model:value="searchValue"
        :options="options"
        @select="handleSelect"
        @search="handleSearch"
        style="width: 80%;margin-left: 2rem">
        <template #renderItem="{ item }">
          <div class="search-item">{{ item.label }}</div>
        </template>
      </a-auto-complete>
      <div class="sub-setting-header " >已屏蔽公司</div>
      <div class="selected-companies">
        <div v-for="(company, index) in selectedCompanies" :key="index" class="selected-company">
          <div class="selected-company-name">{{ company.label }}</div>
          <a-button type="text" danger @click="unblockCompany(index)"><DeleteOutlined /></a-button>
          <div v-if="selectedCompanies.length===0">暂无屏蔽公司</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import companiesData from '../json/company_names.json'

import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { DeleteOutlined } from '@ant-design/icons-vue'

const privateSetting = ref({
  onCVVisibleChange: false,
  onHideActivityChange: false,
  onHidePreferenceChange: false
})

const searchValue = ref('')
const companies = ref(companiesData.map(name => ({ value: name, label: name })))

const selectedCompanies = ref([
  { value: '签程无忧有限公司', label: '签程无忧有限公司' }
])
const options = ref([])

// Filter companies as user types
const handleSearch = (query) => {
  options.value = companies.value.filter(option => option.label.toLowerCase().includes(query.toLowerCase()))
}

// Add selected company to the list
const handleSelect = (value) => {
  const company = companies.value.find(c => c.value === value)
  if (company && !selectedCompanies.value.some(c => c.value === company.value)) {
    selectedCompanies.value.push(company)
    searchValue.value = '' // Clear the search input
  } else {
    message.error('公司已在列表中或不存在')
  }
}

const unblockCompany = (index) => {
  selectedCompanies.value.splice(index, 1)
}

// Implement your update visibility logic here
const updateCVVisibility = (value) => {}
const updateActivityVisibility = (value) => {}
const updatePreferenceVisibility = (value) => {}
</script>

<style scoped>
.setting-card {
  position: relative;
  box-shadow: 0 5px 15px 0 rgba(176,191,231,.4);
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 0.7rem;
  background: white;
}

.setting-header {
  font-size: 1rem;
  color: var(--blackFontColor);
  margin-left: 0.1rem;
  margin-bottom: 0.5rem;
}
.sub-setting-header {
  font-size: 0.9rem;
  color: var(--blackFontColor);
  margin-left: 1rem;
  margin-bottom: 0.5rem;
  margin-top:0.5rem;
}
.list-items {
  width: 110%;
  overflow: scroll;
  margin-left: 2rem;
  margin-bottom: 1rem;
}

:deep(.ant-menu-light.ant-menu-root.ant-menu-inline) {
  border: none;
}

:deep(.ant-menu-item-selected) {
  background: white;
  color: var(--greyFontColor);
  /*因为不需要选中才这样设置颜色的*/
  /*color: var(--themeColor);*/
}

:deep(.ant-menu-inline .ant-menu-item) {
  height: 2.3rem;
}

.setting-item {
  margin-top: 0.5rem;
}

.setting-item-piece {
  margin-left: 1rem;
  width: 90%;
  display: flex !important;
  flex-direction: row !important;
}

.setting-item-piece-label {
  font-family: opposans sans-serif;
  color: var(--greyFontColor);
}

.setting-item-piece-op {
  margin-bottom: 0.2rem;
  margin-left: 3rem;
}

div {
  display: unset;
  /* 消除用户样式表,居然用block搞我布局！*/
}

:deep(.ant-form-item) {
  margin-bottom: 0.5rem;
}

.selected-companies {
  width: 80%;
  margin-top: 0.5rem;
  border:#d9d9d9 0.5px solid;
  border-radius: 1rem;
  margin-left: 2rem;
  padding: 1rem;
}

.selected-company {
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}
.selected-company-name {
  margin-left: 1rem;
  color: var(--greyFontColor);
}
.company-search {
  margin-bottom: 1rem;
}
.search-item {
  padding: 0.5rem;
  cursor: pointer;
}
div[role="listbox"] {
  display: none !important;
}
.setting-section{
  margin-top:1rem;
  display: flex;
  flex-direction: column;
}
:deep(.ant-select-selector) {
  background: rgba(255, 255, 255, 0) !important;
  border: none !important;
  box-shadow: none !important;
  color: var(--greyFontColor);
}
</style>
