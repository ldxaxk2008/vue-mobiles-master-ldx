<template>
  <div class="input-box">
    <span class="icon"></span>
    <input type="text" class="search" placeholder="在Level up上搜索你想要的">
  </div>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>
@import "~styles/index.less";
@import "~styles/variable.less";
.input-box{
  position: relative;
  .icon{
    position: absolute;
    display: inline-block;
    .w(45);
    .h(45);
    top: 50%;
    .mt(-18);
    .left(-20);
    background-image: url("../assets/imgs/search.svg");
    color: #11AC84;
    background-size: cover;
  }
  .search{
    background-color: #1E363C;
    .b-radius(30);
    .h(50);
    .lh(50);
    width: 100%;
    outline: none;
    .pl(50);
    .pt(5);
    .pt(5);
    .ml(-25);
    .fs(26);
  }
}
</style>
