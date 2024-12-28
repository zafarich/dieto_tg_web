import Home from "@/views/Home.vue";
import Starter from "@/views/Starter/index.vue";
import MenusPage from "@/views/MenusPage.vue";

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
  {
    path: "/menus",
    name: "menus",
    component: MenusPage,
  },
];
