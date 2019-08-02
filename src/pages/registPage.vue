<template>
  <div class="regist-page">
    <common-header :tittle="tittle" :headerColor="headerColor" :showback="true"></common-header>
    <div style="flex:1;">
      <div class="regist-img">
        <svg-icon name="logo" size="250" ref="svg_icon"></svg-icon>
      </div>
      <form ref="registerform" :model="registerlist">
        <div class="regist-input">
          <!-- <van-field clearable v-model="registerlist.phone" placeholder="注册手机号" />
          <van-field v-model="registerlist.sms" center clearable placeholder="验证码" >
            <van-button class="regist-btn" slot="button" size="small" clearable type="primary">发送验证码</van-button>
          </van-field>
          <van-field v-model="registerlist.password" clearable type="password" placeholder="新密码" />
          <van-field
            v-model="registerlist.confirm_password"
            clearable
            type="password"
            placeholder="重复输入密码"
          /> -->
          <div><input type="text" v-model="registerlist.phone" placeholder="注册手机号"></div>
          <div><input type="text" v-model="registerlist.sms" placeholder="验证码"><button class="regist-input--btn">发送验证码</button></div>
          <div><input type="password" v-model="registerlist.password" placeholder="新密码"></div>
          <div><input type="password" v-model="registerlist.confirm_password" placeholder="重复输入密码"></div>
        </div>
      </form>
      <div class="register-footer">
        <button class="register-footer--btn" @click="confirm">确认</button>
      </div>
    </div>
    <div class="btn">
      <p>为学生创造价值的平台</p>
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
      tittle: '',
      headerColor: '#f9ce20',
      registerlist: {
        phone: '',
        sms: '',
        password: '',
        confirm_password: ''
      }
    }
  },
  mounted() {
    console.log(this.registerlist)
  },
  methods: {
    confirm() {
      var codeReg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)\S{3,}$/
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
      } else if (
        this.registerlist.confirm_password !== this.registerlist.password
      ) {
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
  color: #f5f5f5;
   /*! autoprefixer: off */
  background: -webkit-linear-gradient(bottom, #b92671 0%, #f9ce20 90%, #f9ce20 100%);
  /* autoprefixer: on */
  background:-moz-linear-gradient(bottom, #b92671 0%, #f9ce20 90%, #f9ce20 100%);
  background:-o-linear-gradient(bottom, #b92671 0%, #f9ce20 90%, #f9ce20 100%);
  background:linear-gradient(bottom, #b92671 0%, #f9ce20 90%, #f9ce20 100%);
  .regist-img{
    // .h(400);
     .mt(-70);
    box-sizing: border-box;
  }
  .regist-input {
    .mr(120);
    .ml(120);
    box-sizing: border-box;
    // .van-cell {
    //   outline: none;
    //   background-color: transparent;
    //   border: 1px solid #f5f5f5;
    //   .mt(30);
    // }
    div {
      display: flex;
      justify-content: space-between;
      .mb(30);
      input{
        flex:1;
        .pt(13);
        .pb(13);
        .pl(20);
        .b-radius(60);
        color: @base-font-color;
        border: 1px solid #f5f5f5;
        outline: none;
        background: none;
      }
      .regist-input--btn{
        border: 1px solid #f5f5f5;
        outline: none;
        background: none;
        .b-radius(60);
        .ml(10);
      }
    }
    // .regist-btn {
    //   height: 24px;
    //   line-height: 24px;
    //   border: 1px solid #07c160;
    // }
  }
  .register-footer {
    display: flex;
    .b-radius(60);
    .mr(250);
    .ml(250);
    .mt(70);
    .register-footer--btn {
      flex: 1;
      .pt(13);
      .pb(13);
      .b-radius(60);
      text-align: center;
      color: #fff;
      letter-spacing: 5px;
      font-weight: bold;
      outline: none;
      background-color: transparent;
      border: 1px solid #f5f5f5;
    }
  }
  .btn {
    .pb(100);
    letter-spacing: 10px;
    .fs(10);
  }
}
</style>
<style  lang="less">
// .van-field__control::-webkit-input-placeholder {
//   color: #f5f5f5;
// }
// .van-field__control {
//   margin-left: 10px;
// }
.regist-page {
  input::placeholder{
    color:#f5f5f5;
  }
}

</style>
