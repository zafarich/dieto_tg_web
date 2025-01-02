<script setup>
import BottomNavigation from "@/components/BottomNavigation.vue";
import AddMealModal from "@/components/AddMealModal.vue";
import {useModalsStore} from "@/stores/modals";
import {useMealsStore} from "@/stores/meals";
import {ref} from "vue";

const modalsStore = useModalsStore();
const mealsStore = useMealsStore();

const meals = ref([
  {
    type: "breakfast",
    title: "Zavtrak",
    icon: "/img/breakfast.png",
  },
  {
    type: "lunch",
    title: "Tushlik",
    icon: "/img/lunch.png",
  },
  {
    type: "dinner",
    title: "Kechki ovqat",
    icon: "/img/dinner.png",
  },
  {
    type: "snack",
    title: "Perekus",
    icon: "/img/snack.png",
  },
]);

const handleCategorySelect = (mealType) => {
  modalsStore.setSelectedMealType(mealType);
  modalsStore.closeCategoryDialog();
  modalsStore.openAddMealModal();
};

const addProduct = (product) => {
  mealsStore.addProduct(modalsStore.selectedMealType, product);
  modalsStore.closeAddMealModal();
};
</script>

<template>
  <div class="layout min-h-screen">
    <router-view />
    <BottomNavigation />

    <!-- Category Selection Dialog -->
    <q-dialog v-model="modalsStore.showCategoryDialog" position="bottom">
      <q-card class="q-pa-none" style="width: 100%; max-width: 600px">
        <q-card-section class="q-pt-md">
          <div class="grid grid-cols-2 gap-3">
            <div
              v-for="meal in meals"
              :key="meal.type"
              class="meal-category cursor-pointer"
              @click="handleCategorySelect(meal.type)"
            >
              <div
                class="flex flex-col items-center gap-2 p-3 bg-gray-50/50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div
                  class="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center p-2 border border-primary/10"
                >
                  <img
                    :src="meal.icon"
                    class="w-full h-full object-contain"
                    :alt="meal.title"
                  />
                </div>
                <span class="text-sm font-medium text-gray-700">{{
                  meal.title
                }}</span>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Add Meal Modal -->
    <AddMealModal
      :is-open="modalsStore.showAddMealModal"
      @close="modalsStore.closeAddMealModal"
      @add="addProduct"
    />
  </div>
</template>

<style scoped>
.layout {
  padding-bottom: 4rem;
}
</style>
