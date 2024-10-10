import type { UploadRequestOptions } from "element-plus"

export const parse = (responseErrors: Record<string, string[]>) => {
  const errors = Object.entries(responseErrors).reduce((prev, [key, value], index, arr) => {
    prev[key] = value[0]
    return prev
  }, {} as Record<string, string>)
  return Object.values(errors)
}

export const isUuid = (uuidString:string) =>  {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuidString);
}

/**
 * 上传图片之后呈现图片预览
 * @param file
 */
export function preview(file: UploadRequestOptions['file'], callback: (file: any) => Promise<void>,target:any) {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = (e) => {
    const url = e.target?.result
    Object.assign(target, { image: url })
    callback(file)
  }
}