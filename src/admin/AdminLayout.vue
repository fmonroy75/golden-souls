<script setup>
import { RouterView } from 'vue-router'
import { ref } from 'vue'

const drawer = ref(true)

const adminLinks = [
  { title: 'Órdenes', icon: 'mdi-clipboard-list-outline', to: '/admin/orders' },
  { title: 'Productos', icon: 'mdi-diamond-stone', to: '/admin/products' },
  { title: 'Categorías', icon: 'mdi-shape-outline', to: '/admin/categories' }
]
</script>

<template>
  <v-layout class="bg-grey-lighten-4" style="min-height: calc(100vh - 64px);">
    <v-navigation-drawer
      v-model="drawer"
      permanent
      color="#333"
      theme="dark"
    >
      <v-list-item
        title="Panel de Admin"
        subtitle="Golden Souls"
        class="py-4"
      ></v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          v-for="link in adminLinks"
          :key="link.title"
          :prepend-icon="link.icon"
          :title="link.title"
          :to="link.to"
          active-color="#81D8D0"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <div class="pa-6">
        <RouterView />
      </div>
    </v-main>
  </v-layout>
</template>

<style scoped>
</style>
