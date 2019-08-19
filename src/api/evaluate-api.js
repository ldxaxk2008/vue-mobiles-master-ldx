/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
import {fetchPost, baseUrl} from 'config/index'

// 公司评价学生
export function userEvaluate(data) {
  return fetchPost(`${baseUrl}/api/task/evaluate/user/`, data)
}
// 学生评价公司
export function companyEvaluate(data) {
  return fetchPost(`${baseUrl}/api/task/evaluate/company/`, data)
}
