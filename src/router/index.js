import { createRouter, createWebHashHistory } from 'vue-router'
import MainPage from '@/components/MainPage.vue'
import CV from '@/components/CV.vue'
import UserPage from '@/components/UserPage.vue'
import CVModify from '@/components/CVModify.vue'
import PositionManagement from '@/components/PositionManagement.vue'
import ResumeReception from '@/components/ResumeReception.vue'
import QianYou from '@/components/QianYou.vue'
import trendingPage from '@/components/trendingPage.vue'

const routes = [
  {
    path: '/mainpage',
    name: 'mainpage',
    component: MainPage
  }, {
    path: '/cv',
    name: 'cv',
    component: CV
  }, {
    path: '/user',
    name: 'user',
    component: UserPage
  }, {
    path: '/cvmodify',
    name: 'cvmodify',
    component: CVModify,
    props: route => ({ jobIds: route.query.jobIds, cv: route.query.cv, report: route.query.report })
  },
  {
    path: '/',
    name: 'PositionManagement',
    component: PositionManagement
  },
  {
    path: '/ResumeReception',
    name: 'ResumeReception',
    component: ResumeReception
  },
  {
    path: '/QianYou',
    name: 'QianYou',
    component: QianYou
  },
  {
    path: '/trendingPage',
    name: 'trendingPage',
    component: trendingPage
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
