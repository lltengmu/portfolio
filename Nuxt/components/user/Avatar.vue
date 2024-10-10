<script setup lang="ts">
import useUserStore from '~/store/useUserStore'

const { user } = useUserStore()
</script>

<template>
  <div class="w-8 h-8 rounded-full overflow-hidden shadow-lg">
    <NuxtImg :src="user?.avatar" class="wfull h-full object-cover" />
  </div>
</template>
