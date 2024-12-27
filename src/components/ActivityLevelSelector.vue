<script setup>
import {ref} from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const activityLevels = {
  sedentary: {
    title: "Sakkiz soatlik o'tirgan turmush tarzi",
    description: "Asosan o'tirish va minimal jismoniy faollik",
    color: "#E74C3C",
  },
  light: {
    title: "Yengil jismoniy faoliyat",
    description: "Kundalik yurish va yengil jismoniy harakatlar",
    color: "#F39C12",
  },
  moderate: {
    title: "O'rtacha jismoniy faoliyat",
    description: "Muntazam sport va o'rtacha jismoniy faollik",
    color: "#2ECC71",
  },
  active: {
    title: "Yuqori jismoniy faoliyat",
    description: "Muntazam sport va faol hayot tarzi",
    color: "#3498DB",
  },
  very_active: {
    title: "Juda yuqori jismoniy faoliyat",
    description: "Professional sport yoki juda faol hayot tarzi",
    color: "#9B59B6",
  },
};

const selectActivity = (activity) => {
  emit("update:modelValue", activity);
};
</script>

<template>
  <div class="activity-selector">
    <div class="space-y-3">
      <div
        v-for="(level, key) in activityLevels"
        :key="key"
        class="activity-option"
        :class="{selected: modelValue === key}"
        @click="selectActivity(key)"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-4 h-4 rounded-full border-2 flex items-center justify-center"
            :style="{borderColor: level.color}"
          >
            <div
              v-if="modelValue === key"
              class="w-2 h-2 rounded-full"
              :style="{backgroundColor: level.color}"
            ></div>
          </div>
          <div>
            <h3 class="text-sm font-medium text-gray-800">{{ level.title }}</h3>
            <p class="text-xs text-gray-500">{{ level.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.activity-option {
  padding: 1rem;
  border-radius: 0.75rem;
  background-color: rgb(249 250 251 / 0.5);
  cursor: pointer;
  transition: all 0.2s ease;
}

.activity-option:hover {
  background-color: rgb(243 244 246);
}

.activity-option.selected {
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
</style>
