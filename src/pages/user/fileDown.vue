<template>
  <div class="down">
    <span class="down-file">下载附属文件</span>
    <ul>
      <li v-for="(item,index) in down" :key="index">
        <!-- <img class="img" src="" alt=""> -->
        <van-icon name="send-gift-o" />
        <span class="title">{{item.title}}</span>
        <span class="down-click">点击下载</span>
      </li>
    </ul>
    <span class="more">
      <van-icon name="ellipsis" />
      查看更多
    </span>
  </div>
</template>

<script>
export default {
  props: {
    down: {
      type: Array,
      default: () => []
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
.down{
  .b-radius(30);
  background: #1D1D2B;
  color: #fff;
  text-align: left;
  .padding(20,20,20,20);
  display: flex;
  flex-direction: column;
  ul{
    .mb(20);
    .mt(20);
    li{
      display: flex;
      align-items: center;
      .mb(20);
      .van-icon{
        .fs(40);
        .mr(30);
      }
      .title{
        flex:1;
      }
      .down-click{
        .b-radius(30);
        background:#1E384A;
        color: #2E9DAE;
        .padding(4,20,4,20);
      }
    }
  }
  .more{
    display: flex;
    align-items: center;
    color: #3093D8;
    .van-icon{
      .fs(40);
    }
  }
}
</style>
