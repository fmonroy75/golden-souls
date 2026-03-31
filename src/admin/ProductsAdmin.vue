<script setup>
import { ref, onMounted } from "vue"
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore"
import { db } from "@/firebase/firebase"

const items = ref([])
const categories = ref([])
const imageFile = ref(null)
const loading = ref(true)
const dialog = ref(false)
const dialogDelete = ref(false)
const saving = ref(false)

const headers = [
  { title: "Muestra", key: "image", sortable: false },
  { title: "Nombre", key: "name" },
  { title: "Categoría", key: "category" },
  { title: "Precio ($)", key: "price" },
  { title: "Descripción", key: "description", sortable: false },
  { title: "Acciones", key: "actions", sortable: false }
]

const editedIndex = ref(-1)
const editedItem = ref({ id: '', name: '', category: '', price: 0, description: '', image: '' })
const defaultItem = { id: '', name: '', category: '', price: 0, description: '', image: '' }

async function load() {
  loading.value = true
  try {
    const [snap, catSnap] = await Promise.all([
      getDocs(collection(db, "products")),
      getDocs(collection(db, "categories"))
    ])
    items.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
    categories.value = catSnap.docs.map(d => d.data().name)
  } catch (e) {
    console.error("Error loading products and categories:", e)
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
    await deleteDoc(doc(db, "products", editedItem.value.id))
    items.value.splice(editedIndex.value, 1)
    closeDelete()
  } catch (e) {
    console.error("Error deleting product:", e)
  } finally {
    saving.value = false
  }
}

function close() {
  dialog.value = false
  editedItem.value = Object.assign({}, defaultItem)
  editedIndex.value = -1
  imageFile.value = null
}

function closeDelete() {
  dialogDelete.value = false
  editedItem.value = Object.assign({}, defaultItem)
  editedIndex.value = -1
}

async function save() {
  saving.value = true
  try {
    let imageUrl = editedItem.value.image
    let fileName = editedItem.value.fileName || ''

    if (imageFile.value) {
      const formData = new FormData()
      formData.append('image', imageFile.value)
      
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`, {
        method: 'POST',
        body: formData
      })
      const result = await response.json()
      
      if (result.success) {
        imageUrl = result.data.url
        fileName = imageFile.value.name
      } else {
        throw new Error('Error al subir la imagen a ImgBB: ' + (result.error?.message || 'Error desconocido'))
      }
    }

    const productData = {
      name: editedItem.value.name,
      category: editedItem.value.category || '',
      price: Number(editedItem.value.price),
      description: editedItem.value.description,
      image: imageUrl,
      fileName: fileName
    }

    if (editedIndex.value > -1) {
      // Update
      await updateDoc(doc(db, "products", editedItem.value.id), productData)
      Object.assign(items.value[editedIndex.value], { ...editedItem.value, price: productData.price })
    } else {
      // Add
      const docRef = await addDoc(collection(db, "products"), productData)
      items.value.push({ id: docRef.id, ...productData })
    }
    close()
  } catch (e) {
    console.error("Error saving product:", e)
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <v-card class="elevation-2 rounded-lg">
    <v-card-title class="d-flex align-center py-4 px-6">
      <v-icon color="primary" class="mr-3">mdi-diamond-stone</v-icon>
      <span class="text-h5 font-weight-bold">Productos</span>
      <v-spacer></v-spacer>

      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ props }">
          <v-btn color="primary" class="text-white font-weight-bold" v-bind="props" prepend-icon="mdi-plus">
            Nuevo Producto
          </v-btn>
        </template>
        <v-card class="rounded-lg">
          <v-card-title class="py-4 px-6">
            <span class="text-h5 font-weight-bold">{{ editedIndex === -1 ? 'Crear Producto' : 'Editar Producto' }}</span>
          </v-card-title>

          <v-card-text class="pt-6">
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="editedItem.name" label="Nombre de Joya" variant="outlined" color="primary" hide-details="auto"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select v-model="editedItem.category" :items="categories" label="Categoría" variant="outlined" color="primary" prepend-inner-icon="mdi-shape-outline" hide-details="auto"></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="editedItem.price" label="Precio" type="number" variant="outlined" color="primary" prepend-inner-icon="mdi-currency-usd" hide-details="auto"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-file-input v-model="imageFile" label="Imagen del Producto" variant="outlined" color="primary" prepend-icon="" prepend-inner-icon="mdi-camera" accept="image/*" hide-details="auto"></v-file-input>
                </v-col>
                <v-col cols="12">
                  <v-textarea v-model="editedItem.description" label="Descripción" variant="outlined" color="primary" rows="3" hide-details="auto"></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions class="px-6 pb-6 pt-0">
            <v-spacer></v-spacer>
            <v-btn color="grey-darken-1" variant="flat" @click="close" class="text-none mr-2">Cancelar</v-btn>
            <v-btn color="primary" variant="flat" class="text-white text-none" @click="save" :loading="saving" elevation="0">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card class="pa-4 text-center rounded-lg">
          <v-icon size="64" color="error" class="mb-4">mdi-alert-circle-outline</v-icon>
          <v-card-title class="text-h5 font-weight-bold pb-4">¿Eliminar este producto?</v-card-title>
          <v-card-text>Esta acción no se puede deshacer y el producto "{{ editedItem.name }}" desaparecerá de la tienda.</v-card-text>
          <v-card-actions class="justify-center mt-4">
            <v-btn color="grey-darken-1" variant="flat" @click="closeDelete" class="text-none mr-2">Cancelar</v-btn>
            <v-btn color="error" variant="flat" @click="deleteItemConfirm" :loading="saving" class="text-none" elevation="0">Eliminar</v-btn>
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
      <template v-slot:item.image="{ item }">
        <v-avatar rounded size="48" class="my-2">
          <v-img :src="item.image || 'https://placehold.co/48x48'" cover></v-img>
        </v-avatar>
      </template>

      <template v-slot:item.price="{ item }">
        <span class="font-weight-medium">${{ Number(item.price).toLocaleString() }}</span>
      </template>
      
      <template v-slot:item.description="{ item }">
        <span class="text-truncate d-inline-block" style="max-width: 200px;">
          {{ item.description || 'Sin descripción' }}
        </span>
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