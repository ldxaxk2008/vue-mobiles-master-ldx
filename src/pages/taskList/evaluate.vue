<template>
  <div class="evaluate">
    <ul>
      <li v-for="(item,index) in evaluate" :key="index" @click="handelclick(item)">
        <img :src="item.company_img || item.student_img" alt="">
        <div class="remark">
          <span>{{item.company_comment || item.user_comment}}</span>
          <span>{{item.company_comment_time || item.student_comment_time}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import cookie from 'vue-cookies'
export default {
  props: {
    evaluate: {
      type: Array,
      default: () => {}
    }
  },
  methods: {
    handelclick(item) {
      if (cookie.get('user_type') === '0') {
        this.$router.push('/User/Student/' + item)
      } else if (cookie.get('user_type') === '1') {
        this.$router.push('/User/TaskList/' + item)
      }
    }
  },
  mounted() {
    console.log(this.evaluate)
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
        .w(100);
        .h(100);
        .mr(30);
        .b-radius(30);
      }
      .remark{
        display: flex;
        color: #000;
        .h(100);
        flex-direction: column;
        span:nth-child(1){
          flex:1;
          .mt(15);
        }
        span:nth-child(2){
          .mt(15);
          color: #433e51;
        }
      }
    }
  }
}
</style>
