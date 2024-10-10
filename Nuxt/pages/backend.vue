<script setup lang="ts">
import auth from '~/middleware/auth'

definePageMeta({
  middleware: [auth],
})
</script>

<template>
  <NuxtLayout name="backend">
    <NuxtPage />
  </NuxtLayout>
</template>
