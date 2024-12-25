<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useOnboardingStore} from "@/stores/onboarding";
import validate from "@/utils/validate";
import BaseInput from "@/components/base/BaseInput.vue";

const store = useOnboardingStore();
const fullName = ref("");

const formRef = ref(null);

async function submit() {
  resetValidation();
  const hasError = !(await formRef.value.validate());
  if (hasError) return resetValidation(3000);

  store.setFullName(fullName.value);
  store.nextStep();
}

onMounted(() => {
  if (store.userInfo.fullName) {
    fullName.value = store.userInfo.fullName;
  }
});

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
      {{ $t("Input_name") }}
    </h2>

    <q-form ref="formRef" autofocus>
      <BaseInput
        v-model="fullName"
        :label="$t('Name')"
        class="mb-4 full-width"
        :rules="[(v) => validate.required(v), (v) => validate.min_string(v, 2)]"
        @keyup.enter="submit"
      />
      <q-btn
        color="primary"
        class="full-width mb-4"
        :label="$t('Continue')"
        @click="submit"
        no-caps
      />
    </q-form>
    <q-btn flat class="q-mt-4" :label="$t('Back')" no-caps @click="goBack" />
  </div>
</template>
