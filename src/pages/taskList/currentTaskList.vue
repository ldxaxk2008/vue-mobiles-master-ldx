<template>
  <div class="current-list">
    <div class="current" v-for="(item,index) in currentList" :key="index">
      <div class="current-head">
        <div class="task-name">{{item.name}}</div>
        <div class="task-details">{{item.people}} 人正在申请 {{item.money}}RMB</div>
      </div>
      <div class="line"></div>
      <div class="task-main">
        <div class="task-main-head">
          <div class="task-title">任务标题</div>
          <div class="deadline">距离截至日期还有：{{item.days}} 天</div>
        </div>
        <div class="task-main-container">任务要求：{{item.ask}}</div>
        <div class="task-time">发布日期：{{item.data}}</div>
      </div>
      <span class="done" v-if="done">已完成</span>
    </div>
    <div class="more">
      <van-icon name="arrow-up" />
      <span>查看更多</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentList: {
      type: Array,
      default: () => []
    },
    done: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.current-list {
  .b-radius(30);
  .current{
    overflow: hidden;
    .mb(20);
    background: #222230;
    .b-radius(30);
    position: relative;
    .done{
      position: absolute;
      .right(0);
      .bottom(-20);
      .fs(90);
      opacity: .2;
      z-index: 99;
    }
  }
  .current-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .mr(30);
    .ml(30);
    .pt(20);
    .pb(10);
    .task-name {
      position: relative;
      .padding(10, 10, 10, 10);
      background: #1e384a;
    }
    .task-name:after {
      content: "";
      position: absolute;
      bottom: -0.3rem;
      left: 0;
      width: 100%;
      height: 0;
      border-left: 0.4rem solid transparent;
      border-right: 0.4rem solid transparent;
      border-top: 0.3rem solid #1e384a;
      box-sizing: border-box;
    }
    .task-details {
      flex: 1;
      text-align: right;
    }
  }
  .line {
    .h(5);
    background-image: linear-gradient(left, #368dd2 0%, #2ecda8 100%);
  }
  .task-main {
    .padding(30, 20, 30, 20);
    .task-main-head {
      display: flex;
      justify-content: space-between;
      .mb(20);
      .task-title {
        .fs(30);
      }
    }
    .task-time {
      .mt(30);
    }
  }
  .more{
    text-align: center;
    display: flex;
    flex-direction: column;
    color: #b44248;
    .van-icon{
      .mb(10);
      .fs(50);
    }
  }
}
</style>
