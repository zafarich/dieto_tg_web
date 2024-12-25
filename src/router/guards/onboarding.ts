import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useOnboardingStore } from '@/stores/onboarding'

export function onboardingGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const onboardingStore = useOnboardingStore()
  
  if (to.name === 'home' && !onboardingStore.isCompleted) {
    next({ name: 'starter' })
  } else {
    next()
  }
}