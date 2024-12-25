<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useOnboardingStore} from "@/stores/onboarding";
import {useRouter} from "vue-router";
import validate from "@/utils/validate";
import BaseInput from "@/components/base/BaseInput.vue";

const store = useOnboardingStore();
const router = useRouter();
const height = ref(0);

const formRef = ref(null);

onMounted(() => {
  height.value = store.userInfo.height || "";
  resetValidation();
});

async function submit() {
  resetValidation();
  const hasError = !(await formRef.value.validate());
  if (hasError) return resetValidation(3000);
  store.setHeight(height.value);
  store.nextStep();
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
      {{ $t("Your_height") }}
    </h2>

    <q-form @submit.prevent="submit" ref="formRef" autofocus>
      <BaseInput
        v-model="height"
        type="number"
        outlined
        :suffix="$t('sm')"
        class="mb-4 full-width"
        :placeholder="$t('Height')"
        :rules="[
          (v) => validate.required(v),
          (v) => validate.number(v),
          (v) => validate.min_height(v, 50),
          (v) => validate.max_height(v, 250),
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
