<template>
  <div class="content-box">
    <common-header :showinput="true" :headerColor="headerColor" :showback="false"></common-header>
    <div class="page-content">
      <!-- <mt-button @click="todetail">home</mt-button> -->
      <div class="page-map">
        <div class="page-map--van">
        <van-icon name="clock-o" /><p>平面设计 文案代码</p>
        </div>
        <ul class="page-map--ul">
          <li v-for="item in maplist" :key="item">
            <img :src="item.img" alt="">
            <p class="page-map--p">{{item.name}}</p>
          </li>
        </ul>
      </div>
      <div class="page-map-vantabs">
        <div class="page-map--search">
        <van-tabs v-model="active" @click="onClick" >
          <van-tab title="综合">
            <div class="page-map--tab">
               <currentList :currentList="currentList"/>
            </div>
          </van-tab>
          <van-tab title="价格">
            <div class="page-map--tab">
               <currentList :currentList="currentprice"/>
            </div>
          </van-tab>
          <van-tab title="热度">
              <div class="page-map--tab">
               <currentList :currentList="currentList"/>
              </div>
          </van-tab>
        </van-tabs>
        </div>
        <span class="page-map__p">筛选</span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapGetters, mapState} from 'vuex'
import commonHeader from 'common/common-header'
import currentList from '@/pages/taskList/currentTaskList'

// import * as homeApi from 'api/home-api'
// import { ERR_OK } from 'config/index'
export default {
  data () {
    return {
      headerColor: '#fff',
      currentList: [
        {
          name: '设计',
          people: 18,
          money: 500,
          days: 3,
          ask: '任务要求任务要求任务要求任务要求任务要求',
          label: ['设计', '教育培训'],
          data: '2019年10月20日'
        },
        {
          name: '代码',
          people: 118,
          money: 30000,
          days: 30,
          ask: '大是大非路上看见法律上的看了看',
          label: ['设计', '教育培训'],
          data: '2019年1月20日'
        }
      ],
      currentprice: [
        {
          name: '代码',
          people: 118,
          money: 30000,
          days: 30,
          ask: '大是大非路上看见法律上的看了看',
          label: ['设计', '教育培训'],
          data: '2019年1月20日'
        },
        {
          name: '设计',
          people: 18,
          money: 500,
          days: 3,
          ask: '任务要求任务要求任务要求任务要求任务要求',
          label: ['设计', '教育培训'],
          data: '2019年10月20日'
        }
      ],
      active: 0,
      num: 0,
      maplist: [
        {
          img: require('@/assets/imgs/copy1.png'),
          name: '文案'
        },
        {
          img: require('@/assets/imgs/copy2.png'),
          name: '设计'
        },
        {
          img: require('@/assets/imgs/copy3.png'),
          name: '代码'
        },
        {
          img: require('@/assets/imgs/copy4.png'),
          name: '手绘'
        },
        {
          img: require('@/assets/imgs/copy5.png'),
          name: 'PPT'
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
    },
    onClick(index) {
      console.log(index)
    }
    // login() {
    //   let params = {
    //     password: 'gs123456',
    //     storeNo: '',
    //     userName: '17326015487'
    //   }
    //   homeApi.loginUserNo(params).then((res) => {
    //     let {data} = res
    //     if (data.success === ERR_OK) {
    //       alert(data.value.token)
    //     } else {
    //     }
    //   }).catch(() => {
    //   })
    // }
  },
  components: {
    commonHeader,
    currentList
  },
  computed: {
    ...mapGetters([
      'number'
    ]),
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
.page-content{
  .mb(98);
  .page-map{
    // .ml(80);
    .page-map--van{
      .ml(80);
      display: flex;
     p{
      .fs(20);
      color:#898798;
    }
    .van-icon{
        .fs(30);
        .mr(10);
      }
    }
    .page-map--ul{
      .mt(30);
      .pl(20);
      .pr(20);
      display: flex;
      justify-content: space-between;
        img{
          box-sizing: border-box;
          width: 80%;
        }
        .page-map--p{
          .fs(25);
          color:#898798;
          font-weight: bold;
        }
    }
  }
  .page-map-vantabs{
    display: flex;
    justify-content: space-between;
    border-top: 5px solid #f5f5f5;
    border-bottom: 2px solid #f5f5f5;
    margin:10px 0;
  }
  .page-map--search{
    flex: 5;
    .page-map--tab{
    position: absolute;
    width: calc(100vw - 10px);
    box-sizing: border-box;
    background: #fff;
    color: #fff;
    .mt(10);
    .padding(20,40,20,20);
    text-align: left;
    h4{
      color: #0f7f9b;
      .mb(20);
    }
  }
  }
  .page-map__p{
    flex: 4;
    line-height: 44px;
    color: #7d7e80;
    text-align: right;
    .pr(40);
  }
}
</style>
<style>
.van-tabs__line {
    background-color: #BDBEBE;
}
  .van-tabs__wrap {
    position: relative;
    top: 0;
    right: 0;
    left: 0;
    z-index: 99;
  }

  /* .van-tabs--line .van-tabs__wrap {
    height: 37px;
  } */
   .van-tab {
    font-size: 12px;
  }
  .van-tabs__nav {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    background-color: #fff;
    -webkit-user-select: none;
    user-select: none;
}
.van-tab--active {
    color: #7d7e80;
    font-weight: 500;
}
</style>
