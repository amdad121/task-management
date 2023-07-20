import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import axios from '../utils/axios'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isLoggedIn = computed(() => !!user.value)

  const router = useRouter()

  const fetchUser = async () => {
    try {
      const { data } = await axios.get('/api/user')

      user.value = data.data
    } catch (error) {
      if (error.response.status === 409) {
        router.push({ name: 'verify-email' })
      }
    }
  }

  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const login = async (processing, errors, { ...data }) => {
    processing.value = true
    errors.value = {}

    try {
      await csrf()

      await axios.post('/login', data)

      await fetchUser()

      router.push({ name: 'home' })
    } catch (error) {
      if (error.response.status === 422) {
        errors.value = error.response.data.errors
      }
    } finally {
      processing.value = false
    }
  }

  const register = async (processing, errors, { ...data }) => {
    processing.value = true
    errors.value = {}

    try {
      await csrf()

      await axios.post('/register', data)

      await fetchUser()

      router.push({ name: 'home' })
    } catch (error) {
      if (error.response.status === 422) {
        errors.value = error.response.data.errors
      }
    } finally {
      processing.value = false
    }
  }

  const logout = async () => {
    await axios.post('/logout')

    user.value = null

    router.push({ name: 'login' })
  }

  return {
    user,
    isLoggedIn,
    fetchUser,
    login,
    register,
    logout
  }
})
