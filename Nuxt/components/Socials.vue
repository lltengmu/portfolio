<script setup lang="ts">
import { Icon } from '#components'
import { findUserSocial } from '~/apis/frontend'
const { iconStyles } = defineProps(['iconStyles'])

type States = { icon: string; name: 'github' | 'document' | 'bilibili' | 'tiktok'; link: string }
const socials = ref<States[]>([
  {
    icon: 'simple-icons:github',
    name: 'github',
    link: '#',
  },
  {
    icon: 'mingcute:document-2-fill',
    name: 'document',
    link: '#',
  },
  {
    icon: 'mingcute:tv-2-line',
    name: 'bilibili',
    link: '#',
  },
  {
    icon: 'mingcute:tiktok-fill',
    name: 'tiktok',
    link: '#',
  },
])

const parse = (data: Socials) => {
  socials.value.forEach((item) => {
    item.link = data[item.name]! ?? '#'
  })
}

const uuid = useRoute().params.uuid as string
await findUserSocial(uuid).then((r) => parse(r))
</script>

<template>
  <div class="flex gap-6">
    <NuxtLink v-for="(social, index) in socials" :key="index" :class="iconStyles" :href="social.link" target="_blank">
      <Icon :name="social.icon" />
    </NuxtLink>
  </div>
</template>
