import { CacheEnum } from '~/enum/CachEnum'
import { RouteEnum } from '~/enum/RouteEnum'

export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.server) return
  if (!useStorage().get(CacheEnum.TOKEN_NAME) && !to.fullPath.includes(RouteEnum.LOGIN)) {
    return navigateTo(RouteEnum.LOGIN)
  }
})
