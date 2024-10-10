<script setup lang="ts">
import { findUserProject } from '~/apis/frontend'
import type { CarouselApi } from '~/components/ui/carousel'

const uuid = useRoute().params.uuid as string
const projects = await findUserProject(uuid).then((data) => data.map((item, i) => Object.assign(item, { num: i + 1 })))

const api = ref<CarouselApi>()
const current = ref(0)

function setApi(val: CarouselApi) {
  api.value = val
}

watchOnce(api, (api) => {
  if (!api) return
  current.value = api.selectedScrollSnap() + 1

  api.on('select', () => {
    current.value = api.selectedScrollSnap() + 1
  })
})

const project = computed(() => {
  let index = current.value - 1
  if (index < 0) index = 0
  if (index >= projects.length) index = projects.length
  return projects[index]
})
</script>

<template>
  <div>
    <StairTransition />
    <section class="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0" v-if="projects.length">
      <div class="container mx-auto">
        <div class="flex flex-col xl:flex-row lg:gap-[100px]">
          <div class="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none">
            <div class="flex flex-col gap-[30px] h-[50%]">
              <!-- outline num -->
              <div class="text-8xl leading-none font-extrabold text-transparent text-outline">
                {{ project.num < 10 ? `0${project.num}` : project.num }}
              </div>
              <h2
                class="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize"
              >
                {{ project.title }}
              </h2>
              <!-- project description -->
              <p class="text-white/60">{{ project.description }}</p>
              <!-- stach -->
              <ul class="flex gap-4">
                <li v-for="(item, i) in project.stack" :key="i" class="text-xl text-accent">
                  {{ item }}
                  <span v-if="i !== project.stack.length - 1">,</span>
                </li>
              </ul>
              <!-- border -->
              <div class="border border-white/20"></div>
              <!-- buttons -->
              <div class="flex items-center gap-4">
                <!-- live project button -->
                <NuxtLink :to="project.live!">
                  <TooltipProvider :delayDuration="100">
                    <Tooltip>
                      <TooltipTrigger
                        class="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group"
                      >
                        <Icon
                          name="fluent-mdl2:arrow-tall-up-right"
                          class="text-white text-3xl group-hover:text-accent"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Live project</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </NuxtLink>
                <!-- github project button -->
                <NuxtLink :to="project.github!">
                  <TooltipProvider :delayDuration="100">
                    <Tooltip>
                      <TooltipTrigger
                        class="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group"
                      >
                        <Icon name="simple-icons:github" class="text-white text-3xl group-hover:text-accent" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Github repository</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </NuxtLink>
              </div>
            </div>
          </div>
          <div class="w-full xl:w-[50%]">
            <Carousel v-slot="{ canScrollNext }" class="xl:h-[520px] mb-12" @init-api="setApi">
              <CarouselContent>
                <CarouselItem v-for="(item, index) in projects" :key="index" class="w-full">
                  <Card>
                    <CardContent class="h-[460px] relative group flex justify-center items-center bg-pink-50/20">
                      <div class="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10"></div>
                      <div class="absolute w-full h-full">
                        <NuxtImg :src="item.image" class="w-full h-full object-cover" alt="" />
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext v-if="canScrollNext" />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
