import { Http } from '~/plugins/axios'

/**
 * find all.
 * @returns Experience[]
 */
export const findAll = () => {
  return Http.request<Experience[]>({
    url: '/experience',
  }).then((r) => r.data)
}

/**
 * create or update
 * @param data
 * @returns Experience
 */
export const upsert = (data: Partial<Experience>) => {
  return Http.request<Experience>({
    url: '/experience',
    method: 'post',
    data,
  })
}

/**
 * delete One
 * @param id
 * @returns Experience
 */
export const del = (id: number) => {
  return Http.request<Experience>({
    url: `/experience/${id}`,
    method: 'delete',
  })
}
