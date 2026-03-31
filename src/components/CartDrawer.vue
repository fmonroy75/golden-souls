<script setup>
import { computed } from 'vue'
import { useCartStore } from "@/store/cartStore"
import { useRouter } from 'vue-router'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const cart = useCartStore()
const router = useRouter()

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const goCheckout = () => {
  isOpen.value = false
  router.push('/checkout')
}
</script>

<template>
  <v-navigation-drawer
    v-model="isOpen"
    location="right"
    temporary
    width="450"
    class="cart-drawer"
  >
    <div class="drawer-header d-flex align-center px-6 py-4 border-bottom">
      <h2 class="playfair text-h5 mb-0">Mi Bolso</h2>
      <v-spacer></v-spacer>
      <v-btn icon variant="text" @click="isOpen = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>

    <div v-if="cart.items.length === 0" class="empty-cart d-flex flex-column align-center justify-center pa-8 text-center h-75">
      <v-icon size="64" color="grey-lighten-1" class="mb-4">mdi-shopping-outline</v-icon>
      <p class="text-body-1 text-medium-emphasis">Tu bolso está vacío.</p>
      <v-btn color="primary" variant="outlined" class="mt-4 text-none" @click="isOpen = false">
        Continuar Comprando
      </v-btn>
    </div>

    <template v-else>
      <v-list class="pa-4 flex-grow-1 overflow-y-auto" style="height: calc(100vh - 220px);">
        <v-list-item v-for="item in cart.items" :key="item.id" class="mb-4 pa-0 cart-item">
          <div class="d-flex w-100">
            <v-img :src="item.image || 'https://placehold.co/100x100'" width="90" height="90" cover class="mr-4"></v-img>
            
            <div class="flex-grow-1 d-flex flex-column justify-center">
              <div class="d-flex justify-space-between align-start mb-1">
                <h4 class="text-subtitle-1 font-weight-medium product-title text-truncate" style="max-width: 180px;">{{ item.name }}</h4>
                <v-btn icon size="x-small" variant="text" color="grey" @click="cart.remove(item.id)">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </div>
              
              <div class="text-caption text-medium-emphasis mb-2">Cantidad: {{ item.qty }}</div>
              
              <div class="d-flex justify-space-between align-center">
                <div class="qty-controls d-flex align-center border">
                  <v-btn icon size="x-small" variant="text" @click="cart.decrease(item.id)">
                    <v-icon size="small">mdi-minus</v-icon>
                  </v-btn>
                  <span class="px-2 text-caption">{{ item.qty }}</span>
                  <v-btn icon size="x-small" variant="text" @click="cart.add(item)">
                    <v-icon size="small">mdi-plus</v-icon>
                  </v-btn>
                </div>
                <div class="font-weight-bold">${{ (item.price * item.qty).toLocaleString() }}</div>
              </div>
            </div>
          </div>
        </v-list-item>
      </v-list>

      <div class="drawer-footer pa-6 border-top bg-surface" style="position: absolute; bottom: 0; width: 100%;">
        <div class="d-flex justify-space-between align-center mb-4">
          <span class="text-subtitle-1 font-weight-medium text-uppercase">Subtotal</span>
          <span class="text-h6 font-weight-bold">${{ cart.totalPrice.toLocaleString() }}</span>
        </div>
        
        <v-btn
          block
          color="primary"
          size="x-large"
          class="tiffany-checkout-btn text-none"
          elevation="0"
          @click="goCheckout"
        >
          Ir al Checkout
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<style scoped>
.cart-drawer {
  background-color: rgb(var(--v-theme-background));
}
.drawer-header {
  border-bottom: 1px solid rgba(0,0,0,0.1);
}
.drawer-footer {
  border-top: 1px solid rgba(0,0,0,0.1);
}
.product-title {
  font-family: 'Montserrat', sans-serif;
  color: rgb(var(--v-theme-darkPurple));
}
.qty-controls {
  border-radius: 4px;
  border-color: #e0e0e0 !important;
}
.tiffany-checkout-btn {
  color: white !important;
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 1px;
  font-weight: 600;
}
</style>