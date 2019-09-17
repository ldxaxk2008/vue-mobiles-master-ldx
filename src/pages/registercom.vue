<template>
  <div class="register">
    <common-header :tittle="tittle" :showback="true"></common-header>
    <div style="flex:1;overflow:auto;">
      <div class="register-content">
        <form ref="registerform" :model="registerlist">
          <div class="register-content--img">
            <div class="register-logoborder">
              <van-uploader :after-read="afterRead" accept="image/png, image/jpeg">
                <img v-if="imgShow" class="logo" :src="registerlist.Img?registerlist.Img:headimg" alt ref="goodimg" />
                <div v-if="!imgShow" class="logo" ref="goodimg">
                  <van-icon size="40" name="plus" color="rgb(230, 207, 207)"/>
                </div>
              </van-uploader>
            </div>
            <p class="register-content__describe">添加一张您的头像</p>
          </div>
          <div class="register-content__info">
            <van-field v-model="registerlist.company_name" placeholder="公司名称" />
            <van-field v-model="registerlist.code" placeholder="工商编号" />
            <van-field v-model="registerlist.industry" placeholder="行业" />
            <van-field v-model="registerlist.contact_person" placeholder="联系人" />
            <van-field v-model="registerlist.email" placeholder="联系邮箱" />
            <van-field v-model="registerlist.phone" placeholder="联系电话">
              <van-button slot="button" class="register-btn" size="small" type="primary">发送验证码</van-button>
            </van-field>
            <van-field v-model="registerlist.vercode" placeholder="验证码" />
            <van-field v-model="registerlist.username" placeholder="登录用户名" />
            <van-field v-model="registerlist.password"  type="password" placeholder="登录密码" />
            <van-field
              v-model="registerlist.confirm_password"
              type="password"
              placeholder="确认登录密码"
            />
          </div>
        </form>
      </div>
    </div>
    <div class="register-footer">
      <button class="register-footer--btn" @click="addlevel">加入Level up</button>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import { uploadImg } from 'api/register-api'
import { ERR_OK } from 'config/index'
import commonHeader from 'common/common-header'

export default {
  components: {
    commonHeader
  },
  data() {
    return {
      imgShow: false,
      img: '',
      tittle: '',
      headimg: require('@/assets/imgs/user-img.png'),
      registerlist: {
        Img: '',
        username: '',
        contact_person: '',
        company_name: '',
        phone: '',
        user_type: 1,
        code: '',
        vercode: '', // 验证码
        email: '',
        password: '',
        confirm_password: '',
        industry: ''
      }
    }
  },
  methods: {
    ...mapMutations(['SET_TOKEN']),
    afterRead(file) {
      console.log(111)
      this.imgShow = true
      this.registerlist.Img = file.content
      this.$refs.goodimg.src = file.content
      this.img = file
    },
    addlevel() {
      var phoneReg = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/
      var nameReg = /^(?![^a-zA-Z]+$)(?!\D+$)(?![^_]+$).{3,16}$/ // 验证姓名正则
      var emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,6}))$/ // 邮箱验证
      var codeReg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)\S{8,}$/ // 密码校验
      if (this.registerlist.company_name === '') {
        this.$toast({
          message: '请输入公司名称'
        })
        return
      }
      if (this.registerlist.code === '') {
        this.$toast({
          message: '请输入工商编号'
        })
        return
      }
      if (this.registerlist.contact_person === '') {
        this.$toast({
          message: '请输入联系人'
        })
        return
      }
      if (this.registerlist.email === '') {
        this.$toast({
          message: '请输入联系邮箱'
        })
        return
      } else if (!emailReg.test(this.registerlist.email)) {
        this.$toast({
          message: '请输入邮箱正确格式'
        })
        return
      }
      if (this.registerlist.phone === '') {
        this.$toast({
          message: '请输入电话号码'
        })
        return
      } else if (!phoneReg.test(this.registerlist.phone)) {
        this.$toast({
          message: '请输入电话号码正确格式'
        })
        return
      }
      if (this.registerlist.vercode === '') {
        this.$toast({
          message: '请输入验证码'
        })
        return
      }
      if (this.registerlist.username === '') {
        this.$toast({
          message: '请输入用户名'
        })
        return
      } else if (!nameReg.test(this.registerlist.username)) {
        this.$toast({
          message: '用户名只能由数字、字母、下划线组成!'
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
        return
      } else if (
        this.registerlist.confirm_password !== this.registerlist.password
      ) {
        this.$toast({
          message: '两次密码不一致'
        })
        return
      }
      var formdata = new FormData()
      formdata.append('image', this.img.file)
      formdata.append('username', this.registerlist.username)
      formdata.append('industry', this.registerlist.industry)
      formdata.append('phone', this.registerlist.phone)
      formdata.append('user_type', this.registerlist.user_type)
      formdata.append('password', this.registerlist.password)
      formdata.append('confirm_password', this.registerlist.confirm_password)
      formdata.append('company_name', this.registerlist.company_name)
      formdata.append('code', this.registerlist.code)
      formdata.append('contact_person', this.registerlist.contact_person)
      console.log(this.registerlist)
      uploadImg(formdata).then((res) => {
        console.log(res, 999)
        if (res.data.success === ERR_OK) {
          this.SET_TOKEN(res.data)
          this.$toast(res.data.msg)
          this.$router.push('/home')
        } else {
          this.$toast(res.data.msg)
        }
      }).catch(() => {
      })
    }
  },
  mounted() {}
}
</script>

<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.register {
  //全局样式样式去掉
  // * {
  //   touch-action: pan-y;
  // }
  background-color: hsl(0, 0%, 100%);
  .register-content--img {
    position: relative;
    top: -40px;
  }
  .register-logoborder {
    .w(200);
    .h(200);
    .b-radius(500);
     /*! autoprefixer: off */
    background: -webkit-linear-gradient(right, #af002a, #e5d200);
    /* autoprefixer: on */
    background:-moz-linear-gradient(right, #af002a, #e5d200);
    background:-o-linear-gradient(right,#af002a, #e5d200);
    background:linear-gradient(right,#af002a, #e5d200);
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .logo {
    .w(170);
    .h(170);
    .b-radius(500);
    border: 5px solid #ffffff;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .register-content {
    .margin(150, 80, 30, 80);
    .pl(30);
    .pr(30);
    .b-radius(60);
    background-color: #f5f5f5;
    .register-content__describe {
      .pt(10);
      font-weight: bold;
      color: #c54f8b;
    }
  }
  button {
    .b-radius(60);
    border: none;
  }
  .register-content__info {
    .pb(30);
    .van-cell {
      background-color: #fff;
      .mt(30);
    }
    div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 1px solid #c54f8b;
      color: #000;
      .b-radius(40);
      input {
        flex: 1;
        .pt(5);
        .pb(5);
        text-align: center;
        background: none;
        outline: none;
      }
      .register-btn {
        .mr(0);
        .padding(5, 30, 5, 30);
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
        border: solid 1px #c54f8b;
        height: 34px;
      }
    }
  }
  .register-footer {
    position: sticky !important;
    bottom: 0;
    .pt(30);
    .pb(30);
    width: 100%;
    background-color: #f5f5f5;
    box-sizing: border-box;
    display: flex;
    .register-footer--btn {
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
}
</style>
<style>
  .van-field__control {
    display: block;
    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding: 5px 0;
    color: #323233;
    text-align: center;
    background-color: transparent;
    border: 0;
    resize: none;
  }
  .van-button--primary {
    color: #fff;
    background-color: #c54f8b;
    border: 1px solid #c54f8b;
  }
</style>
