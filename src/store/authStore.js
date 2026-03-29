import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { auth, db } from '../firebase/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const role = ref(null) // 'client' or 'admin'
  const isAuthReady = ref(false)
  const loading = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => role.value === 'admin')

  const fetchUserRole = async (uid) => {
    try {
      const docRef = doc(db, 'users', uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        role.value = docSnap.data().role
      } else {
        role.value = 'client'
      }
    } catch (err) {
      console.error('Error fetching user role:', err)
      role.value = 'client'
    }
  }

  const registerUser = async (email, password) => {
    loading.value = true
    error.value = null
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      // Create user document in Firestore with default 'client' role
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: email,
        role: 'client',
        createdAt: new Date().toISOString()
      })
      user.value = userCredential.user
      role.value = 'client'
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const loginUser = async (email, password) => {
    loading.value = true
    error.value = null
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      user.value = userCredential.user
      await fetchUserRole(userCredential.user.uid)
    } catch (err) {
      error.value = 'Invalid email or password'
      throw err
    } finally {
      loading.value = false
    }
  }

  const logoutUser = async () => {
    loading.value = true
    try {
      await signOut(auth)
      user.value = null
      role.value = null
    } catch (err) {
      console.error('Error during logout:', err)
    } finally {
      loading.value = false
    }
  }

  // Initial listener mapped to auth state
  onAuthStateChanged(auth, async (currentUser) => {
    user.value = currentUser
    if (currentUser) {
      await fetchUserRole(currentUser.uid)
    } else {
      role.value = null
    }
    isAuthReady.value = true
  })

  return {
    user,
    role,
    isAuthReady,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    registerUser,
    loginUser,
    logoutUser
  }
})
