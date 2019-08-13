<template>
  <div class="skill-box">
    <div class="skill-content">
      <h4 class="personal-skill">软件</h4>
      <ul>
        <li v-for="(item,index) in actions" :key="index">
          <span>{{item}}</span>
        </li>
        <li><van-icon v-if="addShow" name="add-o" color="#c14182" class="add" @click="skillClick"/></li>
      </ul>
    </div>
    <van-popup class="popup" v-model="show" @click-overlay="close">
      <ul>
        <li v-for="(item,index) in artList" :key="index">
          <span @click="artClick($event,item)">{{item}}</span>
        </li>
      </ul>
      <ul>
        <li v-for="(item,index) in softwareList" :key="index"><span><van-field v-model="item.value" placeholder="软件名" :max="3"/></span></li>
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
      artList: ['PS', 'AI', 'AR', 'DW', 'JS', 'HTML', 'VUE', 'REACT'],
      softwareList: []
    }
  },
  methods: {
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
      this.softwareList = this.softwareLists
      console.log(this.softwareLists, 22222222)
    },
    confirm() {
      let arr = Array.from(new Set(this.actions))
      console.log(arr)
      this.softwareList.forEach(item => {
        if (item.value !== '') {
          this.actions.push(item.value)
        }
      })
      this.$emit('softwareChange', arr)
      this.softwareList = []
      this.show = false
    }
  },
  watch: {
    softwareLists: {
      handler: function(newValue, oldValue) {
        console.log(newValue, oldValue, 1111111111111111)
        this.actions = newValue
      },
      deep: true
    }
    // softwareLists(val) {
    //   console.log('aaaaaaaaaa')
    //   this.actions = val
    // }
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
      justify-content: center;
      align-items: center;
      width: 33%;
      .fs(35);
      // .w(100);
      .h(105);
      background: url('../../assets/imgs/skill.png') no-repeat;
      .add,span{
        .ml(-10);
      }
    }
    li:nth-child(odd){color:#14BFE4;}
    li:nth-child(even){color:#FEAE62;}
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
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    li{
      display: flex;
      justify-content: center;
      align-items: center;
      .fs(35);
      .w(100);
      .mr(30);
      .h(105);
      background: url('../../assets/imgs/skill.png') no-repeat;
    }
    li:nth-child(odd){color:#14BFE4;}
    li:nth-child(even){color:#FEAE62;}
    .van-field{
      .fs(18);
    }
  }
  .btn{
    .mt(40);
  }
}
.colors{
  color:red;
  font-weight: bold;
}
</style>
