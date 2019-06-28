<template>
    <div class="register" :style="backgroundimg">
        <img :src="headimg" alt="logo" class="logo">
          <div class="register-content">
              <p class="register-content__describe">添加一张您的头像</p>
              <div class="register-content__sex">
                  <button v-for="item in sexlist" :key="item" v-bind:class="{'active':item.disable,'disable':!item.disable}" @click="item.fun">{{item.name}}</button>
              </div>
              <div class="register-content__info">
                  <input type="text" v-for="item in infolist" :key="item" :placeholder="item.name" value="">
              </div>
          </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      infolist: [
        {
          name: '姓名'
        },
        {
          name: '学校'
        },
        {
          name: '年级'
        },
        {
          name: '联系电话'
        },
        {
          name: '验证码'
        },
        {
          name: '登录用户名'
        },
        {
          name: '登录密码'
        },
        {
          name: '确认登录密码'
        }
      ],
      sexlist: [
        {
          name: '男生',
          disable: true,
          fun: () => {
            return this.aaa()
          }
        },
        {
          name: '女生',
          disable: false,
          fun: () => {
            return this.bbb()
          }
        }
      ],
      headimg: require('@/assets/imgs/user-img.png'),
      backgroundimg: {
        backgroundImage: 'url(' + require('@/assets/imgs/img.jpeg') + ')'
      }
    }
  },
  methods: {
    aaa() {
      this.sexlist.forEach(ele => {
        if (ele.name === '男生') {
          ele.disable = true
        } else {
          ele.disable = false
        }
      })
      this.backgroundimg.backgroundImage = 'url(' + require('@/assets/imgs/user-img.png') + ')'
    },
    bbb() {
      this.sexlist.forEach(ele => {
        console.log(ele.name)
        if (ele.name === '女生') {
          ele.disable = true
        } else {
          ele.disable = false
        }
      })
      this.backgroundimg.backgroundImage = 'url(' + require('@/assets/imgs/img.jpeg') + ')'
    }
  }
}
</script>

<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.register{
    background:no-repeat center top;
    background-size: cover;
    .logo{
     position: relative;
      .left(280);
      .top(150);
      .w(180);
      .h(180);
      .b-radius(100);
      z-index: 1;
    }
    .register-content{
      .mt(80);
      .mb(200);
      .ml(100);
      .mr(100);
      border: 1px solid;
      .b-radius(50);
      background-color: rgb(26,25,36);
      opacity:0.4;
      .register-content__describe{
          .pt(100);
          color:rgb(23,65,76);
      }
    }
    .register-content__sex{
      .mt(50);
      .mb(50);
    }
    button{
         .pr(30);
            .pl(30);
            .pt(10);
            .pb(10);
             border: 1px solid;
            .b-radius(50);
    }
   .active{
     background-color: rgb(23,40,45);
     color:white;
   }
   .disable{
    background-color: red;
     color:white;
   }
   .register-content__info{
       .mb(60);
       li{
        .pr(30);
        .pl(30);
        .pt(10);
        .pb(10);
        .ml(60);
        .mr(60);
        .mt(20);
        border:1px solid rgb(24,156,109);
        .b-radius(50);
       }
   }
}
</style>
