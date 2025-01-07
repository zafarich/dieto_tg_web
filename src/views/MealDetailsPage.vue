<template>
  <div class="meal-details pb-24">
    <!-- Header -->
    <div class="fixed top-0 left-0 right-0 bg-white z-10">
      <div class="flex items-center px-4 h-14">
        <button
          class="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full"
          @click="goBack"
        >
          <q-icon name="arrow_back" size="20px" />
        </button>
        <div class="flex-1 text-center">
          <div class="font-medium">{{ mealType }}</div>
          <div class="text-xs text-gray-500">{{ mealDate }}</div>
        </div>
        <div class="w-10"></div>
      </div>
    </div>

    <!-- Content -->
    <div class="pt-16 px-2.5">
      <div class="space-y-2">
        <div
          v-for="meal in meals"
          :key="meal.id"
          class="bg-white rounded-xl flex items-start justify-between border border-gray-100 pl-3 pt-3 pb-4 pr-2"
        >
          <div class="flex-1 pr-2">
            <div>
              <div class="font-medium">
                {{ meal.name }}
              </div>

              <div class="text-sm text-gray-500 py-3">
                {{ meal.calories }} kkal
              </div>
            </div>

            <!-- BZU ko'rsatkichlari -->
            <div class="grid grid-cols-3 gap-4">
              <!-- Protein -->
              <div class="flex items-center">
                <div class="text-xs text-[#F97316] mr-1">Protein:</div>
                <div class="text-xs text-gray-700">{{ meal.proteins }}g</div>
              </div>

              <!-- Uglevod -->
              <div class="flex items-center">
                <div class="text-xs text-[#EAB308] mr-1">Uglevod:</div>
                <div class="text-xs text-gray-700">{{ meal.carbs }}g</div>
              </div>

              <!-- Yog' -->
              <div class="flex items-center">
                <div class="text-xs text-[#3B82F6] mr-1">Yog':</div>
                <div class="text-xs text-gray-700">{{ meal.fats }}g</div>
              </div>
            </div>
          </div>

          <button
            class="w-8 h-8 flex items-center justify-center hover:bg-red-50 text-red-500 rounded-full"
            @click="openDeleteConfirm(meal.id)"
          >
            <q-icon name="delete" size="20px" />
          </button>
        </div>
      </div>

      <!-- Bo'sh holatda -->
      <div
        v-if="meals.length === 0"
        class="flex flex-col items-center justify-center py-12 text-gray-400"
      >
        <div class="text-sm">Mahsulot qo'shilmagan</div>
      </div>
    </div>

    <!-- Qo'shish tugmasi -->
    <div
      class="fixed bottom-[77px] left-0 right-0 p-4 bg-white border-t border-gray-100"
    >
      <button
        class="w-full h-12 bg-primary text-white rounded-xl font-medium"
        @click="openAddMealModal"
      >
        {{ mealType }} qo'shish
      </button>
    </div>
  </div>

  <!-- O'chirish modali -->
  <q-dialog v-model="showDeleteConfirm" persistent>
    <q-card style="min-width: 300px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Mahsulotni o'chirish</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-pt-md">
        <p>Haqiqatan ham bu mahsulotni o'chirmoqchimisiz?</p>
      </q-card-section>

      <q-card-actions align="right" class="bg-gray-50 q-pa-md">
        <q-btn flat label="Bekor qilish" color="gray" v-close-popup />
        <q-btn
          unelevated
          color="negative"
          label="O'chirish"
          @click="confirmDelete"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.meal-details {
  min-height: 100vh;
  background-color: #fff;
}

.bg-primary {
  background-color: #1976d2;
}
</style>

<script setup>
import {ref, onMounted, computed} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useMealTypesStore} from "@/stores/mealTypes";
import {useModalsStore} from "@/stores/modals";

const route = useRoute();
const router = useRouter();
const mealTypesStore = useMealTypesStore();
const modalsStore = useModalsStore();

const mealType = computed(() => {
  const type = mealTypesStore.getTypeById(route.params.type);
  return type ? type.name_uz : "";
});

const mealDate = ref("");
const meals = ref([]);

// Test ma'lumotlar
const testMeals = [
  {
    id: 1,
    name: "Tuxum",
    weight: 100,
    calories: 155,
    proteins: 13,
    fats: 11,
    carbs: 1.1,
  },
  {
    id: 2,
    name: "Non",
    weight: 150,
    calories: 364,
    proteins: 9,
    fats: 1,
    carbs: 77,
  },
];

// Sanani formatlash
const formatDate = (date) => {
  const today = new Date();
  const inputDate = new Date(date);

  if (
    today.getDate() === inputDate.getDate() &&
    today.getMonth() === inputDate.getMonth() &&
    today.getFullYear() === inputDate.getFullYear()
  ) {
    return "Bugun";
  }

  return inputDate
    .toLocaleDateString("uz-UZ", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, ".");
};

onMounted(() => {
  mealDate.value = formatDate(route.query.date);
  meals.value = testMeals;
});

const showDeleteConfirm = ref(false);
const selectedMealId = ref(null);

const openDeleteConfirm = (mealId) => {
  selectedMealId.value = mealId;
  showDeleteConfirm.value = true;
};

const confirmDelete = () => {
  // O'chirish logikasi
  showDeleteConfirm.value = false;
  selectedMealId.value = null;
};

const goBack = () => {
  router.back();
};

const openAddMealModal = () => {
  // TODO: Modalni ochish logikasi
  modalsStore.setSelectedMealType(route.params.type);
  modalsStore.closeCategoryDialog();
  modalsStore.openAddMealModal();
};
</script>
