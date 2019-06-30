<template>
    <div class="header-box" :style="{ backgroundColor: headerColor}">
      <div class="left-icon">
        <!-- <span v-if="showback" @click="back" class="icon-back"></span> -->
        <van-icon name="arrow-left" v-if="showback" @click="back" class="icon-back"/>
      </div>
      <div class="header-tittle">
        <span v-if="showinput">
          <cus-input></cus-input>
        </span>
        <span v-if="!showinput">{{tittle}}</span>
      </div>
      <div class="right-icon">
        <!-- <span v-if="showmore" class="icon"></span> -->
        <van-icon name="ellipsis" v-if="showmore" class="icon"/>
      </div>
    </div>
</template>

<script>
import cusInput from 'common/cus-input'
export default {
  data() {
    return {}
  },
  props: {
    headerColor: {
      type: String,
      default: '#f5f5f5'
    },
    showright: {
      type: Boolean,
      default: false
    },
    showleft: {
      type: Boolean,
      default: false
    },
    showinput: {
      type: Boolean,
      default: false
    },
    tittle: {
      type: String,
      default: '标题'
    },
    showback: {
      type: Boolean,
      default: true
    },
    showmore: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    back() {
      this.$router.goBack()
    }
  },
  components: {
    cusInput
  }
}
</script>

<style lang="less" scoped>
@import "~styles/index.less";
@import "~styles/variable.less";
.header-box{
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  .h(100);
  .lh(100);
  background-color: #979797;
  color: @base-header-color;
  .fs(@base-header-size);
  display: flex;
  z-index: 1;
  .left-icon{
    position: relative;
    flex: 1;
    .icon-back{
      position: absolute;
      display: inline-block;
      .w(50);
      .h(50);
      .left(25);
      .top(25);
      .fs(50);
      color: #363636;
      // background-image: url("../assets/imgs/w-back.svg");
      // background-size: cover;
    }
  }
  .header-tittle{
    flex: 3;
    color: #363636;
  }
  .right-icon{
    position: relative;
    flex: 1;
    .icon{
      position: absolute;
      display: inline-block;
      .w(50);
      .h(50);
      .right(25);
      .top(25);
      // background-image: url("../assets/imgs/more.svg");
      // background-size: cover;
      .fs(50);
      color: #363636;
    }
  }
}
</style>
