<template>
  <div class="comment">
    <ul>
      <li v-for="(item,index) in commentList" :key="index">
        <img :src="item.imgUrl" alt="">
        <span>{{item.num}}</span>
        <p>{{item.ask}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    commentList: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.comment{
  .mt(30);
  ul{
    display: flex;
    justify-content: space-around;
    li{
      display: flex;
      flex-direction: column;
      position: relative;
      img{
        .w(150);
        .h(150);
        .mb(20);
      }
      span{
        position: absolute;
        .top(20);
        .right(10);
        color: #ffffff;
        .b-radius(500);
        background: #c14182;
        // .padding(10,10,10,10)
        .w(40);
        .h(40);
        text-align: center;
        .lh(40);
      }
    }
  }
}
</style>
