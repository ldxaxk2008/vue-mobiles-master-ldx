/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
import {fetchGet, baseUrl} from 'config/index'

// 获取类型及工具
export function studentData(data) {
  return fetchGet(`${baseUrl}/api/user/student/`, data)
}
