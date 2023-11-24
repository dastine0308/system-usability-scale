import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/pages/MainPage.vue'
import Index from '@/pages/Index.vue'
import Result from '@/pages/Result.vue'
import user from '@/plugins/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Main',
      redirect: '/index',
      component: MainPage,
      children: [
        {
          path: '/index',
          name: 'Index',
          component: Index,
        },
        {
          path: '/result',
          name: 'Result',
          component: Result,
          beforeEnter: (to, from, next) => {
            if (!user.loginState?.isAdmin) {
              router.replace({ path: '/' })
            } else {
              next()
            }
          },
        },
      ]
    },
  ],
  // 每次切換路由，頁面滾動到頂部
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
