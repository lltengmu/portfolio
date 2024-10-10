import useUserStore from '../store/useUserStore'

export default async () => {
  await Promise.all([useUserStore().getCurrentUser()])
}
