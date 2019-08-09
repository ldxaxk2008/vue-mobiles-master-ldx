<template>
  <div class="chat">
    <th-message
      ref="messgebox"
      :useText="true"
      :topPadding="120"
      :messageData="messageData"
      :funcList="funclist"
      :bigBtn="true"
      :showInput=true
      :selfFace="voice"
      :otherFace="voice"
      :showEmoticon="true"
      @sendOut="handelClick"
      @quickCall="handelClick"
      @bigBtnCall="handelClick"
      @msgClick="msgclick"
      >
    </th-message>
  </div>
</template>

<script>
import commonHeader from 'common/common-header'
export default {
  components: {
    commonHeader
  },
  data() {
    return {
      tittle: '聊天',
      value: '',
      messageData: [{
        type: 1,
        text: 'dwdwqfw'
      }],
      funclist: [],
      voice: require('@/assets/imgs/voice.png'),
      rightList: [{
        imgSrc: require('@/assets/imgs/img1.png'),
        message: '瞅你咋地！瞅你咋地！瞅你咋地！瞅你咋地！瞅你咋地！瞅你咋地！瞅你咋地！瞅你咋地！瞅你咋地！瞅你咋地'
      }]
    }
  },
  methods: {
    handelClick() {
      let obj = {
        imgSrc: require('@/assets/imgs/img1.png'),
        message: this.value
      }
      this.rightList.push(obj)
      this.value = ''
      this.$nextTick(() => {
        let msg = document.getElementsByClassName('main')[0] // 获取对象
        msg.scrollTop = msg.scrollHeight // 滚动高度
      })
    },
    msgclick () {}
  }
}
</script>

<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.foot{
  display: flex;
  background: #F9F9F9;
  border-top: 1px solid #e6e6e6;
  .padding(20,20,20,20);
  align-items: center;
  justify-content: center;
  .van-field{
    .margin(0, 20, 0, 20);
    background: #B5E2E5;
    .padding(5,35,5,5);
    .b-radius(300);
  }
  .van-button{
    .b-radius(300);
    .h(60);
    background:#18ACB6;
  }
}
.main{
  flex:1;
  overflow-x:hidden;
  overflow-y:auto;
  background: #fff;
  .padding(20,20,20,20);
  .left,.right{
    text-align: left;
    overflow: hidden;
    .message{
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .mb(30);
      width:80%;
      img{
        .w(100);
        .h(100);
        .b-radius(300);
      }
      span{
        .ml(20);
        background: #D8D8D8;
        .padding(10,10,10,10);
        .b-radius(10);
      }
    }
  }
  .left .message{
    float:left;
  }
  .right .message{
    float:right;
  }
}
</style>
