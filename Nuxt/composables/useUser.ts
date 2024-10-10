import { updateUser as UpdateUserApi } from '~/apis/user'
import useUserStore from '~/store/useUserStore'
import { useToast } from '@/components/ui/toast/use-toast'
import dayjs from 'dayjs'

export default () => {
  const { toast } = useToast()
  /**
   * update user info
   * @param Partical<User>
   * @return User
   */
  const updateUser = useUtil().request(async (data: Partial<User>) => {
    try {
      await UpdateUserApi(data).then(() => {
        toast({
          title: 'Update Success',
          description: dayjs(new Date()).format('dddd, MMMM D, YYYY [at] h:mm A'),
        })
      })
      await useUserStore().getCurrentUser()
    } catch (error) {}
  })

  return {
    updateUser,
  }
}
