<script setup>
import { computed, onMounted } from 'vue'
import { useProductStore } from '@/store/productStore'
import ProductCard from '@/components/ProductCard.vue'

const productStore = useProductStore()

onMounted(async () => {
  if (productStore.products.length === 0) {
    await productStore.loadProducts()
  }
})

// Just display up to 4 products for the featured section
const featured = computed(() => {
  return productStore.products.slice(0, 4)
})
</script>

<template>
  <div>
    <v-row v-if="productStore.products.length === 0" justify="center">
      <v-col cols="12" class="text-center">
        <v-progress-circular indeterminate color="#81D8D0"></v-progress-circular>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col
        v-for="p in featured"
        :key="p.id"
        cols="12"
        sm="6"
        md="3"
      >
        <ProductCard :product="p"/>
      </v-col>
    </v-row>
  </div>
</template>