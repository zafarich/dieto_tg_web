<script setup>
import {ref} from "vue";
import {QIcon} from "quasar";

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["close", "add"]);

const newProduct = ref({
  name: "",
  calories: "",
});

const addProduct = () => {
  if (newProduct.value.name && newProduct.value.calories) {
    emit("add", {...newProduct.value});
    newProduct.value = {name: "", calories: ""};
    emit("close");
  }
};
</script>

<template>
  <div
    v-if="isOpen"
    class="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div
      class="modal-content bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-xl"
    >
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-semibold text-gray-800">
          Yangi mahsulot qo'shish
        </h3>
        <button
          @click="$emit('close')"
          class="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-all"
        >
          <q-icon name="close" size="20px" />
        </button>
      </div>

      <div class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Nomi
          </label>
          <input
            v-model="newProduct.name"
            type="text"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            placeholder="Mahsulot nomi"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Kaloriya
          </label>
          <input
            v-model="newProduct.calories"
            type="number"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            placeholder="Kaloriya miqdori"
          />
        </div>

        <button
          @click="addProduct"
          class="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg transition-colors font-medium"
        >
          Qo'shish
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-primary {
  background-color: #1976d2;
}

.bg-primary-dark {
  background-color: #1565c0;
}

.border-primary {
  border-color: #1976d2;
}
</style>
