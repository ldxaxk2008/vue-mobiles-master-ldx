<template>
  <div class="list">
    <common-header :tittle="tittle"></common-header>
    <div class="list-main">
      <div class="company-introduce">
        <companyIntorduce :information="information" :imgShow="true"/>
      </div>
      <div class="current-task">
        <h4>当前进行的任务</h4>
          <currentList :currentList="currentList" @more="more('current')"/>
      </div>
      <div class="done-task">
        <h4>过往任务浏览 已完成20组任务</h4>
          <currentList :currentList="currentList" :done="true" @more="more('done')"/>
      </div>
      <div class="evaluate-list">
        <h4>学生评价</h4>
        <evaluate :evaluate="evaluate" @evajump="evajump"/>
      </div>
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
import companyIntorduce from '@/pages/user/enterpriseSynopsis'
import currentList from '@/pages/taskList/currentTaskList'
import evaluate from '@/pages/taskList/evaluate'
export default {
  components: {
    commonHeader,
    companyIntorduce,
    currentList,
    evaluate
  },
  data() {
    return {
      tittle: '',
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
      currentList: [
        {
          name: '设计',
          people: 18,
          money: 500,
          days: 3,
          ask: '任务要求任务要求任务要求任务要求任务要求',
          data: '2019年10月20日',
          label: ['设计', '教育培训']
        },
        {
          name: '代码',
          people: 118,
          money: 30000,
          days: 30,
          ask: '大是大非路上看见法律上的看了看',
          data: '2019年1月20日',
          label: ['设计', '教育培训']
        }
      ],
      evaluate: [
        {
          imgSrc: require('@/assets/imgs/user-img.png'),
          data: '2019-1-1',
          remark: '啥也不说了，666666'
        },
        {
          imgSrc: require('@/assets/imgs/user-img.png'),
          data: '2019-11-21',
          remark: '负责人，厉害的很'
        }
      ],
      navList: [
        {
          label: '与企业沟通',
          fun: data => {
            return this.cancel(data)
          }
        }
      ]
    }
  },
  methods: {
    more(val) {
      let obj = this.currentList[0]
      for (let i = 0; i < 3; i++) {
        this.currentList.push(obj)
      }
    },
    evajump() {
      this.$router.push('/User/Student')
    }
  }
}
</script>

<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.list{
  background: #f5f5f5;
  .list-main{
    overflow-x: hidden;
    overflow-y: auto;
    flex:1;
  }
  .company-introduce{
    background: #fff;
    .padding(30,20,30,20);
    .mb(10);
  }
  .current-task,.done-task,.evaluate-list{
    background: #fff;
    color: #fff;
    .mt(10);
    .padding(30,20,30,20);
    text-align: left;
    h4{
      color: #000;
      .mb(20);
    }
  }
  .task-footer {
    .padding(30,20,30,20);
    background:#fff;
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
        .b-radius(500);
        color: #fff;
        background: #b92671;
        width: 100%;
        .pt(10);
        .pb(10);
      }
    }
  }
}
</style>
