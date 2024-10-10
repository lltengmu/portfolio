<script setup lang="ts">
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '~/components/ui/number-field'
const { states, load, handleUpdate } = useUserState()
await load()
</script>

<template>
  <Card>
    <CardTitle> States </CardTitle>
    <CardContent class="mt-5 py-2">
      <div v-for="(state, i) in states" :key="i" class="flex justify-start items-center gap-4">
        <NumberField
          class="max-w-[80px]"
          :min="0"
          :default-value="state.value"
          @update:model-value="(value: number) => handleUpdate([state.key, value])"
        >
          <NumberFieldContent>
            <NumberFieldDecrement />
            <NumberFieldInput class="text-accent text-xl" />
            <NumberFieldIncrement />
          </NumberFieldContent>
        </NumberField>
        <div class="text-xs">{{ state.key.replace(/_/gi, ' ') }}</div>
      </div>
    </CardContent>
  </Card>
</template>
