<template>
  <div class="regist-page">
    <div class="regist-img">
      <svg-icon name="logo" size="250" ref="svg_icon"></svg-icon>
    </div>
    <div style="flex:1;">
      <form ref="registerform" :model="registerlist">
        <div class="regist-input">
            <van-field clearable v-model="registerlist.phone" label="手机号" placeholder="请输入手机号" />
            <van-field
              v-model="registerlist.sms"
              label="验证码"
              center
              clearable
              placeholder="请输入短信验证码"
            >
              <van-button class="regist-btn" slot="button" size="small" clearable type="primary">发送验证码</van-button>
            </van-field>
            <van-field
              v-model="registerlist.password"
              label="密码"
              clearable
              type="password"
              placeholder="请输入密码"
            />
            <van-field
              v-model="registerlist.confirm_password"
              label="确认密码"
              clearable
              type="password"
              placeholder="请输入密码"
            />
        </div>
      </form>
    </div>
    <div class="register-footer">
      <button class="register-footer--btn" @click="confirm">确认</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      registerlist: {
        phone: '',
        sms: '',
        password: '',
        confirm_password: ''
      }
    }
  },
  methods: {
    confirm() {
      var codeReg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)\S{8,}$/
      var phoneReg = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/
      if (this.registerlist.phone === '') {
        this.$toast({
          message: '请输入电话号码'
        })
        return
      } else if (!phoneReg.test(this.registerlist.phone)) {
        this.$toast({
          message: '请输入正确电话号码'
        })
        return
      } else if (this.registerlist.phone.toString().length !== 11) {
        this.$toast({
          message: '电话号码必须是11位'
        })
        return
      }
      if (this.registerlist.password === '') {
        this.$toast({
          message: '请输入登录密码'
        })
        return
      } else if (!codeReg.test(this.registerlist.password)) {
        this.$toast({
          message: '密码至少为8位,字母、数字'
        })
        return
      }
      if (this.registerlist.confirm_password === '') {
        this.$toast({
          message: '请确认登录密码'
        })
        return false
      } else if (this.registerlist.confirm_password !== this.registerlist.password) {
        this.$toast({
          message: '两次密码不一致'
        })
        return false
      }
      this.$router.push('/loginpage')
    }
  }
}
</script>

<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.regist-page {
  * {
    touch-action: pan-y;
  }
  background: linear-gradient(bottom, #b92671 0%, #f9ce20 90%, #f9ce20 100%);
  .regist-input {
    .mr(20);
    .ml(20);
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
      height: 40px;
      line-height: 40px;
      .b-radius(60);
      }
      .regist-btn{
        height: 40px;
        border: 1px solid #07c160;
      }
  }
  .register-footer {
    button {
      .b-radius(500);
    }
    position: sticky !important;
    bottom: 50px;
    .pt(30);
    .pb(30);
    width: 100%;
    box-sizing: border-box;
    display: flex;
    .register-footer--btn {
      flex: 1;
      margin: 0 auto;
      background-color: #07c160;
      color: white;
      .fs(25);
      .pt(10);
      .pb(10);
      .ml(20);
      .mr(20);
      font-weight: bold;
    }
  }
}
</style>
