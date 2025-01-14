<script setup>
import {ref, onMounted} from "vue";
import DateSlider from "@/components/DateSlider.vue";
import DailyProgress from "@/components/DailyProgress.vue";
import MealSection from "@/components/MealSection.vue";
import {useMealsStore} from "@/stores/meals";
import {useModalsStore} from "@/stores/modals";
import {userAPI} from "@/services/api";

const selectedDate = ref(new Date());
const mealsStore = useMealsStore();
const modalsStore = useModalsStore();

// Kunlik progress ma'lumotlari
const dailyStats = ref({
  goal: 0,
  consumed: 0,
  remaining: 0,
  nutrients: {
    protein: {
      current: 0,
      goal: 0,
      color: "#E67E22",
    },
    carbs: {
      current: 0,
      goal: 0,
      color: "#F1C40F",
    },
    fat: {
      current: 0,
      goal: 0,
      color: "#3498DB",
    },
  },
});

// Tanlangan sana uchun ma'lumotlarni yuklash
const fetchDailyStats = async (date) => {
  try {
    const formattedDate = date.toISOString().split("T")[0];
    const response = await userAPI.getDailyStats(formattedDate);
    console.log(response);

    if (response.data?.data) {
      const {goals, consumed} = response.data.data;

      // DailyProgress komponenti uchun ma'lumotlarni formatlash
      dailyStats.value = {
        goal: goals?.total.calories || 0,
        consumed: consumed?.total.calories || 0,
        remaining:
          (goals?.total.calories || 0) - (consumed?.total.calories || 0),
        nutrients: {
          protein: {
            current: consumed?.total?.proteins || 0,
            goal: goals?.total?.proteins || 0,
            color: "#E67E22",
          },
          carbs: {
            current: consumed?.total?.carbs || 0,
            goal: goals?.total?.carbs || 0,
            color: "#F1C40F",
          },
          fat: {
            current: consumed?.total?.fats || 0,
            goal: goals?.total?.fats || 0,
            color: "#3498DB",
          },
        },
      };
    }

    // Ovqatlarni yuklash
    await mealsStore.fetchMeals(date);
  } catch (error) {
    console.error("Kunlik statistikani yuklashda xatolik:", error);
  }
};

// Sana o'zgarganda
const handleDateSelect = async (date) => {
  selectedDate.value = date;
  await fetchDailyStats(date);
};

// Modal oynani ochish
const openAddMealModal = (mealType) => {
  modalsStore.setSelectedMealType(mealType);
  modalsStore.openAddMealModal();
};

onMounted(async () => {
  await fetchDailyStats(selectedDate.value);
});
</script>

<template>
  <div class="home-page">
    <div class="my-4">
      <DateSlider
        :selected-date="selectedDate"
        @date-select="handleDateSelect"
      />
    </div>

    <!-- Daily Progress komponentiga yangilangan props -->
    <DailyProgress
      :goal="dailyStats.goal"
      :consumed="dailyStats.consumed"
      :remaining="dailyStats.remaining"
      :nutrients="dailyStats.nutrients"
    />

    <MealSection
      :meals="mealsStore.meals"
      :date="selectedDate"
      @add-product="openAddMealModal"
    />
  </div>
</template>

<style scoped>
.home-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
}
</style>
