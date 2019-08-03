<template>
  <div class="task-box">
    <common-header :tittle="tittle" :showmore="false"></common-header>
    <div class="task-content">
      <taskSynopsis @taskSele="handelClick" :information="information"></taskSynopsis>
      <taskStage :information="companyList" :status="status" :down="down"></taskStage>
    </div>
    <div class="task-footer" v-if="show">
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
import {mapState, mapMutations} from 'vuex'
export default {
  components: {
    commonHeader,
    taskSynopsis,
    taskStage
  },
  data() {
    return {
      status: 1,
      show: true,
      tittle: 'LOGO设计',
      companyList: {
        name: '深圳益康电子',
        industry: '人工智能',
        assets: '300000￥',
        number: '18',
        logoImg: require('@/assets/imgs/user-img.png'),
        aboutUs: '公司介绍多看看出席第公司介绍多看看出席第公司介绍多看看出席第公司介绍多看看出席第公司介绍多看看出席第公司介绍多看看出席第公司介绍多看看出席第公司介绍多看看出席第公司介绍多看看出席第公司介绍多看看出席第',
        days: 3,
        tasksNum: 35,
        task_id: '',
        pay: '$355555'
      },
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
    ...mapMutations(['SET_TASK_ID']),
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
      this.$router.push({name: 'acceptTask', params: {id: this.information}})
    },
    handelClick(val) {
      if (val === 'applyTask') {
        applyTask({task_id: (this.$route.params.id && this.$route.params.id.id) || this.task_id, user_id: this.user_id}).then((res) => {
          console.log(res)
          if (res.data.success) {
          } else {
          }
        }).catch(() => {
        })
      } else {
        cancelTask({task_id: (this.$route.params.id && this.$route.params.id.id) || this.task_id, user_id: this.user_id}).then((res) => {
          this.$toast(res.data.msg)
          if (res.data.success) {
            // this.currentList = res.data.data.results
          } else {
          }
        }).catch(() => {
        })
      }
    },
    getData() {
      taskDetails((this.$route.params.id && this.$route.params.id.id) || this.task_id).then((res) => {
        if (res.data.success) {
          this.companyList = res.data.results
        } else {
        }
      }).catch(() => {
      })
    },
    informationData() {
      taskDetails((this.$route.params.id && this.$route.params.id.id) || this.task_id).then((res) => {
        if (res.data.success) {
          this.information = res.data.data
          this.status = this.information.status
        } else {
        }
      }).catch(() => {
      })
    }
  },
  mounted() {
    console.log(this.task_id, this.user_id)
    if (JSON.stringify(this.$route.params) === '{}' && !this.task_id) {
      this.$router.push('/mine')
      return
    } else {
      if (this.$route.params.id) {
        this.SET_TASK_ID(this.$route.params.id.id)
      }
    }
    // 权限添加
    if (window.sessionStorage.getItem('user_type') === '0') {
      this.show = false
    } else if (window.sessionStorage.getItem('user_type') === '1') {
      this.show = true
    }
    // this.getData()
    this.informationData()
  },
  computed: {
    ...mapState({
      user_id: state => state.login.user_id,
      task_id: state => state.login.task_id
    })
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
