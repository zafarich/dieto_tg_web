import { Router } from 'vue-router'
import { authMiddleware } from './auth'
import { onboardingGuard } from '../guards/onboarding'

export function setupMiddleware(router: Router) {
  router.beforeEach(authMiddleware)
  router.beforeEach(onboardingGuard)
}