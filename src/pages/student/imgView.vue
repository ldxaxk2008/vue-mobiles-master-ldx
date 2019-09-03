<template>
  <div class="image-view">
    <img class="big-img" :src="firstSrc" alt="">
    <div class="image-list">
      <div class="small-img" v-for="(item,index) in imgList" :key="index">
        <span :class="{active:curtab===index}"></span>
        <img :src="item.link" @click="imgClick(item.link,index)" alt="">
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
  watch: {
    imgList(val) {
      this.firstSrc = val[0] && val[0].link
    }
  }
}
</script>

<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.image-view{
  background: #fff;
  .padding(30,20,30,20);
  .big-img{
    width: 100%;
    .h(400);
    .mb(30);
  }
  .image-list{
    display: flex;
    .small-img{
      position: relative;
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
  background-image:url('../../assets/imgs/imgBorder.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
