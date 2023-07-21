<script setup>
import { ref } from 'vue'
import AppLayout from '../../layouts/AppLayout.vue'
import axios from '../../utils/axios'

const users = ref([])
const status = ref('')

const getUsers = async () => {
  const response = await axios.get('/api/users')

  users.value = response.data.data
}

getUsers()

const deleteUser = async (id) => {
  const response = await axios.delete('/api/users/' + id)

  if (response.status === 200) {
    getUsers()
    status.value = response.data.message
  }
}
</script>

<template>
  <AppLayout>
    <div>
      <h3 class="border-b text-lg font-semibold py-2 mb-2">Tasks</h3>
      <div>
        <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
          {{ status }}
        </div>
        <table v-if="users.length > 0" class="w-full">
          <thead>
            <tr class="border-b text-left">
              <th class="p-2">#</th>
              <th class="p-2">Name</th>
              <th class="p-2">Email</th>
              <th class="p-2">Tasks</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b" v-for="(user, index) in users" :key="index">
              <td class="p-2">{{ user.id }}</td>
              <td class="p-2">{{ user.name }}</td>
              <td class="p-2">{{ user.email }}</td>
              <td class="p-2">{{ user.tasks_count }}</td>
            </tr>
          </tbody>
        </table>

        <div v-else class="text-center">No User Fund!</div>
      </div>
    </div>
  </AppLayout>
</template>

<style scoped></style>
