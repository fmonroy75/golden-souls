<template>
  <v-footer class="d-flex flex-column pa-0 mt-16 w-100">
    <div class="d-flex w-100 align-center justify-center px-4 py-8 bg-surface border-top">
      <div class="text-center">
        <h3 class="playfair text-h5 mb-4" style="color: rgb(var(--v-theme-darkPurple));">Únete a nuestra alma dorada</h3>
        <p class="text-body-2 text-medium-emphasis mb-6">Síguenos en nuestras redes para descubrir nuestras últimas obras de arte y novedades exclusivas.</p>
        <div class="d-flex gap-4 justify-center mb-2">
          <v-btn icon variant="outlined" color="primary" class="social-btn mx-2" href="https://instagram.com" target="_blank">
            <v-icon>mdi-instagram</v-icon>
          </v-btn>
          <v-btn icon variant="outlined" color="primary" class="social-btn mx-2" href="https://facebook.com" target="_blank">
            <v-icon>mdi-facebook</v-icon>
          </v-btn>
          <v-btn icon variant="outlined" color="primary" class="social-btn mx-2" href="https://tiktok.com" target="_blank">
            <v-icon>mdi-video-vintage</v-icon>
          </v-btn>
        </div>
      </div>
    </div>
    <div class="px-4 py-4 w-100 text-center" style="background-color: rgb(var(--v-theme-darkPurple)); color: white;">
      <p class="mb-1 text-body-2" style="color: rgba(255,255,255,0.7);">© {{ new Date().getFullYear() }} Golden Souls. Todos los derechos reservados.</p>
      <p class="text-body-2 mb-0 mt-3 d-flex align-center justify-center">
        Desarrollado por
        <a href="https://www.ingeniumbright.com" target="_blank" class="glow-link font-weight-bold ml-2">
          IngeniumBright
        </a>
      </p>
    </div>
  </v-footer>
</template>

<style scoped>
.border-top {
  border-top: 1px solid rgba(0,0,0,0.05);
}

.social-btn {
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  border-width: 2px;
}

.social-btn:hover {
  transform: translateY(-5px) scale(1.1);
  background-color: rgb(var(--v-theme-primary)) !important;
  color: white !important;
  box-shadow: 0 10px 20px rgba(117, 206, 210, 0.3);
}

.glow-link {
  color: rgb(var(--v-theme-gold));
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  letter-spacing: 1px;
}

.glow-link:hover {
  color: #fff;
  text-shadow: 0 0 10px rgb(var(--v-theme-gold)), 
               0 0 20px rgb(var(--v-theme-gold)), 
               0 0 30px rgb(var(--v-theme-primary));
}
</style>
