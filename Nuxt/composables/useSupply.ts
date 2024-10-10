import { del, findAll, upsert } from '~/apis/supply'

const editing = ref(false)

const form = reactive({
  id: -1,
  title: '',
  description: '',
})

const data = ref<Supply[]>([])

export default () => {
  const load = async () => {
    data.value = await findAll()
  }

  const handleSubmit = useUtil().request(async () => {
    await upsert(form)
    Object.assign(form, {
      id: -1,
      title: '',
      description: '',
    })
    editing.value = false
  })

  const remove = async (id: number) => {
    await del(id)
    await load()
  }

  return {
    data,
    editing,
    form,
    handleSubmit,
    load,
    remove,
  }
}
