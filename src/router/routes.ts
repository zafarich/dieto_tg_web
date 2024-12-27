import {RouteRecordRaw} from "vue-router";
import Home from "@/views/Home.vue";
import Starter from "@/views/Starter/index.vue";

export const routes: RouteRecordRaw[] = [
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
