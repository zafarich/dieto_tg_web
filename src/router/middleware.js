import {useOnboardingStore} from "@/stores/onboarding.js";

export function onboardingMiddleware(to, from, next) {
  const onboardingStore = useOnboardingStore();

  // Onboarding sahifasiga o'tayotgan bo'lsa, to'g'ridan-to'g'ri o'tkazish
  if (to.name === "onboarding") {
    return next();
  }

  // Agar onboarding tugallanmagan bo'lsa
  if (!onboardingStore.isCompleted) {
    console.log("Redirecting to onboarding...");
    return next({name: "onboarding"});
  }

  // Aks holda davom etish
  next();
}
