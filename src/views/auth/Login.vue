<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../../stores/auth'
import GuestLayout from '../../layouts/GuestLayout.vue'

const form = ref({
  email: '',
  password: '',
  remember: false
})

const processing = ref(false)
const errors = ref({})

const { login } = useAuthStore()

const handleLogin = async () => await login(processing, errors, form.value)
</script>

<template>
  <GuestLayout>
    <h3 class="mb-4 border-b pb-2 text-center text-xl font-semibold">Login</h3>
    <form @submit.prevent="handleLogin()" class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <label for="email">Email</label>
        <input
          type="email"
          class="rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          v-model="form.email"
        />
        <div class="text-red-500" v-if="errors.email">
          {{ errors.email?.[0] }}
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <label for="password">Password</label>
        <input
          type="password"
          class="rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          v-model="form.password"
        />
        <div class="text-red-500" v-if="errors.password">
          {{ errors.password?.[0] }}
        </div>
      </div>
      <div class="flex items-center justify-between">
        <div>
          <label class="inline-flex items-center">
            <input
              type="checkbox"
              class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:ring-offset-0"
              v-model="form.remember"
            />
            <span class="ml-2">Remember Me</span>
          </label>
        </div>
        <div>
          <button
            type="submit"
            class="inline-flex items-center rounded-md bg-green-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow transition duration-150 ease-in-out hover:bg-green-400"
            :class="{ 'cursor-not-allowed ': processing }"
            :disabled="processing"
          >
            <svg
              v-if="processing"
              class="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Login
          </button>
        </div>
      </div>
    </form>
    <div class="mt-4 flex items-center justify-center gap-2">
      <router-link :to="{ name: 'register' }">Register</router-link> a new user
    </div>
  </GuestLayout>
</template>

<style scoped></style>
