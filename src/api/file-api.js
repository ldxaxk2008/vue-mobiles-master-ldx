/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
import {fetchPost, baseUrl} from 'config/index'
// 登录接口
export function fileUp(params) {
  return fetchPost(`${baseUrl}/api/task/attachment/`, params)
}
