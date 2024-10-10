<script setup lang="ts">
import gsap from 'gsap'
//calculate the revese index fot staggered for delay
const reverseIndex = (index: number) => {
  const totalStep = 6
  return totalStep - index - 1
}

const stair = ref<HTMLDivElement[]>()

onMounted(() => {
  stair.value?.forEach((ele, i) => {
    gsap.to(ele, {
      keyframes: [{ y: '100%' }, { y: '0%' }, { y: '100%', delay: 1 }],
      duration: 1.5,
      delay: reverseIndex(i) * 0.1,
    })
  })
})
</script>

<template>
  <div ref="stair" v-for="n in 6" :key="n" class="w-1/6 h-full bg-white relative translate-y-[100%]"></div>
</template>
