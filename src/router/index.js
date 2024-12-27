import {createRouter, createWebHistory} from "vue-router";
import Home from "@/views/Home.vue";
import StatisticsPage from "@/views/StatisticsPage.vue";
import ProfilePage from "@/views/ProfilePage.vue";
import OnboardingPage from "@/views/Starter/index.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import OnboardingLayout from "@/layouts/OnboardingLayout.vue";
import {onboardingMiddleware} from "./middleware.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: DefaultLayout,
      children: [
        {
          path: "",
          name: "home",
          component: Home,
        },
        {
          path: "statistics",
          name: "statistics",
          component: StatisticsPage,
        },
        {
          path: "profile",
          name: "profile",
          component: ProfilePage,
        },
      ],
    },
    {
      path: "/onboarding",
      component: OnboardingLayout,
      children: [
        {
          path: "",
          name: "onboarding",
          component: OnboardingPage,
        },
      ],
    },
  ],
});

router.beforeEach(onboardingMiddleware);

export default router;
