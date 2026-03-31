<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/authStore'
import { useCartStore } from '@/store/cartStore' // Assuming this exists

const router = useRouter()
const authStore = useAuthStore()
// Ensure cartStore has a totalItems getter or something similar
const cartStore = useCartStore()

const handleLogout = async () => {
  await authStore.logoutUser()
  router.push('/')
}
</script>

<template>
  <v-app-bar color="background" elevation="1">
    <v-container class="d-flex align-center py-0" style="max-width: 1200px; width: 100%;">
      
      <!-- Logo -->
      <router-link to="/" class="text-decoration-none d-flex align-center">
        <img src="@/assets/goldensouls.png" alt="Golden Souls" height="60" class="mr-2" />
        <v-toolbar-title class="tiffany-brand font-weight-bold d-none d-sm-flex">
          GOLDEN SOULS
        </v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>

      <!-- Desktop Links -->
      <div class="d-none d-md-flex align-center">
        <v-btn to="/" class="tiffany-nav-link" variant="text">Inicio</v-btn>
        <v-btn to="/shop" class="tiffany-nav-link" variant="text">Tienda</v-btn>
        
        <template v-if="authStore.isAuthenticated">
          <!-- Admin Link -->
          <v-btn v-if="authStore.isAdmin" to="/admin/products" class="tiffany-nav-link font-weight-bold" variant="text">
            Admin
          </v-btn>
          <v-btn @click="handleLogout" class="tiffany-nav-link" variant="text">Salir</v-btn>
        </template>
        <template v-else>
          <v-btn to="/login" class="tiffany-nav-link" variant="text">Ingresar</v-btn>
        </template>
      </div>

      <!-- Actions -->
      <div class="d-flex align-center ml-4">
        <v-btn icon color="primary" class="tiffany-icon-btn d-md-none">
          <v-icon>mdi-menu</v-icon>
        </v-btn>

        <!-- Use emits only for cart open -->
        <v-btn icon color="primary" class="tiffany-icon-btn ml-1" @click="$emit('open-cart')">
          <v-badge v-if="cartStore.totalItems > 0" :content="cartStore.totalItems" color="secondary" floating>
            <v-icon>mdi-shopping-outline</v-icon>
          </v-badge>
          <v-icon v-else>mdi-shopping-outline</v-icon>
        </v-btn>
      </div>

    </v-container>
  </v-app-bar>
</template>

<style scoped>
.tiffany-brand {
  font-family: 'Playfair Display', serif;
  letter-spacing: 3px;
  color: rgb(var(--v-theme-gold));
  font-size: 1.4rem;
}

.tiffany-nav-link {
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 1px;
  font-size: 0.9rem;
  text-transform: uppercase;
  transition: color 0.3s ease;
}

.tiffany-nav-link:hover {
  color: rgb(var(--v-theme-primary)) !important;
  background-color: transparent !important;
}

.tiffany-icon-btn {
  transition: transform 0.2s ease, color 0.3s ease;
}

.tiffany-icon-btn:hover {
  color: rgb(var(--v-theme-secondary)) !important;
  transform: translateY(-2px);
}
</style>