<script setup lang="ts"></script>

<template>
  <div class="w-screen h-screen grid grid-rows-1 grid-cols-1 xl:grid-cols-2">
    <div class="hidden xl:flex justify-end items-center p-5">
      <div class="w-[475px] h-[735px] rounded-xl overflow-hidden">
        <NuxtImg src="/asset/bg-auth.jpg" alt="auth-bg.jpg" class="w-full h-full object-cover" />
      </div>
    </div>
    <div class="flex justify-start xl:items-center p-10">
      <slot />
    </div>
  </div>
</template>
