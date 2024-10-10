import { Http } from '~/plugins/axios'

export function login(data: Record<'email' | 'password', string>) {
  return Http.request<{ access_token: string }>({
    method: 'post',
    url: '/auth/login',
    data,
  }).then((j) => j.data)
}

export type Register = Record<string, string>

export function register(data: Register) {
  return Http.request<{ access_token: string }>({
    method: 'post',
    url: '/auth/register',
    data,
  }).then((r) => r.data)
}
