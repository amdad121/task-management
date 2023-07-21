<script setup>
import { computed, ref } from 'vue'
import AppLayout from '../../layouts/AppLayout.vue'
import axios from '../../utils/axios'
import moment from 'moment'

const tasks = ref([])
const status = ref('')

const getTasks = async () => {
  const response = await axios.get('/api/tasks')

  tasks.value = response.data.data
}

getTasks()

const deleteTask = async (id) => {
  const response = await axios.delete('/api/tasks/' + id)

  if (response.status === 200) {
    getTasks()
    status.value = response.data.message
  }
}

const dateFormat = (date) => moment(date).format('DD-MM-YYYY h:m A')
</script>

<template>
  <AppLayout>
    <div>
      <h3 class="border-b text-lg font-semibold py-2 mb-2">Tasks</h3>
      <div>
        <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
          {{ status }}
        </div>
        <table v-if="tasks.length > 0" class="w-full">
          <thead>
            <tr class="border-b text-left">
              <th class="p-2">#</th>
              <th class="p-2">Title</th>
              <th class="p-2">Description</th>
              <th class="p-2">Deadline</th>
              <th class="p-2">Assigned</th>
              <th class="p-2">Option</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b" v-for="(task, index) in tasks" :key="index">
              <td class="p-2">{{ task.id }}</td>
              <td class="p-2">{{ task.title }}</td>
              <td class="p-2">{{ task.description }}</td>
              <td class="p-2">{{ dateFormat(task.deadline) }}</td>
              <td class="p-2">{{ task.user?.name }}</td>
              <td class="p-2 space-x-2">
                <router-link
                  class="bg-green-600 px-2 py-1 rounded text-white"
                  :to="{ name: 'task-edit', params: { id: task.id } }"
                  >Edit</router-link
                >
                <button
                  class="bg-red-600 px-2 py-1 rounded text-white"
                  @click="deleteTask(task.id)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-else class="text-center">No Task Fund!</div>
      </div>
    </div>
  </AppLayout>
</template>

<style scoped></style>
