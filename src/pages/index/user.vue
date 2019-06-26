<template>
  <div class="content-box">
    <common-header :tittle="tittle" :headerColor="headerColor" :showback="true" :showmore='true'></common-header>
    <div class="user-main">
      <h4 class="user-nick-name">{{nickName}}</h4>
      <div class="user-label-name">{{labelName}}</div>
    </div>
    <div class="user-list">
      <img class="user-img" :src="userImg" alt="" srcset="">
      <ul>
        <li v-for="(item,index) in userList" :key="index" :style="{backgroundColor:item.bg}">
          <span :style="{color:item.color}" class="text">{{item.label}}</span>
          <span v-if="item.tips" class="tips">{{item.tips}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapState } from 'vuex'
import commonHeader from 'common/common-header'
export default {
  data() {
    return {
      tittle: '',
      headerColor: '#222230',
      num: 0,
      nickName: '你的昵称',
      labelName: '炫酷的标签名称',
      userImg: require('@/assets/imgs/user-img.png'),
      userList: [
        {
          bg: '#1e384a',
          color: '#1283a0',
          label: '简历'
        },
        {
          bg: '#423432',
          color: '#FF9F44',
          label: '我的任务'
        },
        {
          bg: '#1e363c',
          color: '#15A885',
          label: '消息',
          tips: 6
        },
        {
          bg: '#402834',
          color: '#EE5353',
          label: '客服'
        }
      ]
    }
  },
  created() {},
  methods: {
    ...mapMutations({
      setNum: 'SET_NUM'
    }),
    todetail() {
      this.$router.togo('/Home/Detail')
    }
  },
  components: {
    commonHeader
  },
  computed: {
    ...mapGetters(['number']),
    ...mapState({
      number: state => state.home.number
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.page-content {
  .mb(98);
}
.user-main {
  .h(300);
  .pt(20);
  background: #222230;
  .user-nick-name {
    .fs(@base-header-size);
    color: @base-font-color;
  }
  .user-label-name{
    .fs(18);
    color: #1283a0;
    .margin(20,100,20,100);
    .pt(10);
    .pb(10);
    .b-radius(50);
    background: #1e384a;
  }
}
.user-list{
  .user-img{
    .w(260);
    .h(260);
    .mt(-150);
    .mb(40);
    .b-radius(500);
    border: 10px solid #222230;
  }
  li{
    position: relative;
    .mt(30);
    .mr(60);
    .ml(60);
    .pt(20);
    .pb(20);
    .b-radius(30);
    text-align:center;
    .tips{
      position:absolute;
      .right(20);
      .top(-10);
      color: #fff;
      background: #14A5AE;
      .w(40);
      .h(40);
      .lh(40);
      .b-radius(100)
    }
  }
}
</style>
