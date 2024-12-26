<template>
  <div class="date-slider">
    <swiper
      :modules="[Navigation]"
      :slides-per-view="7"
      :space-between="10"
      :navigation="true"
      class="date-slider"
    >
      <swiper-slide v-for="(date, index) in dates" :key="index">
        <div
          :class="['date-item', {active: index === activeIndex}]"
          @click="setActive(index)"
        >
          <div class="day">{{ days[index] }}</div>
          <div class="date">{{ date }}</div>
          <div class="dot">•</div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const dates = ref(['26', '27', '28', '29', '30', '31', '1']);
const days = ref(['Pay', 'Jum', 'Shan', 'Yak', 'Dush', 'Sesh', 'Chor']);
const activeIndex = ref(0);

function setActive(index) {
  activeIndex.value = index;
}
</script>

<style scoped>
.date-slider {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 40px;
  position: relative;
}

.date-item {
  color: #000;
  padding: 10px;
  border-radius: 15px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 50px;
}

.date-item.active {
  background-color: #4a00e0;
  color: #fff;
}

.day {
  font-size: 12px;
}

.date {
  font-size: 18px;
  font-weight: bold;
}

.dot {
  font-size: 12px;
  margin-top: 5px;
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  width: 32px;
  height: 32px;
  color: #4a00e0;
  background: none;
}

:deep(.swiper-button-next)::after,
:deep(.swiper-button-prev)::after {
  font-size: 16px;
  font-weight: bold;
}

:deep(.swiper-button-disabled) {
  opacity: 0.35;
}
</style>
