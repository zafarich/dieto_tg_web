import {defineStore} from "pinia";
import {ref, computed} from "vue";
import {userAPI} from "@/services/api";

export const useOnboardingStore = defineStore(
  "onboarding",
  () => {
    const currentStep = ref(1);
    const isCompleted = ref(false);
    const userInfo = ref({
      language: null,
      gender: null,
      fullName: null,
      birthday: null,
      weight: null,
      height: null,
      activity: null,
      goalWeight: null,
    });

    // Kunlik me'yorlar alohida ref
    const dailyNorms = ref({
      calories: null,
      proteins: null,
      fats: null,
      carbs: null,
      recommendation: null,
    });

    // Computed property orqali me'yorlarni olish
    const dailyGoals = computed(() => ({
      calories: dailyNorms.value.calories || 0,
      proteins: dailyNorms.value.proteins || 0,
      fats: dailyNorms.value.fats || 0,
      carbs: dailyNorms.value.carbs || 0,
      // recommendation: dailyNorms.value.recommendation,
    }));

    // Me'yorlarni yangilash
    const updateDailyNorms = async () => {
      try {
        const tgUserId =
          window?.Telegram?.WebApp?.initDataUnsafe?.user?.id || 907423583;
        const {data} = await userAPI.calculateGoals(tgUserId);
        console.log(data);

        dailyNorms.value = {
          calories: data?.data?.dailyCalories,
          proteins: data?.data?.dailyProteins,
          fats: data?.data?.dailyFats,
          carbs: data?.data?.dailyCarbs,
          // recommendation: data?.data?.recommendation,
        };
      } catch (error) {
        console.error("Me'yorlarni yangilashda xatolik:", error);
        throw error;
      }
    };

    // Foydalanuvchi ma'lumotlarini yangilash
    const updateUserData = async () => {
      try {
        const tgUserId =
          window?.Telegram?.WebApp?.initDataUnsafe?.user?.id || 907423583;

        if (!tgUserId) {
          throw new Error("Telegram foydalanuvchi ma'lumotlari topilmadi");
        }

        // Foydalanuvchini yangilash
        await userAPI.createOrUpdate({
          telegramId: tgUserId.toString(),
          name: userInfo.value.fullName,
          gender: userInfo.value.gender,
          birthDate: userInfo.value.birthday,
          weight: userInfo.value.weight,
          height: userInfo.value.height,
          activityLevel: userInfo.value.activity,
          goalWeight: userInfo.value.goalWeight,
        });

        // Me'yorlarni yangilash
        await updateDailyNorms();
      } catch (error) {
        console.error("Ma'lumotlarni yangilash xatosi:", error);
        throw error;
      }
    };

    // Onboarding yakunlash
    const completeOnboarding = async () => {
      try {
        await updateUserData();
        isCompleted.value = true;
        localStorage.setItem("onboardingCompleted", "true");
      } catch (error) {
        console.error("Onboarding xatosi:", error);
        throw error;
      }
    };

    const setLanguage = (lang) => {
      userInfo.value.language = lang;
    };

    const setGender = (gender) => {
      userInfo.value.gender = gender;
    };

    const setFullName = (name) => {
      userInfo.value.fullName = name;
    };

    const setBirthday = (date) => {
      userInfo.value.birthday = date;
    };

    const setWeight = (weight) => {
      userInfo.value.weight = weight;
    };

    const setHeight = (height) => {
      userInfo.value.height = height;
    };

    const setActivity = (activity) => {
      userInfo.value.activity = activity;
    };

    const setGoalWeight = (weight) => {
      userInfo.value.goalWeight = weight;
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
      dailyGoals,
      setLanguage,
      setGender,
      setFullName,
      setBirthday,
      setWeight,
      setHeight,
      setActivity,
      setGoalWeight,
      nextStep,
      prevStep,
      completeOnboarding,
      updateUserData,
      updateDailyNorms,
      dailyNorms,
    };
  },
  {persist: true}
);
