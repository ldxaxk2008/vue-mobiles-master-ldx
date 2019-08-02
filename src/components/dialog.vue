<template>
  <div class="dialog">
<van-dialog
  v-model="show"
  title=""
  :showConfirmButton='false'
>
  <van-cell-group>
  <van-field
    v-model="message"
    type="textarea"
    placeholder="请输入"
    autosize
    class="textarea"
  />
  <div class="btn">
    <van-button round style="background:#18acb6" type="primary" size="small" @click="preserve">保存编辑</van-button>
    <van-button round style="background:#c14182" type="primary" size="small" @click="close">取消编辑</van-button>
  </div>
</van-cell-group>
</van-dialog>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      show: true,
      message: ''
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    preserve() {
      this.$emit('close', this.message)
    }
  },
  mounted() {
    this.message = this.data
  }
}
</script>

<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.textarea{
  .padding(20,20,20,20);
  background: #fff;
  /deep/ .van-field__control{
    background:#eee;
  }
}
.btn{
  .margin(10,60,20,60);
  display: flex;
  justify-content: space-between;
  .van-button{
    .pl(40);
    .pr(40);
  }
}
</style>
