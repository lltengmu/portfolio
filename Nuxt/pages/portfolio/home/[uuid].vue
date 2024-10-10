<script setup lang="ts">
import { findUser, findUserResume } from '~/apis/frontend'

const uuid = useRoute().params.uuid as string
const user = await findUser(uuid)
const resume = await findUserResume(uuid)
</script>

<template>
  <div>
    <StairTransition />
    <section class="h-full">
      <div class="container mx-auto h-full">
        <div class="flex flex-col xl:flex-row justify-between items-center xl:pt-8 xl:pb-24">
          <!-- text -->
          <div class="text-center xl:text-left order-2 xl:order-none">
            <span class="text-xl">Soltware Develop</span>
            <h1 class="h1 mb-6">
              Hello I'm <br />
              <span class="text-accent">{{ user.name }}</span>
            </h1>
            <p class="max-w-[500px] mb-9 text-white/80">
              I excel at crafting elgant digital experiences and I am proficient in various programming languages and
              technologies.
            </p>
            <!-- btn & social -->
            <div class="flex flex-col xl:flex-row items-center gap-8">
              <NuxtLink :href="resume.path" download target="_blank">
                <Button variant="outline" size="lg" class="uppercase flex items-center gap-3">
                  <span>download CV</span>
                  <Icon name="typcn:download" size="20" />
                </Button>
              </NuxtLink>
              <div className="mb-8 xl:mb-0">
                <Socials
                  iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
                />
              </div>
            </div>
          </div>
          <div class="order-1 mb-8 xl:order-none xl:mb-0">
            <Photo :img="user.avatar" />
          </div>
        </div>
      </div>
      <Stats />
    </section>
  </div>
</template>
