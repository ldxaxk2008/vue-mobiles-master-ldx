<template>
  <div class="skill-box">
    <div class="skill-content">
      <h4 class="personal-skill">个人技能<van-icon v-if="addShow" name="add-o" color="#c14182"/></h4>
      <ul>
        <li v-for="(item,index) in skillList" :key="index">
          {{item.label}}
          <p>
            <span :style="{'width':item.value}"></span>
          </p>
        </li>
      </ul>
    </div>
    <!-- <van-action-sheet
      v-model="show"
      :actions="actions"
      @select="onSelect"
    /> -->
    <van-action-sheet v-model="show" title="标题">
      <input type="button" value="sfsdfds">
    </van-action-sheet>
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
</style>
