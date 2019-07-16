<template>
  <div class="student">
    <common-header :tittle="tittle"></common-header>
    <div class="student-main">
      <div class="company-introduce">
        <companyIntorduce :information="information" :imgShow="true"/>
      </div>
      <div class="done-task">
        <h4 style="color:#18ACB6">过往任务浏览 已完成20组任务</h4>
        <currentList :currentList="currentList" :done="true" @more="more"/>
      </div>
      <div class="img-view">
        <imgView :imgList="imgList"/>
        <fileDown :down="down"/>
      </div>
      <div class="evaluate-list">
        <h4>公司评价</h4>
        <evaluate :evaluate="evaluate"/>
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
import imgView from '@/pages/student/imgView'
import fileDown from '@/pages/user/fileDown'
export default {
  components: {
    commonHeader,
    companyIntorduce,
    currentList,
    evaluate,
    imgView,
    fileDown
  },
  data() {
    return {
      tittle: '',
      information: {
        name: '沙田伊莱莎',
        industry: '北京理工大学',
        assets: '300000￥',
        number: '18',
        logoImg: require('@/assets/imgs/user-img.png'),
        aboutUs: '北京大学在读生，性格开朗。精通6们语言，熟练掌握模拟芯片技术，是个不可多得的人才。',
        days: 3,
        tasksNum: 35,
        label: ['设计', '教育培训'],
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
          label: ['设计', '教育培训'],
          data: '2019年1月20日'
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
      imgList: [
        {
          imgSrc: require('@/assets/imgs/img0.png')
        }, {
          imgSrc: require('@/assets/imgs/img1.png')
        }, {
          imgSrc: require('@/assets/imgs/img5.png')
        }, {
          imgSrc: require('@/assets/imgs/img3.png')
        }, {
          imgSrc: require('@/assets/imgs/img4.png')
        }
      ],
      navList: [
        {
          label: '与他沟通',
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
    }
  }
}
</script>

<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.student{
  background: #f2f2f2;
  .student-main{
    overflow-x: hidden;
    overflow-y: auto;
    flex:1;
  }
  .img-view{
    .mt(10);
  }
  .company-introduce{
    background: #fff;
    .padding(30,20,30,20);
    .mb(10);
  }
  .done-task,.evaluate-list{
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
        background: #c14182;
        width: 100%;
        .pt(10);
        .pb(10);
      }
    }
  }
}
</style>
