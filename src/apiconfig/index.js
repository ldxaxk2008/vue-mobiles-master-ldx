/* eslint-disable */
import axios from 'axios'
import { Toast } from 'vant'
import Vue from 'vue'
import router from '@/router'

Vue.use(Toast);
/**
* 定义请求常量
* TIME_OUT、ERR_OK
*/
// const True = True;
export const TIME_OUT = 1000;    // 请求超时时间
export const ERR_OK = true ;      // 请求成功返回状态，字段和后台统一
export const baseUrl = process.env.BASE_URL   // 引入全局url，定义在全局变量process.env中
// 请求超时时间
axios.defaults.timeout = TIME_OUT

// 封装请求拦截
axios.interceptors.request.use(
	config => {
    let token = sessionStorage.getItem('token')   // 获取token
		config.headers['Content-Type'] = 'application/json;charset=UTF-8'
		config.headers['Authorization'] = ''
		if(token != null){                          // 如果token不为null，否则传token给后台
			config.headers['Authorization'] = `token ${token}`
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)
// 封装响应拦截，判断token是否过期
axios.interceptors.response.use(
  response => {
    let {data} = response
    if (data.code === 1008 || data.code === 1009 ) {    // 如果后台返回的错误标识为token过期，则重新登录
      Toast(data.msg)     
      sessionStorage.removeItem('token')          // token过期，移除token
      router.push('/loginpage')
      // 进行重新登录操作
    } else {
      return Promise.resolve(response)
    }
  },
  error => {
    let data = error.response
    if(data){
      if (data && data.data && (data.data.code === 1008 || data.data.code === 1009)) {    // 如果后台返回的错误标识为token过期，则重新登录
        Toast(data.data.msg)     
        sessionStorage.removeItem('token')          // token过期，移除token
        router.push('/loginpage')
        // 进行重新登录操作
      } 
    }else{
      Toast('服务异常')     
    }
    return Promise.reject(error)
  }
)
// 封装post请求
export function fetchPost(requestUrl, data = {}) {
  return axios({
    url: requestUrl,
    method: 'post',
    data
  })
}

// 封装post请求
export function formPost(requestUrl, data = {}) {
  console.log(data)
  let formData = new FormData()
  // formData.append('file', 'ssssssssss')
  formData.append('file', data.file)
  formData.append('task_id',data.task_id)
  formData.append('attach_type', sessionStorage.getItem('user_type'))
  return axios({
    url: requestUrl,
    method: 'post',
    headers:{
      'Content-Type' :'multipart/form-data'
    },
    data:formData
  })
}

export function fetchGet(requestUrl, params = {}) {
  return axios({
    url: requestUrl,
    method: 'get',
    params
  })
}

export function fetchPetch(requestUrl, params = {}) {
  return axios({
    url: requestUrl,
    method: 'patch',
    data: params
  })
}
// export function fetch(requestUrl, params = '') {
//   return axios({
//     url: requestUrl,
//     method: 'post',
//     data: {
//       'body': params
//     }
//   })
// }

