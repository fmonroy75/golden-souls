<script setup>
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import CartDrawer from '@/components/CartDrawer.vue'

const isCartOpen = ref(false)
</script>

<template>
  <v-app class="tiffany-app">
    <Navbar @open-cart="isCartOpen = true" />
    <CartDrawer v-model="isCartOpen" />
    
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');

body {
  font-family: 'Montserrat', sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6, .playfair {
  font-family: 'Playfair Display', serif !important;
}

/* Custom scrollbar for an elegant feel */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: rgb(var(--v-theme-background));
}
::-webkit-scrollbar-thumb {
  background: rgb(var(--v-theme-primary));
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgb(var(--v-theme-secondary));
}
</style>
