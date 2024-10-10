<script setup lang="ts">
import useFrontendStore from '~/store/useFrontendStore';

// import links from '~/data/links'
const useFrontend = useFrontendStore()
const pathname = useRouter().currentRoute
</script>

<template>
  <nav class="flex gap-8">
    <NuxtLink
      v-for="(item, index) in useFrontend.navs"
      :key="index"
      :to="item.path"
      class="capitalize font-medium hover:text-accent"
      :class="{ 'text-accent border-b-2 border-accent': item.path === pathname.path }"
    >
      {{ item.name }}
    </NuxtLink>
  </nav>
</template>
