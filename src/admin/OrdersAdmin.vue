<script setup>
import { ref, onMounted } from 'vue'
import { collection, getDocs, doc, updateDoc, orderBy, query } from 'firebase/firestore'
import { db } from '@/firebase/firebase'

const orders = ref([])
const loading = ref(true)
const updating = ref(false)

const headers = [
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
