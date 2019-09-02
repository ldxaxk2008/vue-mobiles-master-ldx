/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
import {fetchGet, fetchPost, fetchPetch, baseUrl} from 'config/index'

// 获取类型及工具
export function gettype(data) {
  return fetchGet(`${baseUrl}/api/task/resource/type/`, data)
}
// 发布任务
export function publishtask(data) {
  return fetchPost(`${baseUrl}/api/task/task/`, data)
}
// 编辑任务
export function edittask(params, data) {
  return fetchPetch(`${baseUrl}/api/task/task/` + params + `/`, data)
}
// 取消发布
export function canceltask(data) {
  return fetchPost(`${baseUrl}/api/task/cancel_task/`, data)
}
// 获取taskuser未调取
export function getacceptuserlist(data) {
  return fetchGet(`${baseUrl}/api/task/user/`, data)
}
// 公司选择学生
export function selectstudents(data) {
  return fetchGet(`${baseUrl}/api/task/select/user/`, data)
}
export function getPortfolio(data) {
  return fetchGet(`${baseUrl}/api/task/attachment/download/`, data)
}
