<template>
  <div class="down">
    <span class="down-file">附属文件</span>
    <ul>
      <li>
        <van-icon name="send-gift-o" />
        <span class="title"></span>
        <van-uploader class="up-click" name="ldx" :after-read="afterRead">
          <span>点击上传</span>
        </van-uploader>
      </li>
      <li v-for="(item,index) in down" :key="index">
        <!-- <img class="img" src="" alt=""> -->
        <van-icon name="send-gift-o" />
        <span class="title">{{item.title}}</span>
        <span class="down-click">点击下载</span>
      </li>
    </ul>
    <span class="more">
      <van-icon name="ellipsis" />
      查看更多
    </span>
  </div>
</template>

<script>
import { fileUp } from 'api/file-api'
import { ERR_OK } from 'config/index'
export default {
  props: {
    down: {
      type: Array,
      default: () => []
    },
    taskObj: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      fileObj: {}
    }
  },
  methods: {
    afterRead(file) {
      var formdata = new FormData()
      formdata.append('file', file.file)
      let data = {
        task_id: this.fileObj.id,
        attach_type: sessionStorage.getItem('user_type') === '0' ? '1' : '0',
        data: formdata
      }
      fileUp(data).then((res) => {
        console.log(res.data, 111111111111111111111)
        if (res.data.success === ERR_OK) {
          this.$toast(res.data.msg)
        } else {
        }
      }).catch(() => {
      })
    }
  },
  watch: {
    taskObj(val) {
      this.fileObj = val
    }
  }
}
</script>

<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.down{
  .b-radius(30);
  background: #fafafa;
  color: #000;
  text-align: left;
  .padding(20,20,20,20);
  display: flex;
  flex-direction: column;
  .up-file{
     .mt(20);
     li{
       .mb(0);
     }
  }
  ul{
    .mb(20);
    .mt(20);
    li{
      display: flex;
      align-items: center;
      .mb(20);
      .van-icon{
        .fs(40);
        .mr(30);
      }
      .title{
        flex:1;
      }
      .up-click{
        .b-radius(30);
        background:#18acb6;
        color: #fff;
        .padding(4,20,4,20);
      }
      .down-click{
        .b-radius(30);
        background:#b1b1b1;
        color: #fff;
        .padding(4,20,4,20);
      }
    }
  }
  .more{
    display: flex;
    align-items: center;
    color: #b1b1b1;
    .van-icon{
      .fs(40);
    }
  }
}
</style>
