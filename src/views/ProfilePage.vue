<script setup>
import {useOnboardingStore} from "@/stores/onboarding";
import {ref, computed, onMounted} from "vue";
import {useRouter} from "vue-router";
import {useQuasar} from "quasar";
import ActivityLevelSelector from "@/components/ActivityLevelSelector.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import validate from "@/utils/validate";
import {trimBetween, formatDate} from "@/utils/helpers";

const $q = useQuasar();
const onboardingStore = useOnboardingStore();
const userInfo = onboardingStore.userInfo;
const router = useRouter();
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

const genderOptions = [
  {
    value: "male",
    label: "Erkak",
  },
  {
    value: "female",
    label: "Ayol",
  },
];

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
const selectedBirthday = ref(formatDate(userInfo.birthDate));
const birth_modal = ref(false);
const birthdayForm = ref(null);

// Gender dialog
const showGenderDialog = ref(false);
const selectedGender = ref(userInfo.gender);

// Language dialog
const showLanguageDialog = ref(false);
const languages = [
  {value: "uz", label: "O'zbekcha"},
  {value: "ru", label: "Русский"},
];
const selectedLanguage = ref("uz");

// Loader holati
const loading = ref(false);

// Edit Dialog
const showEditDialog = ref(false);
const editedName = ref(onboardingStore.userInfo.fullName);
const editedPhone = ref(onboardingStore?.userInfo?.phone?.slice(-9));

onMounted(async () => {
  await onboardingStore.getUser();
});

const openActivityModal = () => {
  selectedActivity.value = userInfo.activity;
  showActivityDialog.value = true;
};

const saveActivity = async () => {
  $q.loading.show(); // Loaderni ko'rsatish
  try {
    onboardingStore.setActivity(selectedActivity.value);
    await onboardingStore.updateUserData();
    showActivityDialog.value = false;
    $q.notify({
      message: "Ma'lumotlar yangilandi",
      color: "positive",
    });
  } catch (error) {
    $q.notify({
      message: error.message || "Xatolik yuz berdi",
      color: "negative",
    });
  } finally {
    $q.loading.hide(); // Loaderni yashirish
  }
};

const openWeightDialog = () => {
  selectedWeight.value = userInfo.weight;
  showWeightDialog.value = true;
};

const openGoalWeightDialog = () => {
  selectedGoalWeight.value = userInfo.goalWeight;
  showGoalWeightDialog.value = true;
};

const openHeightDialog = () => {
  selectedHeight.value = userInfo.height;
  showHeightDialog.value = true;
};

const openBirthdayDialog = () => {
  selectedBirthday.value = formatDate(userInfo.birthDate);
  showBirthdayDialog.value = true;
};

const openGenderDialog = () => {
  showGenderDialog.value = true;
};

const openLanguageDialog = () => {
  showLanguageDialog.value = true;
};

const saveWeight = async () => {
  if (weightForm.value?.validate()) {
    $q.loading.show(); // Loaderni ko'rsatish
    try {
      onboardingStore.setWeight(selectedWeight.value);
      await onboardingStore.updateUserData({weight: selectedWeight.value});
      showWeightDialog.value = false;
      $q.notify({
        message: "Ma'lumotlar yangilandi",
        color: "positive",
      });
    } catch (error) {
      $q.notify({
        message: error.message || "Xatolik yuz berdi",
        color: "negative",
      });
    } finally {
      $q.loading.hide(); // Loaderni yashirish
    }
  }
};

const saveGoalWeight = async () => {
  if (goalWeightForm.value?.validate()) {
    $q.loading.show(); // Loaderni ko'rsatish
    try {
      onboardingStore.setGoalWeight(selectedGoalWeight.value);
      await onboardingStore.updateUserData({
        goalWeight: selectedGoalWeight.value,
      });
      showGoalWeightDialog.value = false;
      $q.notify({
        message: "Ma'lumotlar yangilandi",
        color: "positive",
      });
    } catch (error) {
      $q.notify({
        message: error.message || "Xatolik yuz berdi",
        color: "negative",
      });
    } finally {
      $q.loading.hide(); // Loaderni yashirish
    }
  }
};

const saveHeight = async () => {
  if (heightForm.value?.validate()) {
    $q.loading.show(); // Loaderni ko'rsatish
    try {
      onboardingStore.setHeight(selectedHeight.value);
      await onboardingStore.updateUserData({height: selectedHeight.value});
      showHeightDialog.value = false;
      $q.notify({
        message: "Ma'lumotlar yangilandi",
        color: "positive",
      });
    } catch (error) {
      $q.notify({
        message: error.message || "Xatolik yuz berdi",
        color: "negative",
      });
    } finally {
      $q.loading.hide(); // Loaderni yashirish
    }
  }
};

const saveBirthday = async () => {
  if (birthdayForm.value?.validate()) {
    $q.loading.show(); // Loaderni ko'rsatish
    try {
      onboardingStore.setBirthday(selectedBirthday.value);
      await onboardingStore.updateUserData({birthday: selectedBirthday.value});
      showBirthdayDialog.value = false;
      $q.notify({
        message: "Ma'lumotlar yangilandi",
        color: "positive",
      });
    } catch (error) {
      $q.notify({
        message: error.message || "Xatolik yuz berdi",
        color: "negative",
      });
    } finally {
      $q.loading.hide(); // Loaderni yashirish
    }
  }
};

const saveGender = async () => {
  $q.loading.show(); // Loaderni ko'rsatish
  try {
    onboardingStore.setGender(selectedGender.value);
    await onboardingStore.updateUserData({gender: selectedGender.value});
    showGenderDialog.value = false;
    $q.notify({
      message: "Ma'lumotlar yangilandi",
      color: "positive",
    });
  } catch (error) {
    $q.notify({
      message: error.message || "Xatolik yuz berdi",
      color: "negative",
    });
  } finally {
    $q.loading.hide(); // Loaderni yashirish
  }
};

const saveLanguage = async () => {
  $q.loading.show(); // Loaderni ko'rsatish
  try {
    onboardingStore.setLanguage(selectedLanguage.value);
    await onboardingStore.updateUserData({language: selectedLanguage.value});
    showLanguageDialog.value = false;
    $q.notify({
      message: "Til o'zgartirildi",
      color: "positive",
    });
  } catch (error) {
    $q.notify({
      message: error.message || "Xatolik yuz berdi",
      color: "negative",
    });
  } finally {
    $q.loading.hide(); // Loaderni yashirish
  }
};

const saveEditedInfo = async () => {
  try {
    $q.loading.show();
    onboardingStore.setFullName(editedName.value);
    onboardingStore.setPhone(`998${trimBetween(editedPhone.value)}`);
    await onboardingStore.updateUserData({
      fullName: editedName.value,
      phone: `998${trimBetween(editedPhone.value)}`,
    }); // Faqat o'zgargan parametrlarni jo'natish
    showEditDialog.value = false;
    $q.notify({
      message: "Ma'lumotlar yangilandi",
      color: "positive",
    });
  } catch (error) {
    $q.notify({
      message: error.message || "Xatolik yuz berdi",
      color: "negative",
    });
  } finally {
    $q.loading.hide();
  }
};

const goToSubscriptionDetails = () => {
  // TODO: Obuna haqida ma'lumotlar sahifasiga o'tish logikasi
  router.push({name: "subscription-details"});
};

const saveUserData = async (field, value) => {
  $q.loading.show();
  try {
    onboardingStore.setUserInfo(field, value);
    await onboardingStore.updateUserData();
    $q.notify({
      message: "Ma'lumotlar yangilandi",
      color: "positive",
    });
  } catch (error) {
    $q.notify({
      message: error.message || "Xatolik yuz berdi",
      color: "negative",
    });
  } finally {
    $q.loading.hide();
  }
};
</script>

<template>
  <div class="profile-page">
    <!-- Premium bo'lmagan foydalanuvchi uchun -->
    <div v-if="userInfo.userStatus === 'free'" class="p-4">
      <div
        class="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-4 text-white"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <q-icon name="workspace_premium" size="24px" />
            <span class="font-medium">Premium</span>
          </div>
          <div class="text-xs bg-white/20 px-2 py-1 rounded">7 kun bepul</div>
        </div>

        <div class="text-sm opacity-90 mb-6">
          Premium obuna orqali barcha funksiyalardan cheklovsiz foydalaning
        </div>

        <div class="space-y-3 mb-6">
          <div class="flex items-center gap-2 text-sm">
            <q-icon name="check_circle" size="16px" />
            <span>Cheklanmagan mahsulotlar qo'shish</span>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <q-icon name="check_circle" size="16px" />
            <span>Rasm orqali mahsulot qo'shish</span>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <q-icon name="check_circle" size="16px" />
            <span>Statistika va tahlillar</span>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <q-icon name="check_circle" size="16px" />
            <span>Retseptlar va tavsiyalar</span>
          </div>
        </div>

        <button
          class="w-full h-12 bg-white text-blue-600 rounded-xl font-medium"
        >
          Premium ga o'tish
        </button>
      </div>
    </div>

    <!-- Premium foydalanuvchi uchun -->
    <div v-else class="p-4">
      <div class="bg-green-500 rounded-2xl p-4 text-white">
        <div class="flex items-center justify-center gap-2">
          <q-icon name="verified" size="24px" />
          <span class="font-medium">Siz Premium foydalanuvchisiz</span>
        </div>
        <div class="flex items-center justify-center mt-3">
          <button
            class="text-xs bg-white/20 px-2 py-1 rounded"
            @click="goToSubscriptionDetails"
          >
            Boshqarish
          </button>
        </div>
      </div>
    </div>

    <!-- Profil ma'lumotlari -->
    <div class="px-4">
      <div class="space-y-4">
        <!-- Profil -->
        <div class="bg-white rounded-2xl p-4 border border-gray-100">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div
                class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center"
              >
                <q-icon name="person" size="32px" class="text-gray-400" />
              </div>
              <div>
                <div class="font-medium">
                  {{ onboardingStore.userInfo.name }}
                </div>
                <div class="text-sm text-gray-500">
                  {{ onboardingStore.userInfo.phone }}
                </div>
              </div>
            </div>
            <q-btn
              icon="edit"
              color="gray"
              size="12px"
              flat
              round
              @click="showEditDialog = true"
            />
          </div>
        </div>

        <!-- Sozlamalar -->
        <div
          class="bg-white rounded-2xl overflow-hidden border border-gray-100"
        >
          <div class="divide-y divide-gray-100">
            <!-- Faollik darajasi -->
            <div class="p-4" @click="openActivityModal">
              <div class="flex items-center gap-3 mb-2">
                <q-icon
                  name="fitness_center"
                  size="20px"
                  class="text-gray-400"
                />
                <span>Faollik darajasi</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-500">
                <span>{{ activityLevels[userInfo.activityLevel]?.title }}</span>
                <q-icon name="chevron_right" size="20px" />
              </div>
            </div>

            <!-- Joriy vazn -->
            <div
              class="flex items-center justify-between p-4"
              @click="openWeightDialog"
            >
              <div class="flex items-center gap-3">
                <q-icon
                  name="monitor_weight"
                  size="20px"
                  class="text-gray-400"
                />
                <span>Joriy vazn</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-500">
                <span>{{ userInfo.weight }} kg</span>
                <q-icon name="chevron_right" size="20px" />
              </div>
            </div>

            <!-- Maqsad vazn -->
            <div
              class="flex items-center justify-between p-4"
              @click="openGoalWeightDialog"
            >
              <div class="flex items-center gap-3">
                <q-icon name="flag" size="20px" class="text-gray-400" />
                <span>Maqsad vazn</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-500">
                <span>{{ userInfo.goalWeight }} kg</span>
                <q-icon name="chevron_right" size="20px" />
              </div>
            </div>

            <!-- Bo'y -->
            <div
              class="flex items-center justify-between p-4"
              @click="openHeightDialog"
            >
              <div class="flex items-center gap-3">
                <q-icon name="height" size="20px" class="text-gray-400" />
                <span>Bo'y</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-500">
                <span>{{ userInfo.height }} sm</span>
                <q-icon name="chevron_right" size="20px" />
              </div>
            </div>

            <!-- Tug'ilgan kun -->
            <div
              class="flex items-center justify-between p-4"
              @click="openBirthdayDialog"
            >
              <div class="flex items-center gap-3">
                <q-icon name="cake" size="20px" class="text-gray-400" />
                <span>Tug'ilgan kun</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-500">
                <span>{{ formatDate(userInfo.birthDate) }}</span>
                <q-icon name="chevron_right" size="20px" />
              </div>
            </div>

            <!-- Jins -->
            <div
              class="flex items-center justify-between p-4"
              @click="openGenderDialog"
            >
              <div class="flex items-center gap-3">
                <q-icon name="wc" size="20px" class="text-gray-400" />
                <span>Jins</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-500">
                <span>{{ userInfo.gender === "male" ? "Erkak" : "Ayol" }}</span>
                <q-icon name="chevron_right" size="20px" />
              </div>
            </div>

            <!-- Til -->
            <!-- <div
              class="flex items-center justify-between p-4"
              @click="openLanguageDialog"
            >
              <div class="flex items-center gap-3">
                <q-icon name="translate" size="20px" class="text-gray-400" />
                <span>Til</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-500">
                <span>{{
                  languages.find((l) => l.value === selectedLanguage)?.label
                }}</span>
                <q-icon name="chevron_right" size="20px" />
              </div>
            </div> -->

            <!-- Yordam -->
            <!-- <div class="flex items-center justify-between p-4">
              <div class="flex items-center gap-3">
                <q-icon name="help" size="20px" class="text-gray-400" />
                <span>Yordam</span>
              </div>
              <q-icon name="chevron_right" size="20px" class="text-gray-400" />
            </div> -->

            <!-- Dastur haqida -->
            <!-- <div class="flex items-center justify-between p-4">
              <div class="flex items-center gap-3">
                <q-icon name="info" size="20px" class="text-gray-400" />
                <span>Dastur haqida</span>
              </div>
              <q-icon name="chevron_right" size="20px" class="text-gray-400" />
            </div> -->
          </div>
        </div>
      </div>
    </div>

    <!-- Pastki bo'sh joy -->
    <div class="h-24"></div>
  </div>

  <!-- Dialoglar -->
  <q-dialog v-model="showActivityDialog" persistent>
    <q-card style="min-width: 350px">
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

  <q-dialog v-model="showWeightDialog" persistent>
    <q-card style="min-width: 350px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Joriy vazn</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-form ref="weightForm">
        <q-card-section class="q-pt-md">
          <BaseInput
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
      </q-form>

      <q-card-actions align="right" class="bg-gray-50 q-pa-md">
        <q-btn flat label="Bekor qilish" color="gray" v-close-popup />
        <q-btn unelevated color="primary" label="Saqlash" @click="saveWeight" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="showGoalWeightDialog" persistent>
    <q-card style="min-width: 350px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Maqsad vazn</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-form ref="goalWeightForm">
        <q-card-section class="q-pt-md">
          <BaseInput
            v-model="selectedGoalWeight"
            type="number"
            outlined
            suffix="kg"
            placeholder="Maqsad vazn"
            :rules="[
              (v) => validate.required(v),
              (v) => validate.number(v),
              (v) => validate.min_weight(v, 35),
              (v) => validate.max_weight(v, 200),
            ]"
            @keyup.enter="saveGoalWeight"
          />
        </q-card-section>
      </q-form>
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

  <q-dialog v-model="showHeightDialog" persistent>
    <q-card style="min-width: 350px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Bo'y</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-form ref="heightForm">
        <q-card-section class="q-pt-md">
          <BaseInput
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
      </q-form>
      <q-card-actions align="right" class="bg-gray-50 q-pa-md">
        <q-btn flat label="Bekor qilish" color="gray" v-close-popup />
        <q-btn unelevated color="primary" label="Saqlash" @click="saveHeight" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="showBirthdayDialog" persistent>
    <q-card style="min-width: 350px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Tug'ilgan kun</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-pt-md">
        <q-form ref="birthdayForm">
          <q-input
            v-model="selectedBirthday"
            outlined
            mask="##.##.####"
            :placeholder="'DD.MM.YYYY'"
            :rules="[
              (v) => validate.required(v),
              (v) => validate.date(v),
              (v) => validate.min_age(v, 13),
            ]"
            @keyup.enter="saveBirthday"
          >
            <template v-slot:append>
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
          </q-input>
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

  <q-dialog v-model="showGenderDialog" persistent>
    <q-card style="min-width: 350px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Jins</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-pt-md">
        <div class="space-y-3">
          <div
            v-for="option in genderOptions"
            :key="option.value"
            class="gender-option"
            :class="{selected: selectedGender === option.value}"
            @click="selectedGender = option.value"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center"
                :class="{
                  'border-primary': selectedGender === option.value,
                }"
              >
                <div
                  v-if="selectedGender === option.value"
                  class="w-2 h-2 rounded-full bg-primary"
                ></div>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-800">
                  {{ option.label }}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right" class="bg-gray-50 q-pa-md">
        <q-btn flat label="Bekor qilish" color="gray" v-close-popup />
        <q-btn unelevated color="primary" label="Saqlash" @click="saveGender" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="showLanguageDialog" persistent>
    <q-card style="min-width: 350px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Til</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-pt-md">
        <div class="space-y-3">
          <div
            v-for="lang in languages"
            :key="lang.value"
            class="language-option"
            :class="{selected: selectedLanguage === lang.value}"
            @click="selectedLanguage = lang.value"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center"
                :class="{
                  'border-primary': selectedLanguage === lang.value,
                }"
              >
                <div
                  v-if="selectedLanguage === lang.value"
                  class="w-2 h-2 rounded-full bg-primary"
                ></div>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-800">
                  {{ lang.label }}
                </h3>
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
          @click="saveLanguage"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- Edit Dialog -->
  <q-dialog v-model="showEditDialog">
    <q-card style="min-width: 350px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Ma'lumotlarni o'zgartirish</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <BaseInput v-model="editedName" label="Ism" outlined class="q-mb-md" />
        <BaseInput
          v-model="editedPhone"
          label="Telefon raqami"
          outlined
          mask="## ### ## ##"
          class="input-with-prepend"
          prepend
        >
          <template v-slot:prepend>+998</template>
        </BaseInput>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Bekor qilish" v-close-popup />
        <q-btn color="primary" label="Saqlash" @click="saveEditedInfo" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.profile-page {
  min-height: 100vh;
  background-color: #f8fafc;
}

.activity-option,
.gender-option,
.language-option {
  padding: 1rem;
  border-radius: 0.75rem;
  background-color: rgb(249 250 251 / 0.5);
  cursor: pointer;
  transition: all 0.2s ease;
}

.activity-option:hover,
.gender-option:hover,
.language-option:hover {
  background-color: rgb(243 244 246);
}

.activity-option.selected,
.gender-option.selected,
.language-option.selected {
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
</style>
