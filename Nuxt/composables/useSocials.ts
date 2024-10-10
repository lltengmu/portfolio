import { findOne, update } from '~/apis/socials'

type States = { icon: string; name: 'github' | 'document' | 'bilibili' | 'tiktok'; link: string }

export default () => {
  const open = ref(false)
  const socails = ref<States[]>([
    {
      icon: 'simple-icons:github',
      name: 'github',
      link: '#',
    },
    {
      icon: 'mingcute:document-2-fill',
      name: 'document',
      link: '#',
    },
    {
      icon: 'mingcute:tv-2-line',
      name: 'bilibili',
      link: '#',
    },
    {
      icon: 'mingcute:tiktok-fill',
      name: 'tiktok',
      link: '#',
    },
  ])

  const parse = (data: Socials) => {
    socails.value.forEach((item) => {
      item.link = data[item.name]! ?? '#'
    })
  }

  const load = async () => {
    try {
      await findOne().then((r) => parse(r))
    } catch (error) {}
  }

  const handleUpdate = useUtil().request(async () => {
    const form = socails.value.reduce((prev, cur) => Object.assign(prev, { [cur.name]: cur.link }), {})
    await update(form).then((r) => parse(r))
    open.value = false
  })

  return {
    open,
    load,
    socails,
    handleUpdate,
  }
}
