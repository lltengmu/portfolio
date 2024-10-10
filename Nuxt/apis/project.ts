import { Http } from '~/plugins/axios'

export function findAll() {
  return Http.request<Project[]>({
    url: '/project',
  }).then((r) => r.data)
}

export function upsert(data: FormData) {
  return Http.request<Project>({
    url: '/project',
    method: 'post',
    data,
  })
}

export function findOne(nanoid: string) {
  return Http.request<Project>({
    url: `/project/${nanoid}`,
  }).then((r) => r.data)
}

export function remove(nanoid: string) {
  return Http.request<Project>({
    url: `/project/${nanoid}`,
    method: 'delete',
  })
}

export const uploadImage = (id: number, data: FormData) => {
  return Http.request<Project>({
    url: `/project/upload/${id}`,
    method: 'post',
    data,
  }).then((r) => r.data)
}
