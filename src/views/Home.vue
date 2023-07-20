<script setup>
import AppLayout from '../layouts/AppLayout.vue'
</script>

<template>
  <AppLayout>
    <div class="text-center">
      <div>Welcome to Dashboard</div>
      <div>
        <router-link :to="{ name: 'tasks' }">View Task</router-link> or/and
        <router-link :to="{ name: 'task-create' }">Create Task</router-link>
      </div>
    </div>
  </AppLayout>
</template>
