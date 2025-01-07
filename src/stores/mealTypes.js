import {defineStore} from "pinia";

export const useMealTypesStore = defineStore("mealTypes", {
  state: () => ({
    types: {
      breakfast: {
        id: "breakfast",
        name_uz: "Nonushta",
        name_ru: "Завтрак",
        icon: "/img/breakfast.png",
        defaultTime: "07:00-09:00",
      },
      lunch: {
        id: "lunch",
        name_uz: "Tushlik",
        name_ru: "Обед",
        icon: "/img/lunch.png",
        defaultTime: "13:00-14:00",
      },
      dinner: {
        id: "dinner",
        name_uz: "Kechki ovqat",
        name_ru: "Ужин",
        icon: "/img/dinner.png",
        defaultTime: "19:00-20:00",
      },
      snack: {
        id: "snack",
        name_uz: "Perekus",
        name_ru: "Перекус",
        icon: "/img/snack.png",
        defaultTime: "11:00-16:00",
      },
    },
  }),

  getters: {
    getAllTypes: (state) => state.types,
    getTypeById: (state) => (id) => state.types[id],
  },
});
