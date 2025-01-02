import {defineStore} from "pinia";
import {ref} from "vue";

export const useMealsStore = defineStore("meals", {
  state: () => ({
    meals: [
      {
        type: "breakfast",
        title: "Zavtrak",
        calories: 940,
        current: 689,
        icon: "/img/breakfast.png",
        products: [
          {name: "Qaynatilgan tuxum", calories: 233},
          {name: "Qaynatilgan tuxum", calories: 78},
          {name: "Qaynatilgan tuxum", calories: 78},
          {name: "Banan", calories: 114},
          {name: "Tvorog", calories: 26},
          {name: "Ofsiyanka", calories: 105},
          {name: "Sut", calories: 55},
        ],
      },
      {
        type: "lunch",
        title: "Tushlik",
        calories: 1097,
        current: 0,
        icon: "/img/lunch.png",
        products: [],
      },
      {
        type: "dinner",
        title: "Kechki ovqat",
        calories: 627,
        current: 0,
        icon: "/img/dinner.png",
        products: [],
      },
      {
        type: "snack",
        title: "Perekus",
        calories: 469,
        current: 0,
        icon: "/img/snack.png",
        products: [],
      },
    ],
  }),

  actions: {
    addProduct(mealType, product) {
      const meal = this.meals.find((m) => m.type === mealType);
      if (meal) {
        meal.products.push(product);
        meal.current += Number(product.calories);
      }
    },
  },
});
