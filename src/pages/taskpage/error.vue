<template>
  <div class="taskpage-error">
    <common-header :tittle="tittle" :showback="true" :showmore="false"></common-header>
    <div style="flex:1;">
      <div class="taskpage-error--img">
        <img src="@/assets/imgs/nonetwork.png" alt />
      </div>
    </div>
    <div class="taskpage-error--con">
      <p class="taskpage--con__title">任务失败</p>
      <p class="taskpage--con">可能是因为网络原因，请稍后再试</p>
      <button @click="prev">返回</button>
      <p class="taskpage--con__foot">感谢支持</p>
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
      tittle: ''
    }
  },
  methods: {
    prev() {
      this.$router.goBack()
    }
  }
}
</script>
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.taskpage-error {
  background-color: #ffffff;
  .taskpage-error--img {
    .mb(0);
    width: 100%;
  }
  .taskpage-error--con {
    .pb(60);
    .taskpage--con__title {
      color: #a90e5d;
      .fs(40);
    }
    .taskpage--con {
      .fs(24);
      color: #d8d8d8;
      text-align: center;
      .pt(40);
    }
    .taskpage--con__foot {
      .fs(12);
      color: #d8d8d8;
      letter-spacing: 10px;
      text-align: center;
      .pt(50);
    }
    button {
      margin: 0 auto;
      .mt(40);
      .mb(40);
      display: block;
      color: #ffffff;
      background-color: #a90e5d;
      .padding(10, 100, 10, 100);
      .b-radius(40);
      outline: none;
      border: none;
      .fs(30);
    }
  }
}
</style>
