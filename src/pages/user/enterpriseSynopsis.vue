<template>
  <div class="enterprise" :id="information.id">
    <div class="synopsis-head">
        <img
          v-if="imgShow"
          :src="information.image?information.image:headimg"
          alt="logo"
          class="logo"
        />
      <div class="contenr">
        <div class="company" v-if="imgShow">
          <span class="name">{{information.nick_name===''?'未添加昵称':information.nick_name}}</span>
          <span class="autograph">{{information.school_name ===''?'未添加学校':information.school_name}}</span>
          <span class="name">{{information.company_name===''?'未添加公司名称':information.company_name}}</span>
          <!-- <span class="name">{{information.===''?'未添加行业':information.}}</span> -->
        </div>
        <div class="synopsis-main">
          <div class="left" @click="handelClick">
            <van-icon name="comment-circle-o" />
            <span class="name">已发布任务</span>
            <span class="industry">{{information.task_count||information.task_num}}</span>
          </div>
          <div class="right">
            <van-icon name="refund-o" />
            <span class="assets">累计支付报酬</span>
            <span class="number">{{information.total_payment}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="about-us">
      <p>{{information.aboutUs||information.desc||'暂无介绍'}}</p>
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
  },
  data() {
    return {
      headimg: require('@/assets/imgs/user-img.png')
    }
  },
  methods: {
    handelClick() {
      this.$router.push('/mine')
    }
  }
}
</script>

<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.enterprise {
  .synopsis-head {
    color: #000;
    display: flex;
    .logo {
      .w(200);
      .h(200);
      .b-radius(125);
      border: 5px solid #ffffff;
      background: #ffffff;
    }
    .contenr {
      flex: 1;
      .company {
        display: flex;
        flex-direction: column;
        text-align: left;
        .ml(50);
      }
      .synopsis-main {
        display: flex;
        .left,
        .right {
          .van-icon {
            .mb(20);
            .fs(60);
          }
          .name,
          .assets {
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
  .about-us {
    text-align: left;
    .mt(40);
    color: #000;
    p {
      .mb(20);
      text-indent: 24px;
    }
  }
}
</style>
