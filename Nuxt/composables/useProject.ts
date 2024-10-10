import { upsert, findAll, findOne, remove } from '~/apis/project'
import { HttpStatus } from '~/enum/HttpStatus'

const projects = ref<Project[]>([])

const inital = {
  nanoid: useRoute().params.id as string,
  title: '',
  stack: [] as string[],
  github: '',
  live: '',
  description: '',
}

const form = reactive<Record<string, any>>({ ...inital })

export default () => {
  const load = async () => {
    projects.value = await findAll()
  }

  const handleSubmit = async () => {
    const formData = new FormData()
    for (const key in form) {
      if (key == 'stack') {
        let value = (form[key] as string[]).join(',')
        formData.append(key, value)
        continue
      }
      formData.append(key, form[key])
    }
    const { code } = await upsert(formData)
    if (code == HttpStatus.OK) {
      navigateTo('/backend/project')
    }
  }

  const loadFindOne = async (nanoid: string) => {
    const data = await findOne(nanoid)
    const preset = Object.assign({ ...inital, nanoid }, data)
    Object.assign(form, preset)
    return data
  }

  const del = useUtil().request(async (nanoid) => {
    await remove(nanoid)
    await load()
  })

  return {
    load,
    projects,
    form,
    handleSubmit,
    loadFindOne,
    del,
  }
}
