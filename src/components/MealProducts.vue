<script setup>
defineProps({
  products: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="meal-products divide-y divide-gray-100">
    <div
      v-for="product in products"
      :key="product.id"
      class="flex items-center justify-between py-2 px-3"
    >
      <span class="text-[13px] text-gray-700">{{ product.name }}</span>
      <span class="text-[13px] text-gray-400">{{ product.calories }} kkal</span>
    </div>
  </div>
</template>

<style scoped>
.meal-products {
  font-size: 13px;
  line-height: 1.2;
}
</style>
