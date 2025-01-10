<script setup>
import MealProducts from "./MealProducts.vue";
import {useRouter} from "vue-router";
import {useMealsStore} from "@/stores/meals";

const props = defineProps({
  meals: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["addProduct"]);
const router = useRouter();
const mealsStore = useMealsStore();

const openAddModal = (mealType) => {
  emit("addProduct", mealType);
};

const openMealDetails = (meal) => {
  router.push({
    name: "meal-details",
    params: {type: meal.type},
    query: {date: mealsStore.selectedDate.toISOString()},
  });
};
</script>

<template>
  <div class="meal-section mt-4">
    <div class="meals-list space-y-3">
      <div
        v-for="meal in meals"
        :key="meal.type"
        @click="openMealDetails(meal)"
        class="meal-item bg-white/80 backdrop-blur-sm rounded-xl shadow-sm overflow-hidden transition-all duration-300 border border-gray-100"
      >
        <div class="p-3 flex justify-between items-center">
          <div class="flex items-center gap-3">
            <div
              class="meal-icon w-[32px] h-[32px] rounded-lg bg-primary/5 flex items-center justify-center p-1.5 border border-primary/10"
            >
              <img
                :src="meal.icon"
                class="w-full h-full object-contain"
                :alt="meal.title"
              />
            </div>
            <div>
              <h3 class="font-medium text-[14px] leading-6 text-gray-800">
                {{ meal.title }}
              </h3>
              <div class="flex items-center gap-2">
                <p class="text-xs">
                  <span class="text-green-500 font-medium">{{
                    meal.current
                  }}</span>
                  <span class="text-gray-400 mx-0.5">/</span>
                  <span class="text-gray-500">{{ meal.calories }}</span>
                  <span class="text-gray-400 text-[10px] ml-0.5">kkal</span>
                </p>
                <!-- Progress bar -->
                <div class="w-16 h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    class="h-full bg-green-500/80 rounded-full transition-all duration-700"
                    :style="{
                      width: `${(meal.current / meal.calories) * 100}%`,
                    }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <button
            class="w-9 h-9 bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-xl transition-all duration-300 flex items-center justify-center"
            @click.stop="openAddModal(meal.type)"
          >
            <q-icon name="add" size="16px" />
          </button>
        </div>

        <MealProducts :products="meal.products" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.meal-section {
  container-type: inline-size;
}
</style>
