<template>
  <div class="content-box">
    <common-header :tittle="tittle" :showback="true" :showmore='true'></common-header>
    <div class="pay-container">
      <div class="pay-main">
        <div class="pay-money">
          <span class="money">￥5,000</span>
          <span class="order">订单号:2131249324580</span>
        </div>
        <div class="pay-swip">
          <div class="swiper-main">
            <ul>
              <li v-for="(item,index) in payImgList" :key="index">
                <div>
                  <img :src="item.payImg" alt="">
                  <button :style="{background:item.bgColor}">立即支付</button>
                  <!-- <van-icon :color="item.bgColor" class="pay-small" name="gift" /> -->
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="pay-foot">
      <span>支付金额将由平台暂时保管</span>
      <span>并按照任务进度付款给学生</span>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapState } from 'vuex'
import commonHeader from 'common/common-header'
// import * as homeApi from 'api/home-api'
// import { ERR_OK } from 'config/index'
export default {
  data() {
    return {
      tittle: '支付',
      payImgList: [
        {
          label: '支付宝',
          bgColor: '#00A2E9',
          payImg: require('@/assets/imgs/zhifubao.svg')
        },
        {
          label: '银联',
          bgColor: '#EB6578',
          payImg: require('@/assets/imgs/yinlian.svg')
        },
        {
          label: '微信',
          bgColor: '#0DAB4F',
          payImg: require('@/assets/imgs/weixin.svg')
        }
      ]
    }
  },
  created() {
    console.log(this.$route)
    // let params = {
    //   resource_type: 2
    // }
    // homeApi.loginUserNo(params).then((res) => {
    //   let {data} = res
    //   if (data.success === ERR_OK) {
    //     // alert(data.value.token)
    //   } else {
    //   }
    // }).catch(() => {
    // })
    // this.$get('/root/api/task/resource/type/', params)
    //   .then(function (response) {
    //     console.log(response)
    //   })
    //   .catch(function (error) {
    //     console.log(error)
    //   })
  },
  methods: {
    ...mapMutations({
      setNum: 'SET_NUM'
    }),
    todetail() {
      this.$router.togo('/Home/Detail')
    },
    handelClick(val) {
      this.$router.push(val)
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
.pay-container{
  flex: 1;
}
.pay-main{
  .margin(50,40,0,40);
  .pt(40);
  .pb(60);
  .h(530);
  .b-radius(10);
  background: #f5f5ff;
  .pay-money{
    display: flex;
    flex-direction: column;
    .money{
      .mb(20);
      .fs(50);
      color: #FAAE44;
    }
    .order{
      .fs(20);
      color: #B2B2B2;
    }
  }
  .pay-swip{
    .mt(20);
    .h(800);
    width: 100%;
    overflow: hidden;
    .swiper-main{
      .h(815);
      white-space:nowrap;
      overflow-x: auto;
      li{
        display: inline-block;
        .ml(80);
        .mr(-50);
        div{
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          button{
            .w(200);
            border: none;
            .b-radius(100);
            color: #fff;
            .pt(10);
            .pb(10);
          }
          .pay-small{
            position:absolute;
            .bottom(-240);
            .fs(80);
          }
        }
      }
    }
    li:nth-last-child(1){
      .mr(80);
    }
  }
}
.pay-foot{
  display: flex;
  flex-direction: column;
  .pb(60);
  .lh(50);
}
</style>
