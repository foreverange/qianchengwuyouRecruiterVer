<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: resources.themeColor,
      },
    }"
  >
    <div class="bg">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>

import resources from '@/assets/resources'
import { defineComponent } from 'vue'
import debounce from 'debounce'

export default defineComponent({
  data () {
    return {
    }
  },
  computed: {
    resources () {
      return resources
    }
  }
})
// 防止报错ResizeObserver
const _ResizeObserver = window.ResizeObserver
window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
  constructor (callback) {
    callback = debounce(callback, 200)
    super(callback)
  }
}
</script>

<style>
#app {
  font-family: "pingfangm",serif;
}
:root {
  --themeColor: rgba(72, 82, 230, 1);
  --themeColor075: rgba(72, 82, 230, 0.75);
  --themeColor02: rgba(72, 82, 230, 0.2);
  --themeColor01: rgba(72, 82, 230, 0.1);
  --themeColor001: rgba(72, 82, 230, 0.01);
  --themeLightBlue:#f1f5ff;
  --subThemeColor: rgba(206, 94, 207, 1);
  --subThemeColor05: rgba(206, 94, 207, 0.5);
  --sararyColor125: #e3424a;
  --sararyColor: #ff636c;
  --sararyColor08: #fa747b;
  --sararyColor001: rgba(250, 116, 123, 0.1);
  --sararyColor0001: rgba(250, 116, 123, 0.01);
  --greyFontColor075: rgba(133, 135, 141, 1);
  --greyFontColor05: rgba(102, 102, 110, 0.5);
  --greyFontColor03: rgba(102, 102, 110, 0.3);
  --greyFontColor: #66666e;
  --greyFontColor125: #44444e;
  --blackFontColor:#222222;

}
.bg:before{
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  opacity: .1;
  z-index: -1;
}
.bg{
  display: flex;
  min-height: max-content;
}
.bg:after{
  content: " ";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: .1;
  z-index: -1;
}
body{
  //background-color: #f1f3f6;
  background-color: #ffffff;
  //background-color: #e6f4ff;
}

</style>
