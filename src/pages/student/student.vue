<template>
  <div class="student">
    <common-header :tittle="tittle"></common-header>
    <div class="student-main">
      <div class="company-introduce">
        <companyIntorduce :information="information" :imgShow="true"/>
        <div class="skill-main">
          <skill :skillList="skillList" class="software">asdasdsad</skill>
          <software class="skill-user"/>
        </div>
      </div>
      <div class="done-task">
        <h4 style="color:#18ACB6">过往任务浏览 已完成20组任务</h4>
        <currentList ref="more" :currentList="currentList" :done="true" @more="more"/>
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
import software from '@/pages/skillCommon/software'
import skill from '@/pages/skillCommon/skill'
import {taskList} from 'api/home-api'
import {studentData} from 'api/student-api'
import { ERR_OK } from 'config/index'
export default {
  components: {
    commonHeader,
    companyIntorduce,
    currentList,
    evaluate,
    imgView,
    fileDown,
    software,
    skill
  },
  data() {
    return {
      tittle: '',
      information: {},
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
      currentList: [],
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
      ],
      skillList: [{
        label: '作曲',
        value: '30%'
      }, {
        label: '绘画',
        value: '90%'
      }, {
        label: '写作',
        value: '6%'
      }],
      page: {
        limit: 50,
        offset: 0
      }
    }
  },
  methods: {
    more(val) {
      this.page.offset += this.page.limit
      this.getListData()
    },
    student() {
      studentData().then((res) => {
        console.log(res.data)
        if (res.data.success === ERR_OK) {
          this.information = res.data.data
        } else {
        }
      }).catch(() => {
      })
    },
    getListData() {
      taskList(this.page).then((res) => {
        if (!res.data.data.results.length) {
          this.$refs['more'].$el.removeChild(this.$refs['more'].$el.getElementsByClassName('more')[0])
          return false
        }
        if (res.data.success === ERR_OK) {
          this.currentList.push(...res.data.data.results)
        } else {
        }
      }).catch(() => {
      })
    }
  },
  mounted() {
    this.student()
    this.getListData()
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
.skill-main{
  display: flex;
  .skill-user{
    flex:1;
  }
  .software{
    flex:1;
  }
}
</style>
