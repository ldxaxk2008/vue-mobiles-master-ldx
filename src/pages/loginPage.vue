<template>
  <div class="login-page">
    <common-header :tittle="tittle" :headerColor="headerColor" :showback="true"></common-header>
    <div style="flex:1;">
      <div class="login-img">
        <svg-icon name="logo" size="250" ref="svg_icon"></svg-icon>
      </div>
      <form ref="registerform" class="login-form" :model="registerlist">
        <div class="login-input">
          <!-- <van-field v-model="registerlist.username" placeholder="账号" />
          <van-field v-model="registerlist.password" placeholder="密码" />-->
          <div>
            <input type="text" v-model="registerlist.username" placeholder="账号" />
          </div>
          <div>
            <input type="text" v-model="registerlist.password" placeholder="密码" />
          </div>
        </div>
        <span class="forgetword" @click="hanleclick">忘记密码</span>
      </form>
      <div class="login-btn">
        <button class="p" @click="login">登录</button>
        <button class="p" @click="regist">注册</button>
      </div>
    </div>
    <div class="btn">
      <p>为学生创造价值的平台</p>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import commonHeader from 'common/common-header'
import {login} from 'api/login-api'
import { ERR_OK } from 'config/index'
export default {
  components: {
    commonHeader
  },
  data() {
    return {
      tittle: '',
      headerColor: '#f9ce20',
      registerlist: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapMutations(['SET_TOKEN']),
    hanleclick() {
      this.$router.push('/registpage')
    },
    login() {
      // var codeReg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)\S{8,}$/
      if (this.registerlist.password === '') {
        this.$toast({
          message: '请输入登录密码'
        })
        return
      }
      // else if (!codeReg.test(this.registerlist.password)) {
      //   this.$toast({
      //     message: '密码至少为8位,字母、数字'
      //   })
      // }
      if (this.registerlist.username === '') {
        this.$toast({
          message: '请输入账号'
        })
        return
      }
      login(this.registerlist).then((res) => {
        if (res.data.success === ERR_OK) {
          this.SET_TOKEN(res.data.token)
          this.$toast(res.data.msg)
          this.$router.push('/home')
        } else {
          this.$toast(res.data.msg)
        }
      }).catch(() => {
      })
    },
    regist() {
      this.$router.push('/levelup/experience')
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
  color: #f5f5f5;
  background: linear-gradient(bottom, #b92671 0%, #f9ce20 90%, #f9ce20 100%);
  .login-img {
    .mt(-50);
    box-sizing: border-box;
  }
  .login-form {
    .mt(30);
    position: relative;
    .forgetword {
      position: absolute;
      .right(130);
      .bottom(-50);
    }
  }
  .login-input {
    .mr(120);
    .ml(120);
    box-sizing: border-box;
    // .van-cell {
    //   .mt(30);
    //   outline: none;
    //   background: none;
    //   border: 1px solid #f5f5f5;
    // }
    div {
      display: flex;
      justify-content: space-between;
      .mb(30);
      input {
        flex: 1;
        .pt(13);
        .pb(13);
        .pl(20);
        .b-radius(60);
        color: @base-font-color;
        border: 1px solid #f5f5f5;
        outline: none;
        background: none;
      }
    }
  }
  .btn {
    .pb(100);
    letter-spacing: 10px;
    .fs(10);
  }

  .login-btn {
    display: flex;
    .b-radius(60);
    .mr(100);
    .ml(100);
    .mt(100);
    .p {
      flex: 1;
      .pt(12);
      .pb(12);
      .mb(30);
      .mr(20);
      .ml(20);
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
}
</style>
<style  lang="less">
// .van-field__control::-webkit-input-placeholder {
//   color: #f5f5f5;
// }
// .van-field__control {
//   margin-left: 10px;
// }
.login-page {
  input::placeholder{
    color:#f5f5f5;
  }
}

</style>
