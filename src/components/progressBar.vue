<template>
  <div class="progress">
    <div class="line-box">
      <div class="line" :style="{width:lineWidth+'%'}"></div>
    </div>
    <div class="percentage">
      <div class="one"><span>20%</span><van-icon name="play" /></div>
      <div class="two"><span>50%</span><van-icon name="play" /></div>
      <!-- <div class="three"><span>80%</span><van-icon name="play" /></div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lineWidth: 20
    }
  }
}
</script>

<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.progress{
  position: relative;
  overflow: hidden;
  .line-box{
    .h(10);
    background: #E7E7E7;
    .b-radius(100);
    .mt(60);
    position: relative;
    .line{
      position: absolute;
      top: 0;
      left: 0;
      .h(10);
      /*! autoprefixer: off */
      background: -webkit-linear-gradient(right, #3B8786 , #47C48B);
      /* autoprefixer: on */
      background:-moz-linear-gradient(right, #3B8786 , #47C48B);
      background:-o-linear-gradient(right, #3B8786 , #47C48B);
      background:linear-gradient(right,#3B8786 , #47C48B);
      //  background: linear-gradient(to right, #3B8786 , #47C48B);
      .b-radius(100);
    }
  }
  .percentage{
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    div{
      position: absolute;
      top: 0;
      display: flex;
      flex-direction: column;
      text-align: center;
      .van-icon{
        transform: rotate(90deg);
      }
    }
    .one{
      left: 16%;
      color: #4BA98F;
    }
    .two{
      left: 46%;
      color: #398FF9;
    }
    .three{
      left: 76%;
      color: #C843F2;
    }
  }
}
</style>
