import {defineStore} from "pinia";
import {ref, computed} from "vue";
import {userAPI} from "@/services/api";

// Statik ovqat turlari
const MEAL_TYPES = {
  BREAKFAST: {
    type: "breakfast",
    title: "Nonushta",
    icon: "/img/breakfast.png",
    calories: 600,
  },
  LUNCH: {
    type: "lunch",
    title: "Tushlik",
    icon: "/img/lunch.png",
    calories: 800,
  },
  DINNER: {
    type: "dinner",
    title: "Kechki ovqat",
    icon: "/img/dinner.png",
    calories: 500,
  },
  SNACK: {
    type: "snack",
    title: "Perekus",
    icon: "/img/snack.png",
    calories: 300,
  },
};

export const useMealsStore = defineStore("meals", () => {
  const dailyMeals = ref({}); // key: date string, value: meals array
  const selectedDate = ref(new Date());

  // Tanlangan kun uchun ovqatlar
  const meals = computed(() => {
    const dateStr = selectedDate.value.toISOString().split("T")[0];
    const dayMeals = dailyMeals.value[dateStr] || [];

    return Object.values(MEAL_TYPES).map((mealType) => ({
      ...mealType,
      products: dayMeals.filter((meal) => meal.type === mealType.type),
      current: dayMeals
        .filter((meal) => meal.type === mealType.type)
        .reduce((sum, meal) => sum + (meal.calories || 0), 0),
    }));
  });

  // Kunlik progress
  const dailyProgress = computed(() => {
    const dateStr = selectedDate.value.toISOString().split("T")[0];
    const dayMeals = dailyMeals.value[dateStr] || [];

    return dayMeals.reduce(
      (progress, meal) => ({
        calories: progress.calories + (meal.calories || 0),
        proteins: progress.proteins + (meal.proteins || 0),
        fats: progress.fats + (meal.fats || 0),
        carbs: progress.carbs + (meal.carbs || 0),
      }),
      {calories: 0, proteins: 0, fats: 0, carbs: 0}
    );
  });

  // Tanlangan kunga tegishli ovqatlarni yuklash
  const fetchMeals = async (date) => {
    try {
      selectedDate.value = date;
      const dateStr = date.toISOString().split("T")[0];

      if (!dailyMeals.value[dateStr]) {
        const response = await userAPI.getMeals(dateStr);
        dailyMeals.value[dateStr] = response.data;
      }
    } catch (error) {
      console.error("Ovqatlarni yuklashda xatolik:", error);
      throw error;
    }
  };

  // Yangi ovqat qo'shish
  const addMeal = async (mealData) => {
    try {
      const response = await userAPI.addMeal(mealData);
      const dateStr = selectedDate.value.toISOString().split("T")[0];

      if (!dailyMeals.value[dateStr]) {
        dailyMeals.value[dateStr] = [];
      }
      dailyMeals.value[dateStr].push(response.data);
    } catch (error) {
      console.error("Ovqat qo'shishda xatolik:", error);
      throw error;
    }
  };

  return {
    meals,
    selectedDate,
    dailyProgress,
    fetchMeals,
    addMeal,
    MEAL_TYPES,
  };
});
