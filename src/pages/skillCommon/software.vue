<template>
  <div class="skill-box">
    <div class="skill-content">
      <h4 class="personal-skill">软件<van-icon v-if="addShow" name="add-o" color="#c14182"/></h4>
      <ul>
        <li v-for="(item,index) in 5" :key="index">
          {{item}}
        </li>
      </ul>
    </div>
    <!-- <van-action-sheet
      v-model="show"
      :actions="actions"
      @select="onSelect"
    /> -->
    <van-action-sheet v-model="show" title="标题">
      <van-checkbox-group v-model="result" :max="2">
        <van-checkbox
          v-for="(item, index) in 5"
          :key="index"
          :name="item"
        >
          复选框 {{ item }}
        </van-checkbox>
      </van-checkbox-group>
    </van-action-sheet>
  </div>
</template>

<script>
export default {
  props: {
    addShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      show: false,
      result: [],
      actions: [
        { name: '选项' },
        { name: '选项' },
        { name: '选项', subname: '描述信息' }
      ]
    }
  },
  methods: {
    onSelect(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.show = false
    },
    skillClick() {
      this.show = true
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
      justify-content: center;
      align-items: center;
      width: 33%;
      // .w(100);
      .h(105);
      background: url('../../assets/imgs/skill.png') no-repeat;
    }
    li:nth-child(1){color:#14BFE4;}
    li:nth-child(2){color:#FEAE62;}
    li:nth-child(3){color:#96D6C6;}
    li:nth-child(4){color:#EF7272;}
    li:nth-child(5){color:#c14182;}
  }
}
</style>
