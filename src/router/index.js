import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import TaskIndex from '../views/tasks/Index.vue'
import TaskCreate from '../views/tasks/Create.vue'
import TaskEdit from '../views/tasks/Edit.vue'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { title: 'Home', middleware: ['auth'] },
      component: Home
    },
    {
      path: '/tasks',
      name: 'tasks',
      meta: { title: 'Tasks', middleware: ['auth'] },
      component: TaskIndex
    },
    {
      path: '/tasks/create',
      name: 'task-create',
      meta: { title: 'Task Create', middleware: ['auth'] },
      component: TaskCreate
    },
    {
      path: '/tasks/:id/edit',
      name: 'task-edit',
      meta: { title: 'Task Edit', middleware: ['auth'] },
      component: TaskEdit
    },
    {
      path: '/register',
      name: 'register',
      meta: { title: 'Register', middleware: ['guest'] },
      component: () => import('../views/auth/Register.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: { title: 'Login', middleware: ['guest'] },
      component: () => import('../views/auth/Login.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title + ' :: ' + import.meta.env.VITE_APP_NAME

  const auth = useAuthStore()

  if (!auth.isLoggedIn) {
    await auth.fetchUser()
  }

  if (to.meta.middleware.includes('guest') && auth.isLoggedIn) next({ name: 'home' })
  else if (to.meta.middleware.includes('auth') && !auth.isLoggedIn) next({ name: 'login' })
  else next()
})

export default router
