<script setup lang="ts">
import { Icon } from '#components'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import links from '~/data/links'
const pathname = useRouter().currentRoute
</script>

<template>
  <Sheet>
    <SheetTrigger class="flex justify-center items-center">
      <Icon name="mingcute:align-right-line" class="text-[32px] text-accent" />
    </SheetTrigger>
    <SheetContent class="flex flex-col">
      <SheetTitle></SheetTitle>
      <SheetDescription></SheetDescription>
      <!-- logo -->
      <div class="mt-32 mb-40 text-center text-2xl">
        <NuxtLink to="/">
          <h1 class="text-4xl font-semibold">Luke <span class="text-accent">.</span></h1>
        </NuxtLink>
      </div>
      <nav class="flex flex-col justify-center items-center gap-8">
        <NuxtLink
          v-for="(links, index) in links"
          :to="links.path"
          :key="index"
          :class="{ 'text-accent border-b-2 border-accent': pathname.path === links.path }"
          class="text-xl capitalize hover:text-accent transition-all"
        >
          {{ links.name }}
        </NuxtLink>
      </nav>
    </SheetContent>
  </Sheet>
</template>
