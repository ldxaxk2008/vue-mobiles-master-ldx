<template>
  <div class="taskpage-success">
    <!-- <common-header :tittle="tittle" :showback="false" :showmore="false"></common-header> -->
    <div style="flex:1;">
      <div class="taskpage-success--img">
        <img src="@/assets/imgs/network.png" alt />
      </div>
    </div>
    <div class="taskpage-success--con">
      <p class="taskpage--con__title">任务完成</p>
      <button @click="watcher">查看</button>
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
    watcher() {
      this.$router.push('/User/Task')
    },
    prev() {
      this.$router.push('/taskeditor/post')
    }
  }
}
</script>
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.taskpage-success {
  background-color: #ffffff;
  .taskpage-success--img {
    .mt(250);
    width: 100%;
  }
  .taskpage-success--con {
    .pb(60);
    .taskpage--con__title {
      color: #1a8c94;
      .fs(40);
    }
    .taskpage--con__foot {
      .fs(12);
      color: #d8d8d8;
      letter-spacing: 10px;
      text-align: center;
      .mt(80);
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
