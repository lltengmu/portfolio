<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { DateFormatter } from '@internationalized/date'

const df = new DateFormatter('en-US', { dateStyle: 'medium' })
const { editing, form, handleSubmit } = useSupply()
</script>

<template>
  <Card class="mt-5">
    <CardTitle>
      <div class="py-5">Add new</div>
    </CardTitle>
    <CardContent>
      <form class="flex flex-col gap-5" @submit.prevent="handleSubmit">
        <div class="capitalize">
          <Label for="email">title:</Label>
          <div>
            <Input class="w-full" v-model="form.title" />
          </div>
        </div>
        <div class="capitalize">
          <Label for="email">description:</Label>
          <div>
            <Input class="w-full" v-model="form.description" />
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
