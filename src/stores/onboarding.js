import {defineStore} from "pinia";
import {ref, computed} from "vue";
import {userAPI} from "@/services/api";

export const useOnboardingStore = defineStore(
  "onboarding",
  () => {
    const currentStep = ref(1);
    const isCompleted = ref(false);
    const userInfo = ref({
      gender: null,
      name: null,
      birthDate: null,
      weight: null,
      height: null,
      activityLevel: null,
      goalWeight: null,
      phone: null,
    });

    // O'zgartirilgan maydonlarni saqlash uchun obyekt
    const updatedFields = ref({});

    const updateUserData = async (updatedFields) => {
      try {
        // API chaqiruvini amalga oshiramiz
        await userAPI.updateUserField(updatedFields);
        getUser();
      } catch (error) {
        console.error("Ma'lumotlarni yangilash xatosi:", error);
        throw error;
      }
    };

    const getUser = async () => {
      const {data} = await userAPI.getUser();
      userInfo.value = data?.data;
    };

    const createUser = async () => {
      const {data} = await userAPI.createUser(userInfo.value);
      userInfo.value = data?.data;
    };

    // Onboarding yakunlash
    const completeOnboarding = async () => {
      try {
        await createUser();
        await getUser();
        isCompleted.value = true;
        localStorage.setItem("onboardingCompleted", "true");
      } catch (error) {
        console.error("Onboarding xatosi:", error);
        throw error;
      }
    };

    const setGender = (gender) => {
      userInfo.value.gender = gender;
      updatedFields.value.gender = gender;
    };

    const setname = (name) => {
      userInfo.value.name = name;
      updatedFields.value.name = name;
    };

    const setBirthday = (date) => {
      userInfo.value.birthDate = date;
      updatedFields.value.birthDate = date;
    };

    const setWeight = (weight) => {
      userInfo.value.weight = weight;
      updatedFields.value.weight = weight;
    };

    const setHeight = (height) => {
      userInfo.value.height = height;
      updatedFields.value.height = height;
    };

    const setActivity = (activity) => {
      userInfo.value.activityLevel = activity;
      updatedFields.value.activityLevel = activity;
    };

    const setGoalWeight = (weight) => {
      userInfo.value.goalWeight = weight;
      updatedFields.value.goalWeight = weight;
    };

    const setPhone = (phone) => {
      userInfo.value.phone = phone;
      updatedFields.value.phone = phone;
    };

    const nextStep = () => {
      currentStep.value++;
    };

    const prevStep = () => {
      currentStep.value--;
    };

    return {
      currentStep,
      isCompleted,
      userInfo,
      setGender,
      setname,
      setBirthday,
      setWeight,
      setHeight,
      setActivity,
      setGoalWeight,
      setPhone,
      nextStep,
      prevStep,
      completeOnboarding,
      updateUserData,
      getUser,
    };
  },
  {persist: true}
);
