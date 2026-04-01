<script setup>
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import CartDrawer from '@/components/CartDrawer.vue'
import Footer from '@/components/Footer.vue'

const isCartOpen = ref(false)
</script>

<template>
  <v-app class="tiffany-app">
    <Navbar @open-cart="isCartOpen = true" />
    <CartDrawer v-model="isCartOpen" />
    
    <v-main class="fade-in-up">
      <RouterView />
    </v-main>

    <Footer />
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

/* Premium Global Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
  opacity: 0;
}

@keyframes slowPan {
  0% { transform: scale(1); }
  100% { transform: scale(1.05); }
}

.animate-pan {
  animation: slowPan 25s infinite alternate linear;
}
</style>
