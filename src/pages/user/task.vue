<template>
  <div class="task-box">
    <common-header :tittle="tittle" :showmore="false"></common-header>
    <div class="task-content">
      <taskSynopsis @taskSele="handelClick" :information="information"></taskSynopsis>
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
import {taskDetails, applyTask, cancelTask} from 'api/home-api'

export default {
  components: {
    commonHeader,
    taskSynopsis,
    taskStage
  },
  data() {
    return {
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
          disable: true,
          fun: data => {
            return this.cancel(data)
          }
        },
        {
          label: '再次编辑',
          disable: false,
          fun: () => {
            return this.edit()
          }
        },
        {
          label: '确认申请人',
          disable: false,
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
      this.$router.push('/User/acceptTask')
    },
    handelClick(val) {
      if (val === 'applyTask') {
        applyTask({task_id: this.$route.params.id.id, user_id: 14}).then((res) => {
          console.log(res)
          if (res.data.success) {
            // this.currentList = res.data.data.results
          } else {
          }
        }).catch(() => {
        })
      } else {
        cancelTask({task_id: this.$route.params.id.id, user_id: 14}).then((res) => {
          console.log(res)
          if (res.data.success) {
            // this.currentList = res.data.data.results
          } else {
          }
        }).catch(() => {
        })
      }
    },
    getData() {
      taskDetails(this.$route.params.id.id).then((res) => {
        if (res.data.success) {
          this.currentList = res.data.data.results
        } else {
        }
      }).catch(() => {
      })
    }
  },
  mounted() {
    console.log(this.$route)
    this.getData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.task-box{
  background: #f5f5f5;
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
      background: #f7c724;
    }
    li:nth-child(1){
      background: #c0c0c0;
    }
    li:nth-child(2){
      background: #18acb6;
    }
  }
}
</style>
