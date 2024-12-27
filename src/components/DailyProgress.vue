<script setup>
const dailyStats = {
  goal: 3133,
  consumed: 2831,
  remaining: 309,
  nutrients: {
    protein: {
      current: 128,
      goal: 157,
      color: "#E67E22",
    },
    carbs: {
      current: 375,
      goal: 431,
      color: "#F1C40F",
    },
    fat: {
      current: 96,
      goal: 87,
      color: "#3498DB",
    },
  },
};

const calculatePercent = (current, goal) => {
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
        <span class="text-base font-bold text-gray-800">{{
          dailyStats.goal
        }}</span>
        <span class="text-[12px] text-gray-400">kkal</span>
      </div>

      <!-- Iste'mol qilindi -->
      <div class="flex flex-col relative">
        <div class="absolute inset-x-0 h-full border-x border-gray-100"></div>
        <span class="text-[14px] text-gray-500 mb-0.5">Yeyildi</span>
        <span class="text-base font-bold text-primary">{{
          dailyStats.consumed
        }}</span>
        <span class="text-[12px] text-gray-400">kkal</span>
      </div>

      <!-- Qoldi -->
      <div class="flex flex-col">
        <span class="text-[14px] text-gray-500 mb-0.5">Qoldi</span>
        <span class="text-base font-bold text-gray-800">{{
          dailyStats.remaining
        }}</span>
        <span class="text-[12px] text-gray-400">kkal</span>
      </div>
    </div>

    <!-- Progress bar -->
    <div class="mt-3 mb-4">
      <div class="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          class="h-full bg-gradient-to-r from-primary/90 to-primary/80 rounded-full transition-all duration-700"
          :style="{
            width: `${(dailyStats.consumed / dailyStats.goal) * 100}%`,
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
                dailyStats.nutrients.protein.current,
                dailyStats.nutrients.protein.goal
              )}%`,
              backgroundColor: dailyStats.nutrients.protein.color,
            }"
          ></div>
        </div>
        <span class="text-[12px] text-gray-500 block mt-2">
          {{ dailyStats.nutrients.protein.current }}/{{
            dailyStats.nutrients.protein.goal
          }}
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
                dailyStats.nutrients.carbs.current,
                dailyStats.nutrients.carbs.goal
              )}%`,
              backgroundColor: dailyStats.nutrients.carbs.color,
            }"
          ></div>
        </div>
        <span class="text-[12px] text-gray-500 block mt-2">
          {{ dailyStats.nutrients.carbs.current }}/{{
            dailyStats.nutrients.carbs.goal
          }}
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
                dailyStats.nutrients.fat.current,
                dailyStats.nutrients.fat.goal
              )}%`,
              backgroundColor: dailyStats.nutrients.fat.color,
            }"
          ></div>
        </div>
        <span class="text-[12px] text-gray-500 block mt-2">
          {{ dailyStats.nutrients.fat.current }}/{{
            dailyStats.nutrients.fat.goal
          }}
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
