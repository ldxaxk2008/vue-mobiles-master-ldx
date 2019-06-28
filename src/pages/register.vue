<template>
    <div class="register" :style="backgroundimg">
        <img :src="headimg" alt="logo" class="logo">
          <div class="register-content">
              <p class="register-content__describe">添加一张您的头像</p>
              <div class="register-content__sex">
                  <button class="male" ref="male" @click="male">男生</button><button class="famale" ref="famale"  @click="famale">女生</button>
              </div>
              <div class="register-content__info">
                <form ref="registerform" :model="registerlist" >
                  <input type="text" v-model="registerlist.name" placeholder="姓名">
                  <input type="text" v-model="registerlist.school" placeholder="学校">
                  <input type="text" v-model="registerlist.grade" placeholder="年级">
                  <input id="register-content__info--phone" type="text" v-model="registerlist.phone" placeholder="联系电话">
                  <button id="register-content__info--word">获取验证码</button>
                  <input type="text" v-model="registerlist.code" placeholder="验证码">
                  <input type="text" v-model="registerlist.username" placeholder="登录用户名">
                  <input type="text" v-model="registerlist.loginword" placeholder="登录密码">
                  <input type="text" v-model="registerlist.confirmword" placeholder="确认登录密码">
                </form>
              </div>
          </div>
          <div class="register-footer">
                 <button  class="register-footer--btn" @click="addlevel">加入Level up</button>
          </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      headimg: require('@/assets/imgs/user-img.png'),
      backgroundimg: {
        backgroundImage: 'url(' + require('@/assets/imgs/tu1.jpeg') + ')'
      },
      registerlist: {
        name: '',
        school: '',
        grade: '',
        phone: '',
        code: '',
        username: '',
        loginword: '',
        confirmword: ''
      }
    }
  },
  methods: {
    male() {
      if (this.backgroundimg.backgroundImage === 'url(' + require('@/assets/imgs/tu1.jpeg') + ')') {
        this.$refs.male.style.backgroundColor = '#556B2F'
        this.$refs.male.style.color = '#3CB371'
      } else {
        this.$refs.male.style.backgroundColor = '#556B2F'
        this.$refs.male.style.color = '#3CB371'
        this.$refs.famale.style.backgroundColor = 'red'
        this.$refs.famale.style.color = 'white'
        this.headimg = require('@/assets/imgs/user-img.png')
        this.backgroundimg.backgroundImage = 'url(' + require('@/assets/imgs/tu1.jpeg') + ')'
      }
    },
    famale() {
      this.$refs.male.style.backgroundColor = '#3CB371'
      this.$refs.male.style.color = 'white'
      this.$refs.famale.style.backgroundColor = '#5D252E'
      this.$refs.famale.style.color = 'red'
      this.headimg = require('@/assets/imgs/img.jpeg')
      this.backgroundimg.backgroundImage = 'url(' + require('@/assets/imgs/tu2.png') + ')'
    },
    addlevel() {
      var phoneReg = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/
      var nameReg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/ // 验证姓名正则
      var codeReg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)\S{8,}$/ // 密码校验
      if (this.registerlist.name === '') {
        alert('请输入姓名')
      } else if (!nameReg.test(this.registerlist.name)) {
        alert('请输入正确格式')
      }
      if (this.registerlist.school === '') {
        alert('请输入学校')
      }
      if (this.registerlist.grade === '') {
        alert('请输入年级')
      }
      if (this.registerlist.phone === '') {
        alert('请输入电话号码')
      } else if (!phoneReg.test(this.registerlist.phone)) {
        alert('请输入正确电话号码')
      } else if (this.registerlist.phone.toString().length !== 11) {
        alert('电话号码必须是11位')
      }
      if (this.registerlist.code === '') {
        alert('请输入验证码')
      }
      if (this.registerlist.username === '') {
        alert('请输入登录用户名')
      }
      if (this.registerlist.loginword === '') {
        alert('请输入登录密码')
      } else if (!codeReg.test(this.registerlist.loginword)) {
        alert('密码至少为8位,字母、数字')
      }
      if (this.registerlist.confirmword === '') {
        alert('请确认登录密码')
      } else if (this.registerlist.confirmword !== this.registerlist.loginword) {
        alert('两次密码不一致')
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.register{
  //全局样式样式去掉
   * { touch-action: pan-y; }
    background:no-repeat center top;
    background-size: cover;
    position: relative;
    .logo{
      position: absolute;
      .left(280);
      .top(110);
      .w(180);
      .h(180);
      .b-radius(500);
      z-index: 1;
    }
    .register-content{
      .mt(200);
      .mb(35);
      .ml(100);
      .mr(100);
      .b-radius(50);
      background-color: rgba(0,0,0,0.1);
      position:static;
      .register-content__describe{
          .pt(100);
          font-weight: bold;
          color:#17626F;
          position:relitave;
      }
    }
    .register-content__sex{
      .mt(30);
      .mb(40);
    }
    button{
      .mr(10);
      .ml(10);
      .pr(40);
      .pl(40);
      .pt(10);
      .pb(10);
      .b-radius(50);
      border:none;
    }
    .male{
      font-weight:bold;
      background-color:#556B2F;
      color:#3CB371;
    }
    .famale{
      font-weight:bold;
      background-color:red;
      color:white;
    }
   .register-content__info{
     position: relative;
       #register-content__info--word{
        position: absolute;
        .left(300);
        .top(280);
     }
       margin:0 auto;
       .mb(60);
       input{
        .mt(30);
        .pr(110);
        .pl(110);
        .pt(10);
        .pb(10);
        .b-radius(20);
        border: 1px solid #165972;
        background-color:transparent;
        color: white;
        text-align: center;
       }
   }
   .register-footer{
     .pt(26);
     .pb(25);
     background-color:#222230;
     position:relitave;
     .register-footer--btn{
        margin:0 auto;
        background-color:#17626F;
        color:white;
        .fs(30);
        .pl(80);
        .pr(80);
        .pt(15);
        .pb(15);
        font-weight: bold;
     }
   }
  //  #register-content__info--phone{
  //    .w(50);
  //    .pr(30);
  //    .pl(30);
  //    .ml(-10);
  //    z-index: 100;
  //   text-align: left !important;
  //  }
   input::-ms-input-placeholder{
            text-align: center;
            color:#53535D;
    }
    input::-webkit-input-placeholder{
            text-align: center;
            color:#53535D;
    }
}
</style>
