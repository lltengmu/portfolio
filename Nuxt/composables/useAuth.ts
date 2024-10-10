import { CacheEnum } from '~/enum/CachEnum'
import { login as loginApi,register as registerApi } from '~/apis/auth'

export default () => {
  const form = reactive({ email: '', password: '' })
  const registerForm = reactive({ email:'',password:'',password_confirmation:'' })
  /**
   * 根据本地存储是否具有token,判断用户是否已认证
   * 如果是失效的token,会被自动清除
   * @returns boolean
   */
  const isAuthenticated = () => {
    return useStorage().get(CacheEnum.TOKEN_NAME)
  }

  /**
   * 登陆
   * @returns token
   */
  const login = useUtil().request(async () => {
    try {
      const { access_token } = await loginApi(form)
      useStorage().set(CacheEnum.TOKEN_NAME, { token: access_token })
      navigateTo(CacheEnum.DASHBOARD)
    } catch (error) {}
  })

  /**
   * 注册
   * @returns token
   */
  const register = useUtil().request(async () => {
    console.log(registerForm);
    try {
      const { access_token } = await registerApi(registerForm)
      useStorage().set(CacheEnum.TOKEN_NAME, { token: access_token })
      navigateTo(CacheEnum.DASHBOARD)
    } catch (error) {}
  })

  return {
    form,
    registerForm,
    register,
    isAuthenticated,
    login,
  }
}
