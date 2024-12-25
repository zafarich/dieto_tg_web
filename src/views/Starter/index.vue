<script setup lang="ts">
import { computed } from 'vue'
import { useOnboardingStore } from '@/stores/onboarding'
import LanguageStep from './steps/LanguageStep.vue'
import GenderStep from './steps/GenderStep.vue'
import GenderInfoStep from './steps/GenderInfoStep.vue'
import InfoStep from './steps/InfoStep.vue'
import BirthdayStep from './steps/BirthdayStep.vue'
import WeightStep from './steps/WeightStep.vue'

const store = useOnboardingStore()

const currentComponent = computed(() => {
  switch (store.currentStep) {
    case 1: return LanguageStep
    case 2: return GenderStep
    case 3: return GenderInfoStep
    case 4: return InfoStep
    case 5: return BirthdayStep
    case 6: return WeightStep
    default: return LanguageStep
  }
})
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