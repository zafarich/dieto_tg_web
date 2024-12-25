<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useOnboardingStore} from "@/stores/onboarding";
import {useRouter} from "vue-router";
import validate from "@/utils/validate";
import BaseInput from "@/components/base/BaseInput.vue";

const store = useOnboardingStore();
const router = useRouter();
const birthday = ref("");
const birth_modal = ref(false);

const formRef = ref(null);

onMounted(() => {
  if (store.userInfo.birthday) {
    birthday.value = store.userInfo.birthday;
  }
});
async function submit() {
  resetValidation();
  const hasError = !(await formRef.value.validate());
  if (hasError) return resetValidation(3000);
  store.setBirthday(birthday.value);
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
      {{ $t("Birth_date") }}
    </h2>
    <q-form @submit.prevent="submit" ref="formRef" autofocus>
      <BaseInput
        v-model="birthday"
        outlined
        mask="##.##.####"
        append
        :placeholder="'DD.MM.YYYY'"
        class="mb-4 full-width"
        :rules="[
          (v) => validate.required(v),
          (v) => validate.date(v),
          (v) => validate.min_age(v, 13),
        ]"
      >
        <template #append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              v-model="birth_modal"
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                v-model="birthday"
                @update:model-value="birth_modal = false"
                mask="DD.MM.YYYY"
                :options="(date) => new Date(date) <= new Date()"
              />
            </q-popup-proxy>
          </q-icon>
        </template>
      </BaseInput>
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

<style scoped>
.q-date {
  width: 100%;
}
</style>
