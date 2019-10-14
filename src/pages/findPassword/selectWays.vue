<template>
  <div class="select-ways">
    <div style="flex:1;" class="ways-con">
      <svg-icon name="logo" size="200" ref="svg_icon"></svg-icon>
      <div v-if="activeName==='selectways'">
        <p style="font-size:16px;color:#5C5C5C;letter-spacing:3px;">请选择找回方式</p>
        <div class="ways-con--btn">
          <button @click="find('phone')">手机验证找回</button>
          <button @click="find('emial')">邮箱验证找回</button>
        </div>
        <p class="ways-con--ser">联系客服</p>
      </div>
      <div v-if="activeName==='phone'">
        <p style="font-size:16px;color:#5C5C5C;letter-spacing:3px;">获取对应验证码</p>
        <div class="register-content__info">
          <van-field v-model="form.phone" placeholder="注册手机号" />
          <van-field v-model="form.code" placeholder="验证码">
            <button
              slot="button"
              ref="code"
              :disabled="disabled"
              @click="send('phone')"
              class="register-btn"
              size="small"
              type="primary"
            >获取验证码</button>
          </van-field>
        </div>
      </div>
      <div v-if="activeName==='email'">
        <p style="font-size:16px;color:#5C5C5C;letter-spacing:3px;">获取对应验证码</p>
        <div class="register-content__info">
          <van-field v-model="form.email" placeholder="注册邮箱" />
          <van-field v-model="form.Ecode" placeholder="验证码">
            <button
              slot="button"
              ref="code"
              :disabled="disabled"
              class="register-btn"
              @click="send('emial')"
              size="small"
              type="primary"
            >获取验证码</button>
          </van-field>
        </div>
      </div>
      <div v-if="activeName==='password'">
        <p style="font-size:16px;color:#5C5C5C;letter-spacing:3px;">设置新密码</p>
        <div class="register-content__info">
          <van-field v-model="newPassoerd" placeholder="新密码" />
          <van-field v-model="setPassoerd" placeholder="重置新密码" />
        </div>
      </div>
      <div v-if="activeName==='returnLevel'">
        <p style="font-size:16px;color:#5C5C5C;letter-spacing:3px;">密码修改成功</p>
        <div class="ways-con--return">
          <button @click="returnLevel">返回登录界面</button>
        </div>
      </div>
    </div>
    <div class="ways-footer" v-if="activeName!=='password'&& activeName!=='returnLevel'">
      <button class="ways-footer--btn" @click="next">下一步</button>
    </div>
    <div class="ways-footer" v-if="activeName==='password'">
      <button class="ways-footer--btn" @click="jionLevel">加入level up</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      times: 10,
      disabled: false,
      activeName: '',
      form: {
        phone: '',
        code: '',
        Ecode: '',
        email: ''
      },
      newPassoerd: '',
      setPassoerd: ''
    }
  },
  methods: {
    next() {
      if (this.$route.params.id === 'phone') {
        if (this.form.phone === '') {
          this.$toast({
            message: '请输入手机号'
          })
          return
        }
        if (this.form.code === '') {
          this.$toast({
            message: '请输入验证码'
          })
          return
        }
        this.$router.push('/password/password')
      } else if (this.$route.params.id === 'email') {
        if (this.form.email === '') {
          this.$toast({
            message: '请输入邮箱'
          })
          return
        }
        if (this.form.Ecode === '') {
          this.$toast({
            message: '请输入验证码'
          })
        }
        this.$router.push('/password/password')
      } else {
        console.log(99999)
      }
    },
    find(type) {
      if (type === 'phone') {
        this.$router.push('/password/phone')
      } else {
        this.$router.push('/password/email')
      }
    },
    jionLevel() {
      if (this.newPassoerd === '') {
        this.$toast({
          message: '请输入新密码'
        })
        return
      }
      if (this.setPassoerd === '') {
        this.$toast({
          message: '请重置新密码'
        })
        return
      } else if (this.newPassoerd !== this.setPassoerd) {
        this.$toast({
          message: '两次密码不一致'
        })
        return
      }
      this.$router.push('/password/returnLevel')
    },
    returnLevel() {
      this.$router.push('/loginpage')
    },
    // 获取验证码
    send(type) {
      if (type === 'phone') {
        this.countDown()
      } else {
        this.countDown()
      }
    },
    countDown() {
      if (this.times <= 0) {
        this.$refs['code'].innerHTML = `重新发送`
        this.times = 10
        this.disabled = false
        return false
      }
      this.disabled = true
      this.$refs['code'].innerHTML = this.times
      setTimeout(() => {
        this.times--
        this.countDown()
      }, 1000)
    }
  },
  mounted() {
    this.activeName = this.$route.params.id
  },
  watch: {
    $route(val) {
      this.activeName = val.params.id
    }
  }
}
</script>
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.select-ways {
  background-color: hsl(0, 0%, 100%);
  .ways-con {
    position: relative;
    .margin(100, 70, 70, 70);
    background-color: #f5f5f5;
    .b-radius(50);
    .ways-con--btn {
      display: flex;
      flex-direction: column;
      button {
        flex: 1;
        border: 1px solid #c54f8b;
        background-color: #f5f5f5;
        color: #c54f8b;
        .fs(12);
        letter-spacing: 3px;
        .pt(7);
        .pb(7);
        .margin(40, 50, 0, 50);
      }
    }
    .ways-con--return {
      button {
        flex: 1;
        background-color: #c54f8b;
        color: #fff;
        .fs(12);
        .padding(7, 50, 7, 50);
        .mt(40);
      }
    }
    .ways-con--ser {
      position: absolute;
      bottom: 20px;
      left: 30px;
      .fs(12);
      letter-spacing: 3px;
      color: #868686;
    }
  }
  button {
    .b-radius(60);
    border: none;
  }
  .ways-footer {
    position: sticky !important;
    bottom: 0;
    .pt(30);
    .pb(30);
    width: 100%;
    background-color: #f5f5f5;
    box-sizing: border-box;
    display: flex;
    .ways-footer--btn {
      flex: 1;
      margin: 0 auto;
      background-color: #c54f8b;
      color: white;
      .fs(25);
      .pt(10);
      .pb(10);
      .ml(20);
      .mr(20);
      font-weight: bold;
    }
  }
  .register-content__info {
    .margin(40, 50, 0, 50);
    div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 1px solid #c54f8b;
      color: #000;
      .b-radius(40);
      .mt(40);
      input {
        flex: 1;
        .pt(50);
        .pb(5);
        text-align: center;
        background: none;
        outline: none;
      }
      .register-btn {
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
        // border: solid 1px #c54f8b;
        background: #c54f8b;
        color: #f5f5f5;
        .w(180);
        text-align: center;
        line-height: 28px;
      }
    }
  }
  /deep/.van-field__control {
    display: block;
    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding: 2px 0;
    color: #323233;
    text-align: center;
    background-color: transparent;
    border: 0;
    resize: none;
  }
}
</style>
