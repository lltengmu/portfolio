<script setup lang="ts">
import gsap from 'gsap'

//components
import Stairs from './Stairs.vue'
const pathname = useRouter().currentRoute
onMounted(() => {
  gsap.to('#overlay', { opacity: 0, duration: 0.4, delay: 2, ease: 'power1.in' })
})
</script>

<template>
  <div class="w-screen h-screen fixed top-0 left-8 right-0 pointer-events-none z-[999] flex">
    <Stairs />
  </div>
  <div id="overlay" class="h-screen w-screen fixed bg-primary top-0 pointer-events-none z-[998]"></div>
</template>
