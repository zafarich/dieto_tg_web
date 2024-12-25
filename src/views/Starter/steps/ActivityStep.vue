<script setup>
import {ref, onMounted} from "vue";
import {useOnboardingStore} from "@/stores/onboarding";

import {useI18n} from "vue-i18n";

const {t} = useI18n();

const store = useOnboardingStore();
const selectedActivity = ref("");

const activities = [
  {
    id: "sedentary",
    title: t("title_sedentary"),
    description: t("desc_sedentary"),
  },
  {
    id: "light",
    title: t("title_light"),
    description: t("desc_light"),
  },
  {
    id: "moderate",
    title: t("title_moderate"),
    description: t("desc_moderate"),
  },
  {
    id: "high",
    title: t("title_high"),
    description: t("desc_high"),
  },
  {
    id: "very_high",
    title: t("title_very_high"),
    description: t("desc_very_high"),
  },
];

onMounted(() => {
  selectedActivity.value = store.userInfo.activity || "";
});

function submit() {
  if (!selectedActivity.value) return;
  store.setActivity(selectedActivity.value);
  store.nextStep();
}

const goBack = () => {
  store.prevStep();
};
</script>

<template>
  <div class="step-container">
    <h2 class="text-lg font-medium mb-6">
      {{ $t("Your_activity") }}
    </h2>

    <div class="activity-options mb-4 w-full">
      <div
        v-for="activity in activities"
        :key="activity.id"
        class="activity-option"
        :class="{selected: selectedActivity === activity.id}"
        @click="selectedActivity = activity.id"
      >
        <div class="radio-button">
          <div
            class="radio-inner"
            v-if="selectedActivity === activity.id"
          ></div>
        </div>
        <div class="activity-content">
          <div class="activity-title">{{ activity.title }}</div>
          <div
            v-if="activity.description && selectedActivity === activity.id"
            class="activity-description"
          >
            {{ activity.description }}
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="info-text text-center mb-4">
      {{
        $t(
          "Мы используем эту информацию, чтобы создать для вас персональный план питания"
        )
      }}
    </div> -->

    <q-btn
      color="primary"
      class="full-width mb-4"
      :label="$t('Continue')"
      @click="submit"
      :disabled="!selectedActivity"
      no-caps
    />
    <q-btn flat class="q-mt-4" :label="$t('Back')" @click="goBack" no-caps />
  </div>
</template>

<style scoped>
.activity-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.activity-option {
  display: flex;
  align-items: flex-start;
  padding: 16px;
  border-radius: 12px;
  background: white;
  cursor: pointer;
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;
}

.activity-option:hover {
  border-color: #d1d5db;
}

.activity-option.selected {
  border-color: var(--q-primary);
}

.radio-button {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #d1d5db;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.activity-option.selected .radio-button {
  border-color: var(--q-primary);
}

.radio-inner {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--q-primary);
}

.activity-content {
  flex: 1;
}

.activity-title {
  font-weight: 500;
  margin-bottom: 4px;
}

.activity-description {
  font-size: 14px;
  color: #6b7280;
}

.info-text {
  font-size: 14px;
  color: #6b7280;
  max-width: 300px;
  margin: 24px auto;
}
</style>
