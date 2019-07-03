<template>
  <div class="enterprise">
    <div class="synopsis-head">
      <img v-if="imgShow" :src="information.logoImg" alt="logo" class="logo">
      <div class="contenr">
        <div class="company" v-if="imgShow">
          <div class="company-box">
            <span class="name">{{information.name}}</span>
            <span class="autograph">{{information.industry}}</span>
          </div>
          <span class="lv">{{information.lv}}</span>
          <van-checkbox v-model="information.checked" checked-color="#c14182"></van-checkbox>
        </div>
        <div class="synopsis-main">
          {{information.aboutUs}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imgShow: {
      type: Boolean,
      default: false
    },
    information: {
      type: Object,
      default: () => {}
    }

  }
}
</script>

<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.enterprise{
  .synopsis-head{
    color: #000;
    display: flex;
    .logo{
      .w(200);
      .h(200);
      .mr(10);
      .b-radius(125);
    }
    .contenr{
      flex: 1;
      .company{
        display: flex;
        justify-content: space-around;
        text-align: left;
        .ml(50);
        .company-box{
          display: flex;
          flex-direction: column;
        }
        .lv{
          color:#c14182 ;
        }
      }
      .synopsis-main{
        text-indent: 0.8rem;
        .fs(18);
        .mt(20);
        text-align: left;
      }
    }
  }
}
</style>
