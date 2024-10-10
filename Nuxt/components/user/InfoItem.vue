<script setup lang="ts">
import { type DateValue, getLocalTimeZone } from '@internationalized/date';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

const id = nanoid()
const editing = ref(false)
const modelValue = defineModel<string | null>()
const { field, iconName, label } = defineProps(['field', 'iconName', 'label'])
const vFocus = {
  mounted: (el: HTMLInputElement) => el.focus(),
}

onMounted(() => {
  document.body.addEventListener('click', function (e: Event) {
    const target = e.target as HTMLInputElement
    if (target.id == id) return
    editing.value = false
  })
})
</script>

<template>
  <div class="flex justify-between items-center">
    <!-- double click update info -->
    <div class="w-full flex justify-start gap-4">
      <div class="w-16 h-16 rounded-xl bg-gray-600/10 flex justify-center items-center">
        <Icon :name="iconName" size="32" />
      </div>
      <div class="w-full p-1">
        <Input
          v-if="editing && field !== 'birth'"
          v-focus
          :id
          ref="el"
          class="w-full py-0"
          v-model="modelValue!"
          @change="(e: Event) => useUser().updateUser({ [field]: (e.target as HTMLInputElement).value })"
          @keydown.enter="editing = false"
        />
        <h3 v-else class="h3" @dblclick="editing = true">{{ modelValue ?? '#' }}</h3>
        <p class="text-white/20">{{ label }}</p>
      </div>
    </div>
    <!-- date pick popover -->
    <Popover v-if="field == 'birth'">
      <PopoverTrigger as-child>
        <div class="w-8 h-8 rounded-md hover:bg-white/30 flex justify-center items-center">
          <Icon name="mingcute:calendar-2-fill" size="24" />
        </div>
      </PopoverTrigger>
      <PopoverContent class="flex w-auto flex-col gap-y-2 p-2 bg-black border-none">
        <MYCalendar
          :time="modelValue"
          @update:time="
            (date: DateValue) => $emit('update:modelValue', dayjs(date.toDate(getLocalTimeZone())).format('YYYY-MM-DD'))
          "
        />
        <Button @click="() => useUser().updateUser({ [field]: modelValue })">confirm</Button>
      </PopoverContent>
    </Popover>
  </div>
</template>
