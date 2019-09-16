<template>
  <div class="skill-box">
    <div class="skill-content">
      <h4 class="personal-skill">软件</h4>
      <ul>
        <li v-for="(item,index) in actions" :key="index">
          <span v-if="item==='+'"><van-icon v-if="addShow" name="add-o" color="#c14182" class="add" @click="skillClick"/></span>
          <span v-else>{{item}}<van-icon class="e" size="15" name="close" @click="remove(item)"/></span>
        </li>
        <li v-if="!actions.length"><van-icon name="add-o" color="#c14182" class="add" @click="skillClick"/></li>
      </ul>
    </div>
    <van-popup class="popup" v-model="show" @click-overlay="close">
      <ul>
        <li class="list" v-for="(item,index) in artList" :key="item+index">
          <span @click="artClick($event,item)">{{item}}</span>
        </li>
        <li v-for="(item,index) in softwareList" :key="index"><span><van-field v-model="item.value" placeholder="软件名" :maxlength="5"/></span></li>
        <li><van-icon v-if="addShow" name="add-o" color="#c14182" class="add" @click="addSoftware"/></li>
      </ul>
      <div class="btn">
        <van-button @click="confirm" style="background:#18ACB6;color:#fff;" round size="small">保存编辑</van-button>
        <van-button @click="close" style="background:#c14182;color:#fff;" round size="small">取消编辑</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import {softwareList} from 'api/software-api'
import { ERR_OK } from 'config/index'
export default {
  props: {
    addShow: {
      type: Boolean,
      default: true
    },
    softwareLists: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      show: false,
      actions: [],
      artList: [],
      newList: [],
      softwareList: []
    }
  },
  methods: {
    remove(val) {
      this.actions.forEach((item, index) => {
        if (item === val) {
          this.actions.splice(index, 1)
        }
      })
      this.confirm()
    },
    artClick(event, val) {
      if (event.target.className) {
        event.target.className = ''
        this.actions.forEach((item, index) => {
          if (item === val) {
            this.actions.splice(index, 1)
          }
        })
      } else {
        event.target.className = 'colors'
        this.actions.push(val)
      }
      this.newList = this.actions
    },
    onSelect(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.show = false
    },
    skillClick() {
      this.show = true
    },
    addSoftware() {
      this.softwareList.push({
        value: ''
      })
    },
    close() {
      this.show = false
      // this.actions = []
      // this.softwareList = []
      // let arr = document.querySelectorAll('.list span')
      // arr.forEach(item => {
      //   item.className = ''
      // })
      // this.$emit('softwareChange')
    },
    confirm() {
      let arr = Array.from(new Set(this.actions))
      this.softwareList.forEach(item => {
        if (item.value !== '') {
          arr.push(item.value)
        }
      })
      if (this.actions.length >= 9) {
        console.log(this.actions)
        this.$toast('软件最多选/填8个')
        arr = []
        return
      }
      // this.softwareList = []
      this.show = false
      // this.actions = []
      this.$emit('softwareChange', arr)
    },
    softwareListData() {
      softwareList({resource_type: 2}).then((res) => {
        if (res.data.success === ERR_OK) {
          let arr = []
          res.data.data.results.forEach(item => {
            arr.push(item.title)
          })
          this.artList = arr
        }
      }).catch(() => {
      })
    }
  },
  mounted() {
    this.softwareListData()
  },
  watch: {
    // softwareLists: {
    //   handler: function(newValue, oldValue) {
    //     this.actions = newValue
    //   },
    //   deep: true
    // }
    softwareLists(val) {
      this.actions = val
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.skill-content{
  display: flex;
  flex-direction: column;
  .personal-skill{
    flex:1;
    display: flex;
    align-items: center;
    .van-icon{
      .ml(10);
    }
  }
  ul{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    li{
      display: flex;
      float: left;
      position: relative;
      .mb(-10);
      justify-content: center;
      align-items: center;
      width: 33%;
      .fs(30);
      .pb(130);
      // .w(100);
      background: url('../../assets/imgs/skill.png') no-repeat;
      background-size: 100% 100%;
      .add,span{
        position: absolute;
        top:0;
        left:0;
        bottom: 0;
        right: 0;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .e{
        color: #bbb;
        position: absolute;
        .top(8);
        .right(25);
      }
    }
    li:nth-child(odd){color:#14BFE4;}
    li:nth-child(even){color:#FEAE62;}
    li:nth-child(5n + 4) {
      .ml(40);
    }
    li:nth-child(5n + 5) {
      .mr(40);
    }
    // li:nth-child(3){color:#96D6C6;}
    // li:nth-child(4){color:#EF7272;}
    // li:nth-child(5){color:#c14182;}
  }
}
.popup{
  width: 80%;
  .padding(20,20,20,20);
  box-sizing: border-box;
  ul{
    // display: flex;
    // flex-wrap: wrap;
    // justify-content: center;
    .pl(30);
    .pb(20);
    overflow: hidden;
    li{
      float: left;
      display: flex;
      .mb(-30);
      justify-content: center;
      align-items: center;
      .fs(30);
      .w(100);
      .mr(30);
      .h(105);
      background: url('../../assets/imgs/skill.png') no-repeat;
    }
    li:nth-child(odd){color:#14BFE4;}
    li:nth-child(even){color:#FEAE62;}
    li:nth-child(7n - 2) {
      .ml(60);
    }
    li:nth-child(7n) {
      .mr(60);
    }
    .van-field{
      .fs(18);
    }
  }
  .btn{
    overflow: hidden;
    .mt(40);
    justify-content: space-around;
    display: flex;
  }
}
.colors{
  color:red;
  font-weight: bold;
}
</style>
