import {defineStore} from "pinia";

const mealCategories = {
  breakfast: {
    key: "breakfast",
    title: "Nonushta",
    icon: "wb_sunny",
  },
  lunch: {
    key: "lunch",
    title: "Tushlik",
    icon: "sunny",
  },
  dinner: {
    key: "dinner",
    title: "Kechki ovqat",
    icon: "nights_stay",
  },
  snack: {
    key: "snack",
    title: "Yengil taom",
    icon: "restaurant",
  },
};

export const useModalsStore = defineStore("modals", {
  state: () => ({
    showCategoryDialog: false,
    showAddMealModal: false,
    selectedMealType: null,
    mealCategories,
  }),

  actions: {
    openCategoryDialog() {
      this.showCategoryDialog = true;
    },
    closeCategoryDialog() {
      this.showCategoryDialog = false;
    },
    openAddMealModal() {
      this.showAddMealModal = true;
    },
    closeAddMealModal() {
      this.showAddMealModal = false;
    },
    setSelectedMealType(type) {
      this.selectedMealType = this.mealCategories[type]?.title || type;
    },
  },
});
