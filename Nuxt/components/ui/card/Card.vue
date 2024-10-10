<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    :class="
      cn(
        'rounded-lg shadow-2xl bg-card text-card-foreground p-5 border-accent',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
