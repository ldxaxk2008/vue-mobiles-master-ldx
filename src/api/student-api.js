/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
import {fetchGet, fetchPetch, baseUrl} from 'config/index'

// 获取类型及工具
export function studentData(data) {
  return fetchGet(`${baseUrl}/api/user/student/`, data)
}
// 编辑自己的标签，名称
export function studentinfor(params, data) {
  return fetchPetch(`${baseUrl}/api/user/student/` + params + '/', data)
}
export function getEvaluateList(data) {
  return fetchGet(`${baseUrl}//api/user/is/evaluated/`, data)
}
// 学生作品集查询
export function getPortfolio(data) {
  return fetchGet(`${baseUrl}/api/task/attachment/download`, data)
}
