<script setup>
import {useOnboardingStore} from "@/stores/onboarding";
import {ref, computed} from "vue";
import {useQuasar} from "quasar";
import ActivityLevelSelector from "@/components/ActivityLevelSelector.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import validate from "@/utils/validate";

const $q = useQuasar();
const onboardingStore = useOnboardingStore();
const userInfo = onboardingStore.userInfo;

const activityLevels = {
  sedentary: {
    title: "Sakkiz soatlik o'tirgan turmush tarzi",
    description: "Asosan o'tirish va minimal jismoniy faollik",
    color: "#E74C3C",
  },
  light: {
    title: "Yengil jismoniy faoliyat",
    description: "Kundalik yurish va yengil jismoniy harakatlar",
    color: "#F39C12",
  },
  moderate: {
    title: "O'rtacha jismoniy faoliyat",
    description: "Muntazam sport va o'rtacha jismoniy faollik",
    color: "#2ECC71",
  },
  active: {
    title: "Yuqori jismoniy faoliyat",
    description: "Muntazam sport va faol hayot tarzi",
    color: "#3498DB",
  },
  very_active: {
    title: "Juda yuqori jismoniy faoliyat",
    description: "Professional sport yoki juda faol hayot tarzi",
    color: "#9B59B6",
  },
};

// Activity dialog
const showActivityDialog = ref(false);
const selectedActivity = ref(userInfo.activity);

// Weight dialog
const showWeightDialog = ref(false);
const selectedWeight = ref(userInfo.weight);
const weightForm = ref(null);

// Goal weight dialog
const showGoalWeightDialog = ref(false);
const selectedGoalWeight = ref(userInfo.goal_weight);
const goalWeightForm = ref(null);

// Height dialog
const showHeightDialog = ref(false);
const selectedHeight = ref(userInfo.height);
const heightForm = ref(null);

// Birthday dialog
const showBirthdayDialog = ref(false);
const selectedBirthday = ref(userInfo.birthday);
const birth_modal = ref(false);
const birthdayForm = ref(null);

const openActivityModal = () => {
  selectedActivity.value = userInfo.activity;
  showActivityDialog.value = true;
};

const saveActivity = () => {
  onboardingStore.setActivity(selectedActivity.value);
  showActivityDialog.value = false;
};

const openWeightDialog = () => {
  selectedWeight.value = userInfo.weight;
  showWeightDialog.value = true;
};

const openGoalWeightDialog = () => {
  selectedGoalWeight.value = userInfo.goal_weight;
  showGoalWeightDialog.value = true;
};

const openHeightDialog = () => {
  selectedHeight.value = userInfo.height;
  showHeightDialog.value = true;
};

const openBirthdayDialog = () => {
  selectedBirthday.value = userInfo.birthday;
  showBirthdayDialog.value = true;
};

const saveWeight = () => {
  if (weightForm.value?.validate()) {
    onboardingStore.setWeight(selectedWeight.value);
    showWeightDialog.value = false;
  }
};

const saveGoalWeight = () => {
  if (goalWeightForm.value?.validate()) {
    onboardingStore.setGoalWeight(selectedGoalWeight.value);
    showGoalWeightDialog.value = false;
  }
};

const saveHeight = () => {
  if (heightForm.value?.validate()) {
    onboardingStore.setHeight(selectedHeight.value);
    showHeightDialog.value = false;
  }
};

const saveBirthday = () => {
  if (birthdayForm.value?.validate()) {
    onboardingStore.setBirthday(selectedBirthday.value);
    showBirthdayDialog.value = false;
  }
};
</script>

<template>
  <div class="profile-page p-2.5">
    <!-- Profile header -->
    <div class="flex flex-col items-center mb-6">
      <!-- <div class="relative mb-3">
        <div
          class="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md"
        >
          <img src="" alt="Profile" class="w-full h-full object-cover" />
        </div>
        <button
          @click="handleImageUpload"
          class="absolute bottom-0 right-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-lg"
        >
          <q-icon name="camera_alt" size="18px" />
        </button>
      </div> -->
      <h1 class="text-xl font-semibold text-gray-800">
        {{ userInfo.fullName }}
      </h1>
      <p class="text-sm text-gray-500">
        @{{ userInfo.fullName.toLowerCase().replace(/\s+/g, "") }}
      </p>
    </div>

    <!-- Profile info -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div class="p-5">
        <h2 class="text-xl font-medium text-gray-800 mb-4">
          Mening ma'lumotlarim
        </h2>

        <!-- Info grid -->
        <div class="space-y-4">
          <!-- Faollik darajasi -->
          <div class="info-item">
            <div
              class="py-3 px-4 bg-gray-50/50 rounded-xl cursor-pointer"
              @click="openActivityModal"
            >
              <div class="flex items-center justify-between mb-2">
                <div>
                  <p class="text-sm text-gray-600">Faollik darajasi</p>
                  <p class="text-base font-medium text-gray-800">
                    {{ activityLevels[userInfo.activity]?.title }}
                  </p>
                </div>
                <q-icon
                  name="chevron_right"
                  size="20px"
                  class="text-gray-400"
                />
              </div>
              <p class="text-xs text-gray-500">
                {{ activityLevels[userInfo.activity]?.description }}
              </p>
              <!-- Activity Level Indicator -->
              <div class="mt-3">
                <div class="flex gap-1.5">
                  <div
                    v-for="(level, key) in activityLevels"
                    :key="key"
                    class="flex-1"
                  >
                    <div
                      class="h-1.5 rounded-full transition-all duration-300"
                      :class="{
                        'opacity-100 scale-y-125': key === userInfo.activity,
                        'opacity-30 scale-y-100': key !== userInfo.activity,
                      }"
                      :style="{
                        backgroundColor: level.color,
                      }"
                    ></div>
                    <div
                      v-if="key === userInfo.activity"
                      class="w-1.5 h-1.5 rounded-full mx-auto mt-1"
                      :style="{backgroundColor: level.color}"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Joriy vazn -->
          <div class="info-item">
            <div
              class="flex items-center justify-between py-3 px-4 bg-gray-50/50 rounded-xl cursor-pointer"
              @click="openWeightDialog"
            >
              <div>
                <p class="text-sm text-gray-600">Joriy vazn</p>
                <p class="text-base font-medium text-gray-800">
                  {{ userInfo.weight }} kg
                </p>
              </div>
              <q-icon name="chevron_right" size="20px" class="text-gray-400" />
            </div>
          </div>

          <!-- Weight Dialog -->
          <q-dialog v-model="showWeightDialog" persistent>
            <q-card style="min-width: 350px">
              <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">Joriy vazn</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
              </q-card-section>

              <q-card-section class="q-pt-md">
                <BaseInput
                  ref="weightForm"
                  v-model="selectedWeight"
                  type="number"
                  outlined
                  suffix="kg"
                  placeholder="Vazn"
                  :rules="[
                    (v) => validate.required(v),
                    (v) => validate.number(v),
                    (v) => validate.min_weight(v, 35),
                    (v) => validate.max_weight(v, 200),
                  ]"
                  @keyup.enter="saveWeight"
                />
              </q-card-section>

              <q-card-actions align="right" class="bg-gray-50 q-pa-md">
                <q-btn flat label="Bekor qilish" color="gray" v-close-popup />
                <q-btn
                  unelevated
                  color="primary"
                  label="Saqlash"
                  @click="saveWeight"
                />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <!-- Maqsad -->
          <div class="info-item">
            <div
              class="flex items-center justify-between py-3 px-4 bg-gray-50/50 rounded-xl cursor-pointer"
              @click="openGoalWeightDialog"
            >
              <div>
                <p class="text-sm text-gray-600">Maqsad</p>
                <p class="text-base font-medium text-gray-800">
                  {{ userInfo.goal_weight }} kg
                </p>
              </div>
              <q-icon name="chevron_right" size="20px" class="text-gray-400" />
            </div>
          </div>

          <!-- Goal Weight Dialog -->
          <q-dialog v-model="showGoalWeightDialog" persistent>
            <q-card style="min-width: 350px">
              <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">Maqsad vazni</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
              </q-card-section>

              <q-card-section class="q-pt-md">
                <BaseInput
                  ref="goalWeightForm"
                  v-model="selectedGoalWeight"
                  type="number"
                  outlined
                  suffix="kg"
                  placeholder="Maqsad vazni"
                  :rules="[
                    (v) => validate.required(v),
                    (v) => validate.number(v),
                    (v) => validate.min_weight(v, 35),
                    (v) => validate.max_weight(v, 200),
                  ]"
                  @keyup.enter="saveGoalWeight"
                />
              </q-card-section>

              <q-card-actions align="right" class="bg-gray-50 q-pa-md">
                <q-btn flat label="Bekor qilish" color="gray" v-close-popup />
                <q-btn
                  unelevated
                  color="primary"
                  label="Saqlash"
                  @click="saveGoalWeight"
                />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <!-- Bo'y -->
          <div class="info-item">
            <div
              class="flex items-center justify-between py-3 px-4 bg-gray-50/50 rounded-xl cursor-pointer"
              @click="openHeightDialog"
            >
              <div>
                <p class="text-sm text-gray-600">Bo'y</p>
                <p class="text-base font-medium text-gray-800">
                  {{ userInfo.height }} sm
                </p>
              </div>
              <q-icon name="chevron_right" size="20px" class="text-gray-400" />
            </div>
          </div>

          <!-- Height Dialog -->
          <q-dialog v-model="showHeightDialog" persistent>
            <q-card style="min-width: 350px">
              <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">Bo'y</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
              </q-card-section>

              <q-card-section class="q-pt-md">
                <BaseInput
                  ref="heightForm"
                  v-model="selectedHeight"
                  type="number"
                  outlined
                  suffix="sm"
                  placeholder="Bo'y"
                  :rules="[
                    (v) => validate.required(v),
                    (v) => validate.number(v),
                    (v) => validate.min_height(v, 100),
                    (v) => validate.max_height(v, 250),
                  ]"
                  @keyup.enter="saveHeight"
                />
              </q-card-section>

              <q-card-actions align="right" class="bg-gray-50 q-pa-md">
                <q-btn flat label="Bekor qilish" color="gray" v-close-popup />
                <q-btn
                  unelevated
                  color="primary"
                  label="Saqlash"
                  @click="saveHeight"
                />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <!-- Tug'ilgan kun -->
          <div class="info-item">
            <div
              class="flex items-center justify-between py-3 px-4 bg-gray-50/50 rounded-xl cursor-pointer"
              @click="openBirthdayDialog"
            >
              <div>
                <p class="text-sm text-gray-600">Tug'ilgan kun</p>
                <p class="text-base font-medium text-gray-800">
                  {{ userInfo.birthday }}
                </p>
              </div>
              <q-icon name="chevron_right" size="20px" class="text-gray-400" />
            </div>
          </div>

          <!-- Birthday Dialog -->
          <q-dialog v-model="showBirthdayDialog" persistent>
            <q-card style="min-width: 350px">
              <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">Tug'ilgan kun</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
              </q-card-section>

              <q-card-section class="q-pt-md">
                <q-form ref="birthdayForm">
                  <BaseInput
                    v-model="selectedBirthday"
                    outlined
                    append
                    mask="##.##.####"
                    :placeholder="'DD.MM.YYYY'"
                    :rules="[
                      (v) => validate.required(v),
                      (v) => validate.date(v),
                      (v) => validate.min_age(v, 13),
                    ]"
                    @keyup.enter="saveBirthday"
                  >
                    <template #append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          v-model="birth_modal"
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date
                            v-model="selectedBirthday"
                            @update:model-value="birth_modal = false"
                            mask="DD.MM.YYYY"
                            :options="(date) => new Date(date) <= new Date()"
                          />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </BaseInput>
                </q-form>
              </q-card-section>

              <q-card-actions align="right" class="bg-gray-50 q-pa-md">
                <q-btn flat label="Bekor qilish" color="gray" v-close-popup />
                <q-btn
                  unelevated
                  color="primary"
                  label="Saqlash"
                  @click="saveBirthday"
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
      </div>
    </div>

    <!-- Activity Level Dialog -->
    <q-dialog v-model="showActivityDialog" persistent>
      <q-card class="q-pa-none" style="min-width: 350px; max-width: 400px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Faollik darajasi</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-md">
          <div class="space-y-3">
            <div
              v-for="(level, key) in activityLevels"
              :key="key"
              class="activity-option"
              :class="{selected: selectedActivity === key}"
              @click="selectedActivity = key"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                  :style="{borderColor: level.color}"
                >
                  <div
                    v-if="selectedActivity === key"
                    class="w-2 h-2 rounded-full"
                    :style="{backgroundColor: level.color}"
                  ></div>
                </div>
                <div>
                  <h3 class="text-sm font-medium text-gray-800">
                    {{ level.title }}
                  </h3>
                  <p class="text-xs text-gray-500">{{ level.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-gray-50 q-pa-md">
          <q-btn flat label="Bekor qilish" color="gray" v-close-popup />
          <q-btn
            unelevated
            color="primary"
            label="Saqlash"
            @click="saveActivity"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<style scoped>
.profile-page {
  max-width: 600px;
  margin: 0 auto;
}

.text-primary {
  color: #1976d2;
}

.bg-primary {
  background-color: #1976d2;
}

.info-item {
  transition: all 0.3s ease;
}

.info-item:hover {
  transform: translateX(4px);
}

.info-item:active {
  transform: scale(0.99);
}

.scale-y-125 {
  transform: scaleY(1.25);
}

.scale-y-100 {
  transform: scaleY(1);
}

.activity-option {
  padding: 1rem;
  border-radius: 0.75rem;
  background-color: rgb(249 250 251 / 0.5);
  cursor: pointer;
  transition: all 0.2s ease;
}

.activity-option:hover {
  background-color: rgb(243 244 246);
}

.activity-option.selected {
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
</style>
