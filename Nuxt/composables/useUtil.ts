import { ElMessageBox, type UploadRequestOptions } from 'element-plus'
import { onBeforeRouteLeave, useRoute } from 'vue-router'

export default () => {
  /**
   * 限制点击频率
   * @param fn
   * @returns
   */
  function request(fn: (args?: any) => Promise<any>) {
    let isSend = false
    return (args?: any) => {
      if (isSend) return
      isSend = true
      return fn(args).finally(() => (isSend = false))
    }
  }

  /**
   * 是否为微信客户端判断
   * @returns
   */
  function isWechat() {
    var ua = navigator.userAgent.toLowerCase()
    return ua.match(/MicroMessenger/i)
  }

  /**
   * 获取路由GET参数值
   * @param name 参数名
   * @param defaultValue 当没有参数时的默认值
   * @returns
   */
  const routeQuery = (name: string, defaultValue?: any) => {
    return useRoute().query[name] || defaultValue
  }

  /**
   * 获取路由 Params 参数
   * @param name 参数名
   * @param defaultValue 当没有参数时的默认值
   * @returns
   */
  const routeParams = (name: string, defaultValue?: any) => {
    return useRoute().params[name] || defaultValue
  }

  /**
   * 离开页面确认
   * @param message 消息提示
   */
  const routeLeaveConfirm = async (message = '确定离开吗？') => {
    onBeforeRouteLeave(async () => {
      try {
        await ElMessageBox.confirm(message, '温馨提示')
        return true
      } catch {
        return false
      }
    })
  }

  /**
 * 上传图片之后呈现图片预览
 * @param file
 */
function preview(file: UploadRequestOptions['file'], callback: (file: any) => Promise<void>,target:any) {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = (e) => {
    const url = e.target?.result
    Object.assign(target, { avatar: url, file })
    callback(file)
  }
}

  return {
    routeQuery,
    request,
    isWechat,
    routeParams,
    routeLeaveConfirm,
    preview
  }
}
