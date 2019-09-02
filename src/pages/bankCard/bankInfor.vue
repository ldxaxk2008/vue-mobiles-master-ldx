<template>
  <div class="bankinfor">
    <div class="bankinfor_top">
      <common-header :tittle="tittle" :showback="true"></common-header>
      <div class="bankinfor_top-con">
        <div>
          <p>累计收入</p>
          <p class="top-con_total">{{totalMoney}}</p>
          <p>累计接单</p>
          <p class="top-con_total">{{totalOredr}}</p>
        </div>
        <div @click="CheckMoney">
          <svg-icon name="official" size="40" ref="svg_icon"></svg-icon>
          <p>钱包余额</p>
          {{restMoney}}
        </div>
      </div>
    </div>
    <div class="bankinfor_bottom">
      <div class="bankinfor_bottom-bor" v-for="(item,index) in bankList" :key="index">
        <p class="bottom-bor_add">{{item.name}}</p>
        <div class="bottom-bor_icon">
          <p>{{item.cardNum}}</p>
        </div>
      </div>
      <div class="bankinfor_bottom-bor">
        <p class="bottom-bor_add">添加交易方式</p>
        <div class="bottom-bor_icon">
          <van-icon size="60" name="plus" color="rgb(225, 76, 103)" />
        </div>
      </div>
    </div>
    <van-popup round v-model="show" class="popup" @click-overlay="close">
      <div>
        <div class="popup_top">
          <svg-icon name="official" size="40" ref="svg_icon"></svg-icon>
          <p>{{restMoney}}</p>
        </div>
        <div class="popup_bot">
          <van-button class="btn" @click="detailed" round size="small">明细</van-button>
          <van-button class="btn" @click="confirm" round size="small">提现</van-button>
        </div>
      </div>
    </van-popup>
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
      show: false,
      cardNum: '',
      tittle: '',
      totalMoney: '￥ 550.08',
      totalOredr: '5',
      restMoney: '￥ 450.08',
      bankList: [
        {
          name: '中国工商银行',
          cardnum: '6222333344552341',
          cardNum: ''
        },
        {
          name: '北京银行',
          cardnum: '622234443334455233348',
          cardNum: ''
        },
        {
          name: '中国农业银行',
          cardnum: '62455232343000',
          cardNum: ''
        }
      ]
    }
  },
  methods: {
    // 拼接银行卡号
    formatBankNumber(bankNumber) {
      return '*** *** **** ** ' + bankNumber.substr(-4)
    },
    getBankList() {
      this.bankList.forEach(item => {
        item.cardNum = this.formatBankNumber(item.cardnum)
      })
    },
    CheckMoney() {
      this.show = true
    },
    detailed() {},
    confirm() {},
    close() {
      this.show = false
    }
  },
  mounted() {
    this.getBankList()
  }
}
</script>
<style lang="less" scoped>
@import "~styles/index.less";
@import "~styles/variable.less";
.bankinfor {
  * {
    touch-action: pan-y;
  }
  .bankinfor_top-con {
    .pt(20);
    background-color: #f5f5f5;
    display: flex;
    justify-content: space-between;
    .pl(100);
    .pr(100);
    .top-con_total {
      .mb(20);
    }
  }
  .bankinfor_bottom{
    overflow-x: hidden;
    overflow-y: auto;
    flex:1;
  }
  .bankinfor_bottom {
    background-color: #fff;
    .bankinfor_bottom-bor {
      .margin(50, 50, 50, 50);
      .b-radius(20);
      box-shadow: #e14c67 0px 0px 10px;
    }
    .bottom-bor_add {
      text-align: left;
      .padding(10, 15, 10, 0);
      background-color: #e14c67;
      color: #fff;
      border-top-right-radius: 7px;
      border-top-left-radius: 7px;
    }
    .bottom-bor_icon {
      .pt(50);
      .pb(50);
      .fs(50);
      color:#e14c67;
    }
  }
  .popup {
    width: 60%;
    .popup_top {
      .pt(40);
      .pb(20);
    }
    .popup_bot {
      .pb(20);
      .btn {
        .ml(10);
        .mr(10);
        background: #fff;
        color: #1f8f9c;
      }
    }
  }
  .van-button--small {
    min-width: 70px;
    height: 28px;
    padding: 0 8px;
    line-height: 26px;
   }
}
</style>
