<script setup>
import {ref, computed} from "vue";
import {useRouter, useRoute} from "vue-router";

const router = useRouter();
const route = useRoute();

const currentRoute = computed(() => route.name);

const navigateTo = (routeName) => {
  router.push({name: routeName});
};
</script>

<template>
  <div class="fixed bottom-0 left-0 right-0 z-50">
    <!-- Asosiy navigatsiya -->
    <div
      class="bg-white border-t border-gray-100 px-4 py-2 flex items-center justify-between"
    >
      <!-- Home -->
      <button
        @click="navigateTo('home')"
        class="flex flex-col items-center p-2 rounded-xl transition-colors"
        :class="{
          'text-primary': currentRoute === 'home',
          'text-gray-400': currentRoute !== 'home',
        }"
      >
        <q-icon name="home" size="24px" />
        <span class="text-xs mt-1">Asosiy</span>
      </button>

      <!-- Statistics -->
      <button
        @click="navigateTo('statistics')"
        class="flex flex-col items-center p-2 rounded-xl transition-colors"
        :class="{
          'text-primary': currentRoute === 'statistics',
          'text-gray-400': currentRoute !== 'statistics',
        }"
      >
        <q-icon name="bar_chart" size="24px" />
        <span class="text-xs mt-1">Statistika</span>
      </button>

      <!-- Add Button -->
      <div class="relative">
        <button
          @click="$emit('add')"
          class="w-14 h-14 rounded-full bg-primary text-white shadow-lg flex items-center justify-center hover:bg-primary-dark transition-colors"
        >
          <q-icon name="add" size="32px" />
        </button>
      </div>

      <!-- Profile -->
      <button
        @click="navigateTo('profile')"
        class="flex flex-col items-center p-2 rounded-xl transition-colors"
        :class="{
          'text-primary': currentRoute === 'profile',
          'text-gray-400': currentRoute !== 'profile',
        }"
      >
        <q-icon name="person" size="24px" />
        <span class="text-xs mt-1">Profil</span>
      </button>
    </div>

    <!-- Safe area uchun padding -->
    <!-- <div class="h-6 bg-white"></div> -->
  </div>
</template>

<style scoped>
.text-primary {
  color: #1976d2;
}

.bg-primary {
  background-color: #1976d2;
}

.bg-primary-dark {
  background-color: #1565c0;
}

button {
  -webkit-tap-highlight-color: transparent;
}
</style>
