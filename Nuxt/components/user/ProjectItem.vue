<script setup lang="ts">
import dayjs from 'dayjs'

interface IProject {
  num:number
  nanoid: string
  title: string
  description: string
  stack?: string[]
  github: string | null
  live: string | null
  updatedAt: string
  createdAt: string
}

const props = defineProps<IProject>()
const { del } = useProject()

const nid = computed(() => {
  return props.num < 10 ? `0${props.num}` : props.num
})
</script>

<template>
  <div class="h-[200px] rounded-xl border border-white/30 grid grid-rows-[1fr_3rem] overflow-hidden">
    <div class="flex flex-col gap-5 p-5">
      <div class="flex justify-between items-center">
        <div class="text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover">
          {{ nid }}
        </div>
        <div
          @click="del(props.nanoid)"
          class="w-10 h-10 rounded-full bg-white/10 flex justify-center items-center group"
        >
          <Icon name="mingcute:delete-2-line" size="20" class="group-hover:text-accent" />
        </div>
      </div>
      <h2
        class="text-[28px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 flex items-center gap-5"
      >
        <span class="w-[6px] h-full rounded-full bg-accent"></span>
        {{ props.title }}
      </h2>
    </div>
    <NuxtLink
      :to="`/backend/project/${props.nanoid}`"
      class="p-5 flex justify-between items-center border-t border-white/30 group hover:bg-white/10 cursor-pointer"
    >
      <span class="group-hover:text-accent">Created:{{ dayjs(props.createdAt).format('ddd,DD,YYYY hh:mm A') }}</span>
      <Icon name="mingcute:arrow-right-line" />
    </NuxtLink>
  </div>
</template>
