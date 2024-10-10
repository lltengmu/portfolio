<script setup lang="ts">
const { form, login } = useAuth()
</script>

<template>
  <form
    class="xl:w-[475px] xl:h-4/5 flex flex-col justify-between px-1 xl:py-5 rounded-xl text-white"
    @submit.prevent="login"
  >
    <div>
      <header>
        <h1 class="xl:h2 text-3xl">Manage Acount</h1>
        <p class="text-white/40 mt-10">Build you Personal website with EPWeb.</p>
        <p class="text-white/40">
          No account yet?
          <NuxtLink to="./register" class="underline decoration-solid decoration-accent text-accent">Sign Up</NuxtLink>.
        </p>
      </header>
      <main class="grid grid-rows-2 grid-cols-1 gap-8 py-10">
        <div>
          <Input
            v-clearError="'email'"
            v-model="form.email"
            type="text"
            name="email"
            class="w-full"
            placeholder="Email"
          />
          <ShowError name="email" />
        </div>
        <div>
          <Input
            v-clearError="'password'"
            v-model="form.password"
            type="password"
            name="password"
            class="w-full"
            placeholder="Enter You Password"
          />
          <ShowError name="password" />
        </div>
        <!-- <div class="flex items-center space-x-2">
          <Checkbox id="remenber" />
          <label
            for="remenber"
            class="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            remenber me.
          </label>
        </div> -->
        <Button type="submit" class="mt-5">login</Button>
      </main>
    </div>
    <footer>
      <div class="h-[1px] bg-accent/50 relative">
        <span class="absolute left-[50%] translate-x-[-50%] translate-y-[-50%] bg-primary p-2 text-[12px] text-nowrap"
          >or regiter with</span
        >
      </div>
      <div class="flex justify-center items-center cursor-pointer mt-10">
        <NuxtLink
          class="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
        >
          <Icon name="simple-icons:github" />
        </NuxtLink>
      </div>
    </footer>
  </form>
</template>
