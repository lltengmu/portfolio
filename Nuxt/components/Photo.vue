<script setup lang="ts">
import { useMotion } from '@vueuse/motion'
const container = ref<HTMLDivElement>()
const circle = ref<SVGCircleElement>()
const imgContainer = ref<HTMLDivElement>()
const { img = '#' } = defineProps(['img'])

const motionInstance = useMotion(circle, {
  initial: {
    strokeDasharray: '24 10 0 0',
  },
  enter: {
    strokeDasharray: ['15 120 25 25', '16 25 92 72', '4 250 22 22'],
    rotate: [120, 360],
    transition: {
      duration: 5000,
      repeat: Infinity,
      repeatType: 'reverse',
    },
  },
})

const motionContainer = useMotion(container, {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
        duration: 400,
      delay: 2000,
      ease: 'easeIn',
    },
  },
})

const motionImgContainer = useMotion(imgContainer, {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 400,
      delay: 2000,
      ease: 'easeInOut',
    },
  },
})
</script>

<template>
  <div class="w-full h-full relative">
    <div ref="container" class="bg-primary">
      <!-- image -->
      <div ref="imgContainer" class="w-[298px] h-[298px] xl:w-[498px] xl:h-[498px] absolute rounded-full mix-blend-lighten overflow-hidden">
        <NuxtImg :src="img" width="498px" height="498px" alt="photo" class="object-contain" />
      </div>

      <svg
        class="w-[300px] h-[300px] xl:w-[506px] xl:h-[506px]"
        fill="transparent"
        viewBox="0 0 506 506"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          ref="circle"
          cx="253"
          cy="253"
          r="250"
          stroke="#00ff99"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </div>
</template>
