<template>
  <div class="task-box">
    <common-header :tittle="tittle" :headerColor="headerColor" :showmore="false"></common-header>
    <div class="task-content">
      <taskSynopsis :information="information"></taskSynopsis>
      <taskStage :information="information" :down="down"></taskStage>
    </div>
    <div class="task-footer">
      <ul>
        <li v-for="(item,index) in navList" :key="index" @click="item.fun">{{item.label}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import commonHeader from 'common/common-header'
import taskSynopsis from './synopsis'
import taskStage from './stage'
export default {
  components: {
    commonHeader,
    taskSynopsis,
    taskStage
  },
  data() {
    return {
      headerColor: '#222230',
      tittle: 'LOGO设计',
      information: {
        name: '深圳益康电子',
        industry: '人工智能',
        assets: '300000￥',
        number: '18',
        logoImg: require('@/assets/imgs/user-img.png'),
        aboutUs: '公司介绍多看看出席第公司介绍多看看出席第公司介绍多看看出席第公司介绍多看看出席第公司介绍多看看出席第公司介绍多看看出席第公司介绍多看看出席第公司介绍多看看出席第公司介绍多看看出席第公司介绍多看看出席第',
        days: 3,
        tasksNum: 35,
        pay: '$355555'
      },
      down: [
        {
          imgSrc: '',
          title: '设计案例1.psd',
          downSrc: 'www.baidu.com'
        },
        {
          imgSrc: '',
          title: '设计案例1.word',
          downSrc: 'www.baidu.com'
        }
      ],
      navList: [
        {
          label: '取消发布',
          fun: data => {
            return this.cancel(data)
          }
        },
        {
          label: '再次编辑',
          fun: () => {
            return this.edit()
          }
        },
        {
          label: '确认申请人',
          fun: () => {
            return this.confirm()
          }
        }
      ]
    }
  },
  methods: {
    tohome() {
      this.$router.goBack()
    },
    cancel(data) {
      console.log('取消', data)
    },
    edit() {
      console.log('再次编辑')
    },
    confirm() {
      console.log('确认申请人')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.task-box{
  background: #7A7A82;
}
.task-content{
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}
.task-footer {
  .padding(30,20,30,20);
  background:#222230;
  position: sticky;
  bottom: 0;
  left:0;
  width:100%;
  box-sizing: border-box;
  ul{
    display: flex;
    justify-content: space-around;
    flex:1;
    li{
      .padding(12,30,12,30);
      .b-radius(500);
      color: #fff;
      background: #177582;
    }
    li:nth-child(1){
      background: #C5494C;
    }
  }
}
</style>
