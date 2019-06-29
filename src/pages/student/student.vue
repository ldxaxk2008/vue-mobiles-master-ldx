<template>
  <div class="student">
    <common-header :tittle="tittle" :headerColor="headerColor"></common-header>
    <div class="student-main">
      <div class="company-introduce">
        <companyIntorduce :information="information" :imgShow="true"/>
      </div>
      <div class="done-task">
        <h4>过往任务浏览 已完成20组任务</h4>
          <currentList :currentList="currentList" :done="true"/>
      </div>
      <div class="img-view">
        <imgView :imgList="imgList"/>
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
export default {
  components: {
    commonHeader,
    companyIntorduce,
    currentList,
    evaluate,
    imgView
  },
  data() {
    return {
      tittle: '',
      headerColor: '#222230',
      information: {
        name: '沙田伊莱莎',
        industry: '北京理工大学',
        assets: '300000￥',
        number: '18',
        logoImg: require('@/assets/imgs/user-img.png'),
        aboutUs: '北京大学在读生，性格开朗。精通6们语言，熟练掌握模拟芯片技术，是个不可多得的人才。',
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
          data: '2019年10月20日'
        },
        {
          name: '代码',
          people: 118,
          money: 30000,
          days: 30,
          ask: '大是大非路上看见法律上的看了看',
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
  }

}
</script>

<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.student{
  background: #7a7a82;
  .student-main{
    overflow-x: hidden;
    overflow-y: auto;
    flex:1;
  }
  .img-view{
    .mt(10);
  }
  .company-introduce{
    background: #222230;
    .padding(30,20,30,20);
    .mb(10);
  }
  .done-task,.evaluate-list{
    background: #191927;
    color: #fff;
    .mt(10);
    .padding(30,20,30,20);
    text-align: left;
    h4{
      color: #0f7f9b;
      .mb(20);
    }
  }
  .task-footer {
    .padding(30,20,30,20);
    background:#141531;
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
        background: #148a96;
        width: 100%;
        .pt(10);
        .pb(10);
      }
    }
  }
}
</style>
