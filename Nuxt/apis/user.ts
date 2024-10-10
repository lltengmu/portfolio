import { RouteEnum } from '~/enum/RouteEnum'
import { Http } from '~/plugins/axios'

export const currentUserinfo = async () => {
  return await Http.request<User>({ url: RouteEnum.CURRENT_USER }).then((r) => r.data)
}

export const updateUser = async (data: Partial<User>) => {
  return await Http.request<User>({
    method: 'patch',
    url: '/user',
    data,
  }).then((r) => r.data)
}

export const uploadAvatar = (data: FormData) => {
  return Http.request<User>({
    url: '/user/avatar',
    method: 'post',
    data,
  }).then((r) => r.data)
}

export const uploadResume = (data: FormData) => {
  return Http.request<Resume>({
    url: '/user/resume',
    method: 'post',
    data,
  }).then((r) => r.data)
}

export const findAllResume = () => {
  return Http.request<Resume[]>({
    url: '/user/resume',
  }).then((r) => r.data)
}
