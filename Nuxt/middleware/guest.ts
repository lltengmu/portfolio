import { CacheEnum } from '~/enum/CachEnum'
import { RouteEnum } from '~/enum/RouteEnum'

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.server) return
  if (useStorage().get(CacheEnum.TOKEN_NAME) && to.fullPath.includes('auth')) {
    return await navigateTo(RouteEnum.BACKENDHMOE)
  }
})
