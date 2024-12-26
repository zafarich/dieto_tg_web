<script setup>
import {ref, computed, onMounted} from "vue";
import {useOnboardingStore} from "@/stores/onboarding";
import {useRouter} from "vue-router";
import {useI18n} from "vue-i18n";

const {t} = useI18n();
const store = useOnboardingStore();
const router = useRouter();
const isLoading = ref(true);

const bmi = computed(() => {
  const weight = store.userInfo.weight;
  const height = store.userInfo.height / 100; // convert to meters
  if (!weight || !height) return 0;
  return Math.round((weight / (height * height)) * 10) / 10;
});

const bmiCategory = computed(() => {
  if (bmi.value < 16)
    return {text: t("Weight_degree_1"), color: "#4285f4", textColor: "white"};
  if (bmi.value < 18.5)
    return {text: t("Weight_degree_2"), color: "#5c9ce6", textColor: "#333"};
  if (bmi.value < 25)
    return {text: t("Weight_degree_3"), color: "#34a853", textColor: "white"};
  if (bmi.value < 30)
    return {text: t("Weight_degree_4"), color: "#fbbc05", textColor: "#333"};
  if (bmi.value < 35)
    return {text: t("Weight_degree_5"), color: "#ea4335", textColor: "white"};
  return {text: t("Weight_degree_6"), color: "#d73027", textColor: "white"};
});

const activityText = computed(() => {
  const activityMap = {
    sedentary: t("title_sedentary"),
    light: t("title_light"),
    moderate: t("title_moderate"),
    high: t("title_high"),
    very_high: t("title_very_high"),
  };
  return activityMap[store.userInfo.activity] || "";
});

const bmiRanges = [
  {
    label: "Severely Underweight",
    range: [14, 16],
    color: "#4285f4",
    width: 7.69,
  },
  {label: "Underweight", range: [16, 18.5], color: "#5c9ce6", width: 9.62},
  {label: "Normal", range: [18.5, 25], color: "#34a853", width: 24.0},
  {label: "Overweight", range: [25, 30], color: "#fbbc05", width: 19.23},
  {label: "Obese", range: [30, 35], color: "#ea4335", width: 19.23},
  {label: "Severely Obese", range: [35, 40], color: "#d73027", width: 20.25},
];

onMounted(() => {
  // Simulate analysis time
  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
});

function submit() {
  store.completeOnboarding();
  router.push({name: "home"});
}

function goBack() {
  store.prevStep();
}
</script>

<template>
  <div class="step-container">
    <template v-if="isLoading">
      <div class="loading-container">
        <div class="loading-content">
          <q-circular-progress
            indeterminate
            size="50px"
            color="primary"
            class="q-mb-md"
          />
          <h2 class="text-h6 text-center q-mb-sm">
            {{ $t("Analyzing_your_parameters") }}
          </h2>
          <p class="text-subtitle1 text-center text-grey-7">
            {{ $t("Please_wait_moment") }}
          </p>
        </div>
      </div>
    </template>

    <template v-else>
      <h2 class="text-lg font-medium mb-6">
        {{ $t("Results_based_on_answers") }}
      </h2>

      <div class="results-content row w-full">
        <div class="w-full">
          <div class="results-card q-pa-md q-mb-md">
            <h3 class="text-subtitle1 q-mb-sm font-semibold">
              {{ $t("Body_mass_index") }}
            </h3>
            <div class="bmi-info-row mb-6">
              <div class="text-h2" style="font-weight: 500">{{ bmi }}</div>
              <div
                class="bmi-chip"
                :style="{
                  backgroundColor: bmiCategory.color,
                  color: bmiCategory.textColor,
                }"
              >
                {{ bmiCategory.text }}
              </div>
            </div>

            <div class="bmi-range q-mb-lg">
              <div class="bmi-range-bar">
                <div
                  v-for="(range, index) in bmiRanges"
                  :key="index"
                  class="bmi-range-segment"
                  :style="{
                    width: `${range.width}%`,
                    backgroundColor: range.color,
                  }"
                ></div>
                <div
                  class="bmi-marker"
                  :style="{left: `${((bmi - 14) / (40 - 14)) * 100}%`}"
                ></div>
              </div>
              <div class="bmi-range-labels flex no-wrap w-[102%]">
                <span
                  v-for="(range, index) in bmiRanges"
                  :key="'label-' + index"
                  :style="{
                    color: range.color,
                    width: `${range.width - 0.5}%`,
                  }"
                  class="text-xs"
                  :class="{
                    '-ml-[5px]': index === 0,
                  }"
                >
                  {{ range.range[0] }}
                </span>
                <span
                  class="text-xs"
                  :style="{color: bmiRanges[bmiRanges.length - 1].color}"
                >
                  40
                </span>
              </div>
            </div>
          </div>

          <div class="results-grid">
            <div class="result-item">
              <div class="icon-wrapper">
                <q-icon name="monitor_weight" size="24px" />
              </div>
              <div class="result-content">
                <div class="label">{{ $t("Current_weight") }}</div>
                <div class="value">
                  {{ store.userInfo.weight }} {{ $t("kg") }}
                </div>
              </div>
            </div>

            <div class="result-item">
              <div class="icon-wrapper">
                <q-icon name="fitness_center" size="24px" />
              </div>
              <div class="result-content">
                <div class="label">{{ $t("Goal_Weight") }}</div>
                <div class="value">
                  {{ store.userInfo.goal_weight }} {{ $t("kg") }}
                </div>
              </div>
            </div>

            <div class="result-item">
              <div class="icon-wrapper">
                <q-icon name="directions_run" size="24px" />
              </div>
              <div class="result-content">
                <div class="label">{{ $t("Activity_level") }}</div>
                <div class="value">{{ activityText }}</div>
              </div>
            </div>
          </div>

          <q-btn
            color="primary"
            class="full-width q-mb-md mt-3"
            :label="$t('Submit_form')"
            no-caps
            @click="submit"
          />
          <div class="flex justify-center">
            <q-btn flat :label="$t('Back')" @click="goBack" no-caps />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.results-content {
  display: flex;
  gap: 24px;
}

.person-image {
  display: flex;
  align-items: center;
  justify-content: center;
}

.person-image img {
  max-width: 100%;
  height: auto;
  object-fit: contain;
}

.results-card {
  background: #f8f8f8;
  border-radius: 16px;
}

.text-subtitle1 {
  color: #333;
  font-size: 14px;
  font-weight: 600;
}

.bmi-info-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.text-h2 {
  font-size: 24px;
  line-height: 1;
  margin: 0;
}

.bmi-chip {
  display: inline-block;
  padding: 4px 12px;
  background-color: #fff176;
  color: rgba(0, 0, 0, 0.87);
  border-radius: 24px;
  font-size: 12px;
  font-weight: 500;
}

.bmi-range {
  position: relative;
  height: 20px;
  margin-bottom: 16px;
}

.bmi-range-bar {
  display: flex;
  height: 8px;
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  background: #f5f5f5;
}

.bmi-range-segment {
  height: 100%;
  transition: width 0.3s ease;
}

.bmi-marker {
  position: absolute;
  top: -4px;
  width: 16px;
  height: 16px;
  background-color: #ff6b00;
  border-radius: 50%;
  transform: translateX(-50%);
  border: 2px solid #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.bmi-range-labels {
  margin-top: 12px;
  font-size: 10px;
  color: #666;
}

.bmi-range-labels span {
  position: relative;
  /* transform: translateX(-50%); */
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 8px;
  margin-top: 24px;
}

.result-item {
  display: flex;
  align-items: center;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: white;
  border-radius: 10px;
  margin-right: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.icon-wrapper .q-icon {
  color: #4285f4;
}

.result-content {
  flex: 1;
}

.result-content .label {
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
}

.result-content .value {
  font-size: 18px;
  font-weight: 500;
  color: #333;
}

.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  width: 100%;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 300px;
}

.loading-content h2 {
  margin: 16px 0 8px;
  font-weight: 500;
}

.loading-content p {
  margin: 0;
  color: #666;
}
</style>
