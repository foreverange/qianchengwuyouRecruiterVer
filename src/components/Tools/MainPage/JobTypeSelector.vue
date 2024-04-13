<template>
  <div class="small-frame-style" style="margin-left: 1rem">
    <a-cascader
      class="jobTypeSelector"
      v-model:value="currentJobType"
      :options="options"
      showSearch
      :changeOnSelect="true"
      placeholder="全部职位"
      style="width: 10rem;"
    >
      <template v-slot:displayRender="{ labels }">
        {{ labels[labels.length - 1] }}
      </template>
    </a-cascader>
  </div>
</template>

<script setup>
import { ref, watch, defineEmits, defineProps } from 'vue'
import jobTypeData from '../json/职业分类.json'

// 父组件传值
const props = defineProps({
  currentJobType: String
})

const currentJobType = ref(props.currentJobType)

// 将JSON数据转换为级联选择器所需的格式
const convertJobTypeData = (data, parentKey = '') => {
  return Object.entries(data).map(([key, value]) => {
    const fullKey = parentKey ? `${parentKey}-${key}` : key
    if (typeof value === 'object' && value !== null) {
      return {
        label: key,
        value: fullKey,
        children: convertJobTypeData(value, fullKey)
      }
    } else {
      return {
        label: key,
        value: fullKey
      }
    }
  })
}

const options = convertJobTypeData(jobTypeData)

const emit = defineEmits(['update:jobType'])

watch(currentJobType, (newValue) => {
  if (newValue && newValue.length > 0) {
    const lastLevel = newValue[newValue.length - 1].split('-').pop()
    emit('update:jobType', lastLevel)
  } else {
    emit('update:jobType', null)
  }
})
</script>

<style scoped>
.jobTypeSelector :deep(.ant-select-selector) {
  background: rgba(255, 255, 255, 0) !important;
  border: none !important;
  box-shadow: none !important;
  color: var(--greyFontColor);
}
</style>
