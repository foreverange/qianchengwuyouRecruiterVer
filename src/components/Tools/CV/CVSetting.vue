<template>
  <div class="CV-setting">
    <div class="CV-setting-header">简历设置</div>
    <div class="list-items">
      <a-form model="CVSettingItem"  class="CV-setting-item">
          <a-form-item class="CV-setting-item-piece">
            <div class="CV-setting-item-piece-label">隐藏此简历</div>
            <a-switch class="CV-setting-item-piece-op" size="small"
                      v-model:checked="selectedCVData.setting.CVIsVisible"
                      @change="updateCVVisibility"/>
          </a-form-item>
        <a-form-item class="CV-setting-item-piece">
          <div class="CV-setting-item-piece-label">隐藏姓名</div>
          <a-switch class="CV-setting-item-piece-op" size="small"
                    v-model:checked="selectedCVData.setting.nameIsVisible"
                    @change="updateNameVisibility"/>
        </a-form-item>
        <a-form-item class="CV-setting-item-piece">
          <div class="CV-setting-item-piece-label">隐藏邮箱</div>
          <a-switch class="CV-setting-item-piece-op" size="small"
                    v-model:checked="selectedCVData.setting.emailIsVisible"
                    @change="updateEmailVisibility"/>
        </a-form-item>
        <a-form-item class="CV-setting-item-piece">
          <div class="CV-setting-item-piece-label">隐藏学历</div>
          <a-switch class="CV-setting-item-piece-op" size="small"
                    v-model:checked="selectedCVData.setting.eduIsVisible"
                    @change="updateEduVisibility"/>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { toRefs, defineProps, defineEmits } from 'vue'

// 父组件传值
const props = defineProps({
  selectedCVData: {
    type: Object,
    required: true,
    default: () => ({
      setting: {
        CVIsVisible: false,
        nameIsVisible: true,
        emailIsVisible: true,
        eduIsVisible: true
      }
    })
  }
})
const { selectedCVData } = toRefs(props)
const emit = defineEmits(['update:selectedCVData'])
// 小组件更新
const updateCVVisibility = () => {
  emit('update:selectedCVData', {
    ...selectedCVData.value,
    setting: {
      ...selectedCVData.value.setting,
      CVIsVisible: selectedCVData.value.setting.CVIsVisible
    }
  })
}
const updateNameVisibility = () => {
  emit('update:selectedCVData', {
    ...selectedCVData.value,
    setting: {
      ...selectedCVData.value.setting,
      nameIsVisible: selectedCVData.value.setting.nameIsVisible
    }
  })
}
const updateEmailVisibility = () => {
  emit('update:selectedCVData', {
    ...selectedCVData.value,
    setting: {
      ...selectedCVData.value.setting,
      emailIsVisible: selectedCVData.value.setting.emailIsVisible
    }
  })
}
const updateEduVisibility = () => {
  emit('update:selectedCVData', {
    ...selectedCVData.value,
    setting: {
      ...selectedCVData.value.setting,
      eduIsVisible: selectedCVData.value.setting.eduIsVisible
    }
  })
}
</script>

<style scoped>
.CV-setting {
  display: flex;
  flex-direction: column;
  background: white;
  padding: 1rem;
  border-radius: 0.7rem;
  box-shadow: 0 5px 15px 0 rgba(176,191,231,.4);
}
.CV-setting-header {
  font-size: 0.95rem;
  font-weight: bold;
  color: var(--blackFontColor);
  margin-left: 0.1rem;
  margin-bottom: 0.5rem;
}
.list-items {
  width: 110%;
  overflow: scroll;
  margin-left: -0.8rem;
}
:deep(.ant-menu-light.ant-menu-root.ant-menu-inline){
  border: none;
}
:deep(.ant-menu-item-selected){
  background: white;
  color: var(--greyFontColor); /*因为不需要选中才这样设置颜色的*/
  /*color: var(--themeColor);*/
}
:deep(.ant-menu-inline .ant-menu-item){
  height: 2.3rem;
}
.CV-setting-item{
  margin-top: 0.5rem;
}
.CV-setting-item-piece{
  margin-left: 1rem;
  width: 90%;
  display: flex !important;
  flex-direction: row !important;
}
.CV-setting-item-piece-label{
  color: var(--greyFontColor);
}
.CV-setting-item-piece-op{
  margin-bottom: 0.2rem;
  margin-left: 3rem;
}
div{
  display: unset;/* 消除用户样式表，居然用block搞我布局！*/
}
:deep(.ant-form-item){
  margin-bottom: 0.5rem;
}
</style>
