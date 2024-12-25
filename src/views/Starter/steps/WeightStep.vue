<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useOnboardingStore} from "@/stores/onboarding";
import {useRouter} from "vue-router";
import validate from "@/utils/validate";
import BaseInput from "@/components/base/BaseInput.vue";

const store = useOnboardingStore();
const router = useRouter();
const weight = ref(0);

const formRef = ref(null);

onMounted(() => {
  weight.value = store.userInfo.weight || "";
  resetValidation();
});

async function submit() {
  resetValidation();
  const hasError = !(await formRef.value.validate());
  if (hasError) return resetValidation(3000);
  store.resetUserInfo();
  return;
  store.setWeight(weight.value);
  store.nextStep();
  // store.completeOnboarding();
  // router.push({name: "home"});
}

const goBack = () => {
  store.prevStep();
};

let resetTimeout = 0;
function resetValidation(timeout = 0) {
  clearTimeout(resetTimeout);
  resetTimeout = setTimeout(() => {
    formRef.value?.resetValidation();
  }, timeout);
}
</script>

<template>
  <div class="step-container">
    <h2 class="text-lg font-medium mb-6">
      {{ $t("Your_weight") }}
    </h2>

    <q-form @submit.prevent="submit" ref="formRef" autofocus>
      <BaseInput
        v-model="weight"
        type="number"
        outlined
        :suffix="$t('kg')"
        class="mb-4 full-width"
        :placeholder="$t('Weight')"
        :rules="[
          (v) => validate.required(v),
          (v) => validate.number(v),
          (v) => validate.min_weight(v, 35),
          (v) => validate.max_weight(v, 200),
        ]"
        @keyup.enter="submit"
      />
    </q-form>

    <q-btn
      color="primary"
      class="full-width mb-4"
      :label="$t('Continue')"
      @click="submit"
      no-caps
    />
    <q-btn flat class="q-mt-4" :label="$t('Back')" @click="goBack" no-caps />
  </div>
</template>
