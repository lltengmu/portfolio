<script setup lang="ts"></script>

<template>
  <header class="py-8 xl:py-12 text-white">
    <div class="container mx-auto flex justify-between items-center">
      <div class="flex items-center gap-2" target="_blank">
        <Icon name="mingcute:version-fill" size="36" class="text-accent" />
        <h1 class="h3">Vibe</h1>
      </div>
      <!-- desktop nav & hire me button -->
      <div class="hidden xl:flex items-center gap-8">
        <Nav />
        <NuxtLink to="/auth/login">
          <Button>
            <Icon v-if="useAuth().isAuthenticated()" name="mingcute:home-2-fill" size="22" />
            <span v-else>SignIn</span>
          </Button>
        </NuxtLink>
      </div>
      <!-- mobile nav  -->
      <div class="xl:hidden">
        <MobileNav />
      </div>
    </div>
  </header>
</template>
