<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'
import { db } from '@/firebase/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

const cart = useCartStore()
const auth = useAuthStore()
const router = useRouter()

const form = ref({
  nombre: '',
  telefono: '',
  direccion: '',
  metodoPago: 'Transferencia'
})

const loading = ref(false)
const orderSuccess = ref(false)

const submitOrder = async () => {
  if (cart.items.length === 0) return
  if (!form.value.nombre || !form.value.direccion || !form.value.telefono) {
    alert("Por favor completa los campos requeridos")
    return
  }

  loading.value = true
  try {
    const orderData = {
      userId: auth.user.uid,
      userEmail: auth.user.email,
      customerDetails: { ...form.value },
      items: cart.items.map(i => ({ id: i.id, name: i.name, price: i.price, qty: i.qty })),
      total: cart.totalPrice,
      status: 'pending',
      createdAt: serverTimestamp()
    }

    await addDoc(collection(db, 'orders'), orderData)
    
    cart.clear()
    orderSuccess.value = true
  } catch (error) {
    console.error("Error submitting order: ", error)
    alert("Hubo un error al procesar tu orden.")
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <v-container class="py-12" style="max-width: 1000px;">
    
    <div v-if="orderSuccess" class="text-center py-16">
      <v-icon color="success" size="80" class="mb-6">mdi-check-circle-outline</v-icon>
      <h1 class="playfair text-h3 mb-4">¡Gracias por tu compra!</h1>
      <p class="text-h6 text-medium-emphasis mb-8">Hemos recibido tu orden y la estamos procesando.</p>
      <v-btn color="#81D8D0" class="text-white text-none px-8" size="x-large" to="/shop">
        Volver a la Tienda
      </v-btn>
    </div>

    <div v-else-if="cart.items.length === 0" class="text-center py-16">
      <h2 class="playfair text-h4 mb-4">Tu bolso está vacío</h2>
      <v-btn color="#81D8D0" variant="outlined" class="text-none" to="/shop">
        Ir de Compras
      </v-btn>
    </div>

    <v-row v-else>
      <!-- Formulario de Envío -->
      <v-col cols="12" md="7" class="pr-md-8">
        <h2 class="playfair text-h4 mb-8">Detalles de Envío y Pago</h2>
        <v-form @submit.prevent="submitOrder">
          
          <h3 class="text-subtitle-1 font-weight-bold mb-4">Información de Contacto</h3>
          <v-text-field
            v-model="form.nombre"
            label="Nombre Completo"
            variant="outlined"
            color="#81D8D0"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.telefono"
            label="Teléfono"
            variant="outlined"
            color="#81D8D0"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.direccion"
            label="Dirección de Envío Completa"
            variant="outlined"
            color="#81D8D0"
            required
            class="mb-4"
          ></v-text-field>

          <h3 class="text-subtitle-1 font-weight-bold mb-4 mt-6">Método de Pago</h3>
          <v-select
            v-model="form.metodoPago"
            :items="['Transferencia', 'Contra entrega (Sólo ciertas zonas)', 'Tarjeta de Crédito (Pronto)']"
            label="Selecciona un método"
            variant="outlined"
            color="#81D8D0"
          ></v-select>

          <v-btn
            type="submit"
            color="#81D8D0"
            size="x-large"
            block
            class="text-white text-none font-weight-bold mt-8"
            :loading="loading"
          >
            Confirmar Pedido - ${{ cart.totalPrice.toLocaleString() }}
          </v-btn>
        </v-form>
      </v-col>

      <!-- Resumen de Orden -->
      <v-col cols="12" md="5">
        <v-card class="pa-6 bg-grey-lighten-4" elevation="0" border>
          <h3 class="font-weight-bold mb-6 text-uppercase text-body-1 tracking-wide">Resumen del Pedido</h3>
          
          <v-list class="bg-transparent pa-0">
            <v-list-item v-for="item in cart.items" :key="item.id" class="px-0 py-3 border-bottom">
              <template v-slot:prepend>
                <v-img :src="item.image || 'https://placehold.co/80x80'" width="60" height="60" cover class="mr-4 bg-white border"></v-img>
              </template>
              <v-list-item-title class="font-weight-medium text-body-2 text-wrap">{{ item.name }}</v-list-item-title>
              <v-list-item-subtitle class="mt-1">Cant: {{ item.qty }}</v-list-item-subtitle>
              <template v-slot:append>
                <div class="font-weight-bold">${{ (item.price * item.qty).toLocaleString() }}</div>
              </template>
            </v-list-item>
          </v-list>

          <div class="d-flex justify-space-between align-center mt-6 pt-4 border-top">
            <span class="text-h6 font-weight-regular">Total</span>
            <span class="text-h5 font-weight-bold color-dark">${{ cart.totalPrice.toLocaleString() }}</span>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.tracking-wide {
  letter-spacing: 1px;
}
.border-bottom {
  border-bottom: 1px solid #e0e0e0;
}
.border-top {
  border-top: 1px solid #bdbdbd;
}
.color-dark {
  color: #333;
}
</style>