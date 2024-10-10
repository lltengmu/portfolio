<script setup lang="ts"></script>

<template>
  <div class="rounded-md shadow-2xl p-5 grid grid-rows-1 grid-cols-[9fr_1fr] gap-5">
    <div class="flex gap-5">
      <div class="w-20 h-20 rounded-full overflow-hidden shadow-lg">
        <NuxtImg src="/asset/avatar.png" class="wfull h-full object-cover" />
      </div>
      <div>
        <h2 class="h2">Jerxasx</h2>
        <p>full stack develop</p>
      </div>
    </div>
    <div class="flex flex-col items-center justify-start gap-4">
      <div class="bg-accent/20 w-full rounded-md flex items-center gap-2 p-2">
        <Icon name="mingcute:home-2-fill" size="20" class="text-white" />
        <span class="text-sm">OverView</span>
      </div>
      <div class="bg-accent/20 w-full rounded-md flex items-center gap-2 p-2">
        <Icon name="mingcute:notebook-2-line" size="20" class="text-white" />
        <span class="text-sm">Notes</span>
      </div>
    </div>
  </div>
</template>
