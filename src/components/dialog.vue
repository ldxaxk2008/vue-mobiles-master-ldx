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
      type: Object,
      default: () => {}
    },
    rules: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      show: false,
      message: ''
    }
  },
  methods: {
    close() {
      this.show = false
    },
    open() {
      this.show = true
    },
    valid(rules) {
      let prop = this.data.prop
      let label = this.data.label
      let data = this.message
      let alert = this.$toast
      return new Promise((resolve, reject) => {
        if (rules[prop]) {
          let step = 0
          rules[prop].forEach((item) => {
            if (item.valid(data)) {
              if (item.require) {
                if (data && data.length > 0) {
                  step++
                } else {
                  alert(label + '不能为空')
                  return false
                }
              }
            } else {
              alert(item.message)
              resolve(false)
            }
          })
          if (step > 0) {
            resolve(true)
          } else {
            resolve(false)
          }
        } else {
          resolve(true)
        }
      })
    },
    preserve() {
      let rules = this.rules
      this.valid(rules).then((res) => {
        if (res) {
          this.$emit('close', this.message, this.data.prop)
          this.show = false
        } else {}
      }).catch(() => {
      })
    }
  },
  watch: {
    data: {
      handler(newName, oldName) {
        this.message = newName.defaultVal
      },
      immediate: true
    }
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
