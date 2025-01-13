<template>
  <div class="step-container">
    <h2 class="text-lg font-medium mb-6">Telefon raqamingizni kiriting</h2>

    <!-- Main Content -->
    <q-form @submit.prevent="savePhone" ref="formRef" autofocus>
      <div class="w-full max-w-sm mb-4">
        <BaseInput
          v-model="phone"
          label="Telefon raqami"
          mask="## ### ## ##"
          outlined
          class="input-with-prepend"
          :rules="[
            (val) => !!val || 'Telefon raqami kiritish majburiy',
            (val) =>
              trimBetween(val).length < 9
                ? 'Telefon raqamini to\'liq kiriting'
                : true,
          ]"
          ref="phoneInput"
          prepend
          @keyup.enter="savePhone"
          @keyup="() => resetValidation()"
        >
          <template v-slot:prepend>
            <div>+998</div>
          </template>
        </BaseInput>
      </div>
    </q-form>

    <q-btn
      color="primary"
      class="full-width mb-4"
      :label="$t('Continue')"
      @click="savePhone"
      no-caps
    />
    <q-btn flat class="q-mt-4" :label="$t('Back')" @click="goBack" no-caps />
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useOnboardingStore} from "@/stores/onboarding";
import {useQuasar} from "quasar";
import BaseInput from "@/components/base/BaseInput.vue";
import {trimBetween} from "@/utils/helpers";

const $q = useQuasar();
const store = useOnboardingStore();
const loading = ref(false);
const phone = ref("");
const phoneInput = ref(null);
const formRef = ref(null);

onMounted(() => {
  phone.value = store.userInfo.phone || "";
  resetValidation();
});

const savePhone = async () => {
  resetValidation();
  const hasError = !(await formRef.value.validate());
  if (hasError) return resetValidation(3000);

  store.setPhone(`998${trimBetween(phone.value)}`);
  store.nextStep();
};

let resetTimeout = 0;
function resetValidation(timeout = 0) {
  clearTimeout(resetTimeout);
  resetTimeout = setTimeout(() => {
    formRef.value?.resetValidation();
  }, timeout);
}
</script>

<style scoped>
.q-input {
  max-width: 100%;
}
</style>
