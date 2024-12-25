<script setup lang="ts">
import { computed } from 'vue'
import { categories } from '@/constants/formOptions'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>

<template>
  <q-select
    v-model="value"
    :options="categories"
    label="Category"
    outlined
    option-label="label"
    option-value="value"
  />
</template>