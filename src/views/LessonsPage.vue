<template>
  <div class="lessons-page">
    <!-- Header -->
    <div class="fixed top-0 left-0 right-0 bg-white z-10">
      <div class="flex items-center px-4 h-14">
        <div class="text-xl font-bold">Darslar</div>
      </div>
    </div>

    <!-- Content -->
    <div class="pt-16 px-4 pb-24">
      <!-- Boshlang'ich darslar -->
      <div class="mb-8">
        <h2 class="text-lg font-medium mb-4">Boshlang'ich darslar</h2>
        <div class="space-y-4">
          <div
            v-for="lesson in beginnerLessons"
            :key="lesson.id"
            class="bg-white rounded-2xl p-4 border border-gray-100"
            @click="openLesson(lesson)"
          >
            <div class="flex items-start gap-4">
              <div
                class="w-20 h-20 rounded-xl bg-cover bg-center"
                :style="{ backgroundImage: `url(${lesson.image})` }"
              ></div>
              <div class="flex-1">
                <div class="font-medium mb-1">{{ lesson.title }}</div>
                <div class="text-sm text-gray-500 mb-3">
                  {{ lesson.description }}
                </div>
                <div class="flex items-center gap-4">
                  <div class="flex items-center gap-1 text-xs text-gray-500">
                    <q-icon name="schedule" size="14px" />
                    <span>{{ lesson.duration }}</span>
                  </div>
                  <div class="flex items-center gap-1 text-xs text-gray-500">
                    <q-icon name="menu_book" size="14px" />
                    <span>{{ lesson.lessons }} dars</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Amaliy mashg'ulotlar -->
      <div class="mb-8">
        <h2 class="text-lg font-medium mb-4">Amaliy mashg'ulotlar</h2>
        <div class="space-y-4">
          <div
            v-for="lesson in practicalLessons"
            :key="lesson.id"
            class="bg-white rounded-2xl p-4 border border-gray-100"
            @click="openLesson(lesson)"
          >
            <div class="flex items-start gap-4">
              <div
                class="w-20 h-20 rounded-xl bg-cover bg-center"
                :style="{ backgroundImage: `url(${lesson.image})` }"
              ></div>
              <div class="flex-1">
                <div class="font-medium mb-1">{{ lesson.title }}</div>
                <div class="text-sm text-gray-500 mb-3">
                  {{ lesson.description }}
                </div>
                <div class="flex items-center gap-4">
                  <div class="flex items-center gap-1 text-xs text-gray-500">
                    <q-icon name="schedule" size="14px" />
                    <span>{{ lesson.duration }}</span>
                  </div>
                  <div class="flex items-center gap-1 text-xs text-gray-500">
                    <q-icon name="menu_book" size="14px" />
                    <span>{{ lesson.lessons }} dars</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Qo'shimcha ma'lumotlar -->
      <div>
        <h2 class="text-lg font-medium mb-4">Qo'shimcha ma'lumotlar</h2>
        <div class="grid grid-cols-2 gap-4">
          <div
            v-for="topic in additionalTopics"
            :key="topic.id"
            class="bg-white rounded-2xl p-4 border border-gray-100"
            @click="openTopic(topic)"
          >
            <div
              class="w-full h-32 rounded-xl bg-cover bg-center mb-3"
              :style="{ backgroundImage: `url(${topic.image})` }"
            ></div>
            <div class="font-medium text-sm mb-1">{{ topic.title }}</div>
            <div class="text-xs text-gray-500">{{ topic.description }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Dars modali -->
    <q-dialog v-model="showLessonModal" persistent>
      <q-card style="width: 100%; max-width: 400px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{ selectedLesson?.title }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-md">
          <div class="space-y-4">
            <img
              :src="selectedLesson?.image"
              class="w-full h-48 object-cover rounded-xl"
            />
            <p class="text-gray-600">{{ selectedLesson?.description }}</p>
            <div class="space-y-2">
              <div
                v-for="(subLesson, index) in selectedLesson?.subLessons"
                :key="index"
                class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <div
                  class="w-8 h-8 rounded-full bg-white flex items-center justify-center text-sm"
                >
                  {{ index + 1 }}
                </div>
                <div class="text-sm">{{ subLesson }}</div>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-gray-50 q-pa-md">
          <q-btn
            unelevated
            color="primary"
            label="Darsni boshlash"
            @click="startLesson"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const showLessonModal = ref(false);
const selectedLesson = ref(null);

// Boshlang'ich darslar
const beginnerLessons = ref([
  {
    id: 1,
    title: "Ozish asoslari",
    description: "Sog'lom ozish va to'g'ri ovqatlanish tamoyillari",
    duration: "30 daqiqa",
    lessons: 5,
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
    subLessons: [
      "Ozish nima va nima uchun kerak?",
      "Kalloriya tushunchasi",
      "Metabolizm va uning ahamiyati",
      "To'g'ri ovqatlanish rejimi",
      "Natijalarni kuzatish"
    ]
  },
  {
    id: 2,
    title: "Ovqatlanish rejimi",
    description: "Kunlik ovqatlanish rejimini tuzish va unga amal qilish",
    duration: "25 daqiqa",
    lessons: 4,
    image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af",
    subLessons: [
      "Ovqatlanish vaqtlari",
      "Porsiyalar hajmi",
      "Foydali va zararli mahsulotlar",
      "Menu tuzish qoidalari"
    ]
  },
  {
    id: 3,
    title: "Foydali mahsulotlar",
    description: "Ozish uchun foydali mahsulotlar va ularning ahamiyati",
    duration: "35 daqiqa",
    lessons: 3,
    image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327",
    subLessons: [
      "Oqsilga boy mahsulotlar",
      "Foydali yog'lar",
      "Murakkab uglevodlar"
    ]
  }
]);

// Amaliy mashg'ulotlar
const practicalLessons = ref([
  {
    id: 4,
    title: "Menu tuzish",
    description: "Kunlik va haftalik menu tuzishni o'rganamiz",
    duration: "40 daqiqa",
    lessons: 3,
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352",
    subLessons: [
      "Kaloriyalarni hisoblash",
      "BZU balansini saqlash",
      "Menu namunalari"
    ]
  },
  {
    id: 5,
    title: "Xarid qilish",
    description: "To'g'ri mahsulot tanlash va xarid qilish",
    duration: "20 daqiqa",
    lessons: 2,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e",
    subLessons: [
      "Mahsulot tarkibini o'qish",
      "Mahsulot sifatini aniqlash"
    ]
  }
]);

// Qo'shimcha ma'lumotlar
const additionalTopics = ref([
  {
    id: 6,
    title: "Suv ichish",
    description: "Suv ichish tartibi va me'yorlari",
    image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d"
  },
  {
    id: 7,
    title: "Uyqu va ozish",
    description: "Uyquning ozishga ta'siri",
    image: "https://images.unsplash.com/photo-1511295742362-92c96b5adb36"
  },
  {
    id: 8,
    title: "Stress va ozish",
    description: "Stressning ozishga ta'siri",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438"
  },
  {
    id: 9,
    title: "Motivatsiya",
    description: "Motivatsiyani saqlab qolish usullari",
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de"
  }
]);

const openLesson = (lesson) => {
  selectedLesson.value = lesson;
  showLessonModal.value = true;
};

const openTopic = (topic) => {
  selectedLesson.value = topic;
  showLessonModal.value = true;
};

const startLesson = () => {
  showLessonModal.value = false;
  router.push({ name: 'lesson-details', params: { id: selectedLesson.value.id } });
};
</script>

<style scoped>
.lessons-page {
  min-height: 100vh;
  background-color: #f8fafc;
}

.lessons-page [class*='rounded'] {
  transition: all 0.2s ease;
}

.lessons-page [class*='rounded']:active {
  transform: scale(0.98);
}
</style>
