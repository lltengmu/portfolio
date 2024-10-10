<script setup lang="ts">
import useErrorStore from '~/store/useErrorStore'
const { name } = defineProps<{ name: string }>()
const store = useErrorStore()
</script>

<template>
  <div class="hs-error" v-show="store.getError(name)">
    {{ store.getError(name) }}
  </div>
</template>

<style lang="scss" scoped>
.hs-error {
  @apply rounded-md text-red-600 py-1 px-2 text-xs mt-1 font-bold flex items-center gap-1;
}
</style>
