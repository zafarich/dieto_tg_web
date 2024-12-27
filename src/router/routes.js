import Home from "@/views/Home.vue";
import Starter from "@/views/Starter/index.vue";

export const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/onboarding",
    name: "onboarding",
    component: Starter,
  },
];
