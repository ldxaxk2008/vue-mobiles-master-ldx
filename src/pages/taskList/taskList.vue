<template>
  <div class="list">
    <common-header :tittle="tittle"></common-header>
    <div class="list-main">
      <div class="company-introduce">
        <companyIntorduce :information="information" :imgShow="true"/>
      </div>
      <div class="current-task">
        <h4>当前进行的任务</h4>
          <currentList :currentList="currentList" ref="more" @more="more('current')"/>
      </div>
      <div class="done-task">
        <h4>过往任务浏览 已完成20组任务</h4>
          <currentList :currentList="currentList" ref="more" :done="true" @more="more('done')"/>
      </div>
      <div class="evaluate-list">
        <h4>学生评价</h4>
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
import {companyDetails} from 'api/company-api'
import {taskList} from 'api/home-api'

import { ERR_OK } from 'config/index'

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
      information: {},
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
      navList: [
        {
          label: '与企业沟通',
          fun: data => {
            return this.cancel(data)
          }
        }
      ],
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
    // evajump() {
    //   this.$router.push('/User/Student')
    // },
    cancel(data) {
      console.log(data)
    },
    getData() {
      let userid = sessionStorage.getItem('user_id')
      companyDetails({user_id: userid}).then(res => {
        if (res.data.success === ERR_OK) {
          this.information = res.data.data
        } else {
        }
      }).catch(() => {
      })
    },
    getListData() {
      taskList(this.page).then(res => {
        if (!res.data.data.results.length) {
          this.$refs['more'].close()
          return false
        }
        if (res.data.success === ERR_OK) {
          this.currentList.push(...res.data.data.results)
        } else {
        }
      }).catch({})
    }
  },
  mounted() {
    this.getData()
    this.getListData()
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
