<script setup>
</script>

<template>
  <div class="hero-section">
    <v-img
      src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070&auto=format&fit=crop"
      height="80vh"
      cover
      class="hero-img animate-pan"
    >
      <div class="hero-overlay d-flex align-center">
        <v-container>
          <v-row>
            <v-col cols="12" md="8" lg="6" class="hero-content pl-md-10">
              <span class="text-overline mb-4 d-block" style="color: rgb(var(--v-theme-primary)); letter-spacing: 4px; font-size: 1rem !important;">
                NUEVA COLECCIÓN
              </span>
              <h1 class="playfair text-h2 text-md-h1 font-weight-regular text-white mb-6" style="line-height: 1.1;">
                El Regalo <br> Perfecto
              </h1>
              <p class="text-body-1 text-white mb-8 pr-md-10 font-weight-light" style="font-size: 1.2rem !important; opacity: 0.9;">
                Explora joyas legendarias que han sido diseñadas para celebrar el amor, la vida y las almas doradas de quienes las llevan.
              </p>
              
              <v-btn
                color="white"
                size="x-large"
                class="tiffany-solid-btn rounded-0 px-8 py-3"
                height="56"
                flat
                to="/shop"
              >
                Comprar Ahora
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-img>
  </div>
</template>

<style scoped>
.hero-section {
  position: relative;
  width: 100%;
}

.hero-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.1) 100%);
}

.tiffany-text {
  color: var(--color-tiffany);
}

.tiffany-solid-btn {
  color: rgb(var(--v-theme-darkPurple)) !important;
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 2px;
  font-weight: 600;
  transition: all 0.4s ease;
}

.tiffany-solid-btn:hover {
  background-color: rgb(var(--v-theme-primary)) !important;
  color: white !important;
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.2) !important;
}

.hero-content {
  animation: fadeIn 1.5s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>