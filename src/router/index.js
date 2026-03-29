import { createRouter, createWebHistory } from "vue-router"

import Home from "@/views/Home.vue"
import Shop from "@/views/Shop.vue"
import Checkout from "@/views/Checkout.vue"
import Login from "@/views/Login.vue"
import Register from "@/views/Register.vue"
import { useAuthStore } from "@/store/authStore"
import { watch } from "vue"

const routes = [
  { path: "/", component: Home },
  { path: "/shop", component: Shop },
  { path: "/login", component: Login, meta: { requiresUnauth: true } },
  { path: "/register", component: Register, meta: { requiresUnauth: true } },
  { path: "/checkout", component: Checkout, meta: { requiresAuth: true } },
  { 
    path: "/admin", 
    component: () => import('@/admin/AdminLayout.vue'), 
    meta: { requiresAdmin: true },
    children: [
      { path: '', redirect: '/admin/orders' },
      { path: 'products', component: () => import('@/admin/ProductsAdmin.vue') },
      { path: 'categories', component: () => import('@/admin/CategoriesAdmin.vue') },
      { path: 'orders', component: () => import('@/admin/OrdersAdmin.vue') }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  const waitForAuth = () => {
    return new Promise((resolve) => {
      if (authStore.isAuthReady) {
        resolve()
      } else {
        const unwatch = watch(() => authStore.isAuthReady, (ready) => {
          if (ready) {
            unwatch()
            resolve()
          }
        })
      }
    })
  }

  await waitForAuth()

  const isAuthenticated = authStore.isAuthenticated
  const isAdmin = authStore.isAdmin

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresUnauth && isAuthenticated) {
    next('/')
  } else if (to.meta.requiresAdmin && !isAdmin) {
    next('/')
  } else {
    next()
  }
})

export default router