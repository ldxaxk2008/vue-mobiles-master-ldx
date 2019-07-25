/**
 * login.js
 * 用于login模块的状态管理
 */
import * as types from '../mutation-type' // 引入定义的方法
const login = {
  state: {
    token: ''
  },
  mutations: {
    [types.SET_TOKEN](state, token) {
      state.token = token
      sessionStorage.setItem('token', token)
    },
    [types.DEL_TOKEN](state) {
      state.token = ''
      sessionStorage.removeItem('token')
    }
  },
  actions: {},
  getters: { // 定义getters，可以通过mapGetters拓展函数调用

  }
}
export default login // 输出login模块
