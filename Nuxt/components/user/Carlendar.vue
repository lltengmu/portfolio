<script setup lang="ts">
import { Calendar } from '~/components/ui/calendar'
import { type DateValue, getLocalTimeZone, today } from '@internationalized/date'
const value = ref(today(getLocalTimeZone())) as Ref<DateValue>
</script>

<template>
  <Calendar v-model="value" :weekday-format="'short'" class="rounded-md w-full" />
</template>
