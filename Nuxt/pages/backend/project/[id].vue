<script setup lang="ts">
import type { UploadInstance, UploadRequestOptions } from 'element-plus'
import { preview } from '~/helper';

const { loadFindOne, form, handleSubmit } = useProject()
const data = ref({ ...(await loadFindOne(useRoute().params.id as string)) })
const uploadEl = ref<UploadInstance>()

const upload = async (file: any) => {
  Object.assign(form, { file })
}

const request = async (options: UploadRequestOptions) => {
  preview(options.file, upload,data.value)
}
</script>

<template>
  <div class="grid grid-cols-1 xl:grid-cols-2">
    <el-upload ref="uploadEl" action="" :show-file-list="false" :http-request="request" class="upload">
      <div
        class="relative w-full h-full border-accent/30 border-dashed border rounded-md bg-white/10 flex justify-center items-center overflow-hidden"
      >
        <NuxtImg v-if="data.image" :src="data.image" class="absolute w-full h-full object-cover" />
        <div v-else class="flex flex-col items-center gap-2">
          <Icon name="mingcute:upload-3-fill" size="40" />
          <p class="text-white/30">Upload you project image here!</p>
        </div>
      </div>
    </el-upload>
    <form class="flex flex-col gap-10 border-accent/50 py-10" @submit.prevent="handleSubmit">
      <header>
        <div class="flex items-center gap-2">
          <h1 class="h3 font-bold">Edit Your Project.</h1>
        </div>
      </header>
      <section class="flex flex-col gap-10 py-5">
        <div>
          <h3 class="">Title:</h3>
          <Input v-model="form.title" class="w-full bg-transparent" />
        </div>
        <div>
          <h3 class="">stack:</h3>
          <TagsInput v-model="form.stack">
            <TagsInputItem v-for="(item, index) in form.stack" :key="index" :value="item">
              <TagsInputItemText />
              <TagsInputItemDelete />
            </TagsInputItem>
            <TagsInputInput placeholder="Fruits..." />
          </TagsInput>
        </div>
        <section class="grid grid-cols-2 gap-5">
          <div>
            <h3>Github:</h3>
            <Input class="w-full bg-transparent" v-model="form.github" />
          </div>
          <div>
            <h3>Live:</h3>
            <Input class="w-full bg-transparent" v-model="form.live" />
          </div>
        </section>
        <div>
          <h3>Description:</h3>
          <Textarea class="w-full bg-transparent" v-model="form.description"></Textarea>
        </div>
        <Button variant="outline" class="w-[200px] mt-2 rounded-md float-right">save</Button>
      </section>
    </form>
  </div>
</template>

<style scoped lang="scss">
.upload {
  :deep(.el-upload) {
    @apply w-full h-full p-10;
  }
}
</style>
