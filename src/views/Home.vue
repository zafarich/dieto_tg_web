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
import {useMealsStore} from "@/stores/meals";

const selectedDate = ref(new Date());
const modalsStore = useModalsStore();
const mealsStore = useMealsStore();

const handleDateSelect = (date) => {
  selectedDate.value = date;
  // Bu yerda tanlangan sanaga oid ma'lumotlarni yuklash mantiqini qo'shish mumkin
};

const handleAddProduct = (mealType) => {
  modalsStore.setSelectedMealType(mealType);
  modalsStore.openAddMealModal();
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

    <MealSection :meals="mealsStore.meals" @add-product="handleAddProduct" />
    <BottomNavigation />
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
