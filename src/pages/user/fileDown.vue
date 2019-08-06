<template>
  <div class="down">
    <span class="down-file">下载附属文件</span>
    <ul>
      <li>
        <van-icon name="send-gift-o" />
        <span class="title"></span>
        <span class="up-click">点击上传</span>
      </li>
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
  background: #fafafa;
  color: #000;
  text-align: left;
  .padding(20,20,20,20);
  display: flex;
  flex-direction: column;
  .up-file{
     .mt(20);
     li{
       .mb(0);
     }
  }
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
      .up-click{
        .b-radius(30);
        background:#18acb6;
        color: #fff;
        .padding(4,20,4,20);
      }
      .down-click{
        .b-radius(30);
        background:#b1b1b1;
        color: #fff;
        .padding(4,20,4,20);
      }
    }
  }
  .more{
    display: flex;
    align-items: center;
    color: #b1b1b1;
    .van-icon{
      .fs(40);
    }
  }
}
</style>
