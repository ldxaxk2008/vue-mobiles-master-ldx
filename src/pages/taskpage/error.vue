<template>
    <div class="taskpage-error">
        <common-header :tittle="tittle" :showback="false" :showmore='false'></common-header>
        <div class="taskpage-error--img">
             <img src="@/assets/imgs/tu2.png" alt="">
        </div>
        <div class="taskpage-error--con">
           <p class="taskpage--con__title">任务失败</p>
           <p class="taskpage--con">可能是因为网络原因，请稍后再试</p>
           <button>返回</button>
           <p class="taskpage--con__foot">感谢支持</p>
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
      tittle: ''
    }
  }
}
</script>
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.taskpage-error{
    background-color: #ffffff;
    .taskpage-error--img{
        .mt(30);
        width: 100%;
        img{
            .w(600);
            .h(700);
        }
    }
    .taskpage-error--con{
      .mt(50);
        .taskpage--con__title{
            color: #A90E5D;
            .fs(40);
        }
        .taskpage--con{
          .fs(24);
          color: #d8d8d8;
          text-align: center;
           .mt(40);
       }
        .taskpage--con__foot{
          .fs(12);
          color: #d8d8d8;
          letter-spacing: 10px;
          text-align: center;
           .mt(130);
       }
       button{
           margin: 0 auto;
          .mt(40);
          .mb(40);
           display: block;
           color: #ffffff;
           background-color: #A90E5D;
           .padding(10,100,10,100);
           .b-radius(40);
           outline: none;
           border: none;
           .fs(30);
       }
    }

}
</style>
