<script setup>
import {ref} from "vue";
import DailyProgress from "@/components/DailyProgress.vue";
import NutritionAdvice from "@/components/NutritionAdvice.vue";
import DateSlider from '@/components/DateSlider.vue';
import {useI18n} from "vue-i18n";

const {t} = useI18n();

const quickActions = ref([
  {icon: "add_circle", label: "add_food", color: "primary"},
  {icon: "water_drop", label: "add_water", color: "blue"},
  {icon: "fitness_center", label: "add_exercise", color: "deep-orange"},
  {icon: "restaurant_menu", label: "meal_plan", color: "green"},
]);

const waterProgress = ref(4);
const waterGoal = ref(8);

const todayMeals = ref([
  {
    time: "09:00",
    name: "breakfast",
    calories: 450,
    items: ["Oatmeal with banana", "Greek yogurt"],
  },
  {
    time: "13:00",
    name: "lunch",
    calories: 624,
    items: ["Grilled chicken breast", "Brown rice", "Steamed vegetables"],
  },
]);

const macros = ref({
  proteins: {current: 50, goal: 100},
  fats: {current: 20, goal: 50},
  carbs: {current: 150, goal: 200},
});
</script>

<template>
  <div class="home-container">
    <div class="gradient-overlay"></div>
    <div class="p-4 max-w-xl mx-auto">
      <DailyProgress class="mb-6" />
      <NutritionAdvice />
      <DateSlider />
    </div>
  </div>
</template>

<style scoped>
.gradient-overlay {
  background: linear-gradient(to bottom, #1d8051, transparent);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  height: 600px;
  z-index: -1;
}
</style>
