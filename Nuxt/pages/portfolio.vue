<script setup lang="ts">
import { isUuid } from '~/helper'
import useFrontendStore from '~/store/useFrontendStore'

definePageMeta({
  validate: (route) => {
    if (isUuid(route.params.uuid as string)) {
      useFrontendStore().uuid = route.params.uuid as string
    }
    return isUuid(route.params.uuid as string)
  },
})
</script>

<template>
  <NuxtLayout name="default">
    <NuxtPage />
  </NuxtLayout>
</template>
