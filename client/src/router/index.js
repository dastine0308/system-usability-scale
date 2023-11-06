import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SurveyForm from '../component/SurveyForm.vue'
import Result from '../component/Result.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Main',
      redirect: '/index',
      component: HomeView,
      children: [
        { path: '/index', name: 'Index', component: SurveyForm },
        { path: '/result', name: 'Result', component: Result },
      ]
    },
  ],
  // 每次切換路由，頁面滾動到頂部
  scrollBehavior () {
    return { top: 0 }
  }
})

export default router
