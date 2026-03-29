<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/authStore'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const formError = ref('')

const handleRegister = async () => {
  formError.value = ''
  if (!email.value || !password.value || !confirmPassword.value) {
    formError.value = 'Por favor completa todos los campos.'
    return
  }
  if (password.value !== confirmPassword.value) {
    formError.value = 'Las contraseñas no coinciden.'
    return
  }
  if (password.value.length < 6) {
    formError.value = 'La contraseña debe tener al menos 6 caracteres.'
    return
  }

  try {
    await authStore.registerUser(email.value, password.value)
    router.push('/')
  } catch (err) {
    formError.value = authStore.error || 'Ocurrió un error al registrarse.'
  }
}
</script>

<template>
  <div class="register-container d-flex align-center justify-center pa-4">
    <v-card class="pa-8 elevation-4" max-width="450" width="100%" rounded="lg">
      <div class="text-center mb-6">
        <h1 class="tiffany-title text-h4 font-weight-bold mb-2">Crear Cuenta</h1>
        <p class="text-subtitle-1 text-medium-emphasis">Únete a Golden Souls</p>
      </div>

      <v-form @submit.prevent="handleRegister">
        <v-text-field
          v-model="email"
          label="Correo Electrónico"
          type="email"
          variant="outlined"
          color="tiffany-blue"
          prepend-inner-icon="mdi-email-outline"
          class="mb-2"
        ></v-text-field>

        <v-text-field
          v-model="password"
          label="Contraseña"
          type="password"
          variant="outlined"
          color="tiffany-blue"
          prepend-inner-icon="mdi-lock-outline"
          class="mb-2"
        ></v-text-field>

        <v-text-field
          v-model="confirmPassword"
          label="Confirmar Contraseña"
          type="password"
          variant="outlined"
          color="tiffany-blue"
          prepend-inner-icon="mdi-lock-check-outline"
          class="mb-4"
        ></v-text-field>

        <v-alert v-if="formError" type="error" density="compact" class="mb-4">
          {{ formError }}
        </v-alert>

        <v-btn
          type="submit"
          color="#81D8D0"
          block
          size="x-large"
          class="text-none font-weight-bold tiffany-btn mb-4"
          :loading="authStore.loading"
        >
          Registrarse
        </v-btn>

        <div class="text-center">
          <span class="text-body-2 text-medium-emphasis">¿Ya tienes una cuenta? </span>
          <router-link to="/login" class="text-decoration-none tiffany-link font-weight-medium">
            Inicia sesión
          </router-link>
        </div>
      </v-form>
    </v-card>
  </div>
</template>

<style scoped>
.register-container {
  min-height: calc(100vh - 64px);
  background-color: #fafafa;
}

.tiffany-title {
  color: #333;
  font-family: 'Playfair Display', serif;
  letter-spacing: 1px;
}

.tiffany-btn {
  color: white !important;
  letter-spacing: 1px;
}

.tiffany-link {
  color: #81D8D0;
  transition: opacity 0.2s;
}

.tiffany-link:hover {
  opacity: 0.8;
}
</style>
