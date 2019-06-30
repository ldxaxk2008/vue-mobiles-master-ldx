<template>
    <div class="level-content">
    <common-header :headerColor="headerColor" :tittle="tittle" :showback="true" :showmore='false'></common-header>
    <div>
        <ul class="level-content--ul">
            <li class="leve--ul_top">LEVEL UP</li>
            <li class="leve--ul_-mid">为学生创造价值的平台</li>
            <li class="leve--ul_-bot" @click="handelClick">开始体验</li>
        </ul>
    </div>
    </div>
</template>
<script>
import commonHeader from 'common/common-header'
export default {
  components: {
    commonHeader
  },
  data() {
    return {
      tittle: '',
      headerColor: '#f9ce20'
    }
  },
  methods: {
    handelClick() {
      this.$router.push('/Register')
    }
  }
}
</script>

<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.level-content {
   background:linear-gradient(bottom,#b92671 0%,#f9ce20 90%, #f9ce20 100%);
  .level-content--ul{
      color:#fff;
    .leve--ul_top{
        .fs(40);
        font-weight: bold;
        letter-spacing:10px;
        .pt(300);
        .pb(300);
    }
    .leve--ul_-mid{
        .fs(12);
        .pt(200);
        .pb(100);
        letter-spacing:10px;
        font-weight: bold;
    }
    .leve--ul_-bot{
        .fs(30);
        letter-spacing:10px;
        font-weight: bold;
         border: 1px solid #fff;
         .b-radius(70);
         .mr(240);
         .ml(240);
         .pt(10);
         .pb(10);
    }
  }
}
</style>
