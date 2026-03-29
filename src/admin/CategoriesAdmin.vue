<script setup>
import { ref, onMounted } from "vue"
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore"
import { db } from "@/firebase/firebase"

const items = ref([])
const loading = ref(true)
const dialog = ref(false)
const dialogDelete = ref(false)
const saving = ref(false)

const headers = [
  { title: "Nombre", key: "name" },
  { title: "Descripción", key: "description", sortable: false },
  { title: "Acciones", key: "actions", sortable: false }
]

const editedIndex = ref(-1)
const editedItem = ref({ id: '', name: '', description: '' })
const defaultItem = { id: '', name: '', description: '' }

async function load() {
  loading.value = true
  try {
    const snap = await getDocs(collection(db, "categories"))
    items.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
  } catch (e) {
    console.error("Error loading categories:", e)
  } finally {
    loading.value = false
  }
}

onMounted(load)

function editItem(item) {
  editedIndex.value = items.value.indexOf(item)
  editedItem.value = Object.assign({}, item)
  dialog.value = true
}

function deleteItem(item) {
  editedIndex.value = items.value.indexOf(item)
  editedItem.value = Object.assign({}, item)
  dialogDelete.value = true
}

async function deleteItemConfirm() {
  saving.value = true
  try {
    await deleteDoc(doc(db, "categories", editedItem.value.id))
    items.value.splice(editedIndex.value, 1)
    closeDelete()
  } catch (e) {
    console.error("Error deleting category:", e)
  } finally {
    saving.value = false
  }
}

function close() {
  dialog.value = false
  editedItem.value = Object.assign({}, defaultItem)
  editedIndex.value = -1
}

function closeDelete() {
  dialogDelete.value = false
  editedItem.value = Object.assign({}, defaultItem)
  editedIndex.value = -1
}

async function save() {
  saving.value = true
  try {
    const categoryData = {
      name: editedItem.value.name,
      description: editedItem.value.description
    }

    if (editedIndex.value > -1) {
      await updateDoc(doc(db, "categories", editedItem.value.id), categoryData)
      Object.assign(items.value[editedIndex.value], { ...editedItem.value })
    } else {
      const docRef = await addDoc(collection(db, "categories"), categoryData)
      items.value.push({ id: docRef.id, ...categoryData })
    }
    close()
  } catch (e) {
    console.error("Error saving category:", e)
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <v-card class="elevation-2 rounded-lg">
    <v-card-title class="d-flex align-center py-4 px-6 bg-white">
      <v-icon color="#81D8D0" class="mr-3">mdi-shape-outline</v-icon>
      <span class="text-h5 font-weight-bold">Categorías</span>
      <v-spacer></v-spacer>

      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ props }">
          <v-btn color="#81D8D0" class="text-white font-weight-bold" v-bind="props" prepend-icon="mdi-plus">
            Nueva Categoría
          </v-btn>
        </template>
        <v-card class="rounded-lg">
          <v-card-title class="bg-grey-lighten-4 py-4 px-6">
            <span class="text-h5 font-weight-bold">{{ editedIndex === -1 ? 'Crear Categoría' : 'Editar Categoría' }}</span>
          </v-card-title>

          <v-card-text class="pt-6">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="editedItem.name" label="Nombre de la Categoría" variant="outlined" color="#81D8D0" hide-details="auto"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea v-model="editedItem.description" label="Descripción" variant="outlined" color="#81D8D0" rows="3" hide-details="auto"></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions class="px-6 pb-6 pt-0">
            <v-spacer></v-spacer>
            <v-btn color="grey-darken-1" variant="text" @click="close" class="text-none">Cancelar</v-btn>
            <v-btn color="#81D8D0" class="text-white text-none" @click="save" :loading="saving" elevation="0">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card class="pa-4 text-center rounded-lg">
          <v-icon size="64" color="error" class="mb-4">mdi-alert-circle-outline</v-icon>
          <v-card-title class="text-h5 font-weight-bold pb-4">¿Eliminar esta categoría?</v-card-title>
          <v-card-text>Esta acción no se puede deshacer.</v-card-text>
          <v-card-actions class="justify-center mt-4">
            <v-btn color="grey-darken-1" variant="text" @click="closeDelete" class="text-none">Cancelar</v-btn>
            <v-btn color="error" @click="deleteItemConfirm" :loading="saving" class="text-none" elevation="0">Eliminar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-card-title>
    
    <v-divider></v-divider>

    <v-data-table
      :headers="headers"
      :items="items"
      :loading="loading"
      class="pb-4"
    >
      <template v-slot:item.name="{ item }">
        <span class="font-weight-medium">{{ item.name }}</span>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn icon size="small" color="info" variant="text" class="mr-2" @click="editItem(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon size="small" color="error" variant="text" @click="deleteItem(item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>
