<script setup lang="ts">
const { num, href, title, description } = defineProps<{ num: string; href: string; title: string; description: string }>()
</script>

<template>
  <div class="flex-1 flex-col justify-center gap-6 group p-4">
    <!-- top -->
    <div class="w-full flex justify-between items-center">
      <div class="text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover">
        {{ num }}
      </div>
      <NuxtLink
        :href="href"
        class="w-[70px] h-[70px] rounded-full bg-white group-hover:bg-accent transition-all duration-500 flex justify-center items-center hover:-rotate-45"
      >
        <Icon name="fluent-mdl2:arrow-tall-down-right" class="text-primary text-3xl" />
      </NuxtLink>
    </div>
    <!-- title -->
    <h2 class="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500">
      {{ title }}
    </h2>
    <!-- description -->
    <p class="text-white/60">{{ description }}</p>
    <!-- border -->
    <div class="border-b border-white/20 w-full"></div>
  </div>
</template>
