import { Http } from '~/plugins/axios'

/**
 * find all.
 * @returns Education
 */
export const findAll = () => {
  return Http.request<Supply[]>({
    url: '/supply',
  }).then((r) => r.data)
}

/**
 * create or update
 * @param data
 * @returns Education
 */
export const upsert = (data: Partial<Supply>) => {
  return Http.request<Supply>({
    url: '/supply',
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
    url: `/supply/${id}`,
    method: 'delete',
  })
}
