/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
import {fetchPost, baseUrl} from 'config/index'
// 登录接口
export function login(data) {
  return fetchPost(`${baseUrl}/api/user/login/`, data)
}
