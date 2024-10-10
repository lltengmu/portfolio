import { Http } from '~/plugins/axios'

export function findOne() {
  return Http.request<Socials>({
    url: '/socials',
  }).then((r) => r.data)
}

export function update(data: Partial<Socials>) {
  return Http.request<Socials>({
    method: 'patch',
    url: '/socials',
    data,
  }).then((r) => r.data)
}
