<script setup lang="ts">
import {useOnboardingStore} from "@/stores/onboarding";
import {useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
import {Quasar} from "quasar";

const i18n = useI18n();

const store = useOnboardingStore();

const selectLanguage = async (lang: "uz" | "ru") => {
  const qLang =
    lang === "ru"
      ? await import(/* @vite-ignore */ "quasar/lang/ru")
      : await import(/* @vite-ignore */ "quasar/lang/uz-Latn");
  Quasar.lang.set(qLang.default);

  i18n.locale.value = lang;
  store.nextStep();
};
</script>

<template>
  <div class="step-container">
    <h2 class="text-lg font-medium mb-6">Tilni tanlang / Выберите язык</h2>
    <div class="flex flex-col gap-4 w-full">
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
