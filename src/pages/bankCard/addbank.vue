<template>
  <div class="addbank">
    <common-header :tittle="tittle" :showback="true" :headerColor="headerColor"></common-header>
    <div class="addbank-con">
      <p class="content_add">添加银行卡</p>
      <div class="content_name">
        <span>请添加时确定您的真实姓名</span><van-field class="enter_name" v-model="name" placeholder="姓名" />
      </div>
      <div class="content_name content_bank">
        <span>银行卡</span><van-field class="enter_name" v-model="bank" placeholder="请确定持卡人本人的银行卡" />
      </div>
      <div class="content_btn">
        <button class="btn" @click="addBank">添加银行卡信息</button>
      </div>
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
      headerColor: '#fff',
      name: '',
      bank: ''
    }
  },
  methods: {
    addBank() {
      this.$router.push('/bankInfor')
    }
  }
}
</script>

<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.addbank{
  * {
    touch-action: pan-y;
  }
  background-color: #fff;
  color: @base-font-color;
  .content_add{
    .fs(30);
    .pt(20);
    .pb(30)
  }
  .content_name{
    .pl(70);
    .pr(70);
    .mt(30);
    .mb(30);
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    span{
      .mr(30);
      text-align: left;
    }
    .enter_name{
      flex:1;
      border:1px solid #c54f8b;
      .b-radius(30);
      text-align: center;
    }
  }
   .content_bank{
      border-bottom: 1px solid #e9e9e9;
      border-top: 1px solid #e9e9e9;
      .pt(30);
      .pb(30);
   }
  /deep/.van-field__control{
    text-align: center;
  }
  .content_btn{
    display: flex;
    .mr(70);
    .ml(70);
    .mt(50);
    .btn{
      background-color: #c54f8b;
      border: none;
      outline: none;
      color: #fff;
      flex: 1;
      .pt(10);
      .pb(10);
      .b-radius(30);
      .fs(20);
    }
  }
}
</style>
