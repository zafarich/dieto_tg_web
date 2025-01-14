<script setup>
import {computed} from "vue";

// Props definition
const props = defineProps({
  goal: {
    type: Number,
    required: true,
  },
  consumed: {
    type: Number,
    required: true,
  },
  remaining: {
    type: Number,
    required: true,
  },
  nutrients: {
    type: Object,
    required: true,
    default: () => ({
      protein: {current: 0, goal: 0, color: "#E67E22"},
      carbs: {current: 0, goal: 0, color: "#F1C40F"},
      fat: {current: 0, goal: 0, color: "#3498DB"},
    }),
  },
});

// Progress foizini hisoblash
const calculatePercent = (current, goal) => {
  if (!goal) return 0;
  return Math.min((current / goal) * 100, 100);
};
</script>

<template>
  <div
    class="daily-stats bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-4 border border-gray-100"
  >
    <!-- Asosiy statistika -->
    <div class="grid grid-cols-3 gap-2 text-center">
      <!-- Kunlik maqsad -->
      <div class="flex flex-col">
        <span class="text-[14px] text-gray-500 mb-0.5">Maqsad</span>
        <span class="text-base font-bold text-gray-800">{{ goal }}</span>
        <span class="text-[12px] text-gray-400">kkal</span>
      </div>

      <!-- Iste'mol qilindi -->
      <div class="flex flex-col relative">
        <div class="absolute inset-x-0 h-full border-x border-gray-100"></div>
        <span class="text-[14px] text-gray-500 mb-0.5">Yeyildi</span>
        <span class="text-base font-bold text-primary">{{ consumed }}</span>
        <span class="text-[12px] text-gray-400">kkal</span>
      </div>

      <!-- Qoldi -->
      <div class="flex flex-col">
        <span class="text-[14px] text-gray-500 mb-0.5">Qoldi</span>
        <span class="text-base font-bold text-gray-800">{{ remaining }}</span>
        <span class="text-[12px] text-gray-400">kkal</span>
      </div>
    </div>

    <!-- Progress bar -->
    <div class="mt-3 mb-4">
      <div class="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          class="h-full bg-gradient-to-r from-primary/90 to-primary/80 rounded-full transition-all duration-700"
          :style="{
            width: `${calculatePercent(consumed, goal)}%`,
          }"
        ></div>
      </div>
    </div>

    <!-- Nutrients -->
    <div class="grid grid-cols-3 gap-7">
      <!-- Protein -->
      <div class="nutrient-progress text-center">
        <span class="text-[14px] font-medium text-gray-600 block mb-1"
          >Protein</span
        >
        <div class="h-1 bg-gray-100 rounded-full overflow-hidden mb-1">
          <div
            class="h-full rounded-full transition-all duration-700"
            :style="{
              width: `${calculatePercent(
                nutrients.protein.current,
                nutrients.protein.goal
              )}%`,
              backgroundColor: nutrients.protein.color,
            }"
          ></div>
        </div>
        <span class="text-[12px] text-gray-500 block mt-2">
          {{ nutrients.protein.current }}/{{ nutrients.protein.goal }}
        </span>
      </div>

      <!-- Carbs -->
      <div class="nutrient-progress text-center">
        <span class="text-[14px] font-medium text-gray-600 block mb-1"
          >Uglevod</span
        >
        <div class="h-1 bg-gray-100 rounded-full overflow-hidden mb-1">
          <div
            class="h-full rounded-full transition-all duration-700"
            :style="{
              width: `${calculatePercent(
                nutrients.carbs.current,
                nutrients.carbs.goal
              )}%`,
              backgroundColor: nutrients.carbs.color,
            }"
          ></div>
        </div>
        <span class="text-[12px] text-gray-500 block mt-2">
          {{ nutrients.carbs.current }}/{{ nutrients.carbs.goal }}
        </span>
      </div>

      <!-- Fat -->
      <div class="nutrient-progress text-center">
        <span class="text-[14px] font-medium text-gray-600 block mb-1"
          >Yog'</span
        >
        <div class="h-1 bg-gray-100 rounded-full overflow-hidden mb-1">
          <div
            class="h-full rounded-full transition-all duration-700"
            :style="{
              width: `${calculatePercent(
                nutrients.fat.current,
                nutrients.fat.goal
              )}%`,
              backgroundColor: nutrients.fat.color,
            }"
          ></div>
        </div>
        <span class="text-[12px] text-gray-500 block mt-2">
          {{ nutrients.fat.current }}/{{ nutrients.fat.goal }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-primary {
  color: #1976d2;
}

.from-primary\/90 {
  --tw-gradient-from: rgba(25, 118, 210, 0.9);
}

.to-primary\/80 {
  --tw-gradient-to: rgba(25, 118, 210, 0.8);
}

@media (min-width: 640px) {
  .daily-stats {
    padding: 1.5rem;
  }
}
</style>
