<script setup lang="ts">
import DataTable from './DataTable.vue'
import Form from './Form.vue'
const { editing } = useExperience()
</script>

<template>
  <Form v-if="editing" />
  <DataTable v-else />
</template>
