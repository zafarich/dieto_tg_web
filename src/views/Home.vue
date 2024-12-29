<script setup>
import DailyProgress from "@/components/DailyProgress.vue";
import MealSection from "@/components/MealSection.vue";
import AddMealModal from "@/components/AddMealModal.vue";
import DateSlider from "@/components/DateSlider.vue";
import BottomNavigation from "@/components/BottomNavigation.vue";
import {ref, onMounted, computed} from "vue";
import {Swiper, SwiperSlide} from "swiper/vue";
import "swiper/css";
import {useModalsStore} from "@/stores/modals";

const selectedDate = ref(new Date());
const modalsStore = useModalsStore();

const handleDateSelect = (date) => {
  selectedDate.value = date;
  // Bu yerda tanlangan sanaga oid ma'lumotlarni yuklash mantiqini qo'shish mumkin
};

const meals = ref([
  {
    type: "breakfast",
    title: "Zavtrak",
    calories: 940,
    current: 689,
    icon: "/img/breakfast.png",
    products: [
      {name: "Qaynatilgan tuxum", calories: 233},
      {name: "Qaynatilgan tuxum", calories: 78},
      {name: "Qaynatilgan tuxum", calories: 78},
      {name: "Banan", calories: 114},
      {name: "Tvorog", calories: 26},
      {name: "Ofsiyanka", calories: 105},
      {name: "Sut", calories: 55},
    ],
  },
  {
    type: "lunch",
    title: "Tushlik",
    calories: 1097,
    current: 0,
    icon: "/img/lunch.png",
    products: [],
  },
  {
    type: "dinner",
    title: "Kechki ovqat",
    calories: 627,
    current: 0,
    icon: "/img/dinner.png",
    products: [],
  },
  {
    type: "snack",
    title: "Perekus",
    calories: 469,
    current: 0,
    icon: "/img/snack.png",
    products: [],
  },
]);

const handleAddProduct = (mealType) => {
  modalsStore.setSelectedMealType(mealType);
  modalsStore.openAddMealModal();
};

const handleCategorySelect = (mealType) => {
  modalsStore.setSelectedMealType(mealType);
  modalsStore.closeCategoryDialog();
  modalsStore.openAddMealModal();
};

const addProduct = (product) => {
  const meal = meals.value.find((m) => m.type === modalsStore.selectedMealType);
  if (meal) {
    meal.products.push(product);
    meal.current += Number(product.calories);
  }
};
</script>

<template>
  <div class="home-container min-h-screen">
    <DailyProgress />

    <div class="my-4">
      <DateSlider
        :selected-date="selectedDate"
        @date-select="handleDateSelect"
      />
    </div>

    <MealSection :meals="meals" @add-product="handleAddProduct" />

    <AddMealModal
      :is-open="modalsStore.showAddMealModal"
      @close="modalsStore.closeAddMealModal"
      @add="addProduct"
    />

    <BottomNavigation />

    <!-- Category Selection Dialog -->
    <q-dialog v-model="modalsStore.showCategoryDialog" position="bottom">
      <q-card class="q-pa-none" style="width: 100%; max-width: 600px">
        <q-card-section class="q-pt-md">
          <div class="grid grid-cols-2 gap-3">
            <div
              v-for="meal in meals"
              :key="meal.type"
              class="meal-category cursor-pointer"
              @click="handleCategorySelect(meal.type)"
            >
              <div
                class="flex flex-col items-center gap-2 p-3 bg-gray-50/50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div
                  class="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center p-2 border border-primary/10"
                >
                  <img
                    :src="meal.icon"
                    class="w-full h-full object-contain"
                    :alt="meal.title"
                  />
                </div>
                <span class="text-sm font-medium text-gray-700">{{
                  meal.title
                }}</span>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<style scoped>
.home-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
}

.date-slider-container {
  margin-left: -1rem;
  margin-right: -1rem;
  padding: 0.5rem 1rem;
}

.date-swiper {
  padding: 0.5rem 0;
}

.date-slide {
  width: auto;
}

.date-item {
  min-width: 90px;
  background-color: white;
  border: 1px solid #edf2f7;
}

:deep(.text-primary) {
  color: #1976d2;
}

:deep(.text-primary-dark) {
  color: #1565c0;
}

:deep(.bg-primary\/10) {
  background-color: rgba(25, 118, 210, 0.1);
}

:deep(.bg-primary) {
  background-color: #1976d2;
}
</style>
