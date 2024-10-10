<script setup lang="ts">
import { Icon } from '#components'
import { findUserService } from '~/apis/frontend'
const uuid = useRoute().params.uuid as string
const services = await findUserService(uuid)
</script>

<template>
  <div>
    <StairTransition />
    <section class="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0">
      <div class="container mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-[60px]">
          <div v-for="(service, i) in services" :key="i" class="flex-1 flex-col justify-center gap-6 group">
            <!-- top -->
            <div class="w-full flex justify-between items-center">
              <div class="text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover">
                {{ i + 1 < 10 ? `0${i + 1}` : i + 1 }}
              </div>
              <NuxtLink
                href="#"
                class="w-[70px] h-[70px] rounded-full bg-white group-hover:bg-accent transition-all duration-500 flex justify-center items-center hover:-rotate-45"
              >
                <Icon name="fluent-mdl2:arrow-tall-down-right" class="text-primary text-3xl" />
              </NuxtLink>
            </div>
            <!-- title -->
            <h2
              class="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500"
            >
              {{ service.title }}
            </h2>
            <!-- description -->
            <p class="text-white/60">{{ service.description }}</p>
            <!-- border -->
            <div class="border-b border-white/20 w-full"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
