/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
import {fetchPost, baseUrl} from 'config/index'

// 提交评价
export function subevaluate(data) {
  return fetchPost(`${baseUrl}/api/task/evaluate/user/`, data)
}
