<script setup>
import BottomNavigation from "@/components/BottomNavigation.vue";
</script>

<template>
  <div class="app-container pb-24">
    <router-view />
    <BottomNavigation />
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  background-color: #f8fafc;
}
</style>
