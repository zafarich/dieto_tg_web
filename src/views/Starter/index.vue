<script setup lang="ts">
import {computed} from "vue";
import {useOnboardingStore} from "@/stores/onboarding";
import LanguageStep from "./steps/LanguageStep.vue";
import GenderStep from "./steps/GenderStep.vue";
import GenderInfoStep from "./steps/GenderInfoStep.vue";
import InfoStep from "./steps/InfoStep.vue";
import BirthdayStep from "./steps/BirthdayStep.vue";
import WeightStep from "./steps/WeightStep.vue";
import HeightStep from "./steps/HeightStep.vue";
import ActivityStep from "./steps/ActivityStep.vue";
import GoalWeightStep from "./steps/GoalWeightStep.vue";
import ResultsStep from "./steps/ResultsStep.vue";

const store = useOnboardingStore();

const currentComponent = computed(() => {
  switch (store.currentStep) {
    case 1:
      return LanguageStep;
    case 2:
      return GenderStep;
    case 3:
      return GenderInfoStep;
    case 4:
      return InfoStep;
    case 5:
      return BirthdayStep;
    case 6:
      return WeightStep;
    case 7:
      return HeightStep;
    case 8:
      return ActivityStep;
    case 9:
      return GoalWeightStep;
    case 10:
      return ResultsStep;
    default:
      return LanguageStep;
  }
});
</script>

<template>
  <div class="starter-container">
    <component :is="currentComponent" />
  </div>
</template>

<style scoped>
.starter-container {
  min-height: 100vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}
</style>
