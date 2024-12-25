<script setup lang="ts">
import {useOnboardingStore} from "@/stores/onboarding";

const store = useOnboardingStore();

const getGenderInfo = () => {
  if (store.userInfo.gender === "male") {
    return {
      image: "👨",
      text:
        store.userInfo.language === "uz"
          ? "Erkaklar uchun maxsus dastur"
          : "Специальная программа для мужчин",
    };
  }
  return {
    image: "👩",
    text:
      store.userInfo.language === "uz"
        ? "Ayollar uchun maxsus dastur"
        : "Специальная программа для женщин",
  };
};

const _continue = () => {
  store.nextStep();
};

const goBack = () => {
  store.prevStep();
};
</script>

<template>
  <div class="step-container">
    <div class="text-center mb-8">
      <div>
        <img class="mb-3 w-full" src="img/info_1.png" alt="" />
      </div>
      <p class="text-lg">
        {{ $t("Start_info_desc_1") }}
      </p>
    </div>

    <q-btn
      color="primary"
      class="full-width mb-4"
      :label="$t('Continue')"
      @click="_continue"
      no-caps
    />
    <q-btn flat class="q-mt-4" :label="$t('Back')" @click="goBack" no-caps />
  </div>
</template>
