<template>
  <div class="login-page">
    <div style="flex:1;">
      <div class="login-img">
        <svg-icon name="logo" size="250" ref="svg_icon"></svg-icon>
      </div>
       <form ref="registerform" class="login-form" :model="registerlist">
      <div class="login-input">
          <van-field clearable v-model="registerlist.account" label="账号" placeholder="请输入账号" />
          <van-field clearable v-model="registerlist.password" label="密码" placeholder="请输入密码" />
      </div>
       <span class="forgetword" @click="hanleclick">忘记密码</span>
       </form>
    </div>
    <div class="login-btn">
      <div>
        <p @click="login">登录</p>
      </div>
      <div>
        <p @click="regist">注册</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      registerlist: {
        account: '',
        password: ''
      }
    }
  },
  methods: {
    hanleclick() {

    },
    login() {
      var codeReg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)\S{8,}$/
      if (this.registerlist.password === '') {
        this.$toast({
          message: '请输入登录密码'
        })
      } else if (!codeReg.test(this.registerlist.password)) {
        this.$toast({
          message: '密码至少为8位,字母、数字'
        })
      }
      if (this.registerlist.account === '') {
        this.$toast({
          message: '请输入账号'
        })
      }
    },
    regist() {

    }
  }
}
</script>
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.login-page {
  * {
    touch-action: pan-y;
  }
  background: linear-gradient(bottom, #b92671 0%, #f9ce20 90%, #f9ce20 100%);
  .login-img {
    .mb(100);
    box-sizing: border-box;
  }
  .login-form{
     position: relative;
     .forgetword{
        position: absolute;
        .right(60);
        .bottom(10);
      }
  }
  .login-input {
    .mr(180);
    .ml(180);
    .mt(50);
    box-sizing: border-box;
    .van-cell {
      background-color: #f5f5f5;
      .mt(30);
    }
    div {
      display: flex;
      justify-content: space-between;
      border: 1px solid #f5f5f5;
      color: #000;
      height: 30px;
      line-height: 30px;
      .b-radius(60);
      }
  }
  .login-btn {
    .pb(150);
    div {
      display: flex;
      .b-radius(60);
      .mr(200);
      .ml(200);
    }
    p {
      flex: 1;
      .pt(15);
      .pb(15);
      .mb(30);
      .b-radius(60);
      text-align: center;
      color: #fff;
      letter-spacing: 5px;
      font-weight: bold;
      background-color: #c54f8b;
    }
  }
}
</style>
