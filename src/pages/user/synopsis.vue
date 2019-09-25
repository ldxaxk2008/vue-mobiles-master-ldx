<template>
  <div class="task-synopsis">
    <div class="synopsis-head">
      <div class="register-logoborder" @click="jump">
        <img :src="information.image||logoImg" alt="logo" class="logo" />
      </div>
      <div class="contenr">
        <div class="left">
          <span class="name">{{information.company_name}}</span>
          <span class="industry">{{companyList.industry||'暂无'}}</span>
          <button
            v-if="appstate"
            class="apply"
            @click="handelClick('applyTask')"
            :disabled="disable"
          >申请任务</button>
          <button v-if="!appstate && wait" class="wait">等待甲方确认</button>
        </div>
        <div class="right">
          <span class="assets">￥{{information.total_payment}}</span>
          <span class="number" v-if="information.user_id!==0">{{information.user_name}} 已申请</span>
          <span class="number" v-else>{{information.apply_num}} 人在申请</span>
          <button
            v-if="state"
            class="cancel"
            @click="handelClick('cancelTask')"
            :disabled="disable"
          >取消申请</button>
        </div>
      </div>
    </div>
    <div class="about-us">
      <h4>任务简介</h4>
      <p>
        {{information.desc}}
        <van-icon
          v-if="information.company_id===sessionId"
          class="about-icon"
          name="edit"
          @click="handelEdit(information.desc,'desc','任务简介')"
        />
      </p>
      <span>距离任务结束还剩：{{information.rest_day}} 天</span>
    </div>
  </div>
</template>

<script>
import cookie from 'vue-cookies'
export default {
  props: {
    information: {
      type: Object,
      default: () => {}
    },
    userId: {
      type: Number,
      default: 0
    },
    companyList: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      // show: true,
      state: false,
      wait: false,
      appstate: true,
      disable: false,
      logoImg: require('@/assets/imgs/img5.png'),
      sessionId: cookie.get('user_id')
    }
  },
  mounted() {
    console.log('qqqqqqq')
    let type = cookie.get('user_type')
    if (type === '1') {
      this.appstate = false
    }
  },
  methods: {
    handelClick(val) {
      this.disable = true
      this.wait = true
      this.$emit('taskSele', val, this.back)
    },
    back(val) {
      if (val) {
        this.appstate = !this.appstate
        this.state = !this.state
        this.disable = false
      }
    },
    handelEdit(data, sign, label) {
      this.$emit('handelEdit', data, sign, label)
    },
    jump() {

    }
  },
  watch: {
    async information(newVal, oldVal) {
      console.log(newVal)
      if (cookie.get('user_type') === '0') {
        if (newVal.is_enroll === 1) {
          this.appstate = false
          if (JSON.stringify(newVal.user_id) !== '0') {
            if (cookie.get('user_id') === JSON.stringify(newVal.user_id)) {
              this.state = true
              this.wait = false
            } else {
              this.state = false
              this.wait = false
            }
          } else {
            this.wait = true
            this.state = true
          }
        } else {
          this.wait = false
          if (JSON.stringify(newVal.user_id) === '0') {
            this.appstate = true
            this.state = false
          } else {
            this.appstate = false
            this.state = false
          }
        }
      } else {
        this.appstate = false
        this.state = false
        this.wait = false
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.task-synopsis {
  .padding(30, 30, 30, 30);
  .mb(10);
  background: #fff;
  .synopsis-head {
    color: #000;
    display: flex;
    .register-logoborder {
      .w(200);
      .h(200);
      .b-radius(500);
      // background: linear-gradient(to right, #af002a, #e5d200);
      /*! autoprefixer: off */
      background: -webkit-linear-gradient(right, #af002a, #e5d200);
      /* autoprefixer: on */
      background: -moz-linear-gradient(right, #af002a, #e5d200);
      background: -o-linear-gradient(right, #af002a, #e5d200);
      background: linear-gradient(right, #af002a, #e5d200);
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .logo {
      .w(170);
      .h(170);
      .b-radius(500);
      border: 4px solid #ffffff;
      background: #ffffff;
      font-size: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .contenr {
      flex: 1;
      display: flex;
      .left,
      .right {
        .assets {
          color: #d887b1;
        }
        .mt(30);
        display: flex;
        flex-direction: column;
        flex: 1;
        .ml(40);
        span:nth-child(1) {
          .fs(30);
        }
        button {
          .mt(30);
          .padding(10, 0, 10, 0);
          .b-radius(30);
          border: none;
        }
        .apply {
          background: #f7c724;
          color: #fff;
        }
        .cancel {
          background: #f7c724;
          color: #fff;
        }
        .wait {
          background: #c0c0c0;
          color: #fff;
        }
      }
    }
  }
  .about-us {
    text-align: left;
    .mt(40);
    h4 {
      .fs(30);
      .mb(20);
    }
    p {
      .mb(20);
      text-indent: 24px;
    }
    .about-icon {
      .ml(-90);
    }
    span {
      display: block;
      text-align: right;
    }
  }
}
</style>
