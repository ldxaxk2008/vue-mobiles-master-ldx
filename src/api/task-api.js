/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
import {fetchGet, fetchPost, baseUrl} from 'config/index'

// 获取类型及工具
export function gettype(data) {
  return fetchGet(`${baseUrl}/api/task/resource/type/`, data)
}
// 发布任务
export function publishtask(data) {
  return fetchPost(`${baseUrl}/api/task/task/`, data)
}
// 获取taskuser未调取
export function getacceptuserlist(data) {
  return fetchGet(`${baseUrl}/api/task/user/`, data)
}
