<script setup lang="ts">
import { Icon } from '#components'
const { open,socails, load, handleUpdate } = useSocials()
await load()

</script>

<template>
  <Card>
    <CardTitle class="flex justify-between items-center">
      <div>Socials</div>
      <span class="rounded-md p-1 flex justify-center items-center hover:bg-white/20 cursor-pointer">
        <Dialog v-model:open="open">
          <DialogTrigger as-child>
            <Icon name="mingcute:settings-3-fill" size="24" />
          </DialogTrigger>
          <DialogContent class="sm:max-w-[425px] bg-black border-white/30">
            <DialogHeader>
              <DialogTitle>Edit Socails</DialogTitle>
              <DialogDescription> Make changes to your socails here. Click save when you're done. </DialogDescription>
            </DialogHeader>
            <div class="grid gap-4 py-1" v-for="(social, index) in socails" :key="index">
              <div class="grid grid-cols-4 items-center gap-4">
                <div class="flex justify-end gap-2 items-center">
                  <div class="iconStyle-2 rounded-md">
                    <Icon :name="social.icon" />
                  </div>
                  :
                </div>
                <Input v-clearError="social.name" id="name" v-model="social.link" class="col-span-3" />
                <ShowError class="col-span-3" :name="social.name" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" @click="handleUpdate" class="rounded-md" type="submit"> Save changes </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </span>
    </CardTitle>
    <CardContent class="mt-5 py-2">
      <div class="flex gap-6">
        <div v-for="(social, index) in socails" :key="index" class="iconStyle">
          <Icon :name="social.icon" />
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<style scoped lang="scss">
.iconStyle {
  @apply w-9 h-9 border border-accent rounded-full cursor-pointer flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500;
}
.iconStyle-2 {
  @apply w-9 h-9 border border-accent rounded-xl cursor-pointer flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500;
}
</style>
