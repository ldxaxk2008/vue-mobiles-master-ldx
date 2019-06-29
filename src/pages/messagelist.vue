<template>
    <div class="message-box">
       <common-header :headerColor="headerColor" :tittle="tittle" :showback="true" :showmore='true'></common-header>
       <div class="evaluate">
            <ul>
            <li v-for="(item,index) in evaluate" :key="index">
                <div>
                    <img :src="item.imgSrc" alt="">
                </div>
                <div class="remark">
                    <div class="time">
                      <span class="time-name">{{item.name}}</span>
                      <span class="time-data">{{item.data}}</span>
                    </div>
                <span class="time-remark">{{item.remark}}</span>
                </div>
            </li>
            </ul>
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
      tittle: '消息列表',
      headerColor: '#222230',
      evaluate: [
        {
          imgSrc: require('@/assets/imgs/user-img.png'),
          data: '今天 2019-1-1',
          remark: '新的设计稿已经上传了,请注意查收',
          name: '深圳益康电子'
        },
        {
          imgSrc: require('@/assets/imgs/user-img.png'),
          data: '今天 2019-11-21',
          remark: '新的设计稿已经上传了,请注意查收',
          name: '长沙果子坚食品有限公司'
        },
        {
          imgSrc: require('@/assets/imgs/user-img.png'),
          data: '今天 2019-11-21',
          remark: '新的设计稿已经上传了,请注意查收',
          name: '长沙果子坚食品有限公司'
        },
        {}
      ]
    }
  }
}
</script>
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.message-box{
    * { touch-action: pan-y; }
    background-color: #191927;
    .evaluate{
    ul{
        li{
        position: relative;
        display: flex;
        .mt(30);
        .mr(30);
        .ml(30);
        .padding(20,20,20,20);
        background-color: #222230;
        .b-radius(30);
        img{
            .h(130);
            .mr(20);
            .b-radius(30);
        }
        }
        .remark{
          text-align: left;
        }
        .time-name{
          .mt(10);
           display: inline-block;
           color: white;
          .fs(26);
        }
        .time-data{
           color: #3E3E43;
            display: inline-block;
            position: absolute;
            .top(20);
            .right(20);
        }
        .time-remark{
           .fs(18);
           .mt(45);
           display: inline-block;
           color: white;
        }
      }
    }
}
</style>
