<script setup>
import {computed} from "vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n();

const props = defineProps({
  consumed: {
    type: Number,
    default: 1074,
  },
  remaining: {
    type: Number,
    default: 2059,
  },
  goal: {
    type: Number,
    default: 3133,
  },
  macros: {
    type: Object,
    default: () => ({
      proteins: {current: 56, goal: 157},
      fats: {current: 48, goal: 87},
      carbs: {current: 108, goal: 431},
    }),
  },
  size: {
    type: Number,
    default: 160,
  },
  progressWidth: {
    type: Number,
    default: 16,
  },
  thumbSize: {
    type: Number,
    default: 12,
  },
  trackColor: {
    type: String,
    default: "#C05032",
  },
  progressColor: {
    type: String,
    default: "#fff",
  },
  thumbColor: {
    type: String,
    default: "#fff",
  },
});

const percentage = computed(() =>
  Math.min(Math.round((props.consumed / props.goal) * 100), 100)
);

const rotation = computed(() => {
  return percentage.value * 3.6;
});

const transformOrigin = computed(() => {
  const radius = (props.size - props.progressWidth) / 2;
  return `center ${radius}px`;
});

const circleSize = computed(() => {
  return props.size - props.progressWidth;
});

const strokeDasharray = computed(() => {
  const circumference = circleSize.value * Math.PI;
  return `${circumference} ${circumference}`;
});

const strokeDashoffset = computed(() => {
  const circumference = circleSize.value * Math.PI;
  const offset = circumference - (percentage.value / 100) * circumference;
  return offset;
});
</script>

<style scoped lang="scss">
.progress-ring {
  --track-color: v-bind(trackColor);
  --progress-color: v-bind(progressColor);
  --thumb-color: v-bind(thumbColor);
  --size: v-bind(size + "px");

  width: var(--size);
  height: var(--size);
  position: relative;
  background: var(--bg-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  // SVG Progress Circle
  svg {
    transform: rotate(-90deg);
    overflow: visible;

    circle {
      fill: none;
      stroke: #208053;
      stroke-width: 8px;
      stroke-linecap: round;
      transition: stroke-dashoffset 0.3s ease;
    }

    .progress {
      stroke: var(--progress-color);
      stroke-dasharray: v-bind(strokeDasharray);
      stroke-dashoffset: v-bind(strokeDashoffset);
    }
  }

  // Thumb
  .thumb {
    content: "";
    position: absolute;
    top: v-bind(progressWidth + "px");
    left: 50%;
    width: v-bind(thumbSize + "px");
    height: v-bind(thumbSize + "px");
    background: var(--thumb-color);
    border-radius: 50%;
    transform: translate(-50%, -50%)
      rotate(calc(v-bind(rotation) * 1deg - 90deg));
    transform-origin: v-bind(transformOrigin);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }

  // Center content
  .content {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    z-index: 1;

    .value {
      font-size: 40px;
      line-height: 1;
      font-weight: 500;
      margin-bottom: 4px;
      color: #fff;
    }

    .label {
      font-size: 14px;
      opacity: 0.8;
      color: #fff;
    }
  }
}

// Progress section
.progress-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  align-items: center;
  margin-bottom: 2rem;

  .stat {
    text-align: center;

    .value {
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 2px;
    }

    .label {
      font-size: 14px;
      opacity: 0.8;
    }
  }
}
</style>

<template>
  <div class="w-full rounded-2xl py-6 text-white">
    <div class="progress-section">
      <!-- Remaining -->
      <div class="stat">
        <div class="value">{{ remaining }}</div>
        <div class="label">{{ t("remaining") }}</div>
      </div>

      <!-- Progress Circle -->
      <div class="relative justify-self-center">
        <div class="progress-ring">
          <svg :width="size" :height="size">
            <circle
              :cx="size / 2"
              :cy="size / 2"
              :r="circleSize / 2"
              class="track"
            />
            <circle
              :cx="size / 2"
              :cy="size / 2"
              :r="circleSize / 2"
              class="progress"
            />
          </svg>
          <div class="thumb"></div>
          <div class="content">
            <div class="value">{{ consumed }}</div>
            <div class="label">{{ t("consumed") }}</div>
          </div>
        </div>
      </div>

      <!-- Goal -->
      <div class="stat">
        <div class="value">{{ goal }}</div>
        <div class="label">{{ t("goal") }}</div>
      </div>
    </div>

    <!-- Macros Cards -->
    <div class="grid grid-cols-3 gap-3">
      <div class="bg-white text-black rounded-xl p-3 shadow-sm">
        <div class="text-sm font-medium mb-2">{{ t("proteins") }}</div>
        <div class="w-full bg-gray-100 rounded-full h-1 mb-2">
          <div
            class="bg-red-400 h-full rounded-full transition-all duration-300"
            :style="{
              width: `${
                (macros.proteins.current / macros.proteins.goal) * 100
              }%`,
            }"
          ></div>
        </div>
        <div class="text-sm">
          {{ macros.proteins.current }} / {{ macros.proteins.goal }}
        </div>
      </div>

      <div class="bg-white text-black rounded-xl p-3 shadow-sm">
        <div class="text-sm font-medium mb-2">{{ t("fats") }}</div>
        <div class="w-full bg-gray-100 rounded-full h-1 mb-2">
          <div
            class="bg-blue-400 h-full rounded-full transition-all duration-300"
            :style="{
              width: `${(macros.fats.current / macros.fats.goal) * 100}%`,
            }"
          ></div>
        </div>
        <div class="text-sm">
          {{ macros.fats.current }} / {{ macros.fats.goal }}
        </div>
      </div>

      <div class="bg-white text-black rounded-xl p-3 shadow-sm">
        <div class="text-sm font-medium mb-2">{{ t("carbs") }}</div>
        <div class="w-full bg-gray-100 rounded-full h-1 mb-2">
          <div
            class="bg-yellow-400 h-full rounded-full transition-all duration-300"
            :style="{
              width: `${(macros.carbs.current / macros.carbs.goal) * 100}%`,
            }"
          ></div>
        </div>
        <div class="text-sm">
          {{ macros.carbs.current }} / {{ macros.carbs.goal }}
        </div>
      </div>
    </div>
  </div>
</template>
