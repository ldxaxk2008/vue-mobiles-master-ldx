<template>
  <div class="task-synopsis">
    <div class="synopsis-head">
      <img :src="information.logoImg" alt="logo" class="logo">
      <div class="contenr">
        <div class="left">
          <span class="name">{{information.name}}</span>
          <span class="industry">{{information.industry}}</span>
          <button class="apply">申请任务</button>
        </div>
        <div class="right">
          <span class="assets">{{information.assets}}</span>
          <span class="number">{{information.number}} 人在申请</span>
          <button class="cancel">取消申请</button>
        </div>
      </div>
    </div>
    <div class="about-us">
        <h4>任务简介</h4>
        <p>{{information.aboutUs}}</p>
        <span>距离任务结束还剩：{{information.days}} 天</span>
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

    }
  }
}
</script>

<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.task-synopsis{
  .padding(30,30,30,30);
  background: #191927;
  .synopsis-head{
    color: #fff;
    display: flex;
    .logo{
      .w(200);
      .b-radius(125);
    }
    .contenr{
      flex: 1;
      display: flex;
      .left,.right{
        .assets{
          color:#155966 ;
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
          background: #148A96;
          color: #fff;
        }
        .cancel{
          background: #1E384A;
          color: #2E9DAE;
        }
      }
    }
  }
  .about-us{
    text-align: left;
    .mt(40);
    color: #fff;
    h4{
      .fs(30);
      .mb(20);
    }
    p{
      .mb(20);
      text-indent: 24px;
    }
  }
}
</style>
