<script setup>
import DailyProgress from "@/components/DailyProgress.vue";
import MealSection from "@/components/MealSection.vue";
import AddMealModal from "@/components/AddMealModal.vue";
import DateSlider from "@/components/DateSlider.vue";
import {ref, onMounted} from "vue";
import {Swiper, SwiperSlide} from "swiper/vue";
import "swiper/css";

const selectedDate = ref(new Date());

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
]);

const showAddModal = ref(false);
const selectedMealType = ref(null);

const handleAddProduct = (mealType) => {
  selectedMealType.value = mealType;
  showAddModal.value = true;
};

const addProduct = (product) => {
  const meal = meals.value.find((m) => m.type === selectedMealType.value);
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
      :is-open="showAddModal"
      @close="showAddModal = false"
      @add="addProduct"
    />
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
