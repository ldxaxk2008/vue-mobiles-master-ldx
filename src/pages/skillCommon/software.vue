<template>
  <div class="skill-box">
    <div class="skill-content">
      <h4 class="personal-skill">软件</h4>
      <ul>
        <li v-for="(item,index) in actions" :key="index">
        <span class="test" v-if="addShow && item==='+'"><van-icon name="add-o" color="#c14182" class="add" @click="skillClick"/></span>
        <span v-else>{{item}}<van-icon v-if="showre" class="e" size="15" name="close" @click="remove(item)"/></span>
      </li>
        <li v-if="!actions.length"><van-icon name="add-o" color="#c14182" class="add" @click="skillClick"/></li>
      </ul>
    </div>
    <van-popup class="popup" v-model="show" @click-overlay="close">
      <ul v-if="show">
        <li class="list" v-for="(item,index) in artList" :key="index">
          <span :class="item.select? 'colors' : ''" @click="artClick($event,item)">{{item.title}}</span>
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
    api: {
      type: Boolean,
      default: true
    },
    addShow: {
      type: Boolean,
      default: true
    },
    softwareLists: {
      type: Array,
      default: () => []
    },
    showre: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      show: false,
      artList: [],
      newList: [],
      actions: [],
      selectList: [],
      softwareList: [],
      colors: 'colors'
    }
  },
  methods: {
    remove(val) {
      if (!this.api) {
        this.actions.forEach((item, index) => {
          if (item === val) {
            this.actions.splice(index, 1)
          }
        })
        this.selectList.forEach((item, index) => {
          if (item.target === val) {
            this.selectList.splice(index, 1)
          }
        })
      } else {
        this.actions.forEach((item, index) => {
          if (item === val) {
            this.actions.splice(index, 1)
          }
        })
        this.artList.map((item) => {
          if (item.title === val) {
            item.select = false
          }
        })
        this.selectList.forEach((item, index) => {
          if (item.target === val) {
            this.selectList.splice(index, 1)
          }
        })
        this.confirm()
      }
    },
    artClick(event, val) {
      if (event.target.className === 'colors') {
        event.target.className = ''
        this.selectList.forEach((item, index) => {
          if (item.target === val.title) {
            this.selectList.splice(index, 1)
          }
        })
        this.artList.map((item) => {
          if (item.title === val.title) {
            item.select = false
          }
        })
        console.log(this.selectList)
      } else {
        event.target.className = 'colors'
        this.artList.map((item) => {
          if (item.title === val.title) {
            item.select = true
          }
        })
        let j = 0
        this.selectList.forEach((item, index) => {
          if (item.target === val.title) {
            j = 1
            this.selectList.splice(index, 1)
          }
        })
        if (!j) {
          this.selectList.push({
            target: val.title,
            type: 1
          })
        }
      }
      console.log(this.selectList)
    },
    onSelect(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.show = false
    },
    skillClick() {
      this.show = true
      this.softwareListData()
    },
    addSoftware() {
      this.softwareList.push({
        value: ''
      })
    },
    close() {
      this.show = false
      // console.log(this.actions,this.selectList)
      // this.actions = []
      // this.softwareList = []
      // let arr = document.querySelectorAll('.list span')
      // arr.forEach(item => {
      //   item.className = ''
      // })
      // this.$emit('softwareChange')
    },
    confirm() {
      let data = []
      console.log(this.action, this.selectList)
      if (!this.api) {
        // this.action = this.selectList
        let b = false
        this.selectList.map((item) => {
          for (var i in this.action) {
            if (this.action[i] === item.target) {
              b = true
            }
          }
          if (!b) {
            data.push(item.target)
          }
        })
      } else {
        this.artList.map((item) => {
          if (item.select) {
            data.push(item.title)
          }
        })
        this.selectList.map((value) => {
          if (value.type === -1) {
            data.forEach((item, index) => {
              if (item === value.target) {
                data.splice(index, 1)
              }
            })
          } else {
            data.push(value.target)
          }
        })
        this.softwareList.forEach(item => {
          if (item.value !== '') {
            data.push(item.value)
          }
        })
        if (this.selectList.length >= 9) {
          this.$toast('软件最多选/填8个')
          data = []
          return
        }
        // this.softwareList = []
        // this.show = false
        // // this.actions = []
        // this.$emit('softwareChange', data)
      }
      this.show = false
      this.$emit('softwareChange', data)
    },
    softwareListData() {
      this.artList = []
      softwareList({resource_type: 2}).then((res) => {
        if (res.data.success === ERR_OK) {
          let arr = res.data.data.results
          arr.map((item) => {
            this.actions.map((val) => {
              if (item.title === val) {
                item['select'] = true
              }
            })
          })
          // arr.map((item) => {
          //   this.selectList.map((val) => {
          //     if (item.title === val.target && val.type === 1) {
          //       item['select'] = false
          //     } else if (item.title === val.target && val.type === -1) {
          //       item['select'] = true
          //     }
          //   })
          // })
          this.artList = arr
        }
      }).catch(() => {
      })
    }
  },
  created() {
    console.log(this.softwareLists, '323232')
  },
  mounted() {
    this.actions = this.softwareLists
    // this.softwareListData()
  },
  // actions: {
  //   userId: function () {
  //     return this.softwareLists
  //   }
  // }
  // computed: {
  //   actions: function () {
  //     return this.softwareLists
  //   }
  // },
  watch: {
    // softwareLists: {
    //   handler: function(newValue, oldValue) {
    //     this.actions = newValue
    //   },
    //   deep: true
    // }
    softwareLists(val) {
      console.log(val)
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
      background-size:100% 100%;
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
