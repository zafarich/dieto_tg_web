<script setup lang="ts">
import { ref } from 'vue'
import NameInput from './form/NameInput.vue'
import CategorySelect from './form/CategorySelect.vue'
import DatePicker from './form/DatePicker.vue'

const name = ref('')
const category = ref('')
const date = ref('')
</script>

<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 300px">
      <NameInput v-model="name" />
      <CategorySelect v-model="category" />
      <DatePicker v-model="date" />
    </div>
  </div>
</template>