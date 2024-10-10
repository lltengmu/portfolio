import { defineStore } from 'pinia'

export default defineStore('frontend', {
  state: () => {
    return {
      uuid: '',
    }
  },

  getters: {
    navs(state) {
      return [
        {
          name: 'home',
          path: `/portfolio/home/${state.uuid}`,
        },
        {
          name: 'services',
          path: `/portfolio/services/${state.uuid}`,
        },
        {
          name: 'resume',
          path: `/portfolio/resume/${state.uuid}`,
        },
        {
          name: 'work',
          path: `/portfolio/work/${state.uuid}`,
        },
      ]
    },
  },
})
