<script setup>
import { ref } from 'vue'
import AppLayout from '../../layouts/AppLayout.vue'
import axios from '../../utils/axios'

const form = ref({
  title: '',
  description: '',
  deadline: '',
  user_id: ''
})

const processing = ref(false)
const errors = ref({})
const status = ref('')

const users = ref([])

const getUsers = async () => {
  const response = await axios.get('/api/users')

  users.value = response.data.data
}

getUsers()

const createTask = async () => {
  processing.value = true
  errors.value = {}

  try {
    const response = await axios.post('/api/tasks', form.value)

    if (response.status === 200) {
      status.value = response.data.message
    }
  } catch (error) {
    if (error.response?.status === 422) {
      errors.value = error.response.data.errors
    }
  } finally {
    processing.value = false
  }
}
</script>

<template>
  <AppLayout>
    <div class="w-4/5 mx-auto">
      <h3 class="border-b text-lg font-semibold py-2 mb-2">Task Create</h3>
      <div>
        <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
          {{ status }}
        </div>
        <form @submit.prevent="createTask" class="space-y-4">
          <div class="flex flex-col gap-2">
            <label for="title">Title</label>
            <input
              type="text"
              class="rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="form.title"
            />
            <div class="text-red-500" v-if="errors.title">
              {{ errors.title?.[0] }}
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <label for="description">Description</label>

            <textarea
              name="description"
              class="rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="form.description"
              id="description"
              cols="3"
              rows="3"
            ></textarea>
            <div class="text-red-500" v-if="errors.description">
              {{ errors.description?.[0] }}
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <label for="deadline">Deadline</label>
            <input
              type="datetime-local"
              class="rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="form.deadline"
            />
            <div class="text-red-500" v-if="errors.deadline">
              {{ errors.deadline?.[0] }}
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <label for="user_id">Assign to</label>
            <select
              class="rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              id="user_id"
              v-model="form.user_id"
            >
              <option disabled value="">Please Select</option>
              <option v-for="(user, index) in users" :key="user.id" :value="user.id">
                {{ user.name }}
              </option>
            </select>
            <div class="text-red-500" v-if="errors.user_id">
              {{ errors.user_id?.[0] }}
            </div>
          </div>
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
            Create Task
          </button>
        </form>
      </div>
    </div>
  </AppLayout>
</template>

<style scoped></style>
