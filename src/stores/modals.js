import {defineStore} from "pinia";

export const useModalsStore = defineStore("modals", {
  state: () => ({
    showCategoryDialog: false,
    showAddMealModal: false,
    selectedMealType: null,
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
      this.selectedMealType = type;
    },
  },
});
