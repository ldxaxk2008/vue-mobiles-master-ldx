<template>
  <div class="chat">
    <commonHeader :tittle="tittle"></commonHeader>
    <div class="main">
      <!-- <div class="left">
        <div class="message">
          <img src="@/assets/imgs/img0.png" alt="">
          <span>你瞅啥！你瞅啥！你瞅啥！你瞅啥！你瞅啥！你瞅啥！你瞅啥！</span>
        </div>
      </div> -->
      <div v-for="(item,index) in rightList" :key="index" :class="item.id?'right':'left'">
        <div class="message">
          <img :src="item.imgSrc" alt="">
          <span>{{item.message}}</span>
        </div>
      </div>
    </div>
    <div class="foot">
      <img src="@/assets/imgs/voice.png" alt="">
      <van-field
        v-model="value"
        :border="false"
      />
      <van-button slot="button" size="mini" type="primary" @click="handelClick">发送</van-button>
    </div>
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
      voice: require('@/assets/imgs/voice.png'),
      rightList: [{
        imgSrc: require('@/assets/imgs/img1.png'),
        message: '你愁啥你愁啥你愁啥你愁啥你愁啥你愁啥你愁啥你愁啥你愁啥你愁啥你愁啥你愁啥你愁啥你愁啥你愁啥你愁啥你愁啥你愁啥'
      }, {
        imgSrc: require('@/assets/imgs/img1.png'),
        id: 'my',
        message: '瞅你咋地！瞅你咋地！瞅你咋地！瞅你咋地！你咋地！瞅你咋地！瞅你咋地！瞅你咋地！瞅你咋地！瞅你咋地'
      }, {
        imgSrc: require('@/assets/imgs/img1.png'),
        message: '不行'
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
    }
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
  .left{
    .message{
      display: flex;
      justify-content:end;
      .mb(30);
      width:80%;
      img{
        width:40px;
        height: 40px;
        .b-radius(300);
      }
      span{
        text-align: left;
        .ml(20);
        background: #D8D8D8;
        color: #000;
        .padding(10,10,10,10);
        .b-radius(10);
      }
    }
  }
  .right{
    .message{
      display: flex;
      justify-content: flex-end;
      .mb(30);
      width:80%;
      img{
        width:40px;
        height: 40px;
        .b-radius(300);
      }
      span{
        text-align: left;
        .ml(20);
        background: #9afd9a;
        color: #000;
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
