<template>
  <div class="register">
    <div style="flex:1;overflow:auto;">
      <div class="register-content">
        <form ref="registerform" :model="registerlist">
          <div class="register-content--img">
            <div class="register-logoborder">
              <van-uploader :after-read="afterRead" accept="image/png, image/jpeg">
                <img class="logo" :src="registerlist.headimg" alt ref="goodimg" />
              </van-uploader>
            </div>
            <p class="register-content__describe">添加一张您的头像</p>
          </div>
          <div class="register-content__sex">
            <button
              v-for="(item,index) in sexlist"
              :key="index"
              @click="hanleclick($event,item,index)"
              ref="sex"
            >{{item.value}}</button>
          </div>
          <van-action-sheet class="register-seclect" v-model="show" :actions="actions" @select="onSelect" />
          <div class="register-content__info">
            <van-field v-model="registerlist.username" placeholder="姓名" />
            <van-field v-model="registerlist.school_name" placeholder="学校" />
            <van-field v-model="registerlist.grade" placeholder="请选择年级" @click="popup" />
            <van-field v-model="registerlist.phone" placeholder="联系电话">
              <van-button slot="button" class="register-btn" size="small" type="primary">发送验证码</van-button>
            </van-field>
            <van-field  v-model="registerlist.code" placeholder="验证码" />
            <van-field  v-model="registerlist.user_type" placeholder="登录用户名" />
            <van-field  v-model="registerlist.password" type="password" placeholder="登录密码" />
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
export default {
  data() {
    return {
      show: false,
      sexlist: [
        {
          value: '男',
          label: 'man'
        },
        {
          value: '女',
          label: 'woman'
        }
      ],
      actions: [
        { value: 1, name: '大一' },
        { value: 2, name: '大二' },
        { value: 3, name: '大三' },
        { value: 4, name: '大四' }
      ],
      registerlist: {
        headimg: require('@/assets/imgs/user-img.png'),
        sex: 'man',
        username: '',
        school_name: '',
        grade: '',
        phone: '',
        // code: '',验证码
        user_type: '',
        password: '',
        confirm_password: ''
      }
    }
  },
  methods: {
    afterRead(file) {
      this.$refs.goodimg.src = file.content
    },
    // 性别选择
    hanleclick(event, item, index) {
      let btn = this.$refs.sex
      for (var i = 0; i < btn.length; i++) {
        btn[i].className = ''
      }
      event.target.className = item.label
      this.registerlist.sex = item.label
    },
    onSelect(item) {
      this.registerlist.grade = item.name
      console.log(this.registerlist.grade)
      this.show = false
    },
    popup() {
      console.log(111)
      this.show = true
    },
    addlevel() {
      var nameReg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/ // 验证姓名正则
      var codeReg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)\S{8,}$/ // 密码校验
      if (this.registerlist.username === '') {
        this.$toast({
          message: '请输入姓名'
        })
        return
      } else if (!nameReg.test(this.registerlist.username)) {
        this.$toast({
          message: '请输入正确格式'
        })
        return
      }

      if (this.registerlist.user_type === '') {
        this.$toast({
          message: '请输入登录用户名'
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
      this.$router.push('/levelup/enter')
    }
  },
  mounted() {
    this.$refs.sex[0].className = 'man'
  }
}
</script>

<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.register {
  //全局样式样式去掉
  * {
    touch-action: pan-y;
  }
  background-color: hsl(0, 0%, 100%);
  .register-content--img {
    position: relative;
    top: -40px;
  }
  .register-logoborder {
    .w(200);
    .h(200);
    .b-radius(500);
    background: linear-gradient(to right, #af002a, #e5d200);
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .logo {
    .w(170);
    .h(170);
    .mt(7);
    .b-radius(500);
    border: 5px solid #ffffff;
    background: #ffffff;
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
  .register-content__sex {
    .mt(-40);
    .mb(40);
  }
  button {
    .mr(10);
    .ml(10);
    .padding(10, 50, 10, 50);
    .b-radius(60);
    border: none;
  }
  .man {
    background-color: rgb(27, 158, 168);
    color: #f5f5f5;
  }
  .woman {
    background-color: rgb(221, 129, 155);
    color: hsl(0, 0%, 96%);
  }
  .register-content__info {
    .pb(30);
    .van-cell {
      background-color: #fff;
      .mt(30);
    }
    .register-seclect{
      .b-radius(0) !important;
      border: 1px solid #f5f5f5;
    }
    div{
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
    // div:nth-child(3){
    //    .b-radius(0) !important;
    //   border: 1px solid #f5f5f5;
    // }
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
  .van-action-sheet__item {
    font-size: 16px;
    line-height: 30px;
    height: 30px;
    text-align: center;
   }
   /deep/.van-field__control {
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
  /deep/.van-button--primary {
    color: #fff;
    background-color: #c54f8b;
    border: 1px solid #c54f8b;
  }
}
</style>
