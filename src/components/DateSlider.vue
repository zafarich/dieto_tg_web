<script setup>
import {ref, onMounted, computed} from "vue";
import {QIcon, useQuasar, date} from "quasar";

const $q = useQuasar();
const showDatePicker = ref(false);
const props = defineProps({
  selectedDate: {
    type: Date,
    default: () => new Date(),
  },
});

const emit = defineEmits(["dateSelect"]);
const currentDate = ref(new Date());

// Oxirgi 7 kun uchun minimum sana
const minDate = computed(() => {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  return date;
});

const formatDate = (date) => {
  const months = [
    "yan",
    "fev",
    "mar",
    "apr",
    "may",
    "iyn",
    "iyl",
    "avg",
    "sen",
    "okt",
    "noy",
    "dek",
  ];
  return `${date.getDate()} ${months[date.getMonth()]}`;
};

const navigateDate = (direction) => {
  const newDate = new Date(currentDate.value);
  newDate.setDate(currentDate.value.getDate() + direction);

  // Sanani chegaralash
  if (newDate >= minDate.value && newDate <= new Date()) {
    currentDate.value = newDate;
    emit("dateSelect", newDate);
  }
};

const handleDateSelect = (selectedDate) => {
  currentDate.value = new Date(selectedDate);
  emit("dateSelect", currentDate.value);
  showDatePicker.value = false;
};

onMounted(() => {
  emit("dateSelect", currentDate.value);
});
</script>

<template>
  <div
    class="date-navigation bg-white/80 backdrop-blur-sm rounded-full shadow-sm flex items-center justify-between px-1.5 py-1.5 mx-auto max-w-full border border-gray-100"
  >
    <!-- Oldingi kun -->
    <button
      @click="navigateDate(-1)"
      class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
    >
      <q-icon name="chevron_left" size="28px" class="text-gray-600" />
    </button>

    <!-- Joriy sana -->
    <div
      @click="showDatePicker = true"
      class="flex items-center gap-2 text-gray-600 px-3 py-2 cursor-pointer hover:bg-gray-50 rounded-full transition-colors"
    >
      <q-icon name="calendar_today" size="20px" class="text-gray-400" />
      <span class="text-sm font-medium">
        Bugun, {{ formatDate(currentDate) }}
      </span>
    </div>

    <!-- Keyingi kun -->
    <button
      @click="navigateDate(1)"
      class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
    >
      <q-icon name="chevron_right" size="28px" class="text-gray-600" />
    </button>

    <!-- Date Picker Dialog -->
    <q-dialog v-model="showDatePicker" persistent>
      <q-card class="q-pa-none" style="min-width: 350px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Sanani tanlang</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-date
            v-model="currentDate"
            minimal
            :options="
              (date) => {
                const currentDate = new Date();
                const minDate = new Date();
                minDate.setDate(currentDate.getDate() - 7);
                const selectedDate = new Date(date);
                return selectedDate >= minDate && selectedDate <= currentDate;
              }
            "
            @update:model-value="handleDateSelect"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<style scoped>
.date-navigation {
  transition: all 0.3s ease;
}

.date-navigation:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

button {
  -webkit-tap-highlight-color: transparent;
}

button:active {
  transform: scale(0.97);
}

/* Quasar Date Picker stillarini moslashtirish */
:deep(.q-card) {
  border-radius: 16px;
}

:deep(.q-date) {
  box-shadow: none;
}
</style>
