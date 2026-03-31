<script setup>
import { useCartStore } from "@/store/cartStore"

const cart = useCartStore()

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

function add() {
  cart.add(props.product)
}
</script>

<template>
  <v-card class="tiffany-card mx-auto" elevation="0" max-width="350">
    <div class="img-container">
      <v-img
        :src="product.image || 'https://placehold.co/400x400?text=Golden+Souls'"
        height="320"
        cover
        class="product-img"
      >
        <template v-slot:placeholder>
          <div class="d-flex align-center justify-center fill-height bg-surface">
            <v-progress-circular color="primary" indeterminate></v-progress-circular>
          </div>
        </template>
      </v-img>
      <div class="card-overlay d-flex align-center justify-center">
        <v-btn
          color="white"
          variant="flat"
          size="large"
          class="tiffany-add-btn text-none"
          @click="add"
          prepend-icon="mdi-briefcase-plus-outline"
        >
          Añadir al Bolso
        </v-btn>
      </div>
    </div>

    <v-card-text class="text-center pt-6 pb-4 px-2">
      <div v-if="product.category" class="text-caption text-uppercase font-weight-bold mb-1 text-primary" style="letter-spacing: 1px;">
        {{ product.category }}
      </div>
      <h3 class="product-title text-subtitle-1 mb-2 text-truncate">
        {{ product.name || 'Sin Título' }}
      </h3>
      <p class="product-price text-body-1 mb-0">
        ${{ Number(product.price || 0).toLocaleString() }}
      </p>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.tiffany-card {
  border-radius: 0;
  background-color: transparent !important;
  transition: transform 0.3s ease;
}

.img-container {
  position: relative;
  overflow: hidden;
  background-color: rgb(var(--v-theme-surface));
}

.product-img {
  transition: transform 0.6s ease;
}

.tiffany-card:hover .product-img {
  transform: scale(1.05);
}

.card-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.tiffany-card:hover .card-overlay {
  opacity: 1;
}

.tiffany-add-btn {
  color: white !important;
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 1px;
  font-weight: 500;
  border: 1px solid white;
  transition: all 0.3s ease;
}

.tiffany-add-btn:hover {
  background-color: rgb(var(--v-theme-primary)) !important;
  color: rgb(var(--v-theme-background)) !important;
  border-color: rgb(var(--v-theme-primary));
}

.product-title {
  font-family: 'Montserrat', sans-serif;
  color: rgb(var(--v-theme-gold));
  letter-spacing: 1px;
  font-weight: 400;
}

.product-price {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  color: white;
}
</style>