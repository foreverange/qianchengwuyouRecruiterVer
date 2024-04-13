<template>
  <div class="CV-list" >
    <div class="list-header">简历列表</div>
    <div class="list-items" ref="CVListRef">
      <a-menu
        mode="inline"
        :items="CVListData"
        v-model:selectedKeys="currentSelectedCV"
        @click="handleSelectedCVClick"
      ></a-menu>
    </div>
    <a-button @click="handleNewCVClick" type="text" class="button-style like-button-style" >
      新建简历
    </a-button>
  </div>
</template>

<script setup>
import { defineEmits, defineProps, toRefs, watch, ref, nextTick } from 'vue'
// ref用于滑到底部
const CVListRef = ref(null)
const scrollToBottom = () => {
  nextTick(() => {
    if (CVListRef.value) {
      CVListRef.value.scrollTop = CVListRef.value.scrollHeight
    }
  })
}
// 父组件传值
const props = defineProps({
  CVListData: {
    type: Array,
    required: true,
    default: () => []
  },
  currentSelectedCV: {
    type: Array,
    default: () => ['0']
  }

})
const { CVListData, currentSelectedCV } = toRefs(props)

const emit = defineEmits(['update:currentSelectedCV'])
const handleSelectedCVClick = (event) => {
  emit('update:currentSelectedCV', [event.key])
}
// 新增简历
const handleNewCVClick = value => {
  // console.log('新增简历')
}
// 滑到底部
watch(() => props.CVListData, (newVal, oldVal) => {
  console.log('CVList: CVListData changed:', newVal, oldVal)
  if (newVal.length > oldVal.length) {
    scrollToBottom()
  }
}, { deep: true })
</script>

<style scoped>
.CV-list {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 0.7rem;
  background: white;
  box-shadow: 0 5px 5px 0 rgba(176,191,231,.4);
}

.list-header {
  font-size: 0.95rem;
  font-weight: bold;
  color: var(--blackFontColor);
  margin-left: 0.1rem;
  margin-bottom: 0.5rem;
}

.list-items {
  width: 110%;
  max-height: 6rem;
  overflow: scroll;
  margin-left: -1rem;
}

:deep(.ant-menu-light.ant-menu-root.ant-menu-inline){
  border: none;
}

.like-button-style{
  border-color: var(--themeColor);
  color: var(--themeColor);
}
.like-button-style:hover{
  border-color: var(--themeColor);
  color: var(--themeColor);
  background: var(--themeColor02);
}
</style>
