<template>
  <div class="task-stage">
    <div class="stage-head">
      <div class="name">
        <span>{{information.name}}</span>
        <span>{{information.industry}}</span>
      </div>
      <div class="more">
        <van-icon name="orders-o" />
      </div>
    </div>
    <EnterpriseSynopsis :information="information"></EnterpriseSynopsis>
    <div class="slider">
      <van-slider
        v-model="rangeValue"
        bar-height="4px"
        active-color="#f44"
      />
      <button class="confirm">进行阶段确认</button>
    </div>
    <FileDown :down="down"/>
  </div>
</template>

<script>
import EnterpriseSynopsis from './enterpriseSynopsis'
import FileDown from './fileDown'
export default {
  props: {
    information: {
      type: Object,
      default: () => {}
    },
    down: {
      type: Array,
      default: () => []
    }
  },
  components: {
    EnterpriseSynopsis,
    FileDown
  },
  data() {
    return {
      rangeValue: 20
    }
  }
}
</script>

<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.task-stage{
  .padding(30,30,30,30);
  background: #191927;
  .stage-head{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .mb(20);
    .name{
      display: flex;
      flex-direction: column;
      color: #fff;
      span:nth-child(1){
        .fs(30);
      }
    }
    .more{
      .van-icon{
        .fs(50);
        color: #fff;
      }
    }
  }
  .slider{
    .pt(20);
    .pb(20);
    text-align: left;
    .confirm{
      .mt(40);
      .b-radius(200);
      color: #fff;
      border:none;
      .padding(10,20,10,20);
      background: #368174;
    }
  }
}

</style>
