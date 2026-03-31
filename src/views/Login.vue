<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/authStore'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const formError = ref('')

const handleLogin = async () => {
  formError.value = ''
  if (!email.value || !password.value) {
    formError.value = 'Por favor ingresa tu correo y contraseña.'
    return
  }
  try {
    await authStore.loginUser(email.value, password.value)
    router.push('/')
  } catch (err) {
    formError.value = authStore.error || 'Ocurrió un error al iniciar sesión.'
  }
}
</script>

<template>
  <div class="login-container d-flex align-center justify-center pa-4">
    <v-card class="pa-8 elevation-4" max-width="450" width="100%" rounded="lg">
      <div class="text-center mb-6">
        <h1 class="tiffany-title text-h4 font-weight-bold mb-2">Bienvenido</h1>
        <p class="text-subtitle-1 text-medium-emphasis">Inicia sesión en Golden Souls</p>
      </div>

      <v-form @submit.prevent="handleLogin">
        <v-text-field
          v-model="email"
          label="Correo Electrónico"
          type="email"
          variant="outlined"
          color="primary"
          prepend-inner-icon="mdi-email-outline"
          class="mb-2"
        ></v-text-field>

        <v-text-field
          v-model="password"
          label="Contraseña"
          type="password"
          variant="outlined"
          color="primary"
          prepend-inner-icon="mdi-lock-outline"
          class="mb-4"
        ></v-text-field>

        <v-alert v-if="formError" type="error" density="compact" class="mb-4">
          {{ formError }}
        </v-alert>

        <v-btn
          type="submit"
          color="primary"
          block
          size="x-large"
          class="text-none font-weight-bold tiffany-btn mb-4"
          :loading="authStore.loading"
        >
          Iniciar Sesión
        </v-btn>

        <div class="text-center">
          <span class="text-body-2 text-medium-emphasis">¿No tienes una cuenta? </span>
          <router-link to="/register" class="text-decoration-none tiffany-link font-weight-medium">
            Regístrate aquí
          </router-link>
        </div>
      </v-form>
    </v-card>
  </div>
</template>

<style scoped>
.login-container {
  min-height: calc(100vh - 64px); /* assuming navbar is 64px */
  background-color: rgb(var(--v-theme-background));
}

.tiffany-title {
  color: rgb(var(--v-theme-gold));
  font-family: 'Playfair Display', serif; /* Or any elegant font */
  letter-spacing: 1px;
}

.tiffany-btn {
  color: white !important;
  letter-spacing: 1px;
}

.tiffany-link {
  color: rgb(var(--v-theme-primary));
  transition: opacity 0.2s;
}

.tiffany-link:hover {
  opacity: 0.8;
}
</style>
