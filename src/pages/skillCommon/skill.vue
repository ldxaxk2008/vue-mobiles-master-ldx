<template>
  <div class="skill-box">
    <div class="skill-content">
      <h4 class="personal-skill">个人技能<van-icon @click="skillClick" v-if="addShow" name="add-o" color="#c14182"/></h4>
      <div v-if="!actions.length" style="margin-top:10px;">暂无技能，点击<van-icon name="add-o" color="#c14182"/>添加</div>
      <ul>
        <li v-for="(item,index) in actions" :key="index">
          {{item.title}}
          <p>
            <span :style="{'width':item.progress*100+'%'}"></span>
          </p>
        </li>
      </ul>
    </div>
    <van-popup class="popup" v-model="show" @click-overlay="close">
      <ul>
        <li v-for="(item,index) in softwareList" :key="index">
          <van-field v-model="item.label" placeholder="技能名" :max="3"/>
          <van-slider
            v-model="item.value"
            active-color="rgb(24, 172, 182)"
          >
            <div
              slot="button"
              class="custom-button"
            >
              {{ item.value }}
            </div>
          </van-slider>
        </li>
        <li class="normal">
          <div class="va-div"><van-icon size="15" v-if="addShow" name="add-o" class="add" @click="addSoftware"/></div>
          <p></p>
        </li>
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
    skillList: {
      type: Array,
      default: () => []
    },
    addShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      show: false,
      softwareList: [],
      actions: [],
      value: ''
    }
  },
  methods: {
    onSelect(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.show = false
    },
    skillClick() {
      this.show = true
    },
    addSoftware() {
      this.softwareList.push({
        value: 0,
        label: ''
      })
    },
    close() {
      this.show = false
      this.softwareList = []
    },
    confirm() {
      this.softwareList.forEach(item => {
        if (item.value !== '' && item.label !== '') {
          this.actions.push({
            title: item.label,
            progress: item.value / 100
          })
        }
      })
      this.$emit('skillChage', this.actions)
      this.softwareList = []
      this.show = false
    }
  },
  mounted() {
  },
  watch: {
    skillList(val) {
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
  .personal-skill{
    display: flex;
    align-items: center;
    .van-icon{
      .ml(10);
    }
  }
  ul{
    li{
      display: flex;
      .pl(20);
      .pt(20);
      p{
        .margin(20,20,20,30);
        .h(10);
        flex: 1;
        overflow: hidden;
        background: #f5f5f5;
        display: flex;
        .b-radius(40);
        span{
          .b-radius(40);
          display: block;
          background: #549AD3;
        }
      }
    }
  }
}
.popup{
  overflow: hidden;
  width: 80%;
  .padding(20,20,20,20);
  box-sizing: border-box;
  .custom-button{
    .padding(5,5,5,5);
    background:rgb(24, 172, 182);
    color: #fff;
    .b-radius(30);
  }
  li{
    display: flex;
    align-items: center;
    .mb(20);
    .van-field{
      flex: 1;
      background:#f9ef78;
      .mr(20);
      .pl(10);
      box-sizing: border-box;
      .b-radius(10);
    }
    .van-slider{
      flex: 4;
      height:3px;
    }
  }
}
.normal{
  display: flex;
  .va-div{
    .w(110);
    .padding(8,5,5,5);
    background:rgb(193, 65, 130);
    .b-radius(10);
    color: #fff;
  }
  p{
    flex:1;
    background: #eee;
    height: 3px;
    .ml(10);
  }
}
</style>
