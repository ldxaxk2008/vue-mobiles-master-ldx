<template>
  <div class="comment">
    <ul>
      <li>
        <img :src="verySatisfied" alt="">
        <span>{{commentList.fit_require}}</span>
        <p>符合要求</p>
      </li>
      <li>
        <img :src="Satisfied" alt="">
        <span>{{commentList.satisfied}}</span>
        <p>比较满意</p>
      </li>
      <li>
        <img :src="Dissatisfied" alt="">
        <span>{{commentList.not_satisfied}}</span>
        <p>远超预期</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    commentList: {
      type: Object,
      default: () => []
    }
  },
  data() {
    return {
      verySatisfied: require('@/assets/imgs/verySatisfied.svg'),
      Satisfied: require('@/assets/imgs/Satisfied.svg'),
      Dissatisfied: require('@/assets/imgs/Dissatisfied.svg')
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
