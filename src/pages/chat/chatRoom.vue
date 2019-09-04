<template>
  <div class="chat" @click.capture="btnClick">
    <commonHeader :tittle="tittle"/>
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
      @pulldownCall="pulldowncall">
      >
      <h1>dsfsdfsdf</h1>
    </th-message>
  </div>
</template>

<script>
import commonHeader from 'common/common-header'
import {webs} from '../../utils/websocket'
export default {
  components: {
    commonHeader
  },
  data() {
    return {
      userId: '',
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
      let data = {
        message: {
          content: val,
          to_user: this.userId
        }
      }
      console.log(JSON.stringify(data))
      webs().send(JSON.stringify(data))
      this.messageData.push({
        type: 1,
        text: val
      })
    },
    gallery(val) {
      console.log(val, 1)
    },
    camera(val) {
      console.log(val, 11)
    },
    quick(val) {
      console.log(val)
    },
    btncall (val) {
      console.log(val, 222)
    },
    pulldowncall (val) {
      console.log(val, 1111)
      setTimeout(() => {
        this.$refs.messgebox.resetpulldown()
      }, 3000)
    },
    btnClick(event) {
      if (event.target.getAttribute('class') === 'yes') {
        alert('同意')
      } else if (event.target.getAttribute('class') === 'no') {
        alert('拒绝')
      }
    },
    back(val) {
      console.log(val, 'ddddd)')
      // {"content": "人家等不及了", "from": 0, "time": "2019-09-04T23:11:01.579985"}
      if (val === 'error') {
        // 连接失败
        this.messageData.push({
          type: 4,
          text: '连接失败，请检查网络'
        })
      } else {
        this.messageData.push({
          type: 2,
          text: JSON.parse(val).message
        })
      }
    }
  },
  mounted() {
    let url = this.$route.path
    this.userId = url.substring(url.lastIndexOf('/') + 1, url.length)
    // let arr = `<div style="text-align:left;">
    //               <p>苹果笔记本钢化膜</p>
    //               <p>macBookPromkPro....</p>
    //               <div style="display:flex;justify-content:space-around;margin-top:10px;">
    //                 <button class="yes" style="color:#fff;border:0;padding:2px 8px;border-radius:4px;background:rgb(185, 38, 113);">同意</button>
    //                 <button class="no" style="color:#fff;border:0;padding:2px 8px;border-radius:4px;background:rgb(249, 206, 32);">拒绝</button>
    //               </div>
    //            </div>`
    // let brr = {
    //   type: 3,
    //   text: arr
    // }
    // this.messageData.push(brr)
    webs().onerror(this.back)
  }
}
</script>

<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.chat{
  display: flex;
}
.th-message{
  flex:1;
  display: flex;
  flex-direction: column;
  // height:100%;
  margin-top:0 !important;
  /deep/ .messagebox{
    flex:1;
    height: auto;
  }
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
  /deep/ .doc-item{
    .mtext{
      left:-60px;
    }
  }
}
</style>
