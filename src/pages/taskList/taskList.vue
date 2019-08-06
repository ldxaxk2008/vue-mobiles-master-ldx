<template>
  <div class="list">
    <common-header :tittle="tittle"></common-header>
    <div class="list-main">
      <div class="company-introduce">
        <companyIntorduce :information="information" :imgShow="true"/>
      </div>
      <div class="current-task">
        <h4>当前进行的任务</h4>
          <currentList :currentList="currentList" ref="more" :dmore="dmore" @more="more('current')"/>
      </div>
      <div class="done-task">
        <h4>过往任务浏览 已完成20组任务</h4>
          <currentList :currentList="currentNList" ref="more" :done="true" :dmore="ndmore" @more="more('done')"/>
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
      currentNList: [],
      limit: 5,
      offset: 0,
      count: 0,
      dmore: false,
      ncount: 0,
      ndmore: false,
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
      this.offset = this.limit + this.offset
      let data = {
        limit: this.limit,
        offset: this.offset
      }
      this.getListData(data, 'more')
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
    getListNData(parmes, type) {
      taskList(parmes).then(res => {
        if (res.data.success === ERR_OK) {
          if (type === 'more') {
            this.currentNList = this.currentNList.concat(res.data.data.results)
            if (this.offset + this.limit > this.ncount) {
              this.ndmore = false
            }
          } else {
            this.currentNList = res.data.data.results
            this.ncount = res.data.data.count
            if (this.ncount > 10) {
              this.ndmore = true
            }
          }
        }
      }).catch({})
    },
    getListData(parmes, type) {
      taskList(parmes).then(res => {
        if (res.data.success === ERR_OK) {
          if (type === 'more') {
            this.currentList = this.currentList.concat(res.data.data.results)
            if (this.offset + this.limit > this.count) {
              this.dmore = false
            }
          } else {
            this.currentList = res.data.data.results
            this.count = res.data.data.count
            if (this.count > 10) {
              this.dmore = true
            }
          }
        }
      }).catch({})
    }
  },
  mounted() {
    this.getData()
    let data = {
      limit: this.limit,
      offset: this.offset,
      status: 1
    }
    this.getListData(data)
    let datas = {
      limit: this.limit,
      offset: this.offset,
      status: 2
    }
    this.getListNData(datas)
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
