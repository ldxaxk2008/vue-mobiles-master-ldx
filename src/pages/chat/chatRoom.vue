<template>
  <div class="chat">
    <!-- <commonHeader :tittle="tittle"/> -->
    <th-message
      ref="messgebox"
      :usePulldown="true"
      :useText="true"
      :pulldownConfig="pulldownConfig"
      :topPadding="120"
      :messageData="messageData"
      :funcList="funclist"
      :showInput="showInput"
      :showEmoticon="true"
      @sendOut="senRequest"
      @quickCall="quick"
      @bigBtnCall="btncall"
      @msgClick="msgclick"
      @pulldownCall="pulldowncall">
      >
    </th-message>
  </div>
</template>

<script>
import commonHeader from 'common/common-header'
import { createWebSocket } from '../../utils/websocket'
export default {
  components: {
    commonHeader
  },
  data() {
    return {
      pulldownConfig: {
        default: '下拉刷新',
        up: "<div style='color:red'>下拉刷新</div>",
        down: "<div style='color:blue'>下拉刷新</div>",
        loading: "<span style='color:green'>加载中</span>"
      },
      messageData: [
        {
          type: 2,
          text: '您好'
        }, {
          type: 3,
          text: '消息提示'
        }, {
          type: 4,
          text: '系统消息'
        }
      ],
      funclist: [],
      showInput: true,
      tittle: '聊天'
    }
  },
  methods: {
    senRequest(val) {
      console.log(val, 111)
      this.messageData.push({
        type: 1,
        text: val
      })
    },
    gallery(val) {
      console.log(val, 111)
    },
    camera(val) {
      console.log(val, 111)
    },
    quick(val) {
      console.log(val, 111)
    },
    btncall (val) {
      console.log(val, 111)
    },
    msgclick (val) {
      console.log(val, 111)
    },
    pulldowncall (val) {
      console.log(val, 111)
      setTimeout(() => {
        this.$refs.messgebox.resetpulldown()
      }, 3000)
    }
  },
  mounted() {
    createWebSocket()
  }
}
</script>

<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.th-message{
  display: flex;
  flex-direction: column;
  height:100%;
  margin-top:0 !important;
  /deep/ #vux-scroller-2rkki{
    flex:1;
    overflow: auto;
  }
  /deep/ .xs-container>div{
    padding-top:0 !important;
  }
  /deep/ .th-pulldown{
    top:-60px !important;
  }
}
</style>
