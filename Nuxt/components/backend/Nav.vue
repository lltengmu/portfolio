<script setup lang="ts">
import { Icon } from '#components'
import useUserStore from '~/store/useUserStore'
const pathname = useRouter().currentRoute

const menus = [
  {
    label: 'Home',
    link: '/backend',
  },
  {
    label: 'Education',
    link: '/backend/education',
  },
  {
    label: 'Service',
    link: '/backend/service',
  },
  {
    label: 'Experience',
    link: '/backend/experience',
  },
  {
    label: 'Projects',
    link: '/backend/project',
  },
]
</script>

<template>
  <nav class="hidden xl:block rounded-xl p-5">
    <div class="flex justify-between items-center gap-10">
      <div class="flex items-end gap-10">
        <NuxtLink :to="`/portfolio/home/${useUserStore().user?.uuid}`" class="flex items-center gap-2" target="_blank">
          <Icon name="mingcute:version-fill" size="36" class="text-accent" />
          <h1 class="h3">Vibe</h1>
        </NuxtLink>
        <nav class="flex gap-8">
          <NuxtLink
            v-for="(item, index) in menus"
            :key="index"
            :to="item.link"
            class="capitalize font-medium hover:text-accent"
            :class="{ 'text-accent border-b-2 border-accent': item.link === pathname.path }"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>
      </div>
      <div class="flex items-center gap-4">
        <Icon name="mingcute:settings-5-line" size="22" />
        <Icon name="mingcute:notification-newdot-line" size="22" />
        <UserAvatar />
      </div>
    </div>
  </nav>
</template>
