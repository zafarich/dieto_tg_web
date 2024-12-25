<script setup lang="ts">
import {useOnboardingStore} from "@/stores/onboarding";

const store = useOnboardingStore();

const selectGender = (gender: "male" | "female") => {
  store.setGender(gender);
  store.nextStep();
};

const goBack = () => {
  store.prevStep();
};
</script>

<template>
  <div class="step-container">
    <h2 class="text-lg font-medium mb-6">
      {{ $t("Select_gender") }}
    </h2>
    <div class="flex flex-col gap-4 mb-4">
      <q-btn
        class="full-width"
        color="primary"
        :label="$t('Male')"
        @click="selectGender('male')"
        no-caps
        outline
      />
      <q-btn
        class="full-width"
        color="primary"
        :label="$t('Female')"
        @click="selectGender('female')"
        no-caps
        outline
      />
    </div>
    <q-btn flat class="q-mt-4" no-caps :label="$t('Back')" @click="goBack" />
  </div>
</template>
