<script setup lang="ts">
import {useOnboardingStore} from "@/stores/onboarding";
import {useRouter} from "vue-router";
import {useI18n} from "vue-i18n";

const i18n = useI18n();

const store = useOnboardingStore();

const selectLanguage = (lang: "uz" | "ru") => {
  i18n.locale.value = lang;
  store.nextStep();
};
</script>

<template>
  <div class="step-container">
    <h2 class="text-lg font-medium mb-6">
      Tilni tanlang / Выберите язык {{ $t("hello") }}
    </h2>
    <div class="flex flex-col gap-4">
      <q-btn
        class="full-width"
        color="primary"
        label="O'zbek tili"
        no-caps
        outline
        @click="selectLanguage('uz')"
      />
      <q-btn
        class="full-width"
        color="primary"
        label="Русский язык"
        no-caps
        outline
        @click="selectLanguage('ru')"
      />
    </div>
  </div>
</template>

<style scoped></style>
