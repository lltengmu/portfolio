import { Http } from '~/plugins/axios'

/**
 * find all.
 * @returns Education
 */
export const findAll = () => {
  return Http.request<Education[]>({
    url: '/education',
  }).then((r) => r.data)
}

/**
 * create or update
 * @param data
 * @returns Education
 */
export const upsert = (data: Partial<Education>) => {
  return Http.request<Education>({
    url: '/education',
    method: 'post',
    data,
  })
}

/**
 * delete One
 * @param id
 * @returns Education
 */
export const del = (id: number) => {
  return Http.request<any>({
    url: `/education/${id}`,
    method: 'delete',
  })
}
