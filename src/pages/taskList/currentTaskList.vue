<template>
  <div class="current-list">
    <div class="current" v-for="(item,index) in currentList" :key="index" @click="handleclick(item)">
      <div class="task-main">
        <div class="task-main-head">
          <div class="task-title">{{item.title}}<img v-if="!done" style="margin-left:10px;"  :src="imgUrl"/></div>
          <div class="deadline">{{item.apply_num}} 人正在申请 {{item.payment}}RMB</div>
        </div>
        <div class="task-main-container">任务要求：{{item.desc}}</div>
        <div class="task-labels">
          <span v-for="(ele,i) in item.label" :key="i">{{ele}}</span>
        </div>
        <div class="days">
          <div class="task-time">发布日期：{{item.publish_time}}</div>
          <div>距离截至日期还有：{{item.rest_day}} 天</div>
        </div>
      </div>
      <span class="done" v-if="done"><img src="@/assets/imgs/done.png" alt=""></span>
    </div>
    <div class="more" @click="more">
      <van-icon name="arrow-down" />
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
  },
  data() {
    return {
      imgUrl: require('@/assets/imgs/hot.png')
    }
  },
  methods: {
    handleclick(item) {
      this.$router.push({name: 'Task', params: {id: item.id}})
      // this.$router.push('/User/Task')
    },
    more() {
      this.$emit('more')
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
    color: #363636;
    overflow: hidden;
    .mb(20);
    background: #F5F5F5;
    .b-radius(30);
    position: relative;
    .done{
      position: absolute;
      .right(0);
      .bottom(0);
      opacity: .2;
      z-index: 99;
      img{
        .w(300);
        .h(300);
      }
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
      .fs(30);
      .padding(10, 10, 10, 10);
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
    .padding(30, 30, 30, 30);
    .task-main-head {
      display: flex;
      justify-content: space-between;
      .mb(20);
      .task-title {
        .fs(30);
      }
    }
    .days{
      .mt(30);
      display: flex;
      font-size: 10px;
      justify-content: space-between;
      align-items: center;
    }
    .task-labels{
      .mt(20);
      span{
        .padding(5,10,5,10);
        .mr(10);
        .b-radius(100);
        color: #fff;
      }
      span:nth-child(1){
        background:#18ACB6;
      }
      span:nth-child(2){
        color:#FBBE84;
        border:1px solid #FBBE84;
      }
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
