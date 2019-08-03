/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
import {fetchGet, baseUrl} from 'config/index'
// 登录接口
export function companyDetails(params) {
  // return fetchGet(`${baseUrl}/api/task/resource/type/`, params)
  return fetchGet(`${baseUrl}/api/user/info/company/`, params)
}
