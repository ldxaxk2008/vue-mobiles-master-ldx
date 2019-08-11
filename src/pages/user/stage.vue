<template>
  <div class="task-stage">
    <div class="stage-head">
      <div class="name">
        <span>{{information.company_name||'公司未知'}}</span>
        <span>{{information.industry||'行业未知'}}</span>
      </div>
      <div class="more">
        <van-icon name="orders-o" @click="handelClick"/>
      </div>
    </div>
    <EnterpriseSynopsis :information="information"></EnterpriseSynopsis>
    <div class="slider">
      <progressBar :progress="taskList.progress"/>
      <button v-if="show && !pay" class="confirm" @click="dialogClick">进行阶段确认</button>
      <button v-if="pay" class="deliver" @click="taskpay">任务交付</button>
      <button v-if="cpay" class="deliver">确认任务完成</button>
    </div>
    <FileDown :down="down" :taskObj="taskList"/>
    <vantDialog :progress="progress" :type="type" ref="dialog" @confirmDialog="confirmDialog"/>
  </div>
</template>

<script>
import EnterpriseSynopsis from './enterpriseSynopsis'
import FileDown from './fileDown'
import progressBar from 'common/progressBar'
import { stageConfirm } from 'api/stage-api'
import { ERR_OK } from 'config/index'
export default {
  props: {
    information: {
      type: Object,
      default: () => {}
    },
    taskList: {
      type: Object,
      default: () => {}
    },
    down: {
      type: Array,
      default: () => []
    },
    status: {
      type: Number,
      default: 1
    }
  },
  components: {
    EnterpriseSynopsis,
    FileDown,
    progressBar
  },
  data() {
    return {
      rangeValue: 20,
      type: '',
      progress: 0,
      labelWidth: ''
    }
  },
  methods: {
    taskpay() {
      this.$router.push('/Pay')
    },
    handelClick() {
      this.$router.push({name: 'TaskList', params: {id: this.information}})
    },
    dialogClick() {
      this.$refs['dialog'].show = true
      this.type = 'company_progress'
      this.progress = 0.2
    },
    confirmDialog(val, progress) {
      stageConfirm({task_id: this.taskList.id}).then((res) => {
        console.log(res.data)
        if (res.data.success === ERR_OK) {
          this.$toast(res.data.msg)
          this.$emit('stageChange', true)
        } else {
        }
      }).catch(() => {
      })
    }
  },
  computed: {
    show: function () {
      let id = sessionStorage.getItem('user_id')
      let type = sessionStorage.getItem('user_type')
      if (type === '0') {
        if (JSON.stringify(this.taskList.user_id) === id && !this.taskList.is_confirm_stage) {
          return true
        } else {
          return false
        }
      } else {
        if (JSON.stringify(this.taskList.company_id) === id && this.taskList.is_confirm_stage) {
          return true
        } else {
          return false
        }
      }
    },
    pay: function () {
      let type = sessionStorage.getItem('user_type')
      if (type === '0') {
        return this.taskList.progress === '1' && !this.taskList.is_confirm_stage
      } else {
        return false
      }
    },
    cpay: function () {
      let type = sessionStorage.getItem('user_type')
      if (type === '0') {
        return false
      } else {
        return this.taskList.progress === '1' && this.taskList.is_confirm_stage
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.task-stage {
  .padding(30, 30, 30, 30);
  background: #fff;
  .stage-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .mb(20);
    .name {
      display: flex;
      flex-direction: column;
      color: #000;
      span:nth-child(1) {
        .fs(30);
      }
    }
    .more {
      .van-icon {
        .fs(50);
        color: #000;
      }
    }
  }
  .slider {
    .pt(20);
    .pb(20);
    text-align: left;
    .confirm {
      .mt(40);
      .b-radius(200);
      color: #fff;
      border: none;
      .padding(10, 20, 10, 20);
      background: #c44c89;
    }
    .deliver {
      .mt(40);
      .b-radius(200);
      color: #fff;
      border: none;
      .padding(10, 20, 10, 20);
      background: #c0c0c0;
    }
  }
}
</style>
