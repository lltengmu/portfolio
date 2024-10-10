import { Http } from '~/plugins/axios'

export function findOne() {
  return Http.request<State>({
    url: '/state',
  }).then((r) => r.data)
}

export function update(data: Partial<State>) {
  return Http.request<State>({
    method: 'patch',
    url: '/state',
    data,
  }).then((r) => r.data)
}
