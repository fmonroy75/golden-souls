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

:root {
  /* Paleta Behr Personalizada */
  --color-soft-turquesa: #78C0A8;
  --color-niagara-mist: #C9D6D5;
  --color-celeb-city: #646F7A;
  --color-notorius: #E0E4E7;
  --color-gold-fall: #D4AF37;

  /* Aliasing para compatibilidad con clases de estilo Tiffany previas */
  --color-tiffany: var(--color-soft-turquesa);
  --color-tiffany-dark: var(--color-celeb-city);
  --color-dark: var(--color-celeb-city);
  --color-light: var(--color-notorius);
}

body {
  font-family: 'Montserrat', sans-serif !important;
  color: var(--color-dark);
  background-color: var(--color-light);
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
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: var(--color-tiffany);
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--color-tiffany-dark);
}

.tiffany-app {
  background-color: #ffffff !important;
}
</style>
