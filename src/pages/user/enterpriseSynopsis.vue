<template>
  <div class="enterprise">
    <div class="synopsis-head">
      <img v-if="imgShow" :src="information.logoImg" alt="logo" class="logo">
      <div class="contenr">
        <div class="company" v-if="imgShow">
          <span class="name">{{information.name}}</span>
          <span class="autograph">{{information.industry}}</span>
        </div>
        <div class="synopsis-main">
          <div class="left">
            <van-icon name="comment-circle-o" />
            <span class="name">已发布任务</span>
            <span class="industry">{{information.tasksNum}}</span>
          </div>
          <div class="right">
            <van-icon name="refund-o" />
            <span class="assets">累计支付报酬</span>
            <span class="number">{{information.pay}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="about-us">
      <p>{{information.aboutUs}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imgShow: {
      type: Boolean,
      default: false
    },
    information: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.enterprise{
  .synopsis-head{
    color: #fff;
    display: flex;
    .logo{
      .w(200);
      .h(200);
      .b-radius(125);
    }
    .contenr{
      flex: 1;
      .company{
        display: flex;
        flex-direction: column;
        text-align: left;
        .ml(50);
      }
      .synopsis-main{
        display: flex;
        .left,.right{
          .van-icon{
            .mb(20);
            .fs(60);
          }
          .name,.assets{
            .mb(10);
          }
          .mt(30);
          display: flex;
          flex-direction: column;
          flex: 1;
          .ml(40);
        }
      }
    }
  }
  .about-us{
    text-align: left;
    .mt(40);
    color: #fff;
    p{
      .mb(20);
      text-indent: 24px;
    }
  }
}
</style>
