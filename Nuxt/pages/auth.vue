<script setup lang="ts">
import guest from '~/middleware/guest'

definePageMeta({
  middleware: [guest],
})
</script>

<template>
  <NuxtLayout name="auth">
    <NuxtPage />
  </NuxtLayout>
</template>
