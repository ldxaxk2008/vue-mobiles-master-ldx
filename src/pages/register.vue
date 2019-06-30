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
                  <div class="register-content__all">
                  <input id="register-content__info--phone" type="text" v-model="registerlist.phone" placeholder="联系电话">
                  <p id="register-content__info--word">获取验证码</p>
                  </div>
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
        backgroundImage: 'url(' + require('@/assets/imgs/timg.jpeg') + ')'
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
      if (this.backgroundimg.backgroundImage === 'url(' + require('@/assets/imgs/timg.jpeg') + ')') {
        this.$refs.male.style.backgroundColor = '#182B2A'
        this.$refs.male.style.color = '#167057'
      } else {
        this.$refs.male.style.backgroundColor = '#182B2A'
        this.$refs.male.style.color = '#167057'
        this.$refs.famale.style.backgroundColor = '#E65155'
        this.$refs.famale.style.color = 'white'
        this.headimg = require('@/assets/imgs/user-img.png')
        this.backgroundimg.backgroundImage = 'url(' + require('@/assets/imgs/timg.jpeg') + ')'
      }
    },
    famale() {
      this.$refs.male.style.backgroundColor = '#3CB371'
      this.$refs.male.style.color = 'white'
      this.$refs.famale.style.backgroundColor = '#5D252E'
      this.$refs.famale.style.color = '#7F2932'
      this.headimg = require('@/assets/imgs/img.jpeg')
      this.backgroundimg.backgroundImage = 'url(' + require('@/assets/imgs/timgs.jpeg') + ')'
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
      .top(80);
      .w(180);
      .h(180);
      .b-radius(500);
      z-index: 1;
    }
    .register-content{
      .mt(170);
      .mb(25);
      .ml(80);
      .mr(80);
      .b-radius(60);
      background-color: rgba(89, 81, 88,0.2);
      position:static;
      .register-content__describe{
          .pt(100);
          font-weight: bold;
          color:#17626F;
          position:relitave;
      }
    }
    .register-content__sex{
      .mt(25);
      .mb(25);
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
      background-color:#182B2A;
      color:#167057;
    }
    .famale{
      font-weight:bold;
      background-color: #E65155;
      color:white;
    }
   .register-content__info{
       margin:0 auto;
       .mb(60);
      //  .pb(50);
       input{
        //  display: block;
        .mt(30);
        .pr(120);
        .pl(120);
        .pt(15);
        .pb(15);
        .b-radius(30);
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
        .fs(25);
        .pl(80);
        .pr(80);
        .pt(10);
        .pb(10);
        font-weight: bold;
     }
   }
   .register-content__all{
       position: relative;
       #register-content__info--word{
        position: absolute;
        .left(390);
        .top(30);
        // .w(150);
        .pt(14);
        .pb(14);
        .pl(15);
        .pr(15);
         border: 1px solid #165972;
         border-top-right-radius:20px;
         border-bottom-right-radius:20px;
         background-color:rgb(79, 118, 113);
         color: grey;
     }
   }
   #register-content__info--phone{
    //  .w(120);
     .pr(100);
     .pl(0);
     .mr(143);
     z-index: 100;
    text-align: left !important;
    border-top-right-radius:0px;
    border-bottom-right-radius:0px;
   }
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
