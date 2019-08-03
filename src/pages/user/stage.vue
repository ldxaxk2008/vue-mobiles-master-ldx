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
      <!-- <van-slider
        v-model="rangeValue"
        bar-height="4px"
        active-color="#f44"
      />-->
      <progressBar />
      <button v-if="status!==2" class="confirm">进行阶段确认</button>
      <button v-if="show && status===2" class="deliver" @click="taskpay">任务交付</button>
      <button v-if="!show && status===2" class="deliver">确认任务完成</button>
    </div>
    <FileDown :down="down" />
  </div>
</template>

<script>
import EnterpriseSynopsis from './enterpriseSynopsis'
import FileDown from './fileDown'
import progressBar from 'common/progressBar'

export default {
  props: {
    information: {
      type: Object,
      default: () => {}
    },
    down: {
      type: Array,
      default: () => []
    },
    status: {
      type: Number,
      default: 1
    }
  },
  components: {
    EnterpriseSynopsis,
    FileDown,
    progressBar
  },
  data() {
    return {
      show: true,
      rangeValue: 20
    }
  },
  methods: {
    taskpay() {
      this.$router.push('/Pay')
    }
  },
  mounted() {
    if (window.sessionStorage.getItem('user_type') === '1') {
      this.show = false
    } else if (window.sessionStorage.getItem('user_type') === '0') {
      this.show = true
    }
  }
}
</script>

<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.task-stage {
  .padding(30, 30, 30, 30);
  background: #fff;
  .stage-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .mb(20);
    .name {
      display: flex;
      flex-direction: column;
      color: #000;
      span:nth-child(1) {
        .fs(30);
      }
    }
    .more {
      .van-icon {
        .fs(50);
        color: #000;
      }
    }
  }
  .slider {
    .pt(20);
    .pb(20);
    text-align: left;
    .confirm {
      .mt(40);
      .b-radius(200);
      color: #fff;
      border: none;
      .padding(10, 20, 10, 20);
      background: #c44c89;
    }
    .deliver {
      .mt(40);
      .b-radius(200);
      color: #fff;
      border: none;
      .padding(10, 20, 10, 20);
      background: #c0c0c0;
    }
  }
}
</style>
