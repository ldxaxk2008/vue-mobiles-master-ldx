<template>
    <div class="level-content">
    <common-header :headerColor="headerColor" :tittle="tittle" :showback="true" :showmore='false'></common-header>
    <div>
        <ul class="level-content--ul">
            <li class="leve--ul_top" v-if="activeName==='enter'">注册完成</li>
            <li class="leve--ul_top"  v-if="activeName!=='enter'"><img src="@/assets/imgs/Logo.png" alt=""></li>
            <div class="leve--ul_top-btn">
               <li class="leve--ul_-bot" v-if="activeName==='role'" @click="handelClick">我是学生</li>
               <li class="leve--ul_-bot" v-if="activeName==='role'" @click="handelClicks">我是公司</li>
            </div>
            <li class="leve--ul_-bott" v-if="activeName==='enter'" @click="handelClick">进入LEVE UP</li>
            <li class="leve--ul_-mid">为学生创造价值的平台</li>
            <li class="leve--ul_-bott" v-if="activeName==='experience'" @click="handelClick">开始体验</li>
        </ul>
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
      activeName: ''
    }
  },
  methods: {
    handelClick() {
      if (this.activeName === 'experience') {
        this.$router.push('/levelup/role')
      } else if (this.activeName === 'role') {
        this.$router.push('/Register')
      } else if (this.activeName === 'enter') {
        this.$router.push('/index')
      }
    },
    handelClicks() {
      if (this.activeName === 'role') {
        this.$router.push('/Registercom')
      }
    }
  },
  mounted() {
    this.activeName = this.$route.params.id
  },
  // 监听路由的变化
  watch: {
    $route(val) {
      console.log(val, 888)
      this.activeName = val.params.id
    }
  }
}
</script>

<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.level-content {
   background:linear-gradient(bottom,#b92671 0%,#f9ce20 90%, #f9ce20 100%);
  .level-content--ul{
      color:#fff;
    .leve--ul_top{
        .fs(40);
        letter-spacing:10px;
        .pt(300);
        .pb(450);
    }
    .leve--ul_-mid{
        .fs(12);
        letter-spacing:10px;
        font-weight: bold;
    }
    .leve--ul_top-btn{
      .ml(100);
      .mr(100);
      display: flex;
      justify-content: space-around;
    }
    .leve--ul_-bot{
        .fs(30);
        letter-spacing:5px;
        font-weight: bold;
        border: 1px solid #fff;
        .b-radius(70);
        .padding(5,15,5,15);
        .mb(50);
    }
    .leve--ul_-bott{
      .fs(30);
      letter-spacing:5px;
      font-weight: bold;
      border: 1px solid #fff;
      .b-radius(70);
      .mr(200);
      .ml(200);
      .mb(50);
      .mt(50);
      .padding(5,15,5,15);
    }
  }
}
</style>
