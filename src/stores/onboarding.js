import {defineStore} from "pinia";

export const useOnboardingStore = defineStore("onboarding", {
  state: () => ({
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
    setGender(gender) {
      this.userInfo.gender = gender;
    },
    setFullName(name) {
      this.userInfo.fullName = name;
    },
    setBirthday(date) {
      this.userInfo.birthday = date;
    },
    setWeight(weight) {
      this.userInfo.weight = weight;
    },
    nextStep() {
      this.currentStep++;
    },
    resetUserInfo() {
      this.userInfo = {
        gender: null,
        fullName: "",
        birthday: "",
        weight: null,
      };
      this.currentStep = 1;
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
