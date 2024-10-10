<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { DateFormatter, getLocalTimeZone } from '@internationalized/date'
import { Calendar as CalendarIcon } from 'lucide-vue-next'

const df = new DateFormatter('en-US', { dateStyle: 'medium' })
const { editing, form, handleSubmit } = useEducations()
</script>

<template>
  <Card v-if="editing" class="mt-5">
    <CardTitle>
      <div class="py-5">Add new</div>
    </CardTitle>
    <CardContent>
      <form class="flex flex-col gap-5" @submit.prevent="handleSubmit">
        <div class="capitalize flex items-center gap-5">
          <Label for="email">duration:</Label>
          <div>
            <Popover>
              <PopoverTrigger as-child>
                <Button
                  variant="outline"
                  :class="
                    cn(
                      'w-[280px] justify-start text-left font-normal rounded-lg',
                      !form.start && 'text-muted-foreground',
                    )
                  "
                >
                  <CalendarIcon class="mr-2 h-4 w-4" />
                  {{ form.start ? df.format(form.start.toDate(getLocalTimeZone())) : 'Pick a date' }}
                </Button>
              </PopoverTrigger>
              <PopoverContent class="w-auto p-0">
                <Calendar v-model="form.start" initial-focus />
              </PopoverContent>
            </Popover>
            -
            <Popover>
              <PopoverTrigger as-child>
                <Button
                  variant="outline"
                  :class="
                    cn('w-[280px] justify-start text-left font-normal rounded-lg', !form.end && 'text-muted-foreground')
                  "
                >
                  <CalendarIcon class="mr-2 h-4 w-4" />
                  {{ form.end ? df.format(form.end.toDate(getLocalTimeZone())) : 'Pick a date' }}
                </Button>
              </PopoverTrigger>
              <PopoverContent class="w-auto p-0">
                <Calendar v-model="form.end" initial-focus />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div class="capitalize">
          <Label for="email">institution:</Label>
          <div>
            <Input class="w-full" v-model="form.institution" />
          </div>
        </div>
        <div class="capitalize">
          <Label for="email">degree:</Label>
          <div>
            <Input class="w-full" v-model="form.degree" />
          </div>
        </div>
        <div>
          <Button variant="outline" class="rounded-lg float-right" type="submit">save</Button>
          <Button variant="outline" class="rounded-lg float-right mr-2" @click="editing = false">cancel</Button>
        </div>
      </form>
    </CardContent>
  </Card>
</template>
