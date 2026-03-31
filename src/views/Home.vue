<script setup>
import HeroSection from '@/components/HeroSection.vue'
import FeaturedProducts from '@/components/FeaturedProducts.vue'
</script>

<template>
  <div class="home-wrapper">
    <HeroSection />

    <!-- Intro Text Section -->
    <v-container class="text-center py-16" style="max-width: 800px;">
      <h2 class="playfair text-h4 text-md-h3 font-weight-regular mb-6 tiffany-color">
        El Arte de Brillar
      </h2>
      <p class="text-body-1 text-md-h6 font-weight-light text-medium-emphasis mb-8" style="line-height: 1.8;">
        Descubre nuestra colección exclusiva de joyería fina. Cada pieza de Golden Souls está diseñada con pasión y meticulosa atención al detalle, destinada a capturar momentos inolvidables y reflejar la belleza de tu alma.
      </p>
      <v-btn
        variant="outlined"
        color="primary"
        size="x-large"
        class="tiffany-outline-btn rounded-0 px-8"
        to="/shop"
      >
        Explorar Colección
      </v-btn>
    </v-container>

    <!-- About Us Section (100% Handmade) -->
    <div class="bg-surface py-16">
      <v-container>
        <v-row align="center">
          <v-col cols="12" md="6" class="pr-md-10 mb-8 mb-md-0">
            <span class="text-overline mb-2 d-block text-primary font-weight-bold" style="letter-spacing: 2px;">
              QUIÉNES SOMOS
            </span>
            <h2 class="playfair text-h4 text-md-h3 font-weight-regular mb-6" style="color: rgb(var(--v-theme-darkPurple));">
              Joyas 100% a Mano.<br>Hechas con el Alma.
            </h2>
            <p class="text-body-1 text-medium-emphasis mb-6" style="line-height: 1.8;">
              En Golden Souls creemos en el valor de lo auténtico. Cada una de nuestras piezas es forjada, pulida y engastada completamente a mano por artesanos expertos en nuestro taller. 
            </p>
            <p class="text-body-1 text-medium-emphasis mb-8" style="line-height: 1.8;">
              No utilizamos procesos industriales; en su lugar, dedicamos el tiempo necesario para asegurarnos de que el oro, la plata y las gemas preciosas se transformen en una joya única, con una historia propia que brillará contigo para siempre.
            </p>
            <v-chip color="var(--color-gold-fall)" variant="outlined" class="font-weight-bold px-4 py-3" size="large">
              <v-icon start icon="mdi-hand-heart-outline"></v-icon>
              Artesanía 100% Genuina
            </v-chip>
          </v-col>
          <v-col cols="12" md="6">
            <v-img
              src="https://images.unsplash.com/photo-1596773335552-32b71abefa03?q=80&w=1470&auto=format&fit=crop"
              height="500"
              cover
              class="rounded-lg shadow-elegant"
            ></v-img>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- Categories Teaser (Placeholder) -->
    <div class="bg-light-gray py-16">
      <v-container>
        <v-row>
          <v-col cols="12" md="6" class="pa-0">
            <v-img
              src="https://images.unsplash.com/photo-1599643478514-4a48434731a5?q=80&w=1470&auto=format&fit=crop"
              height="500"
              cover
              class="category-img"
            >
              <div class="overlay d-flex align-center justify-center">
                <div class="text-center">
                  <h3 class="playfair text-white text-h3 mb-4">Anillos</h3>
                  <v-btn color="white" variant="text" to="/shop" class="text-white border-bottom-white rounded-0">Comprar Ahora</v-btn>
                </div>
              </div>
            </v-img>
          </v-col>
          <v-col cols="12" md="6" class="pa-0">
            <v-img
              src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1374&auto=format&fit=crop"
              height="500"
              cover
              class="category-img"
            >
              <div class="overlay d-flex align-center justify-center">
                <div class="text-center">
                  <h3 class="playfair text-white text-h3 mb-4">Collares</h3>
                  <v-btn color="white" variant="text" to="/shop" class="text-white border-bottom-white rounded-0">Comprar Ahora</v-btn>
                </div>
              </div>
            </v-img>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- Featured Products -->
    <v-container class="py-16">
      <div class="text-center mb-12">
        <h2 class="playfair text-h4 font-weight-regular tiffany-color mb-4">Obras Maestras</h2>
        <div class="divider mx-auto"></div>
      </div>
      <FeaturedProducts />
    </v-container>

  </div>
</template>

<style scoped>
.home-wrapper {
  background-color: rgb(var(--v-theme-background));
}

.tiffany-color {
  color: rgb(var(--v-theme-primary));
}

.tiffany-outline-btn {
  border-width: 2px;
  letter-spacing: 2px;
  font-weight: 500;
  border-color: rgb(var(--v-theme-primary)) !important;
  color: rgb(var(--v-theme-primary)) !important;
  transition: all 0.3s ease;
}

.tiffany-outline-btn:hover {
  background-color: rgb(var(--v-theme-primary)) !important;
  color: rgb(var(--v-theme-background)) !important;
}

.bg-light-gray {
  background-color: rgb(var(--v-theme-surface));
}

.shadow-elegant {
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5) !important;
}

.category-img {
  position: relative;
  overflow: hidden;
}

.overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  transition: background-color 0.4s ease;
}

.category-img:hover .overlay {
  background-color: rgba(0, 0, 0, 0.4);
}

.border-bottom-white {
  border-bottom: 1px solid white;
}

.divider {
  width: 60px;
  height: 2px;
  background-color: var(--color-tiffany);
}
</style>