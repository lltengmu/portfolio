<script setup lang="ts">
import { CountUp } from 'countup.js'
import { findUserState } from '~/apis/frontend'

const uuid = useRoute().params.uuid as string
const data = await findUserState(uuid)
const stats = useUserState().parse(data)
onMounted(() => {
  stats.forEach((item, i) => {
    new CountUp(`countUp-${i}`, item.value, { duration: 5 }).start()
  })
})
</script>

<template>
  <section class="pt-4 pb-12 xl:pt-0 xl:pb-0">
    <div class="container mx-auto">
      <div class="flex flex-wrap gap-6 mx-w-[80vw] mx-auto xl:max-w-none">
        <div v-for="(item, i) in stats" :key="i" class="flex-1 flex gap-4 justify-center items-center xl:justify-start">
          <div :id="`countUp-${i}`" class="text-4xl xl:text-6xl font-extrabold"></div>
          <p class="leading-snug text-white/80" :class="[item.key.length < 15 ? 'max-w-[100px]' : 'max-w-[150px]']">
            {{ item.key.replace(/_/gi, ' ') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
