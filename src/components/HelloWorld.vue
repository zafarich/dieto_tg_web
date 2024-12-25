<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useCounterStore } from '../stores/counter'

defineProps<{ msg: string }>()
const { t } = useI18n()
const store = useCounterStore()
</script>

<template>
  <div>
    <h1>{{ msg }}</h1>
    <h2>{{ t('welcome') }}</h2>
  
    <div class="card">
      <p class="text-xl font-bold mb-4">{{ t('counter') }}: {{ store.count }}</p>
      <button 
        type="button" 
        @click="store.increment"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
      >
        {{ t('increment') }}
      </button>
      <button 
        type="button" 
        @click="store.decrement"
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        {{ t('decrement') }}
      </button>
    </div>
  </div>
</template>

<style lang="scss">

.card {
  padding: 2em;
  
  button {
    transition: background-color 0.3s ease;
    
    &:hover {
      border-color: $primary-color;
    }
  }
}
</style>
