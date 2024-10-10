<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <slot></slot>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px] bg-black border-white/30">
      <DialogHeader>
        <DialogTitle>Edit Socails</DialogTitle>
        <DialogDescription> Make changes to your socails here. Click save when you're done. </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right"> Name: </Label>
          <Input id="name" value="Pedro Duarte" class="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" class="rounded-md" type="submit"> Save changes </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
