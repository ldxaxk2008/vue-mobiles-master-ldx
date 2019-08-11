<template>
  <van-dialog
    class="dialog-container"
    v-model="show"
    :show-cancel-button="false"
    :showConfirmButton="false"
  >
    <div class="main" v-if="type==='student_cancel'">取消任务需要和甲方沟通，双方同意后方可取消。</div>
    <div class="main" v-if="type==='student_complete'">乙方申请任务结束，请与甲方沟通后选择决定。</div>
    <div class="main" v-if="type==='company_progress'">
      <progressBar :progress="progress"/>
      <div class="progress">乙方任务进行阶段确认到 <span>{{progress*100+'%'}}</span> 请确定进度后同意</div>
    </div>
    <div class="success" v-if="type==='task_pay'">
      <p>
        <span>乙方进行任务交付</span>
        <span>请确定进度并同意</span>
      </p>
      <img :src="imgSrc" alt="">
    </div>
    <div class="btn">
      <van-button style="background:#18acb6" @click="cancel" round type="danger" size="small">返回</van-button>
      <van-button style="background:#c44c89" @click="confirm(type)" round type="danger" size="small">确定</van-button>
    </div>
  </van-dialog>
</template>

<script>
import progressBar from '@/components/progressBar'
export default {
  components: {progressBar},
  props: {
    type: {
      type: String,
      default: 'student_cancel' // student_cancel/complete 学生取消/完成   company_progress 公司进度 此时必须传进度值  task_pay 任务交付
    },
    progress: {
      type: Number,
      default: 0 //
    }
  },
  data() {
    return {
      show: false,
      imgSrc: require('@/assets/imgs/network.png')
    }
  },
  methods: {
    confirm(type) {
      this.show = false
      if (this.progress !== 0) {
        this.$emit('confirmDialog', type, this.progress)
      } else {
        this.$emit('confirmDialog', type)
      }
    },
    cancel() {
      this.show = false
    }
  }
}
</script>

<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.dialog-container{
  .padding(20,20,20,20);
  .main{
    text-align:left;
    .mt(60);
    .mb(60);
    .progress{
      .mt(40);
      .mb(40);
      span{
        color: #c14182;
      }
    }
  }
  .btn{
    display: flex;
    justify-content: space-around;
    .mb(10);
  }
  .success{
    .mt(60);
    .mb(60);
    display: flex;
    img{
      .w(300);
      .h(300);
    }
    p{
      flex:1;
      span{
        display: block;
        .mt(30);
        .mb(30);
      }
    }
  }
}
</style>
