/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
import {fetchGet, fetchGets, fetchPost, baseUrl} from 'config/index'
// 登录接口
export function taskList(params) {
  // return fetchGet(`${baseUrl}/api/task/resource/type/`, params)
  return fetchGet(`${baseUrl}/api/task/task/`, params)
}
export function taskDetails(params) {
  return fetchGets(`${baseUrl}/api/task/task/${params}`)
}
export function applyTask(params) {
  return fetchGet(`${baseUrl}/api/task/apply/cancel/`)
}
export function cancelTask(params) {
  return fetchPost(`${baseUrl}/api/task/apply/cancel/`)
}
