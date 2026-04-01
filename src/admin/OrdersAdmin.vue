<script setup>
import { ref, onMounted } from 'vue'
import { collection, getDocs, doc, updateDoc, orderBy, query } from 'firebase/firestore'
import { db } from '@/firebase/firebase'

const orders = ref([])
const loading = ref(true)
const updating = ref(false)
const detailsDialog = ref(false)
const selectedOrder = ref(null)

const openDetails = (order) => {
  selectedOrder.value = order
  detailsDialog.value = true
}

const headers = [
  { title: 'Orden #', key: 'orderNumber' },
  { title: 'Fecha', key: 'createdAt' },
  { title: 'Cliente', key: 'customerName' },
  { title: 'Total', key: 'total' },
  { title: 'Estado', key: 'status' },
  { title: 'Acciones', key: 'actions', sortable: false }
]

const loadOrders = async () => {
  loading.value = true
  try {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'))
    const snap = await getDocs(q)
    orders.value = snap.docs.map(d => {
      const data = d.data()
      return {
        id: d.id,
        ...data,
        orderNumber: data.orderNumber || d.id.substring(0,6).toUpperCase(),
        createdAt: data.createdAt ? new Date(data.createdAt.toDate()).toLocaleDateString() : 'N/A',
        customerName: data.customerDetails?.nombre || 'Desconocido'
      }
    })
  } catch (e) {
    console.error("Error loading orders: ", e)
  } finally {
    loading.value = false
  }
}

const updateStatus = async (orderId, newStatus) => {
  updating.value = true
  try {
    const orderRef = doc(db, 'orders', orderId)
    await updateDoc(orderRef, { status: newStatus })
    const orderIndex = orders.value.findIndex(o => o.id === orderId)
    if (orderIndex !== -1) {
      orders.value[orderIndex].status = newStatus
    }
  } catch (e) {
    console.error("Error updating status: ", e)
  } finally {
    updating.value = false
  }
}

const getStatusColor = (status) => {
  if (status === 'pending') return 'warning'
  if (status === 'shipped') return 'info'
  if (status === 'delivered') return 'success'
  return 'grey'
}

onMounted(() => {
  loadOrders()
})
</script>

<template>
  <v-card class="elevation-2 rounded-lg">
    <v-card-title class="d-flex align-center py-4 px-6">
      <v-icon color="primary" class="mr-3">mdi-clipboard-list-outline</v-icon>
      <span class="text-h5 font-weight-bold">Órdenes Recientes</span>
      <v-spacer></v-spacer>
      <v-btn icon @click="loadOrders" :loading="loading" variant="text">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>

      <v-dialog v-model="detailsDialog" max-width="600px">
        <v-card v-if="selectedOrder" class="rounded-lg">
          <v-card-title class="py-4 px-6 text-h5 font-weight-bold bg-background">
            Detalles de la Orden
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pt-6">
            <h3 class="text-subtitle-1 font-weight-bold mb-2 tiffany-brand">Información del Cliente</h3>
            <v-sheet class="pa-4 bg-grey-lighten-4 rounded mb-6">
              <p class="mb-1"><strong>Nombre:</strong> {{ selectedOrder.customerDetails?.nombre || 'N/A' }}</p>
              <p class="mb-1"><strong>Email:</strong> {{ selectedOrder.customerDetails?.email || 'N/A' }}</p>
              <p class="mb-1"><strong>Teléfono:</strong> {{ selectedOrder.customerDetails?.telefono || 'N/A' }}</p>
              <p class="mb-1"><strong>Dirección:</strong> {{ selectedOrder.customerDetails?.direccion || 'N/A' }}</p>
              <p class="mb-0"><strong>Ciudad:</strong> {{ selectedOrder.customerDetails?.ciudad || 'N/A' }}</p>
            </v-sheet>
            
            <h3 class="text-subtitle-1 font-weight-bold mb-2 tiffany-brand">Productos Comprados</h3>
            <v-list density="compact" class="bg-surface rounded border">
              <v-list-item v-for="(prod, i) in selectedOrder.items" :key="i">
                <template v-slot:prepend>
                  <v-avatar rounded size="40" class="mr-3">
                    <v-img :src="prod.image || 'https://placehold.co/40x40'" cover></v-img>
                  </v-avatar>
                </template>
                <v-list-item-title class="font-weight-medium">{{ prod.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ prod.quantity }} un. x ${{ Number(prod.price).toLocaleString() }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
            <div class="d-flex justify-end mt-4">
              <span class="text-h6 font-weight-bold" style="color: rgb(var(--v-theme-darkPurple));">Total: ${{ selectedOrder.total.toLocaleString() }}</span>
            </div>
          </v-card-text>
          <v-card-actions class="px-6 pb-6 pt-0">
            <v-spacer></v-spacer>
            <v-btn color="primary" variant="flat" class="text-none px-6" @click="detailsDialog = false">Cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-card-title>
    <v-divider></v-divider>

    <v-data-table
      :headers="headers"
      :items="orders"
      :loading="loading"
      class="pb-4"
    >
      <template v-slot:item.total="{ item }">
        <span class="font-weight-bold">${{ item.total.toLocaleString() }}</span>
      </template>
      
      <template v-slot:item.status="{ item }">
        <v-chip :color="getStatusColor(item.status)" size="small" class="text-uppercase font-weight-bold">
          {{ item.status === 'pending' ? 'Pendiente' : item.status === 'shipped' ? 'Enviado' : 'Entregado' }}
        </v-chip>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn variant="text" icon="mdi-eye" size="small" color="primary" class="mr-2" @click="openDetails(item)" title="Ver Detalles"></v-btn>
        
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn variant="outlined" size="small" v-bind="props" class="text-none" :loading="updating">
              Cambiar Estado
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="updateStatus(item.id, 'pending')">
              <v-list-item-title>Pendiente</v-list-item-title>
            </v-list-item>
            <v-list-item @click="updateStatus(item.id, 'shipped')">
              <v-list-item-title>Enviado</v-list-item-title>
            </v-list-item>
            <v-list-item @click="updateStatus(item.id, 'delivered')">
              <v-list-item-title>Entregado</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
  </v-card>
</template>
