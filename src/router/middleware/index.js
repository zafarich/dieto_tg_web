import {Router} from "vue-router";
import {authMiddleware} from "./auth";
import {onboardingGuard} from "../guards/onboarding";

export function setupMiddleware(router) {
  router.beforeEach(authMiddleware);
  router.beforeEach(onboardingGuard);
}
