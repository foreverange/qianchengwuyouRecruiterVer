<template>
  <teleport to="body" >
    <div v-if="showModal" class="overlay"></div>
    <div v-if="showModal" class="login-card" >
      <div class="tabs" >
        <button
        :class="{ active: userType === '1' }"
        @click="setUserType('1')"
        >
          求职者登录
        </button>
        <button
        :class="{ active: userType === '2' }"
        @click="setUserType('2')"
        >
          招聘者登录
        </button>
      </div>

      <div class="login-form">
        <input type="text" placeholder="手机号" v-model="username" style="margin-top: 0.5rem;"/>
        <div class="input-group">
          <input type="password" placeholder="短信验证码" v-model="password" style="margin-top: 0.5rem;width: 12rem"/>
          <button @click="sendCode" style="background:var(--themeColor01);color:var(--themeColor);margin-top: 0.5rem;margin-left: 0.6rem;width: 9rem;height: 100%">{{ sendingButtonText }}</button>
        </div>
        <button @click="login" style="margin-top: 1rem;">登录 / 注册</button>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref, defineEmits, computed } from 'vue'
import { fakeUserList } from '@/components/Tools/js/fakeData'

const userType = ref('1') // 默认为求职者登录
const username = ref('')
const password = ref('')

const setUserType = (type) => {
  userType.value = type
}

// 假设这些是响应式的引用，例如使用 Vue 的 ref 函数定义的
const isLoggedIn = ref(false) // 用户的登录状态
const showModal = ref(true) // 控制登录浮窗显示的状态

const emit = defineEmits(['login-success'])

const login = () => {
  if (userType.value === '1') {
    // 调用求职者的登录请求数据函数
    console.log('求职者登录', username.value, password.value)

    // TODO: 发送请求
    // 模拟异步请求，使用setTimeout来模拟网络延迟
    setTimeout(() => {
      // 更新登录状态
      isLoggedIn.value = true
      // 关闭浮窗
      showModal.value = false
      // 这里可以根据实际响应更新用户信息
      // userInfo.value = response.data.user;

      console.log('模拟登录成功')
      emit('login-success', fakeUserList[0])
    }, 500)
  }
  if (userType.value === '2') {
    // 调用求职者的登录请求数据函数
    console.log('招聘者登录', username.value, password.value)
    // TODO: 发送请求
    // 模拟异步请求，使用setTimeout来模拟网络延迟
    setTimeout(() => {
      // 更新登录状态
      isLoggedIn.value = true
      // 关闭浮窗
      showModal.value = false
      // 这里可以根据实际响应更新用户信息
      // userInfo.value = response.data.user;
      console.log('模拟登录成功')
      emit('login-success', fakeUserList[0])
    }, 500)
    // TODO：跳转到招聘者
  }
}
// 登录验证码
const isSendingCode = ref(false) // 控制发送按钮的禁用状态
const countDown = ref(0) // 倒计时的秒数

// 计算属性用于动态显示按钮文本
const sendingButtonText = computed(() => {
  return countDown.value > 0 ? `重新发送(${countDown.value}s)` : '发送验证码'
})

const sendCode = () => {
  if (isSendingCode.value || countDown.value > 0) return // 如果正在发送或已经在倒计时，则不进行操作

  // TODO: 调用发送验证码的API
  console.log('发送验证码给', username.value)

  // 假设验证码发送成功，开始倒计时
  isSendingCode.value = true
  countDown.value = 60 // 假设倒计时60秒
  const intervalId = setInterval(() => {
    countDown.value--
    if (countDown.value <= 0) {
      clearInterval(intervalId) // 倒计时结束，清除计时器
      isSendingCode.value = false // 重置发送状态
    }
  }, 1000)
}
</script>

<style scoped>
.login-card, :deep(.login-card) {
  font-family: 'opposans', sans-serif !important;
}
.input-group{
  display: flex;
  flex-direction: row;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(1px);
  z-index: 999; /* 确保遮罩层位于页面内容和登录卡片之下 */
}
.login-card {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 5px 15px 0 rgba(176,191,231,.4);
  padding: 30px;
  width: 400px;
  height: 330px;
  z-index: 1000;
  margin: 0;
}

.login-card .tabs {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.login-card .tabs button {
  background: none;
  border: none;
  padding: 10px;
  cursor: pointer;
  transition: color 0.3s;
}

.login-card .tabs button.active {
  color: var(--themeColor);
}

.login-card .tabs button:focus {
  outline: none;
}

.login-card .login-form {
  display: flex;
  flex-direction: column;
}

.login-card .login-form input {
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid var(--themeColor02);
  border-radius: 0.5rem;
}

.login-card .login-form input:focus {
  outline: none;
  border-color: var(--themeColor);
}

.login-card .login-form button {
  padding: 10px;
  border: none;
  border-radius: 0.5rem;
  background-color: var(--themeColor);
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-card .login-form button:hover {
  background-color: var(--themeColor075);
}

.login-card .login-form button:focus {
  outline: none;
}

</style>
