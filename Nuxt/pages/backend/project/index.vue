<script setup lang="ts">
import { nanoid } from 'nanoid'
const { load, projects } = useProject()
await load()
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
    <UserProjectItem v-for="(item, index) in projects" :key="index" v-bind="Object.assign(item, { num: index + 1 })" />
    <NuxtLink
      :to="`/backend/project/${nanoid()}`"
      class="h-[200px] rounded-xl border-dashed border-2 border-white/30 overflow-hidden flex justify-center items-center bg-white/10 cursor-pointer"
    >
      <Icon name="mingcute:add-fill" class="text-[4rem]" />
    </NuxtLink>
  </div>
</template>
