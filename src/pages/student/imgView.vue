<template>
  <div class="image-view">
    <img class="big-img" :src="firstSrc" alt="">
    <div class="image-list">
      <div class="small-img" v-for="(item,index) in imgList" :key="index" :class="{active:curtab===index}">
        <img :src="item.imgSrc" @click="imgClick(item.imgSrc,index)" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imgList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      firstSrc: '',
      curtab: 0
    }
  },
  methods: {
    imgClick(src, index) {
      this.firstSrc = src
      this.curtab = index
    }
  },
  mounted() {
    this.firstSrc = this.imgList[0].imgSrc
  }
}
</script>

<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.image-view{
  background: #191927;
  .padding(30,20,30,20);
  .big-img{
    width: 100%;
    .h(400);
    .mb(30);
  }
  .image-list{
    display: flex;
    .small-img{
      border: 3px solid transparent;
      width: 20%;
      .h(150);
      .margin(0,10,0,10);
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
}
.active{
  border-color: aqua !important;
}
</style>
