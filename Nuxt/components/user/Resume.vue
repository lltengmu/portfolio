<script setup lang="ts">
import type { UploadInstance, UploadRequestOptions } from 'element-plus'
import { findAllResume, uploadResume } from '~/apis/user'

const uploadEl = ref<UploadInstance>()
const resumes = ref<Resume[]>([])

const upload = async (file: any) => {
  const form = new FormData()
  form.append('file', file)
  await uploadResume(form).then((data) => (resumes.value = [data]))
}

const request = async (options: UploadRequestOptions) => {
  upload(options.file)
}

await findAllResume().then((data) => (resumes.value = data))
</script>

<template>
  <Card>
    <CardTitle>Resume</CardTitle>
    <CardContent class="px-4 py-6 flex flex-col gap-3 relative">
      <div class="flex flex-col items-start gap-5">
        <NuxtLink
          class="flex justify-start items-center gap-4"
          v-for="(resume, index) in resumes"
          :key="index"
          :href="resume.path"
        >
          <div class="w-14 h-14 rounded-xl bg-gray-600/10 flex justify-center items-center">
            <Icon name="mingcute:document-2-fill" size="28" />
          </div>
          <p class="text-white/70 text-sm">{{ resume.name }}</p>
        </NuxtLink>
      </div>
      <el-upload ref="uploadEl" action="" :show-file-list="false" :http-request="request" class="upload">
        <Button variant="outline" class="w-full">
          <span class="text-sm">Upload</span>
          <Icon name="mingcute:upload-2-line" size="14" class="text-white ml-2" />
        </Button>
      </el-upload>
    </CardContent>
  </Card>
</template>

<style scoped lang="scss">
.upload {
  :deep(.el-upload) {
    @apply w-full;
  }
}
</style>
