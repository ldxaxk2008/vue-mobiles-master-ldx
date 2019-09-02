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
          <span class="autograph">
            {{(information.school_name==='' || information.company_name ==='') ?'未添加名称':(information.school_name || information.company_name)}}
            <van-icon
             v-if="(information.company_id===sessionId)||(information.id==sessionId)"
              class="about-icon"
              name="edit"
              @click="handelEdit((information.school_name || information.company_name),'nickName','简介')"
            />
          </span>
          <!-- <span class="name">{{information.===''?'未添加行业':information.}}</span> -->
        </div>
        <div class="synopsis-main">
          <div class="left" @click="handelClick">
            <van-icon name="comment-circle-o" />
            <span v-show="company" class="name">已发布任务</span>
            <span v-show="student" class="name">已完成任务</span>
            <span class="industry">{{information.task_count||information.task_num || 0}}个</span>
          </div>
          <div class="right">
            <van-icon name="refund-o" />
            <span v-show="company" class="assets">累计支付报酬</span>
            <span v-show="student" class="assets">累计获得报酬</span>
            <span class="number">￥{{information.total_payment}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="about-us">
      <div class="about-us--edit">
        <p>
          {{information.aboutUs||information.desc||'暂无介绍'}}
          <van-icon
            v-if="(information.company_id===sessionId)||(information.id==sessionId)"
            class="about-icon"
            name="edit"
            @click="handelEdit((information.aboutUs||information.desc),'desc','简介')"
          />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import cookie from 'vue-cookies'
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
      company: false,
      student: false,
      headimg: require('@/assets/imgs/user-img.png'),
      sessionId: cookie.get('user_id')
    }
  },
  methods: {
    handelClick() {
      // this.$router.push('/mine')
      let data = {
        id: this.information.id
      }
      this.$router.push({ name: 'mine', params: { id: data } })
    },
    handelEdit(data, sign, label) {
      this.$emit('handelEdit', data, sign, label)
    }
  },
  mounted() {
    if (cookie.get('user_type') === '0') {
      this.company = false
      this.student = true
    } else {
      this.company = true
      this.student = false
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
    .about-us--edit {
      display: flex;
      justify-content: flex-start;
    }
    p {
      .mb(20);
      text-indent: 24px;
    }
    .about-icon {
      .ml(-90);
    }
  }
}
</style>
