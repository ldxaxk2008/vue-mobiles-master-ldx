<template>
  <div class="task-box">
    <common-header :tittle="tittle" :showmore="false"></common-header>
    <div class="task-content">
      <taskSynopsis @taskSele="handelClick" :information="information" :userId="userId" @handelEdit="handelEdit"></taskSynopsis>
      <taskStage :taskList='information' :information="companyList" :status="status" :down="down" @stageChange="stageChange"></taskStage>
    </div>
    <div class="task-footer" v-if="show">
      <ul>
        <li v-for="(item,index) in navList" :key="index" @click="item.fun">{{item.label}}</li>
      </ul>
    </div>
    <dialogBox ref="dialog" :rules="rules" :data="textData" @close="resetContent"/>
  </div>
</template>

<script>
import commonHeader from 'common/common-header'
import taskSynopsis from './synopsis'
import taskStage from './stage'
import {taskDetails, applyTask, cancelTask} from 'api/home-api'
import {companyDetails} from 'api/company-api'
import {mapState, mapMutations} from 'vuex'
import dialogBox from 'common/dialog'
import cookie from 'vue-cookies'

export default {
  components: {
    commonHeader,
    taskSynopsis,
    taskStage,
    dialogBox
  },
  data() {
    return {
      rules: {},
      textData: {},
      status: 1,
      tittle: '任务详情',
      companyList: {},
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
      this.$router.push('/taskeditor/get')
    },
    confirm() {
      console.log('确认申请人')
      this.$router.push({name: 'acceptTask', params: {id: this.information}})
    },
    // 修改任务
    handelEdit(data, sign, label) {
      this.textData = {
        defaultVal: data,
        prop: sign,
        label: label
      }
      this.$refs['dialog'].open()
    },
    // 修改完成
    resetContent(val, item) {
      console.log(val, item, 'reeeeeeeee')
    },
    stageChange(falg, val) {
      if (falg) {
        this.informationData()
        if (val === 'task_pay') {
          let id = this.information.task_user_id
          cookie.set('task_user_id', id)
          this.$router.push({name: 'evaluate', params: {task_user_id: id}})
        }
      }
    },
    handelClick(val, back) {
      if (val === 'applyTask') {
        applyTask({task_id: (this.$route.params.id && this.$route.params.id.id) || this.task_id, user_id: cookie.get('user_id')}).then((res) => {
          console.log(res)
          if (res.data.success) {
            back(true)
          } else {
            back(false)
          }
        }).catch(() => {
        })
      } else {
        cancelTask({task_id: (this.$route.params.id && this.$route.params.id.id) || this.task_id, user_id: cookie.get('user_id')}).then((res) => {
          this.$toast(res.data.msg)
          if (res.data.success) {
            back(true)
            // this.currentList = res.data.data.results
          } else {
            back(false)
          }
        }).catch(() => {
        })
      }
    },
    getData() {
      companyDetails({user_id: this.information.company_id}).then((res) => {
        if (res.data.success) {
          this.companyList = res.data.data
        } else {
        }
      }).catch(() => {
      })
    },
    informationData() {
      return taskDetails((this.$route.params.id && this.$route.params.id.id) || this.task_id).then((res) => {
        if (res.data.success) {
          this.information = res.data.data
          console.log(this.information, 999)
          this.status = this.information.status
        } else {
        }
      }).catch(() => {
      })
    },
    // 获取下载列表
    // getPortfolio() {
    //   getPortfolio({'user_id': this.userId, 'task_id': this.task_id}).then(res => {
    //     console.log(res, 'hhhhhhh')
    //   })
    // },
    async asyncPrint() {
      await this.informationData()
      this.getData()
      // this.getPortfolio()
    }
  },
  mounted() {
    console.log(this.task_id, this.user_id)
    if (JSON.stringify(this.$route.params) === '{}' && !this.task_id) {
      this.$router.push('/home')
      return
    } else {
      if (this.$route.params.id) {
        this.SET_TASK_ID(this.$route.params.id.id)
      }
    }
    // this.getData()
    // this.informationData()
    this.asyncPrint()
  },
  computed: {
    userId: function () {
      return this.information.user_id
    },
    comId: function () {
      return this.information.company_id
    },
    show: function () {
      let id = cookie.get('user_id')
      if (id === JSON.stringify(this.comId) && this.userId === 0) {
        return true
      } else {
        return false
      }
    },
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
  background:rgb(245, 245, 245);
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
