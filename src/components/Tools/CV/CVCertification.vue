<template>
  <div class="CV-cer">
    <div class="CV-cer-header">
      <div class="CV-cer-header-text ver-bar-1">资格证书</div>
    </div>
    <!--    资格证书：多选器-->
    <div class="CV-cer-content">
      <a-select
        class="certificationSelector"
        v-model:value="selectedCVData.cerList"
        @change="updateCerList"
        mode="multiple"
        style="width: 100%"
        placeholder="点击添加资格证书..."
        :max-tag-count="maxTagCount"
        :options="certificateOptions"
      >
        <template #maxTagPlaceholder="omittedValues">
          <a-tag style="background: rgba(255,255,255,0)">+{{ omittedValues.length }} 更多...</a-tag>
        </template>
      </a-select>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, toRefs, defineEmits } from 'vue'
import certificationsData from '../json/简略资格证书.json'
// 父组件传值
const props = defineProps({
  selectedCVData: {
    type: Object,
    required: true,
    default: () => ({
      cerList: []
    })
  }
})
const { selectedCVData } = toRefs(props)
// 选择器
const emit = defineEmits(['update:selectedCVData'])
const updateCerList = () => {
  emit('update:selectedCVData', {
    ...selectedCVData.value,
    cerList: Object.keys(selectedCVData.value.cerList).map(key => ({
      label: selectedCVData.value.cerList[key],
      value: selectedCVData.value.cerList[key]
    }))
  })
  console.log('CV:CerList updated')
}
const certificateOptions = ref([])
const maxTagCount = ref(10) // 最多可以选十个证书
certificateOptions.value = certificationsData.certification.flatMap(category =>
  category.list.map(cert => ({
    label: cert.name,
    value: cert.name
  }))
)
</script>

<style scoped>
.CV-cer-content{
  margin-left: 1rem;
}
.CV-cer {
  position: relative;
  box-shadow: 0 5px 5px 0 rgba(176,191,231,.4);
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 0.7rem;
  background: white;
}
.CV-cer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.CV-cer-header-text {
  font-size: 1rem;
  color: var(--blackFontColor);
  margin-left: 0.1rem;
  margin-bottom: 0.5rem;
}
:deep(.ant-btn-text:not(:disabled):hover){
  color: var(--themeColor075);
  background: rgba(255, 255, 255, 0) !important;
}
.certificationSelector{
  margin-bottom: 1rem;
}
:deep(.ant-select-selector) {
  background: rgba(255, 255, 255, 0) !important;
  border: none !important;
  box-shadow: none !important;
  color: var(--greyFontColor);
}

:deep(.ant-select-selection-item) {
  border-radius: 0.8rem;
}
</style>
