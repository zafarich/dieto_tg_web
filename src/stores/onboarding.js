import {defineStore} from "pinia";

export const useOnboardingStore = defineStore("onboarding", {
  state: () => ({
    currentStep: 1,
    userInfo: {
      gender: null,
      fullName: "",
      birthday: "",
      weight: null,
      height: null,
      activity: null,
      goal_weight: null,
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
    setHeight(height) {
      this.userInfo.height = height;
    },
    setActivity(activity) {
      this.userInfo.activity = activity;
    },
    setGoalWeight(weight) {
      this.userInfo.goal_weight = weight;
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
        height: null,
        activity: null,
        goal_weight: null,
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
