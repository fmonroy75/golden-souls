import { createRouter, createWebHistory } from "vue-router"
import { watch } from "vue"

import { useAuthStore } from "@/store/authStore"

// Views públicas
import Home from "@/views/Home.vue"
import Shop from "@/views/Shop.vue"
import Checkout from "@/views/Checkout.vue"
import Login from "@/views/Login.vue"
import Register from "@/views/Register.vue"

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },

  {
    path: "/shop",
    name: "shop",
    component: Shop
  },

  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { requiresUnauth: true }
  },

  {
    path: "/register",
    name: "register",
    component: Register,
    meta: { requiresUnauth: true }
  },

  {
    path: "/checkout",
    name: "checkout",
    component: Checkout,
    meta: { requiresAuth: true }
  },

  {
    path: "/admin",
    component: () => import("@/admin/AdminLayout.vue"),
    meta: { requiresAdmin: true },
    children: [
      {
        path: "",
        redirect: "/admin/orders"
      },
      {
        path: "products",
        component: () => import("@/admin/ProductsAdmin.vue")
      },
      {
        path: "categories",
        component: () => import("@/admin/CategoriesAdmin.vue")
      },
      {
        path: "orders",
        component: () => import("@/admin/OrdersAdmin.vue")
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to) => {

  const authStore = useAuthStore()

  const waitForAuth = () => {
    return new Promise((resolve) => {
      if (authStore.isAuthReady) {
        resolve()
      } else {
        const unwatch = watch(
          () => authStore.isAuthReady,
          (ready) => {
            if (ready) {
              unwatch()
              resolve()
            }
          }
        )
      }
    })
  }

  await waitForAuth()

  const isAuthenticated = authStore.isAuthenticated
  const isAdmin = authStore.isAdmin

  console.log("Navigation to:", to.fullPath)
  console.log("AUTH:", authStore.user?.email)
  console.log("ROLE:", authStore.role)
  console.log("IS ADMIN:", isAdmin)

  if (to.meta.requiresAuth && !isAuthenticated) {
    return "/login"
  }

  if (to.meta.requiresUnauth && isAuthenticated) {
    return "/"
  }

  if (to.meta.requiresAdmin) {
    if (!isAuthenticated) {
      return "/login"
    } else if (!isAdmin) {
      return "/"
    }
  }

  return true
})

export default router