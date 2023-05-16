import { createRouter, createWebHistory } from 'vue-router'
import TaskView from '../views/TaskView.vue'
import AboutView from '../views/IndexView.vue'
import SettingView from '../views/SettingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/index',
      name: 'index',
      component: AboutView
    },
    {
      path: '/setting',
      name: 'setting',
      component: SettingView
    },
    {
      path: '/task',
      name: 'task',
      component: TaskView
    }
  ]
})

export default router
