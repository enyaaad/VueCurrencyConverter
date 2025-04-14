import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage/ui/HomePage.vue'
import ConvertPage from '@/pages/ConvertPage/ui/ConvertPage.vue'
import type { createApp } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: {
      title: 'Главная',
      layout: 'default',
    },
  },
  {
    path: '/convert',
    name: 'convert',
    component: ConvertPage,
    meta: {
      title: 'Конвертация',
      layout: 'default',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/NotFound/NotFound.vue'),
    meta: {
      title: 'Страница не найдена',
    },
  },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  }
})

router.afterEach((to) => {
  const title = to.meta?.title as string
  if (title) {
    document.title = title
  }
})

export function setupRouter(app: ReturnType<typeof createApp>) {
  app.use(router)
}
