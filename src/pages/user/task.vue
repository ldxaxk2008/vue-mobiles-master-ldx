<template>
  <div class="task-box">
    <common-header :tittle="tittle" :showmore="false"></common-header>
    <div class="task-content">
      <taskSynopsis :agreepage="agreepage" @taskSele="handelClick" :information="information" :userId="userId" :companyList="companyList" @handelEdit="handelEdit"></taskSynopsis>
      <taskStage @resetFileList="resetFileList" :taskList='information' :information="companyList" :status="status" :down="down" @stageChange="stageChange"></taskStage>
    </div>
    <div class="task-footer" v-if="show">
      <ul>
        <li v-for="(item,index) in navList" :key="index" @click="item.fun">{{item.label}}</li>
      </ul>
    </div>
    <div class="task-footer" v-if="connectShow">
      <ul>
        <li v-if="connectState===JSON.stringify(information.user_id)" style="background: #b92671;width:100%;" @click="connect">与企业沟通</li>
        <li v-else style="background: #b92671;width:100%;" @click="connect">与他沟通</li>
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
import {canceltask, getPortfolio} from 'api/task-api'
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
      agreepage: false,
      rules: {},
      textData: {},
      status: 1,
      taskId: '',
      connectState: cookie.get('user_id'),
      tittle: '任务详情',
      companyList: {},
      information: {},
      down: [],
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
    resetFileList(val) {
      this.getPortfolio()
    },
    connect(data) {
      console.log(data)
      this.$router.push('/chat/' + this.userId)
    },
    cancel(data) {
      this.$dialog.alert(
        {
          message: '确认取消发布？',
          showCancelButton: true
        }
      ).then(item => {
        canceltask({task_id: this.information.id}).then(res => {
          if (res.data.success) {
            this.$router.push('/home')
          }
        }).catch(() => {
        })
      }).catch(error => {
        console.log(error, 222)
      })
    },
    edit() {
      console.log('再次编辑')
      this.$router.push('/taskeditor/' + this.information.id)
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
        if (!this.agreepage) {
          this.$toast('请同意协议')
          this.$router.push({name: 'agreepage', query: {id: this.information}})
          return
        }
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
        this.$router.push({name: 'Task', params: {id: this.information.id}})
        this.agreepage = false
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
          console.log(this.companyList, 'lllllllll')
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
    getPortfolio() {
      getPortfolio({'user_id': this.userId, 'task_id': this.taskId}).then(res => {
        console.log(res.data.data.results, this.information, 'hhhhhhh')
        this.down = res.data.data.results
      })
    },
    async asyncPrint() {
      await this.informationData()
      this.getData()
      // this.getPortfolio()
    }
  },
  mounted() {
    this.agreepage = !!this.$route.query.agreepage
    if (this.agreepage) {
      this.handelClick('applyTask')
    }
    let url = this.$route.path
    this.taskId = url.substring(url.lastIndexOf('/') + 1, url.length)
    if (!this.taskId) {
      this.$router.push('/home')
      return
    } else {
      this.SET_TASK_ID(this.taskId)
    }
    // this.getData()
    // this.informationData()
    this.asyncPrint()
    this.getPortfolio()
  },
  computed: {
    connectShow() {
      let id = parseInt(cookie.get('user_id'))
      if (cookie.get('user_type') === '0') {
        if (this.userId !== 0 && id === this.userId) {
          return true
        } else {
          return false
        }
      } else if (cookie.get('user_type') === '1') {
        if (this.userId !== 0 && id === this.comId) {
          return true
        } else {
          return false
        }
      }
    },
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
  },
  watch: {
    agreepage(val) {
      if (val) {
        this.handelClick('applyTask')
      }
    }
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
  // background:rgb(245, 245, 245);
  // background:#222230;
  background:#f5f5f5;
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
