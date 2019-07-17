<template>
  <div class="evaluate">
    <ul>
      <li v-for="(item,index) in evaluate" :key="index">
        <img :src="item.imgSrc" @click="evajump" alt="">
        <div class="remark">
          <span>{{item.remark}}</span>
          <span>{{item.data}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    evaluate: {
      type: Array,
      default: () => {}
    }
  },
  methods: {
    evajump() {
      this.$emit('evajump')
    }
  }
}
</script>

<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.evaluate{
  ul{
    li{
      display: flex;
      .mb(30);
      align-items: center;
      img{
        .w(150);
        .h(150);
        .mr(30);
        .b-radius(30);
      }
      .remark{
        display: flex;
        color: #000;
        .h(150);
        flex-direction: column;
        span:nth-child(1){
          flex:1;
          .mt(40);
        }
        span:nth-child(2){
          .mt(20);
          color: #433e51;
        }
      }
    }
  }
}
</style>
