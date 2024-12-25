<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const login = () => {
  authStore.login({ id: 1, name: 'User' })
  router.push({ name: 'form' })
}
</script>

<template>
  <div class="q-pa-md">
    <h1 class="text-h4 q-mb-md">Welcome</h1>
    <q-btn color="primary" @click="login">Login</q-btn>
  </div>
</template>