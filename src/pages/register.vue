<template>
    <div class="register">
          <div style="flex:1;overflow:auto;">
            <div class="register-content">
              <div class="register-content--img">
                 <div class="register-logoborder">
                  <img :src="headimg" alt="logo" class="logo">
                </div>
                <p class="register-content__describe">添加一张您的头像</p>
              </div>
              <div class="register-content__sex">
                  <button class="male" ref="male" @click="male">男生</button><button class="famale" ref="famale"  @click="famale">女生</button>
              </div>
              <div>
                <form class="register-content__info" ref="registerform" :model="registerlist" >
                  <div><input type="text" v-model="registerlist.name" placeholder="姓名"></div>
                  <div><input type="text" v-model="registerlist.school" placeholder="学校"></div>
                  <div><input type="text" v-model="registerlist.grade" placeholder="年级"></div>
                  <div><input class="register-content__info--phone" type="text" v-model="registerlist.phone" placeholder="联系电话">
                  <span class="register-content__info--word">获取验证码</span></div>
                  <div><input type="text" v-model="registerlist.code" placeholder="验证码"></div>
                  <div><input type="text" v-model="registerlist.username" placeholder="登录用户名"></div>
                  <div><input type="text" v-model="registerlist.loginword" placeholder="登录密码"></div>
                  <div><input type="text" v-model="registerlist.confirmword" placeholder="确认登录密码"></div>
                </form>
              </div>
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
      // backgroundimg: {
      //   backgroundImage: 'url(' + require('@/assets/imgs/timg.jpeg') + ')'
      // },
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
      if (this.headimg === 'url(' + require('@/assets/imgs/user-img.png') + ')') {
        this.$refs.male.style.backgroundColor = '#182B2A'
        this.$refs.male.style.color = '#167057'
      } else {
        this.$refs.male.style.backgroundColor = '#182B2A'
        this.$refs.male.style.color = '#167057'
        this.$refs.famale.style.backgroundColor = '#E65155'
        this.$refs.famale.style.color = 'white'
        this.headimg = require('@/assets/imgs/user-img.png')
      }
    },
    famale() {
      this.$refs.male.style.backgroundColor = '#3CB371'
      this.$refs.male.style.color = 'white'
      this.$refs.famale.style.backgroundColor = '#5D252E'
      this.$refs.famale.style.color = '#7F2932'
      this.headimg = require('@/assets/imgs/img.jpeg')
    },
    addlevel() {
      // var phoneReg = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/
      // var nameReg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/ // 验证姓名正则
      // var codeReg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)\S{8,}$/ // 密码校验
      // if (this.registerlist.name === '') {
      //   this.$toast({
      //     message: '请输入姓名'
      //   })
      //   return
      // } else if (!nameReg.test(this.registerlist.name)) {
      //   this.$toast({
      //     message: '请输入正确格式'
      //   })
      //   return
      // }
      // if (this.registerlist.school === '') {
      //   this.$toast({
      //     message: '请输入学校'
      //   })
      //   return
      // }
      // if (this.registerlist.grade === '') {
      //   this.$toast({
      //     message: '请输入年级'
      //   })
      //   return
      // }
      // if (this.registerlist.phone === '') {
      //   this.$toast({
      //     message: '请输入电话号码'
      //   })
      //   return
      // } else if (!phoneReg.test(this.registerlist.phone)) {
      //   this.$toast({
      //     message: '请输入正确电话号码'
      //   })
      //   return
      // } else if (this.registerlist.phone.toString().length !== 11) {
      //   this.$toast({
      //     message: '电话号码必须是11位'
      //   })
      //   return
      // }
      // if (this.registerlist.code === '') {
      //   this.$toast({
      //     message: '请输入验证码'
      //   })
      //   return
      // }
      // if (this.registerlist.username === '') {
      //   this.$toast({
      //     message: '请输入登录用户名'
      //   })
      //   return
      // }
      // if (this.registerlist.loginword === '') {
      //   this.$toast({
      //     message: '请输入登录密码'
      //   })
      //   return
      // } else if (!codeReg.test(this.registerlist.loginword)) {
      //   this.$toast({
      //     message: '密码至少为8位,字母、数字'
      //   })
      //   return
      // }
      // if (this.registerlist.confirmword === '') {
      //   this.$toast({
      //     message: '请确认登录密码'
      //   })
      //   return
      // } else if (this.registerlist.confirmword !== this.registerlist.loginword) {
      //   this.$toast({
      //     message: '两次密码不一致'
      //   })
      //   return
      // }
      this.$router.push('/levelup/enter')
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
    background-color: hsl(0, 0%, 100%);
     .register-content--img{
      position: relative;
      top:-40px;
    }
    .register-logoborder{
      .w(200);
      .h(200);
      .b-radius(500);
      background: linear-gradient(to right,#AF002A,#E5D200);
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .logo{
      .w(170);
      .h(170);
      .b-radius(500);
      border: 5px solid #ffffff;
    }
    .register-content{
      .margin(150,80,30,80);
      .pl(30);
      .pr(30);
      .b-radius(60);
      background-color: #f5f5f5;
      .register-content__describe{
        .pt(10);
        font-weight: bold;
        color:#c54f8b;
      }
    }
    .register-content__sex{
      .mt(-40);
      .mb(40);
    }
    button{
      .mr(10);
      .ml(10);
      .padding(10,40,10,40);
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
      .pb(30);
      div{
        display: flex;
        justify-content: space-between;
        border: 1px solid #c54f8b;
        color: #000;
        .b-radius(40);
        .mt(30);
      }
       input{
        flex:1;
        .pt(15);
        .pb(15);
        text-align: center;
        background: none;
        outline: none;
       }
      .register-content__info--word{
        .padding(15,10,15,10);
         border-top-right-radius:15px;
         border-bottom-right-radius:15px;
         background-color:#c54f8b;
         color: #fff;
      }
   }
   .register-footer{
      position: sticky !important;
      bottom: 0;
     .pt(30);
     .pb(30);
     width: 100%;
     background-color:#f5f5f5;
     box-sizing: border-box;
     display: flex;
     .register-footer--btn{
        flex: 1;
        margin:0 auto;
        background-color:#c54f8b;
        color:white;
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
