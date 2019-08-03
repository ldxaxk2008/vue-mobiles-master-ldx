<template>
  <div class="task-synopsis">
    <div class="synopsis-head">
      <img :src="information.image||logoImg" alt="logo" class="logo">
      <div class="contenr">
        <div class="left">
          <span class="name">{{information.title}}</span>
          <span class="industry">{{information.industry||'暂无'}}</span>
          <button v-if="show && state" class="apply" @click="handelClick('applyTask')">申请任务</button>
        </div>
        <div class="right">
          <span class="assets">{{information.total_payment}}</span>
          <span class="number" v-if="information.user_id!==0">{{information.user_name}} 已申请</span>
          <span class="number" v-else>{{information.task_num}} 人在申请</span>
          <button v-if="!show && state" class="cancel" @click="handelClick('cancelTask')">取消申请</button>
        </div>
      </div>
    </div>
    <div class="about-us">
        <h4>任务简介</h4>
        <p>{{information.desc}}</p>
        <span>距离任务结束还剩：{{information.rest_day}} 天</span>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    information: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      // show: true,
      state: true,
      logoImg: require('@/assets/imgs/img5.png')
    }
  },
  methods: {
    handelClick(val) {
      this.show = !this.show
      this.$emit('taskSele', val)
    }
  },
  mounted() {
    console.log(this.information, 222222222)
    if (sessionStorage.getItem('user_type') === '0') {
      this.state = true
    } else if (sessionStorage.getItem('user_type') === '1') {
      this.state = false
    }

    console.log(this.show, this.information.user_id && this.information.user_id !== 0 && JSON.stringify(this.information.user_id) === sessionStorage.getItem('user_id'))
  },
  computed: {
    show() {
      if (this.information.user_id && this.information.user_id !== 0 && JSON.stringify(this.information.user_id) === sessionStorage.getItem('user_id')) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.task-synopsis{
  .padding(30,30,30,30);
  .mb(10);
  background: #fff;
  .synopsis-head{
    color: #000;
    display: flex;
    .logo{
      .w(200);
      .h(200);
      .b-radius(125);
    }
    .contenr{
      flex: 1;
      display: flex;
      .left,.right{
        .assets{
          color:#d887b1 ;
        }
        .mt(30);
        display: flex;
        flex-direction: column;
        flex: 1;
        .ml(40);
        span:nth-child(1){
          .fs(30);
        }
        button{
          .mt(30);
          .padding(10,0,10,0);
          .b-radius(30);
          border:none;
        }
        .apply{
          background: #f7c724;
          color: #fff;
        }
        .cancel{
          background: #c0c0c0;
          color: #fff;
        }
      }
    }
  }
  .about-us{
    text-align: left;
    .mt(40);
    h4{
      .fs(30);
      .mb(20);
    }
    p{
      .mb(20);
      text-indent: 24px;
    }
    span{
      display: block;
      text-align: right;
    }
  }
}
</style>
