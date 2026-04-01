<template>
  <div class="shop-page bg-background min-vh-100 pb-12">
    <!-- Premium Hero Section -->
    <v-img
      src="https://images.unsplash.com/photo-1599643478524-fb66f7f6a394?q=80&w=2000&auto=format&fit=crop"
      height="400"
      cover
      class="align-center justify-center text-center position-relative hero-img animate-pan"
    >
      <div class="overlay"></div>
      <v-container class="position-relative z-index-1 fade-in-up" style="animation-delay: 0.2s;">
        <h1 class="tiffany-title text-h2 font-weight-bold mb-4 text-white">Colección Exclusiva</h1>
        <p class="text-h6 font-weight-regular text-white opacity-90 max-w-600 mx-auto">
          Descubre la elegancia intemporal en cada una de nuestras piezas diseñadas para almas doradas.
        </p>
      </v-container>
    </v-img>

    <v-container class="mt-8">
      <!-- Category Filter -->
      <div class="d-flex justify-center mb-10 overflow-x-auto">
        <v-chip-group
          v-model="selectedCategory"
          selected-class="tiffany-chip-active"
          mandatory
        >
          <v-chip
            value="Todos"
            class="tiffany-chip mx-2"
            size="large"
            variant="outlined"
          >
            Todos
          </v-chip>
          <v-chip
            v-for="cat in categories"
            :key="cat"
            :value="cat"
            class="tiffany-chip mx-2"
            size="large"
            variant="outlined"
          >
            {{ cat }}
          </v-chip>
        </v-chip-group>
      </div>

      <!-- Products Grid -->
      <v-row v-if="loading" justify="center" class="py-12">
        <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
      </v-row>
      
      <v-row v-else-if="filteredProducts.length === 0" justify="center" class="py-12 text-center text-medium-emphasis">
        <v-col cols="12">
          <v-icon size="64" color="secondary" class="mb-4">mdi-diamond-stone</v-icon>
          <h3 class="text-h5 font-weight-medium">No hay productos en esta categoría</h3>
          <p class="mt-2">Pronto añadiremos nuevas piezas exclusivas.</p>
        </v-col>
      </v-row>

      <v-row v-else>
        <v-col
          v-for="(p, index) in filteredProducts"
          :key="p.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          class="fade-in-up"
          :style="{ animationDelay: (index * 0.1) + 's' }"
        >
          <ProductCard :product="p"/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/firebase/firebase"
import ProductCard from "@/components/ProductCard.vue"

const products = ref([])
const categories = ref([])
const selectedCategory = ref("Todos")
const loading = ref(true)

onMounted(async () => {
  loading.value = true
  try {
    const [prodSnap, catSnap] = await Promise.all([
      getDocs(collection(db, "products")),
      getDocs(collection(db, "categories"))
    ])
    
    products.value = prodSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    categories.value = catSnap.docs.map(doc => doc.data().name)
  } catch (error) {
    console.error("Error fetching shop data:", error)
  } finally {
    loading.value = false
  }
})

const filteredProducts = computed(() => {
  if (selectedCategory.value === "Todos") {
    return products.value
  }
  return products.value.filter(p => p.category === selectedCategory.value)
})
</script>

<style scoped>
.shop-page {
  font-family: 'Montserrat', sans-serif;
}

.tiffany-title {
  font-family: 'Playfair Display', serif !important;
  letter-spacing: 2px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.max-w-600 {
  max-width: 600px;
}

.overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6));
  z-index: 0;
}

.z-index-1 {
  z-index: 1;
}

.tiffany-chip {
  border-color: rgba(0,0,0,0.12) !important;
  color: rgb(var(--v-theme-darkPurple)) !important;
  font-weight: 500;
  transition: all 0.3s ease;
  background-color: transparent !important;
}

.tiffany-chip:hover {
  border-color: rgb(var(--v-theme-primary)) !important;
  color: rgb(var(--v-theme-primary)) !important;
}

.tiffany-chip-active {
  background-color: rgb(var(--v-theme-primary)) !important;
  border-color: rgb(var(--v-theme-primary)) !important;
  color: white !important;
  font-weight: 600;
}

/* Custom scrollbar for chip group */
::-webkit-scrollbar {
  height: 6px;
}
::-webkit-scrollbar-thumb {
  background-color: rgb(var(--v-theme-surface));
  border-radius: 4px;
}
</style>