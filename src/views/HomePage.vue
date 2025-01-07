<template>
  <div class="home-page">
    <!-- Date Slider -->
    <DateSlider v-model="selectedDate" />

    <!-- Daily Progress -->
    <DailyProgress :progress="dailyProgress" />

    <!-- Meals -->
    <MealSection
      :meals="meals"
      :date="selectedDate"
      @addProduct="openAddMealModal"
    />
  </div>
</template>
