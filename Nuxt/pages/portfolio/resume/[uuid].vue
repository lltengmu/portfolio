<script setup lang="ts">
import dayjs from 'dayjs'
import { findUser, findUserEducation, findUserExperience, findUserState } from '~/apis/frontend'
import { skills } from '~/data/resume'
const uuid = useRoute().params.uuid as string
const experiences = await findUserExperience(uuid)
const educations = await findUserEducation(uuid)
const user = await findUser(uuid)
const states = await findUserState(uuid)

const about = [
  {
    fieldName: 'Name',
    fieldValue: user.name,
  },
  {
    fieldName: 'Phone',
    fieldValue: user.phone ?? '#',
  },
  {
    fieldName: 'Experience',
    fieldValue: states.Years_of_experience + ' +',
  },
  {
    fieldName: 'Skipe',
    fieldValue: 'Luke.01',
  },
  {
    fieldName: 'Nationality',
    fieldValue: 'China',
  },
  {
    fieldName: 'Email',
    fieldValue: user.email,
  },
]
</script>

<template>
  <div>
    <StairTransition />
    <div class="min-h-[80vh] flex justify-center items-center py-12 xl:py-0">
      <div class="container mx-auto">
        <Tabs defaultValue="experiences" class="flex flex-col xl:flex-row gap-[60px]">
          <TabsList class="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6">
            <TabsTrigger value="experiences">Experience</TabsTrigger>
            <TabsTrigger value="educations">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="about">About me</TabsTrigger>
          </TabsList>
          <!-- content -->
          <div class="min-h-[70vh] w-full">
            <TabsContent value="experiences" className="w-full">
              <div class="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 class="text-4xl font-bold">My Experience</h3>
                <p class="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. aliquid porro.
                </p>
                <ScrollArea class="h-[400px]">
                  <ul class="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    <li
                      v-for="(item, i) in experiences"
                      :key="i"
                      class="bg-[#232329] h-[184px] py-6 px-6 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                    >
                      <span class="text-accent"
                        >{{ dayjs(item.start).format('YYYY-MM') }} - {{ dayjs(item.end).format('YYYY-MM') }}</span
                      >
                      <h3 class="text-lg max-w-[260px] min-h-[60px] text-center lg:text-left">{{ item.position }}</h3>
                      <div class="flex items-center gap-3">
                        <span class="w-[6px] h-[6px] rounded-full bg-accent"></span>
                        <p class="text-sm">{{ item.company }}</p>
                      </div>
                    </li>
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>
            <TabsContent value="educations" class="w-full">
              <div class="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 class="text-4xl font-bold">My Education</h3>
                <p class="max-w-[600px] text-white/60 mx-auto xl:mx-0">My Education</p>
                <ScrollArea class="h-[400px]">
                  <ul class="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    <li
                      v-for="(item, i) in educations"
                      :key="i"
                      class="bg-[#232329] h-[184px] p-6 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                    >
                      <span class="text-accent"
                        >{{ dayjs(item.start).format('YYYY-MM') }} - {{ dayjs(item.end).format('YYYY-MM') }}</span
                      >
                      <h3 class="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">{{ item.degree }}</h3>
                      <div class="flex items-center gap-3">
                        <span class="w-[6px] h-[6px] rounded-full bg-accent"></span>
                        <p class="text-sm">{{ item.institution }}</p>
                      </div>
                    </li>
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>
            <TabsContent value="skills" class="w-full h-full">
              <div class="flex flex-col gap-[30px] text-center xl:text-left">
                <div>
                  <h3 class="text-4xl font-bold">{{ skills.title }}</h3>
                  <p class="max-w-[600px] text-white/60 mx-auto xl:mx-0">{{ skills.description }}</p>
                </div>
                <ul class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 xl:gap-[30px]">
                  <li v-for="(skill, i) in skills.skilllist" :key="i">
                    <TooltipProvider :delayDuration="100">
                      <Tooltip>
                        <TooltipTrigger
                          class="w-full h-[150px] bg-[#232329] rounded-xl flex justify-center items-center group"
                        >
                          <div class="text-6xl group-hover:text-accent transition-all duration-300">
                            <Icon :name="skill.icon" class="text-white" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{{ skill.name }}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="about" class="w-full text-center xl:text-left">
              <div class="flex flex-col gap-[30px]">
                <h3 class="text-4xl font-bold">About me</h3>
                <p class="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. aliquid porro.
                </p>
                <ul class="grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-[620px]">
                  <li
                    v-for="(item, i) in about"
                    :key="i"
                    class="flex justify-center items-center xl:justify-start gap-4"
                  >
                    <span class="text-white/60">{{ item.fieldName }}</span>
                    <span class="text-xl">{{ item.fieldValue }}</span>
                  </li>
                </ul>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  </div>
</template>
