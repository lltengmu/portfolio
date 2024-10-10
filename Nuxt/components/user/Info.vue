<script setup lang="ts">
import type { UploadInstance, UploadRequestOptions } from 'element-plus'
import useUserStore from '~/store/useUserStore'
import { Card } from '../ui/card'
import InfoItem from './InfoItem.vue'
import dayjs from 'dayjs'
import { uploadAvatar } from '~/apis/user'
const { user } = useUserStore()
const uploadEl = ref<UploadInstance>()
/**
 * 上传图片之后呈现图片预览
 * @param file
 */
function preview(file: UploadRequestOptions['file'], callback: (file: any) => Promise<void>) {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = (e) => {
    const url = e.target?.result
    Object.assign(user!, { avatar: url, file })
    callback(file)
  }
}

const upload = async (file: any) => {
  const form = new FormData()
  form.append('file', file)
  const refreshUser = await uploadAvatar(form)
  Object.assign(user!, refreshUser)
}

const request = async (options: UploadRequestOptions) => {
  preview(options.file, upload)
}
</script>

<template>
  <main class="grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-10">
    <div>
      <Card class="mt-5">
        <CardTitle class="flex justify-between items-center">
          <div class="py-5">Avatar</div>
        </CardTitle>
        <CardContent class="flex flex-col justify-center items-center gap-5">
          <div class="flex flex-col gap-5">
            <el-upload ref="uploadEl" action="" :show-file-list="false" :http-request="request">
              <div class="w-[6rem] h-[6rem] rounded-3xl overflow-hidden shadow-lg relative group">
                <NuxtImg :src="user?.avatar" class="absolute w-full h-full object-cover" />
                <div class="hidden group-hover:block">
                  <div class="absolute w-full h-full flex justify-center items-center bg-black/30">
                    <Icon name="mingcute:pencil-3-line" size="30" class="text-white" />
                  </div>
                </div>
              </div>
            </el-upload>
          </div>
          <section>
            <div class="text-white/50 text-sm flex items-center gap-2">
              <Icon name="mingcute:calendar-2-line" size="18" />
              <span>{{ dayjs(user?.createdAt).format('ddd,DD,YYYY hh:mm A') }}</span>
            </div>
          </section>
        </CardContent>
      </Card>
      <UserResume class="mt-5" />
    </div>
    <Card class="mt-5">
      <CardTitle class="flex justify-between items-center">
        <div class="py-5 text-[1rem] lg:text-base">All Personal Infomation</div>
      </CardTitle>
      <CardContent>
        <section class="grid grid-cols-1 lg:grid-rows-2 lg:grid-cols-2 gap-10">
          <InfoItem icon-name="mingcute:user-4-fill" v-model="user!.name" v-bind="{ field: 'name', label: 'name' }" />
          <InfoItem
            icon-name="mingcute:mail-send-fill"
            v-model="user!.email"
            v-bind="{ field: 'email', label: 'Email' }"
          />
          <InfoItem
            icon-name="mingcute:birthday-2-fill"
            v-model="user!.birth"
            v-bind="{ field: 'birth', label: '18 Year old' }"
          />
          <InfoItem
            icon-name="mingcute:cellphone-line"
            v-model="user!.phone"
            v-bind="{ field: 'phone', label: 'Turkey Number' }"
          />
        </section>
        <div class="h-[1px] bg-white/20 my-5"></div>
        <div class="grid grid-row-2 grid-cols-1 gap-4">
          <InfoItem
            icon-name="mingcute:map-pin-fill"
            v-model="user!.address"
            v-bind="{ field: 'address', label: 'Address' }"
          />
        </div>
      </CardContent>
    </Card>
  </main>
</template>
