<script setup>
import { useAuthStore } from '../stores/auth'

const { user, logout } = useAuthStore()
</script>
<template>
  <header class="bg-gray-300 shadow">
    <div class="container mx-auto py-2">
      <nav class="flex items-center justify-between">
        <div>
          <h2 class="text-xl font-semibold">
            <RouterLink :to="{ name: 'home' }">Dashboard</RouterLink>
          </h2>
        </div>
        <div class="space-x-1">
          <template v-if="!user">
            <RouterLink class="px-2 py-2 hover:shadow-inner" :to="{ name: 'register' }"
              >Register</RouterLink
            >
            <RouterLink class="px-2 py-2 hover:shadow-inner" :to="{ name: 'login' }"
              >Login</RouterLink
            >
          </template>
          <template v-else>
            <button class="px-2 py-2 hover:shadow-inner" @click="logout()" type="button">
              Logout
            </button>
          </template>
        </div>
      </nav>
    </div>
  </header>
  <main>
    <div class="container mx-auto my-5">
      <slot />
    </div>
  </main>
</template>
