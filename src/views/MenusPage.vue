<script setup>
import {ref} from "vue";

const menus = ref([
  {
    id: 1,
    title: "Nonushta",
    time: "07:00 - 09:00",
    calories: 450,
    image:
      "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    items: [
      {name: "Suli bo'tqasi", amount: "200g", calories: 150},
      {name: "Tuxum", amount: "2 dona", calories: 150},
      {name: "Banan", amount: "1 dona", calories: 100},
      {name: "Qora choy", amount: "200ml", calories: 50},
    ],
  },
  {
    id: 2,
    title: "Tushlik",
    time: "13:00 - 14:00",
    calories: 650,
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    items: [
      {name: "Tovuq sho'rva", amount: "300ml", calories: 200},
      {name: "Guruch", amount: "150g", calories: 200},
      {name: "Sabzavotli salat", amount: "150g", calories: 100},
      {name: "Non", amount: "100g", calories: 150},
    ],
  },
  {
    id: 3,
    title: "Kechki ovqat",
    time: "19:00 - 20:00",
    calories: 550,
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    items: [
      {name: "Baliq file", amount: "200g", calories: 250},
      {name: "Qaynatilgan brokkoli", amount: "150g", calories: 100},
      {name: "Kartoshka pure", amount: "150g", calories: 150},
      {name: "Suv", amount: "200ml", calories: 0},
    ],
  },
]);

const selectedMenu = ref(null);
const showMenuDetails = ref(false);

const openMenuDetails = (menu) => {
  selectedMenu.value = menu;
  showMenuDetails.value = true;
};
</script>

<template>
  <div class="menus-page p-2.5">
    <h1 class="text-xl font-semibold text-gray-800 mb-4">Kunlik menyular</h1>

    <!-- Menu cards -->
    <div class="space-y-4">
      <div
        v-for="menu in menus"
        :key="menu.id"
        class="menu-card bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer"
        @click="openMenuDetails(menu)"
      >
        <div class="relative h-48">
          <img
            :src="menu.image"
            :alt="menu.title"
            class="w-full h-full object-cover"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
          ></div>
          <div class="absolute bottom-0 left-0 p-4 text-white">
            <h3 class="text-lg font-medium">{{ menu.title }}</h3>
            <p class="text-sm opacity-90">{{ menu.time }}</p>
          </div>
          <div
            class="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full"
          >
            <span class="text-sm font-medium">{{ menu.calories }} kkal</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Menu details dialog -->
    <q-dialog v-model="showMenuDetails">
      <q-card style="min-width: 350px; max-width: 400px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{ selectedMenu?.title }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-md">
          <div class="text-sm text-gray-600 mb-2">{{ selectedMenu?.time }}</div>
          <div class="text-sm font-medium text-gray-800 mb-4">
            Umumiy kaloriya: {{ selectedMenu?.calories }} kkal
          </div>

          <div class="space-y-3">
            <div
              v-for="(item, index) in selectedMenu?.items"
              :key="index"
              class="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg"
            >
              <div>
                <div class="text-sm font-medium text-gray-800">
                  {{ item.name }}
                </div>
                <div class="text-xs text-gray-500">{{ item.amount }}</div>
              </div>
              <div class="text-sm text-gray-600">{{ item.calories }} kkal</div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<style scoped>
.menus-page {
  max-width: 600px;
  margin: 0 auto;
}

.menu-card {
  transition: all 0.3s ease;
}

.menu-card:active {
  transform: scale(0.99);
}
</style>
