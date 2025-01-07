<script setup>
import {ref, computed, nextTick} from "vue";
import {useModalsStore} from "@/stores/modals";
import {useQuasar} from "quasar";

import BaseInput from "@/components/base/BaseInput.vue";

const $q = useQuasar();
const modalsStore = useModalsStore();
const showModal = computed(() => modalsStore.showAddMealModal);
const selectedMealType = computed(() => modalsStore.selectedMealType);

const selectedMethod = ref("ai"); // 'ai' yoki 'manual'
const selectedTab = ref("image"); // 'image' yoki 'name'
const description = ref(""); // izoh
const productName = ref(""); // mahsulot nomi
const productWeight = ref(""); // mahsulot og'irligi
const proteins = ref(""); // oqsillar
const fats = ref(""); // yog'lar
const carbs = ref(""); // uglevodlar
const showCamera = ref(false); // kamera modali
const videoStream = ref(null); // kamera stream
const videoRef = ref(null); // video elementi
const capturedImage = ref(null); // olingan rasm
const showResultModal = ref(false);
const aiResult = ref(null);
const isLoading = ref(false);
const additionalComment = ref("");
const showCommentInput = ref(false);
const commentInputRef = ref(null);

const closeModal = () => {
  modalsStore.closeAddMealModal();
  description.value = "";
  productName.value = "";
  productWeight.value = "";
  proteins.value = "";
  fats.value = "";
  carbs.value = "";
  capturedImage.value = null;
  if (videoStream.value) {
    videoStream.value.getTracks().forEach((track) => track.stop());
  }
};

const checkCameraPermissions = async () => {
  try {
    const result = await navigator.permissions.query({name: "camera"});
    if (result.state === "denied") {
      throw new Error("Kameraga ruxsat berilmagan");
    }
  } catch (error) {
    console.error("Permission check error:", error);
  }
};

const openCamera = async () => {
  try {
    await checkCameraPermissions();

    // Avvalgi stream'ni to'xtatish
    if (videoStream.value) {
      videoStream.value.getTracks().forEach((track) => track.stop());
      videoStream.value = null;
    }

    // Oddiy kamera so'rovi
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: {ideal: "environment"},
      },
    });

    videoStream.value = stream;
    showCamera.value = true;

    // Video elementini keyingi frame'da ulash
    await nextTick();
    if (videoRef.value) {
      videoRef.value.srcObject = stream;
    }
  } catch (error) {
    console.error("Camera error:", error);
    $q.notify({
      message:
        "Kamerani ochishda xatolik yuz berdi. Kameraga ruxsat berganingizni tekshiring.",
      color: "negative",
      timeout: 3000,
    });
  }
};

const closeCamera = () => {
  if (videoStream.value) {
    videoStream.value.getTracks().forEach((track) => track.stop());
  }
  showCamera.value = false;
};

const capturePhoto = () => {
  const video = videoRef.value;
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext("2d");

  // To'g'ridan-to'g'ri chizish (teskari qilmasdan)
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  capturedImage.value = canvas.toDataURL("image/jpeg");
  closeCamera();
};

const recentMeals = ref([
  {
    name: "Tovuq go'shti",
    calories: 223,
    proteins: 40,
    fats: 20,
    carbs: 2,
    image: "path/to/image",
  },
  // Boshqa oldin qo'shilgan mahsulotlar...
]);

const addMeal = (meal) => {
  // TODO: Mahsulotni qo'shish logikasi
  closeModal();
};

const getAIData = async () => {
  if (selectedTab.value === "image" && !capturedImage.value) {
    $q.notify({
      message: "Iltimos, avval rasm oling",
      color: "negative",
    });
    return;
  }

  if (selectedTab.value === "name" && !productName.value.trim()) {
    $q.notify({
      message: "Iltimos, mahsulot nomini kiriting",
      color: "negative",
    });
    return;
  }

  try {
    isLoading.value = true;
    // TODO: AI orqali ma'lumotlarni olish logikasi
    // Hozircha test ma'lumotlar
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Loading ko'rsatish uchun

    aiResult.value = {
      name: selectedTab.value === "name" ? productName.value : "Tovuq go'shti",
      advice:
        "Kuniga 100-150 gramm iste'mol qilish tavsiya etiladi. Oqsil moddalarga boy mahsulot.",
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6,
      ingredients: ["Tovuq go'shti", "Tuz", "Ziravorlar"],
    };

    showResultModal.value = true;
  } catch (error) {
    console.error("AI Error:", error);
    $q.notify({
      message: "Ma'lumotlarni olishda xatolik yuz berdi",
      color: "negative",
    });
  } finally {
    isLoading.value = false;
  }
};

const toggleCommentInput = async () => {
  showCommentInput.value = !showCommentInput.value;
  if (showCommentInput.value) {
    // Keyingi frame'da focus qilish
    await nextTick();
    commentInputRef.value?.focus();
  }
};

const addMealWithComment = async () => {
  if (showCommentInput.value) {
    // Izoh bilan qayta hisoblash
    isLoading.value = true;
    try {
      // TODO: AI orqali qayta hisoblash logikasi
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Test uchun yangi natijalar
      aiResult.value = {
        ...aiResult.value,
        calories: 180,
        protein: 35,
        carbs: 2,
        fat: 4.2,
      };

      // Izohni tozalash
      additionalComment.value = "";
      showCommentInput.value = false;
    } catch (error) {
      console.error("AI Error:", error);
      $q.notify({
        message: "Qayta hisoblashda xatolik yuz berdi",
        color: "negative",
      });
    } finally {
      isLoading.value = false;
    }
  } else {
    // Oddiy qo'shish
    addMeal({...aiResult.value, additionalComment: additionalComment.value});
  }
};

// Qo'lda kiritilgan mahsulotni qo'shish
const addManualProduct = () => {
  if (!productName.value.trim()) {
    $q.notify({
      message: "Mahsulot nomini kiriting",
      color: "negative",
    });
    return;
  }

  if (!productWeight.value || productWeight.value <= 0) {
    $q.notify({
      message: "Mahsulot og'irligini kiriting",
      color: "negative",
    });
    return;
  }

  if (!proteins.value || !fats.value || !carbs.value) {
    $q.notify({
      message: "BZU qiymatlarini kiriting",
      color: "negative",
    });
    return;
  }

  // Kaloriyani hisoblash (1g protein = 4 kkal, 1g yog' = 9 kkal, 1g uglevod = 4 kkal)
  const calories =
    (proteins.value * 4 + fats.value * 9 + carbs.value * 4) *
    (productWeight.value / 100);

  const meal = {
    name: productName.value,
    weight: parseFloat(productWeight.value),
    calories: Math.round(calories),
    proteins: parseFloat(proteins.value),
    fats: parseFloat(fats.value),
    carbs: parseFloat(carbs.value),
  };

  addMeal(meal);
};
</script>

<template>
  <q-dialog v-model="showModal" persistent position="bottom">
    <q-card style="min-width: 350px; max-width: 400px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ selectedMealType }}</div>
        <q-space />
        <q-btn
          icon="close"
          flat
          round
          dense
          v-close-popup
          @click="closeModal"
        />
      </q-card-section>

      <q-card-section class="q-pt-md">
        <!-- Qo'shish usuli -->
        <div class="mb-6">
          <div class="flex gap-2 mb-4 border-b border-gray-200 pb-4">
            <button
              class="flex-1 py-2 rounded-lg text-xs border text-center flex items-center justify-center gap-2"
              :class="{
                'border-primary text-primary bg-primary/5':
                  selectedMethod === 'ai',
                'border-gray-200 text-gray-500': selectedMethod !== 'ai',
              }"
              @click="selectedMethod = 'ai'"
            >
              <q-icon name="view_in_ar" size="20px" />
              AI orqali
            </button>

            <button
              class="flex-1 py-2 rounded-lg text-xs border text-center flex items-center justify-center gap-2"
              :class="{
                'border-primary text-primary bg-primary/5':
                  selectedMethod === 'manual',
                'border-gray-200 text-gray-500': selectedMethod !== 'manual',
              }"
              @click="selectedMethod = 'manual'"
            >
              <q-icon name="edit" size="20px" />
              Qo'lda kiritish
            </button>
          </div>

          <div v-if="selectedMethod === 'ai'" class="text-sm text-red-600 mb-4">
            Mahsulot/ovqatni qo'shish uchun rasm orqali yoki mahsulot nomini
            kiriting. Bu sun'iy intelekt orqali avtomatik amalga oshiriladi
          </div>

          <!-- AI orqali qo'shish -->
          <template v-if="selectedMethod === 'ai'">
            <!-- Qidirish usuli -->
            <div class="flex gap-2 mb-6">
              <button
                class="flex-1 py-2 rounded-lg text-xs border text-center flex items-center justify-center gap-2"
                :class="{
                  'border-primary text-primary bg-primary/5':
                    selectedTab === 'image',
                  'border-gray-200 text-gray-500': selectedTab !== 'image',
                }"
                @click="selectedTab = 'image'"
              >
                Rasm orqali
              </button>

              <button
                class="flex-1 py-2 rounded-lg text-xs border text-center flex items-center justify-center gap-2"
                :class="{
                  'border-primary text-primary bg-primary/5':
                    selectedTab === 'name',
                  'border-gray-200 text-gray-500': selectedTab !== 'name',
                }"
                @click="selectedTab = 'name'"
              >
                Mahsulot/ovqat nomi
              </button>
            </div>

            <!-- Rasm yuklash -->
            <div v-if="selectedTab === 'image'" class="space-y-4 mb-6">
              <div v-if="!capturedImage" class="w-full">
                <button
                  class="w-full py-4 rounded-lg border-2 border-dashed border-gray-300 text-gray-500 flex flex-col items-center justify-center gap-2 hover:bg-gray-50/50"
                  @click="openCamera"
                >
                  <q-icon name="photo_camera" size="32px" />
                  <span class="text-sm">Rasmga olish</span>
                </button>
              </div>

              <div
                v-else
                class="w-full aspect-square rounded-lg overflow-hidden relative group"
              >
                <img :src="capturedImage" class="w-full h-full object-cover" />
                <div
                  class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  <button
                    class="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                    @click="capturedImage = null"
                  >
                    <q-icon name="delete" size="24px" class="text-white" />
                  </button>
                </div>
              </div>

              <BaseInput
                v-model="description"
                type="textarea"
                outlined
                placeholder="Rasmdagi ovqat/mahsulotni to'liqroq tasvirlang"
                rows="3"
                class="w-full"
              />
            </div>

            <!-- Mahsulot nomi -->
            <div v-if="selectedTab === 'name'" class="space-y-4 mb-6">
              <BaseInput
                v-model="productName"
                type="text"
                outlined
                class="w-full"
                label="Mahsulot/ovqat nomi"
              />
            </div>

            <!-- AI Button -->
            <div
              class="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100"
            >
              <button
                class="w-full py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                @click="getAIData"
                :disabled="
                  (selectedTab === 'image' && !capturedImage) ||
                  (selectedTab === 'name' && !productName.trim()) ||
                  isLoading
                "
              >
                <q-spinner-dots v-if="isLoading" color="white" size="1.5em" />
                <template v-else> Kaloriyani hisoblash </template>
              </button>
            </div>

            <!-- Pastdagi bo'sh joy -->
            <div class="h-24"></div>
          </template>

          <!-- Qo'lda kiritish -->
          <template v-if="selectedMethod === 'manual'">
            <div class="space-y-4">
              <BaseInput
                v-model="productName"
                type="text"
                outlined
                class="w-full"
                label="Mahsulot/ovqat nomi"
              />

              <BaseInput
                v-model="productWeight"
                type="number"
                outlined
                class="w-full"
                label="Mahsulot og'irligi (gramm)"
              />

              <div class="text-base font-medium text-gray-800 mb-2">
                100 grammdagi protain, yog', uglevod
              </div>

              <div class="grid grid-cols-3 gap-4">
                <BaseInput
                  v-model="proteins"
                  type="number"
                  outlined
                  class="w-full"
                  label="Oqsillar"
                />

                <BaseInput
                  v-model="fats"
                  type="number"
                  outlined
                  class="w-full"
                  label="Yog'lar"
                />

                <BaseInput
                  v-model="carbs"
                  type="number"
                  outlined
                  class="w-full"
                  label="Uglevodlar"
                />
              </div>

              <div
                class="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100"
              >
                <button
                  class="w-full py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                  @click="addManualProduct"
                >
                  Qo'shish
                </button>
              </div>

              <!-- Pastdagi bo'sh joy -->
              <div class="h-24"></div>
            </div>
          </template>
        </div>

        <!-- Oldin qo'shilgan mahsulotlar -->
        <!-- <div v-if="recentMeals.length > 0">
          <h3 class="text-base font-medium text-gray-800 mb-3">
            Oldin qo'shilgan mahsulotlar
          </h3>
          <div class="space-y-2">
            <div
              v-for="meal in recentMeals"
              :key="meal.name"
              class="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
            >
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    v-if="meal.image"
                    :src="meal.image"
                    :alt="meal.name"
                    class="w-full h-full object-cover"
                  />
                  <div
                    v-else
                    class="w-full h-full flex items-center justify-center"
                  >
                    <q-icon name="image" size="24px" class="text-gray-400" />
                  </div>
                </div>
                <div>
                  <div class="text-sm font-medium text-gray-800">
                    {{ meal.name }}
                  </div>
                  <div class="text-xs text-gray-500">
                    {{ meal.calories }} kkal - {{ meal.proteins }}g,
                    {{ meal.fats }}g, {{ meal.carbs }}g
                  </div>
                </div>
              </div>
              <button
                class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100"
                @click="addMeal(meal)"
              >
                <q-icon name="add" size="20px" class="text-primary" />
              </button>
            </div>
          </div>
        </div> -->
      </q-card-section>
    </q-card>
  </q-dialog>

  <!-- Kamera modali -->
  <q-dialog v-model="showCamera" persistent maximized>
    <div class="bg-black h-full w-full">
      <!-- Header -->
      <div class="fixed top-0 left-0 right-0 bg-black q-py-sm z-20">
        <div class="flex items-center px-4">
          <q-btn flat round icon="close" color="white" @click="closeCamera" />
          <div class="flex-1 text-center text-white font-medium">
            Rasmga olish
          </div>
          <div class="w-10"></div>
        </div>
      </div>

      <!-- Camera View -->
      <div class="h-full w-full flex flex-col">
        <div class="flex-1 flex items-center justify-center bg-black">
          <div class="w-full aspect-square relative">
            <video
              ref="videoRef"
              autoplay
              playsinline
              muted
              class="w-full h-full"
            ></video>
            <div
              class="absolute inset-0 border-2 border-white/30 pointer-events-none z-10"
            ></div>
          </div>
        </div>

        <!-- Capture Button -->
        <div class="p-4 bg-black flex items-center justify-center z-20">
          <button
            class="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center"
            @click="capturePhoto"
          >
            <div class="w-12 h-12 rounded-full bg-white"></div>
          </button>
        </div>
      </div>
    </div>
  </q-dialog>

  <!-- AI Result Modal -->
  <q-dialog v-model="showResultModal" persistent>
    <q-card style="min-width: 350px; max-width: 400px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Tahlil natijasi</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-pt-md">
        <template v-if="aiResult">
          <!-- Nomi va kaloriyasi -->
          <div class="flex items-center justify-between mb-4">
            <div class="text-lg font-medium text-gray-800">
              {{ aiResult.name }}
            </div>
            <div class="text-lg font-medium text-primary">
              {{ aiResult.calories }} kkal
            </div>
          </div>

          <!-- Maslahat -->
          <!-- <div class="rounded-lg mb-4">
            <div class="text-sm text-blue-800">{{ aiResult.advice }}</div>
          </div> -->

          <!-- Makronutrientlar -->
          <div
            class="flex justify-between items-center mb-6 bg-gray-50 rounded-lg px-6 py-2"
          >
            <!-- Protein -->
            <div class="flex flex-col items-center">
              <div class="text-sm text-gray-600 mb-1 font-medium">Protein</div>
              <div class="text-lg font-medium" style="color: #f59e0b">
                {{ aiResult.protein }}
              </div>
            </div>

            <!-- Uglevod -->
            <div class="flex flex-col items-center">
              <div class="text-sm text-gray-600 mb-1 font-medium">Uglevod</div>
              <div class="text-lg font-medium" style="color: #fbbf24">
                {{ aiResult.carbs }}
              </div>
            </div>

            <!-- Yog' -->
            <div class="flex flex-col items-center">
              <div class="text-sm text-gray-600 mb-1 font-medium">Yog'</div>
              <div class="text-lg font-medium" style="color: #60a5fa">
                {{ aiResult.fat }}
              </div>
            </div>
          </div>

          <!-- Ingredientlar -->
          <template v-if="aiResult.ingredients?.length">
            <div class="text-base font-medium text-gray-800 mb-3">Tarkibi:</div>
            <div class="space-y-1">
              <div
                v-for="(ingredient, index) in aiResult.ingredients"
                :key="index"
                class="rounded-lg py transition-colors"
              >
                <div class="flex items-center justify-between">
                  <!-- Chap tomon: Nomi -->
                  <div class="flex items-center gap-2">
                    <!-- <div class="w-2 h-2 rounded-full bg-primary"></div> -->
                    <span class="text-gray-800">{{ ingredient }}</span>
                  </div>

                  <!-- O'ng tomon: Miqdori va kaloriyasi -->
                  <div class="flex items-center gap-4">
                    <div class="px-2 py-1 rounded text-xs text-gray-600">
                      100g
                    </div>
                    <div class="text-sm font-medium">120 kkal</div>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <div class="mt-4 text-orange-400">
            Natija yana ham aniqroq bo'lishi uchun qo'shimcha izoh berishingiz
            mumkin
          </div>
        </template>
      </q-card-section>

      <q-card-actions align="right" class="bg-gray-50 q-pa-md">
        <div class="w-full">
          <!-- Qo'shimcha izoh -->
          <div v-if="showCommentInput" class="mb-4">
            <BaseInput
              ref="commentInputRef"
              v-model="additionalComment"
              type="textarea"
              outlined
              placeholder="Natija to'g'ri bo'lmasa, qo'shimcha izoh bering..."
              rows="2"
              class="w-full"
            />
          </div>

          <div class="flex items-center justify-between">
            <!-- Qo'shimcha izoh berish -->
            <q-btn
              flat
              :color="showCommentInput ? 'grey' : 'primary'"
              :label="showCommentInput ? 'Bekor qilish' : 'Qo`shimcha izoh'"
              @click="toggleCommentInput"
              no-caps
            />

            <!-- Qo'shish -->
            <q-btn
              unelevated
              color="primary"
              :label="
                showCommentInput ? 'Qayta hisoblash' : 'To\'g\'ri. Qo\'shilsin'
              "
              :loading="isLoading"
              @click="addMealWithComment"
              no-caps
            />
          </div>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.text-primary {
  color: #1976d2;
}

button {
  -webkit-tap-highlight-color: transparent;
}

video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}
</style>
