<template>
  <div class="enterprise">
    <div class="synopsis-head" :id="information.task_user_id" @click="handelClick">
      <div class="register-logoborder">
        <img
          v-if="imgShow"
          :src="information.image||logoImg"
          alt="logo"
          class="logo"
          @click.stop="imgClick"
        />
      </div>
      <div class="contenr">
        <div class="company" v-if="imgShow">
          <div class="company-box">
            <span class="name">{{information.username}}</span>
            <span class="autograph">{{information.industry||'行业未知'}}</span>
          </div>
          <span class="lv">LV{{information.level}}</span>
          <!-- <van-checkbox :name="keys" v-model="information.checked" checked-color="#c14182"></van-checkbox> -->
          <van-radio checked-color="#c14182" :name="keys"></van-radio>
        </div>
        <div class="synopsis-main">{{information.desc||'暂无描述'}}</div>
      </div>
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
    },
    keys: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      logoImg: require('@/assets/imgs/user-img.png')
    }
  },
  methods: {
    handelClick() {
      this.$emit('changeRadio', this.keys)
    },
    imgClick() {
      this.$router.push('/User/Student/' + this.information.user_id)
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
      .b-radius(125);
      border: 4px solid #ffffff;
      background: #ffffff;
      font-size: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .contenr {
      flex: 1;
      .company {
        display: flex;
        justify-content: space-around;
        text-align: left;
        .ml(50);
        .company-box {
          display: flex;
          flex-direction: column;
        }
        .lv {
          color: #c14182;
        }
      }
      .synopsis-main {
        text-indent: 0.8rem;
        .fs(18);
        .mt(20);
        text-align: left;
      }
    }
  }
}
</style>
