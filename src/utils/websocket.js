/**
 * Created by liudongxu on 2018/11/22.
 */

// var url = 'ws://192.168.1.6:8888/test/'
// var Socket = new WebSocket(url)
// console.log(Socket)
//
// Socket.onopen = function () {
//   // Web Socket 已连接上，使用 send() 方法发送数据
//   Socket.send('send')
//   console.log('数据发送中...')
// }
//
// Socket.onmessage = function (evt) {
//   var received_msg = evt.data
//   console.log('result', evt)
//   console.log('数据已接收...')
// }
// Socket.onclose = function () {
//   // 关闭 websocket
//   console.log('连接已关闭...')
// }
var lockReconnect = false // 避免ws重复连接
var ws = null // 判断当前浏览器是否支持WebSocket
var url = 'ws://47.99.240.71:10000/ws/chat/room0/'
// createWebSocket(url) // 连接ws
export function webs() {
  return ws
}
export function createWebSocket (back, msg) {
  try {
    if ('WebSocket' in window) {
      ws = new WebSocket(url)
    } else if ('MozWebSocket' in window) {
      // ws = new MozWebSocket(url)
    } else {
      // layui.use(['layer'],function(){
      //   var layer = layui.layer;
      //   layer.alert("您的浏览器不支持websocket协议,建议使用新版谷歌、火狐等浏览器，请勿使用IE10以下浏览器，360浏览器请使用极速模式，不要使用兼容模式！");
      // });
    }
    initEventHandle(back, msg)
  } catch (e) {
    reconnect(url)
    console.log(e)
  }
}

function initEventHandle (back, msg) {
  // ws.onclose = function () {
  //   reconnect(url)
  //   console.log('llws连接关闭!' + new Date().toUTCString())
  // }
  ws.onerror = function () {
    reconnect(url)
    console.log('llws连接错误!')
  }
  ws.onopen = function () {
    heartCheck.reset().start() // 心跳检测重置
    msg && ws.send(msg)
    console.log('llws连接成功!' + new Date().toUTCString())
  }
  ws.onmessage = function (event) { // 如果获取到消息，心跳检测重置
    // heartCheck.reset().start() // 拿到任何消息都说明当前连接是正常的
    back(event.data)
    console.log('llws收到消息啦:' + event.data)
  }
}
// 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
window.onbeforeunload = function () {
  ws.close()
}

function reconnect (url) {
  if (lockReconnect) return
  lockReconnect = true
  setTimeout(function () { // 没连接上会一直重连，设置延迟避免请求过多
    createWebSocket(url)
    lockReconnect = false
  }, 2000)
}

// 心跳检测
var heartCheck = {
  timeout: 540000, // 9分钟发一次心跳
  timeoutObj: null,
  serverTimeoutObj: null,
  reset: function () {
    clearTimeout(this.timeoutObj)
    clearTimeout(this.serverTimeoutObj)
    return this
  },
  start: function () {
    // var self = this
    this.timeoutObj = setTimeout(function () {
      // 这里发送一个心跳，后端收到后，返回一个心跳消息，
      // onmessage拿到返回的心跳就说明连接正常
      ws.send('ping')
      console.log('ping!')
      // self.serverTimeoutObj = setTimeout(function () { // 如果超过一定时间还没重置，说明后端主动断开了
      //   ws.close() // 如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
      // }, self.timeout)
    }, this.timeout)
  }
}
