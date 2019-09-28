<template>
  <div class="student">
    <common-header :tittle="tittle"></common-header>
    <div class="student-main">
      <div class="company-introduce">
        <companyIntorduce :information="information" :imgShow="true" @handelEdit="handelEdit" :isStudent="isStudent"/>
        <div class="skill-main">
          <skill @skillChage="skillChage" :addShow="addShow" :skillList="skillList" class="software"></skill>
          <software @softwareChange="softwareChange" :addShow="addShow" :softwareLists="softwareLists" class="skill-user"/>
        </div>
      </div>
      <div class="done-task">
        <h4 style="color:#18ACB6">过往任务浏览 已完成20组任务</h4>
        <currentList ref="more" :currentList="currentList" :dmore="dmore" :done="true" @more="more"/>
      </div>
      <div class="img-view">
        <imgView :imgList="imgList"/>
        <fileDown :showUpload="showUpload" :down="down" :taskObj="information"/>
      </div>
      <div class="evaluate-list">
        <div v-if="!showE" class="hideEvaluate">暂无评价</div>
        <div  v-if="showE">
          <h4>公司评价</h4>
          <evaluate :evaluate="evaluate"/>
        </div>
      </div>
    </div>
    <div class="task-footer">
      <ul>
        <li v-for="(item,index) in navList" :key="index" @click="item.fun">{{item.label}}</li>
      </ul>
    </div>
    <dialogBox ref="dialog" :rules="rules" :data="textData" @close="resetContent"/>
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
import {staskList} from 'api/home-api'
import {studentData, studentinfor, getEvaluateList, getPortfolio} from 'api/student-api'
import { ERR_OK } from 'config/index'
import dialogBox from 'common/dialog'
import cookie from 'vue-cookies'
export default {
  components: {
    commonHeader,
    companyIntorduce,
    currentList,
    evaluate,
    imgView,
    fileDown,
    software,
    skill,
    dialogBox
  },
  data() {
    return {
      textData: {},
      tittle: '',
      information: {},
      limit: 5,
      isStudent: true,
      userId: '',
      showUpload: false,
      offset: 0,
      dmore: false,
      count: 0,
      down: [],
      currentList: [],
      evaluate: [],
      imgList: [],
      navList: [
        {
          label: '与他沟通',
          fun: data => {
            return this.cancel(data)
          }
        }
      ],
      skillList: [],
      softwareLists: [],
      rules: {}
    }
  },
  methods: {
    cancel() {
      this.$router.push('/chat/' + this.userId)
    },
    // 点击修改
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
      console.log(val, item, 876554)
      let id = cookie.get('user_id')
      let data
      if (item === 'desc') {
        data = {
          desc: val
        }
      } else if (item === 'nickName') {
        data = {
          school_name: val
        }
      }
      studentinfor(id, data).then(res => {
        this.student()
      })
    },
    softwareChange(val) {
      console.log(val, 11111111)

      val && val.forEach((item, index) => {
        if (item === '+') {
          val.splice(index, 1)
        }
      })
      // studentinfor((this.$route.params.id && this.$route.params.id.id) ? this.$route.params.id.id : cookie.get('user_id'), {tool_list: val}).then((res) => {
      studentinfor(this.userId ? this.userId : cookie.get('user_id'), {tool_list: val}).then((res) => {
        console.log(res.data)
        if (res.data.success === ERR_OK) {
          this.student()
          this.softwareLists = val
          // window.location.reload()
        } else {
        }
      }).catch(() => {
      })
    },
    skillChage(val) {
      this.skillList = val
      // studentinfor((this.$route.params.id && this.$route.params.id.id) ? this.$route.params.id.id : cookie.get('user_id'), {skill_list: val}).then((res) => {
      studentinfor(this.userId ? this.userId : cookie.get('user_id'), {skill_list: val}).then((res) => {
        console.log(res.data)
        if (res.data.success === ERR_OK) {
          this.student()
        } else {
        }
      }).catch(() => {
      })
    },
    more(val) {
      this.offset = this.limit + this.offset
      let data = {
        limit: this.limit,
        offset: this.offset,
        status: 3
      }
      this.getListData(data, 'more')
    },
    student() {
      let parmes = {}
      // Object.assign(parmes, {'user_id': (this.$route.params.id && this.$route.params.id.id) ? this.$route.params.id.id : cookie.get('user_id')})
      Object.assign(parmes, {'user_id': this.userId ? this.userId : cookie.get('user_id')})
      studentData(parmes).then((res) => {
        if (res.data.success === ERR_OK) {
          this.information = res.data.data
          this.skillList = res.data.data.skill_list
          let arr = res.data.data.tool_list
          console.log(JSON.stringify(res.data.data.id) === cookie.get('user_id'), 'cookie')
          if (JSON.stringify(res.data.data.id) === cookie.get('user_id')) {
            arr.splice(parseInt(arr.length / 2), 0, '+')
          }
          this.softwareLists = arr
        } else {
        }
      }).catch(() => {
      })
    },
    getListData(parmes, type) {
      // Object.assign(parmes, {'user_id': (this.$route.params.id && this.$route.params.id.id) ? this.$route.params.id.id : cookie.get('user_id')})
      Object.assign(parmes, {'user_id': this.userId ? this.userId : cookie.get('user_id')})
      staskList(parmes).then((res) => {
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
      }).catch(() => {
      })
    },
    getEvaluateList() {
      console.log('qq')
      let userId = this.userId ? this.userId : cookie.get('user_id')
      getEvaluateList({user_id: userId}).then((res) => {
        this.evaluate = res.data.data.results
      })
    },
    // 获取下载列表
    getPortfolio() {
      getPortfolio({'user_id': this.userId ? this.userId : cookie.get('user_id')}).then(res => {
        let down = this.down
        let imgArray = []
        res.data.data.results.map((item) => {
          if (item.type === 'img') {
            imgArray.push(item)
          } else {
            down.push(item)
          }
        })
        this.down = down
        this.imgList = imgArray
        console.log(res, 'hhhhhhh')
      })
    }
  },
  mounted() {
    console.log(this.task_id, 89898)
    let url = this.$route.path
    this.userId = url.substring(url.lastIndexOf('/') + 1, url.length)
    this.student()
    let data = {
      limit: this.limit,
      offset: this.offset,
      status: 3
    }
    this.getListData(data)
    this.getEvaluateList()
    this.getPortfolio()
  },
  computed: {
    showE: function () {
      return this.evaluate.length > 0 ? 1 : 0
    },
    addShow: function () {
      let url = this.$route.path
      let userId = url.substring(url.lastIndexOf('/') + 1, url.length)
      return userId === cookie.get('user_id')
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
.skill-main{
  display: flex;
  .skill-user{
    flex:1;
  }
  .software{
    flex:1;
  }
}
.hideEvaluate {
  width: 100%;
  line-height: 2;
  color: #000;
  text-align: center;
}
</style>
