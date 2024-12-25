<script setup lang="ts">
import FormExample from '@/components/FormExample.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const logout = () => {
  authStore.logout()
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="q-pa-md">
    <div class="flex justify-between items-center q-mb-lg">
      <h1 class="text-h4 q-my-none">Form Example</h1>
      <q-btn color="negative" @click="logout">Logout</q-btn>
    </div>
    <FormExample />
  </div>
</template>