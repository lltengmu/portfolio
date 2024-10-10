import { getLocalTimeZone, type DateValue } from '@internationalized/date'
import dayjs from 'dayjs'
import { upsert, del, findAll } from '~/apis/experience'

const editing = ref(false)

const form = reactive({
  id: -1,
  start: ref<DateValue>(),
  end: ref<DateValue>(),
  company: '',
  position: '',
})

const data = ref<Experience[]>([])

export default () => {
  const load = async () => {
    data.value = await findAll()
  }

  const handleSubmit = useUtil().request(async () => {
    await upsert({
      id: form.id,
      start: dayjs(form.start!.toDate(getLocalTimeZone())).format('YYYY-MM-DD'),
      end: dayjs(form.end!.toDate(getLocalTimeZone())).format('YYYY-MM-DD'),
      company: form.company,
      position: form.position,
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
