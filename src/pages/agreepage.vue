<template>
  <div class="agreement-page">
    <common-header :tittle="tittle" :showback="true"></common-header>
    <div class="agreement-page--content">
      <ul>
        <li v-for="(item,index) in agreeArr" :key="index">
          <h4 v-if="item.title==='title'">{{item.text}}</h4>
          <div v-else>{{item.text}}</div>
        </li>
      </ul>
      <van-checkbox class="btn" v-model="checked" @change="check">我已阅读完此协议，并且同意此协议的所有条款</van-checkbox>
    </div>
    <div class="evaluate-footer">
      <van-button class="evaluate-footer--btn" :disabled="disabled" @click="confirm">确认</van-button>
    </div>
  </div>
</template>
<script>
import { fetchGet } from 'config/index'
import commonHeader from 'common/common-header'

export default {
  components: {
    commonHeader
  },
  data() {
    return {
      tittle: '重要条款',
      checked: false,
      disabled: true,
      agreeArr: []
    }
  },
  methods: {
    confirm() {
      if (this.checked === false) {
        this.$toast({
          message: '请阅读并确认条款'
        })
      } else {
        this.$router.push({name: 'Task', params: {id: this.$route.query.id.id}, query: {agreepage: true}})
      }
    },
    check(val) {
      if (val) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    }
  },
  mounted() {
    fetchGet('/static/protocol.json').then(res => {
      if (res.data.msg === 'success') {
        this.agreeArr = res.data.data
        console.log(res.data.data)
      }
    })
  }
}
</script>
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.agreement-page {
  background-color: #fff;
  color: @base-font-color;
  .fs(@base-header-size);
  .agreement-page--content {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .agreement-page--content {
    text-align: left;
    .pl(50);
    .pr(50);
    h4 {
      display: flex;
      .fs(28);
      .pb(20);
      font-weight: 400;
    }
    h4:nth-child(1){
      .pt(20);
    }
    div {
      .fs(25);
      .pb(20);
    }
  }
  .evaluate-footer {
    .pt(30);
    .pb(30);
    background-color: #f5f5f5;
    position: sticky;
    bottom: 0;
    left: 0;
    display: flex;
    .evaluate-footer--btn {
      flex: 1;
      background-color: #c54f8b;
      color: white;
      .fs(25);
      .pt(10);
      .pb(10);
      .ml(20);
      .mr(20);
      font-weight: bold;
      border: none;
      .b-radius(50);
    }
  }
  /deep/.van-checkbox__icon--round .van-icon {
    border-radius: 0;
  }
  .btn {
    .pt(20);
  }
}
</style>
