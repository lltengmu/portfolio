import { CacheEnum } from '~/enum/CachEnum'
import { HttpStatus } from '~/enum/HttpStatus'
import { parse } from '~/helper'
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults } from 'axios'
import { ElMessage } from 'element-plus'
import useErrorStore from '~/store/useErrorStore'

const storage = useStorage()
export default class Axios {
  private instance: AxiosInstance
  constructor(config: CreateAxiosDefaults) {
    this.instance = axios.create(config)
    this.interceptors()
  }

  public async request<T, D = ResponseResult<T>>(config: AxiosRequestConfig) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.instance.request<D>(config)
        resolve(data)
      } catch (error) {
        reject(error)
      }
    }) as Promise<D>
  }

  private interceptors() {
    this.interceptorsRequest()
    this.interceptorsResponse()
  }

  private interceptorsRequest() {
    this.instance.interceptors.request.use(
      (config) => {
        const tokenStorage = storage.get(CacheEnum.TOKEN_NAME)
        if (tokenStorage) config.headers.Authorization = `Bearer ${tokenStorage.token}`
        config.headers.Accept = 'application/json'
        return config
      },
      (error) => Promise.reject(error),
    )
  }

  private interceptorsResponse() {
    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        const {
          response: { status, data },
        } = error

        switch (status) {
          case HttpStatus.UNPROCESSABLE_ENTITY:
            const errors = parse(error.response.data.errors)
            useErrorStore().setErrors(data.errors)
            break
          case HttpStatus.UNAUTHORIZED:
            ElMessage.warning('Unauthorized')
            storage.remove(CacheEnum.TOKEN_NAME)
            break
          case HttpStatus.INTERNAL_SERVER_ERROR:
            ElMessage.error('Internal server error')
            break
          default:
            return Promise.reject(error)
        }
        return Promise.reject(error)
      },
    )
  }
}
