<script setup lang="ts">
const { registerForm, register } = useAuth()
</script>

<template>
  <form
    class="xl:w-[475px] xl:h-4/5 px-1 xl:py-5 flex flex-col justify-between rounded-xl text-white"
    @submit.prevent="register"
  >
    <div>
      <header>
        <h1 class="xl:h2 text-3xl">Create an acount</h1>
        <p class="text-white/40 mt-10">Build you Personal website with EPWeb.</p>
        <p class="text-white/40">
          Already have a account!
          <NuxtLink to="./login" class="underline decoration-solid decoration-accent text-accent">Log in</NuxtLink>.
        </p>
      </header>
      <main class="grid grid-rows-2 grid-cols-1 gap-8 py-10">
        <div>
          <Input
            v-clearError="'email'"
            class="w-full"
            v-model="registerForm.email"
            type="text"
            name="email"
            placeholder="Email"
          />
          <ShowError name="email" />
        </div>
        <div>
          <Input
            v-clearError="'password'"
            class="w-full"
            v-model="registerForm.password"
            type="password"
            name="password"
            placeholder="Enter You Password"
          />
          <ShowError name="password" />
        </div>
        <div>
          <Input
            v-clearError="'password_confirmation'"
            class="w-full"
            v-model="registerForm.password_confirmation"
            type="password" 
            name="password_confirmation"
            placeholder="Confirm You Password"
          />
          <ShowError name="password_confirmation" />
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
        <Button class="mt-5">register</Button>
      </main>
    </div>
    <footer class="">
      <div class="h-[1px] bg-accent/50 relative">
        <span class="absolute left-[50%] translate-x-[-50%] translate-y-[-50%] bg-primary p-2 text-[12px] text-nowrap"
          >or regiter with</span
        >
      </div>
      <div class="flex justify-center items-center cursor-pointer mt-10">
        <a
          class="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
        >
          <Icon name="simple-icons:github" />
        </a>
      </div>
    </footer>
  </form>
</template>
