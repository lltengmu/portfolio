import { findOne, update } from '~/apis/state'

type States = { key: string; value: number }

export default () => {
  const states = ref<States[]>([])

  const parse = (data: State) => {
    const helper: States[] = []
    Object.entries(data).forEach(([key, value]) => {
      if (key.includes('_')) {
        helper.push({ key, value })
      }
    })
    return helper
  }

  const load = async () => {
    try {
      states.value = await findOne().then((r) => parse(r))
    } catch (error) {}
  }

  const handleUpdate = useUtil().request(async (args) => {
    try {
      let [field, value] = args
      states.value = await update({ [field]: value }).then((r) => parse(r))
    } catch (error) {}
  })

  return {
    parse,
    load,
    states,
    handleUpdate,
  }
}
