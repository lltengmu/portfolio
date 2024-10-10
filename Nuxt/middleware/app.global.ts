import config from '~/config'

let isInit = false

//初始应用
async function init() {
  if (isInit === true) return
  isInit = true
  await Promise.all(config.middleware.map((middleware) => middleware()))
}

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.server) return
  if (useAuth().isAuthenticated()) {
    await init()
  }
})
