<template>
  <div class="accept">
    <common-header :tittle="tittle"></common-header>
    <div class="accept-main">
      <!-- <van-checkbox-group v-model="result" :max="1"> -->
      <van-radio-group v-model="result">
        <div class="accept-main-box" v-for="(item,index) in acceptList" :key="index">
          <introduce @changeRadio="changeRadio" :information="item" :keys="index" :imgShow="true" />
          <div class="skill-main">
            <software :addShow="false" :softwareLists="softwareLists" class="skill-user" />
            <skill :addShow="false"  :skillList="skillList" class="software"></skill>
          </div>
          <comment :commentList="item" />
        </div>
        <!-- </van-checkbox-group> -->
      </van-radio-group>
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
import introduce from './introduce'
import comment from './comment'
import software from '@/pages/skillCommon/software'
import skill from '@/pages/skillCommon/skill'
import { getacceptuserlist, selectstudents } from 'api/task-api'
export default {
  components: {
    commonHeader,
    introduce,
    comment,
    software,
    skill
  },
  data() {
    return {
      skillList: [],
      softwareLists: [],
      userId: '',
      result: null,
      tittle: '任务接受者确认',
      task_id: '',
      task_user_ids: '',
      navList: [
        {
          label: '确认选择',
          fun: data => {
            return this.cancel(data)
          }
        }
      ],
      acceptList: []
    }
  },
  methods: {
    cancel(data) {
      selectstudents({
        task_user_ids: this.acceptList[this.result].task_user_id
      }).then(res => {
        console.log(res, 77744)
        this.$router.push('/User/Task/' + this.task_id)
      })
    },
    getList() {
      let taskid = this.task_id
      getacceptuserlist({ task_id: taskid }).then(res => {
        this.acceptList = res.data.data.results
        // this.skillList = this.acceptList[0].skill_list
        let arr = this.acceptList[0].tool_list
        arr.splice(parseInt(arr.length / 2), 0, '+')
        this.softwareLists = arr
      })
    },
    changeRadio(val) {
      this.result = val
    }
  },
  mounted() {
    console.log(this.$route.params)
    this.task_id = this.$route.params.id && this.$route.params.id.id
    this.getList()
  }
}
</script>

<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.accept {
  background: #fff;
  .accept-main {
    overflow-x: hidden;
    overflow-y: auto;
    .padding(30, 20, 30, 20);
    flex: 1;
    .accept-main-box {
      background: #f5f5f5;
      .b-radius(10);
      .padding(20, 20, 20, 20);
      .mb(30);
    }
  }
  .task-footer {
    .padding(30, 20, 30, 20);
    background: #fff;
    position: sticky;
    bottom: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    ul {
      display: flex;
      justify-content: space-around;
      flex: 1;
      li {
        .b-radius(500);
        color: #fff;
        background: #c14182;
        width: 100%;
        .pt(10);
        .pb(10);
      }
    }
  }
  .skill-main {
    display: flex;
    .padding(40, 20, 20, 20);
    .skill-user {
      flex: 1;
    }
    .software {
      flex: 1;
    }
    /deep/.skill-content ul li p[data-v-631a556c] {

    background: #c8c9cc;
}
  }
}
</style>
