import useErrorStore from '~/store/useErrorStore'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('clearError', {
    mounted(el: HTMLInputElement, binding: any) {
      el.addEventListener('focus', () => {
        useErrorStore().clearError(binding.value)
      })
    },
  })
})
