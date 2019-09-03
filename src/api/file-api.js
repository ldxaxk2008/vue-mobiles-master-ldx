/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
import {formPost, baseUrl, fetchGet} from 'config/index'
// 登录接口
export function fileUp(params) {
  return formPost(`${baseUrl}/api/task/attachment/?task_id=` + params.task_id + '&attach_type=' + params.attach_type, params.data)
}

// 下载
export function fileDown(data) {
  return fetchGet(`${baseUrl}/api/task/attachment/download/`, data)
}
