import { currentUserinfo } from '~/apis/user'
import { defineStore } from 'pinia'

export default defineStore('user', {
  state: () => {
    return {
      user: undefined as User | undefined,
      state: undefined as State | undefined
    }
  },
  actions: {
    async getCurrentUser() {
      if (useAuth().isAuthenticated()) {
        this.user = await currentUserinfo()
      }
    },
    async getCurrentUserState() {
      if (useAuth().isAuthenticated()) {
        this.user = await currentUserinfo()
      }
    },
  },
})
