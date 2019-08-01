/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
import {fetchGet, baseUrl} from 'config/index'
// 登录接口
export function taskList(params) {
  return fetchGet(`${baseUrl}/api/task/resource/type/`, params)
}
