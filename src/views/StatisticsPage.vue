<template>
  <div class="statistics-page">
    <!-- Header -->
    <div class="fixed top-0 left-0 right-0 bg-white z-10">
      <div class="flex items-center px-4 h-14">
        <div class="text-xl font-bold">Statistika</div>
      </div>
    </div>

    <!-- Content -->
    <div class="pt-16 px-4 pb-24">
      <!-- Kunlik statistika -->
      <div class="mb-8">
        <h2 class="text-lg font-medium mb-4">Bugungi ko'rsatkichlar</h2>
        <div class="grid grid-cols-2 gap-4">
          <!-- Kaloriyalar -->
          <div class="bg-white rounded-2xl p-4 border border-gray-100">
            <div class="flex items-center justify-between mb-2">
              <div class="text-sm text-gray-500">Kaloriyalar</div>
              <q-icon
                name="local_fire_department"
                size="20px"
                class="text-red-500"
              />
            </div>
            <div class="text-2xl font-bold">1,250</div>
            <div class="text-xs text-gray-500">Maqsad: 2,000 kkal</div>
            <q-linear-progress
              :value="0.625"
              size="10px"
              rounded
              class="q-mt-2"
              color="red"
            />
          </div>

          <!-- Suv -->
          <div class="bg-white rounded-2xl p-4 border border-gray-100">
            <div class="flex items-center justify-between mb-2">
              <div class="text-sm text-gray-500">Suv</div>
              <q-icon name="water_drop" size="20px" class="text-blue-500" />
            </div>
            <div class="text-2xl font-bold">1.2 L</div>
            <div class="text-xs text-gray-500">Maqsad: 2.5 L</div>
            <q-linear-progress
              :value="0.48"
              size="10px"
              rounded
              class="q-mt-2"
              color="blue"
            />
          </div>
        </div>
      </div>

      <!-- BZU ko'rsatkichlari -->
      <div class="mb-8">
        <h2 class="text-lg font-medium mb-4">BZU ko'rsatkichlari</h2>
        <div class="bg-white rounded-2xl p-4 border border-gray-100">
          <!-- Oqsillar -->
          <div class="mb-4">
            <div class="flex items-center justify-between mb-2">
              <div class="text-sm">Oqsillar</div>
              <div class="text-sm font-medium">45g / 90g</div>
            </div>
            <q-linear-progress
              :value="0.5"
              size="10px"
              rounded
              color="orange"
            />
          </div>

          <!-- Yog'lar -->
          <div class="mb-4">
            <div class="flex items-center justify-between mb-2">
              <div class="text-sm">Yog'lar</div>
              <div class="text-sm font-medium">30g / 70g</div>
            </div>
            <q-linear-progress :value="0.43" size="10px" rounded color="blue" />
          </div>

          <!-- Uglevodlar -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <div class="text-sm">Uglevodlar</div>
              <div class="text-sm font-medium">180g / 250g</div>
            </div>
            <q-linear-progress
              :value="0.72"
              size="10px"
              rounded
              color="yellow"
            />
          </div>
        </div>
      </div>

      <!-- Haftalik statistika -->
      <div>
        <h2 class="text-lg font-medium mb-4">Haftalik statistika</h2>
        <div class="bg-white rounded-2xl p-4 border border-gray-100">
          <div class="flex items-center justify-between mb-4">
            <div class="text-sm text-gray-500">Kaloriyalar</div>
            <div class="text-sm font-medium">O'rtacha: 1,850 kkal</div>
          </div>
          <div class="grid grid-cols-7 gap-2">
            <div v-for="day in weeklyStats" :key="day.name" class="text-center">
              <div class="h-24 flex items-end mb-2">
                <div
                  class="w-full bg-blue-100 rounded-sm"
                  :style="{height: day.percentage + '%'}"
                ></div>
              </div>
              <div class="text-xs text-gray-500">{{ day.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";

// Haftalik statistika uchun test ma'lumotlar
const weeklyStats = ref([
  {name: "Du", percentage: 85},
  {name: "Se", percentage: 92},
  {name: "Ch", percentage: 78},
  {name: "Pa", percentage: 95},
  {name: "Ju", percentage: 88},
  {name: "Sh", percentage: 72},
  {name: "Ya", percentage: 80},
]);
</script>

<style scoped>
.statistics-page {
  min-height: 100vh;
  background-color: #f8fafc;
}
</style>
