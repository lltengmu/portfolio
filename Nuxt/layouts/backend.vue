<script setup lang="ts"></script>

<template>
  <div>
    <div class="h-[100vh] w-[100vw] fixed z-[-1]">
      <div class="absolute w-full h-full bg-transparent pointer-events-none backdrop-blur-[10rem]"></div>
      <NuxtImg src="/asset/bg-filter.png" class="w-full h-full object-cover" />
    </div>
    <div class="h-[100vh] mx-auto xl:w-[1800px] grid-rows-[1fr_9fr] grid-cols-1">
      <BackendNav />
      <div class="grid grid-cols-1 lg:grid-rows-1 lg:grid-cols-[6fr_1fr] gap-4 p-5">
        <div class="h-full">
          <slot />
        </div>
        <div>
          <UserCarlendar />
          <UserSocials class="mt-10" />
          <UserStates class="mt-10" />
        </div>
      </div>
    </div>
  </div>
</template>
