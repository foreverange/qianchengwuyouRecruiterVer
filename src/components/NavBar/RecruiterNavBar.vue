<template>
  <div class="navbar" :class="{ 'sticky': isSticky }">
    <div class="logo">
      <!--      <img :src="resources.logo" alt="Logo" />-->
      <img :src="resources.logo" alt="Logo" />
    </div>
    <div class="links">
      <router-link class="nav-link" :to="{ name: 'PositionManagement' }" active-class="active">职位管理</router-link>
      <router-link class="nav-link" :to="{ name: 'ResumeReception' }" active-class="active">简历接收</router-link>
      <router-link class="nav-link" :to="{ name: 'QianYou' }" active-class="active">签友</router-link>
      <router-link class="nav-link" :to="{ name: 'trendingPage' }" active-class="active">趋势</router-link>
    </div>
    <a-button v-if="!isUserLoggedIn" @click="showLoginModal" class="btn" :style="{ borderColor: resources.themeColor, color: resources.themeColor }">登录 / 注册</a-button>
    <div v-else class="user-avatar" @click="gotoUserPage" @mouseenter="toggleDropdown(true)" @mouseleave="toggleDropdown(false)">
      <img :src="userAvatar" alt="User Avatar" />
      <div v-if="showDropdown" class="dropdown">
        <div @click="logout">登出</div>
      </div>
    </div>
    <loginCard v-if="showModal" @close="showModal = false" @login-success="handleLoginSuccess"></loginCard>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, onBeforeMount } from 'vue'
import resources from '@/assets/resources'
import router from '@/router'
import LoginCard from '@/components/Login/LoginCard.vue'

const isUserLoggedIn = ref(false) // 用户的登录状态
const userAvatar = ref('https://img2.imgtp.com/2024/04/12/1sVMG849.png') // 用户头像 URL
const showModal = ref(false) // 控制登录浮窗显示的变量
const isSticky = ref(false) // 控制导航栏是否粘滞

// 显示登录浮窗
const showLoginModal = () => {
  showModal.value = true
}

// 登录成功后的处理函数
const handleLoginSuccess = (userData) => {
  showModal.value = false
  isUserLoggedIn.value = true
  userAvatar.value = 'https://img2.imgtp.com/2024/04/12/1sVMG849.png' // 假设 userData 包含用户信息和头像 URL
}

// 页面滚动时的处理函数
const handleScroll = () => {
  isSticky.value = window.pageYOffset > 0
}

// 组件装载前检查用户登录状态
onBeforeMount(() => {
  isUserLoggedIn.value = localStorage.getItem('isUserLoggedIn') === 'true'
})

// 监听滚动事件
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

// 清理滚动事件监听器
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

// 导航到用户页面
const gotoUserPage = () => {
  router.push('/')
}
// 下拉
const showDropdown = ref(false)

const toggleDropdown = (show) => {
  showDropdown.value = show
}

const closeDropdown = (event) => {
  if (!event.target.closest('.user-avatar')) {
    showDropdown.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('click', closeDropdown)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', closeDropdown)
})
const logout = () => {
  isUserLoggedIn.value = false
  userAvatar.value = 'https://img2.imgtp.com/2024/04/12/1sVMG849.png'
  router.push('/QianYou')
}
</script>

<style scoped>
.user-avatar img {
  /* 保证图片不超过导航栏高度 */
  max-height: 2rem; /* 可以根据你的导航栏高度进行调整 */
  max-width: 2rem; /* 确保宽度和高度保持一致 */
  border-radius: 50%; /* 设置为圆形 */
  object-fit: cover; /* 确保图片内容按比例填充而不是拉伸 */
  margin-right: 10.3rem;
}
.user-avatar {
  position: relative;
  cursor: pointer;
}
.user-avatar .dropdown {
  position: absolute;
  top: 100%;
  right: 8rem;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 5px 15px 0 rgba(176,191,231,.4);
  width: 4rem;
  height: 2rem;
  z-index: 1001;
  display: flex;
  justify-content: center;
  align-items: center;
  color:var(--greyFontColor)
}

.user-avatar:hover .dropdown {
}
/* 公共样式 */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  height: 2.75rem;
  background-color: rgba(255, 255, 255, 0.4);
  background-size:cover;
  backdrop-filter: blur(10px);
  z-index: 999;
  transition: background-color 0.3s;
  box-shadow: 0 5px 10px 0 rgba(176,191,231,.5);
  padding: 0 16px;
}
.logo img {
  height: 42px;
  margin-right: 1rem; /* 调整间距 */
}
.links {
  display: flex;
  flex-grow: 1;
  justify-content: center;
}
.links a {
  margin: 0 0.75rem;
  color: var(--blackFontColor);
  font-size: 16px;
  text-decoration: none;
}

/* 小屏幕/移动设备 */
@media (max-width: 768px) {
  .logo img {
    height: 36px; /* 缩小 Logo */
  }
  .links {
    display: none; /* 隐藏链接，你可能需要一个汉堡菜单 */
  }
  .navbar.sticky {
    padding: 0 8px; /* 减小内边距 */
  }
}

/* 中等屏幕/平板设备 */
@media (min-width: 768px) and (max-width: 1024px) {
  .links {
    display: flex; /* 如果在平板上需要显示链接 */
    margin-right: auto; /* 自动调整间距 */
  }
}

/* 大屏幕/桌面设备 */
@media (min-width: 1024px) {
  .logo img {
    margin-left: 2rem; /* 调整间距以适应更宽的屏幕 */
  }
  .links a {
    margin: 0 1.5rem; /* 增加链接间距 */
  }
  .btn {
    margin-right: 6rem; /* 调整登陆/注册按钮间距 */
  }
}

/* 按钮调整 */
.btn {
  margin-left: auto; /* 把按钮推到最右边 */
  border-color: #4852e6 !important;
  color: var(--themeColor) !important;
  background: rgba(0, 0, 0, 0);
}

.btn:hover {
  border-color: var(--themeColor) !important;
  color: var(--themeColor) !important;
  background-color: var(--themeColor02) !important;
}
.links a.active {
  color: var(--themeColor); /* 链接变色样式 */
}
.links a:hover {
  color: var(--themeColor); /* 鼠标划过链接变色样式 */
}
/* 活动状态的路由链接 */
.active {
  color: var(--themeColor);
}

/* 路由链接的普通样式 */
.nav-link {
  margin: 0 0.75rem;
  color: var(--blackFontColor);
  font-size: 16px;
  text-decoration: none;
}

.nav-link:hover {
  color: var(--themeColor);
}
</style>
