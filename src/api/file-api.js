/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
import {formPost, baseUrl} from 'config/index'
// 登录接口
export function fileUp(params) {
  return formPost(`${baseUrl}/api/task/attachment/`, params)
}
