import {defineStore} from "pinia";

export interface UserInfo {
  gender: "male" | "female" | null;
  fullName: string;
  birthday: string;
  weight: number | null;
}

interface OnboardingState {
  currentStep: number;
  userInfo: UserInfo;
  isCompleted: boolean;
}

export const useOnboardingStore = defineStore("onboarding", {
  state: (): OnboardingState => ({
    currentStep: 1,
    userInfo: {
      gender: null,
      fullName: "",
      birthday: "",
      weight: null,
    },
    isCompleted: false,
  }),

  actions: {
    setGender(gender: "male" | "female") {
      this.userInfo.gender = gender;
    },
    setFullName(name: string) {
      this.userInfo.fullName = name;
    },
    setBirthday(date: string) {
      this.userInfo.birthday = date;
    },
    setWeight(weight: number) {
      this.userInfo.weight = weight;
    },
    nextStep() {
      this.currentStep++;
    },
    prevStep() {
      this.currentStep--;
    },
    completeOnboarding() {
      this.isCompleted = true;
    },
  },

  persist: true,
});
