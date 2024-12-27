import {NavigationGuardNext, RouteLocationNormalized} from "vue-router";
import {useOnboardingStore} from "@/stores/onboarding";

export function onboardingGuard(to, from, next) {
  const onboardingStore = useOnboardingStore();

  if (!onboardingStore.isCompleted) {
    next({name: "onboarding"});
  } else {
    next();
  }
}
