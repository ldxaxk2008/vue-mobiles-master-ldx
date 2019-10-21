<template>
  <div class="task-editor">
    <common-header :tittle="tittle" :showback="true"></common-header>
    <div class="task-editor--con">
      <!-- <div class="task-editor--select">
        <input class="task-editor--input" v-model="invalue" type="text" placeholder="请选择任务所处行业/领域" />
        <van-icon class="task-editor-secicon" name="arrow-down" @click="changedata" />
        <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
      </div>-->
      <div class="task-editor--select">
        <input
          style="flex:1; background: none;outline: none;"
          id="datashow"
          type="text"
          v-model="Invalue"
          ref="input_van"
          placeholder="请选择任务所处行业/领域"
          @change="Enter"
          @keyup.enter="Enter"
        />
        <select
          class="task-editor-secicons"
          style="opacity:0;width:20px;position:absolute;right:10px;z-index:100;"
          id="select"
          v-model="selectItem"
          @change="selectFn($event,selectItem)"
        >
          <option v-for="item in actions" :value="item.name" :key="item.id">{{item.name}}</option>
        </select>
        <van-icon class="task-editor-secicon" name="arrow-down" />
      </div>
      <div class="task-editor--describe">
        <input
          class="task--describe__title"
          v-model="valueData.title"
          type="text"
          name
          id
          placeholder="标题 输入吸引热度的标题"
        />
        <textarea
          class="task--describe__con"
          v-model="valueData.desc"
          ref="inputContent"
          value="inputContent"
          placeholder="详细内容 可以简略的概括所需情况和资料"
        ></textarea>
      </div>
      <div class="task-editor--filed">
        <!-- <button class="evaluate-footer--btn" ref="tabBtn">{{desctab}}</button> -->
        <ul class="page-map--ul">
          <li v-for="(item,index) in maplist" :key="index" @click="hanleclick(item,index)">
            <svg-icon :name="item.icons" size="60" ref="svg_icon"></svg-icon>
            <p :class="{'active':item.disable===true}">{{item.name}}</p>
          </li>
        </ul>
      </div>
      <div class="task-editor--tool">
        <div class="task-editor--tool__left">
          <software
            @softwareChange="softwareChange"
            :softwareLists="softwareLists"
            :api="false"
            class="skill-user"
          />
        </div>
        <div class="task-editor--tool__right">
          <div>
            <p>报酬 RMB</p>
            <input class="tool-input" v-model="valueData.payment" type="number" pattern="[0-9]" />
          </div>
          <div>
            <p class="tool-input--time">截止日期</p>
            <div class="task-tool__input">
              <van-field
                right-icon="arrow-down"
                class="task-editor--input"
                readonly
                v-model="valueData.end_date"
                type="text"
                @focus="popup"
                ref="timeinput"
              />
              <!-- <input
                style="width:auto"
                class="task-editor--input"
                v-model="valueData.end_date"
                type="text"
                @focus="popup"
                ref="timeinput"
              />
              <van-icon class="task-editor-secicon" name="arrow-down" />-->
              <van-popup v-model="disabled" position="bottom" :overlay="true">
                <van-datetime-picker
                  v-model="currentDate"
                  type="datetime"
                  :min-date="minDate"
                  @change="timeSelect"
                  @cancel="cancel"
                  @confirm="confirm"
                />
              </van-popup>
            </div>
          </div>
        </div>
      </div>
      <div class="task-editor--upload">
        <fileDown @resetFileList="resetFileList" :taskShow="taskShow" />
      </div>
    </div>
    <div class="evaluate-footer">
      <button class="evaluate-footer--btn" @click="publish">发布</button>
    </div>
    <div class="agreepage_box" v-if="agreepageShow">
      <agreepage @agreepageChange="agreepageChange" />
    </div>
  </div>
</template>
<script>
import commonHeader from 'common/common-header'
import software from '@/pages/skillCommon/software'
import { publishtask, gettype, edittask } from 'api/task-api'
import { taskDetails } from 'api/home-api'
import agreepage from '@/pages/agreepage'
import fileDown from '@/pages/user/fileDown'

import { ERR_OK } from 'config/index'

export default {
  components: {
    commonHeader,
    software,
    agreepage,
    fileDown
  },
  data() {
    return {
      softwareLists: [],
      desctab: '文案',
      valueData: {
        // task_type_id: '',
        task_type: '',
        design_id: '7',
        title: '',
        desc: '',
        payment: null,
        end_date: '',
        tool_list: []
      },
      Invalue: '',
      agreepage: false,
      agreepageShow: false,
      invalue: '',
      minDate: new Date(),
      currentDate: new Date(),
      show: false,
      disabled: false,
      inputList: [],
      taskId: '',
      actions: [],
      tittle: '返回首页',
      maplist: [],
      selectItem: '',
      inputItem: '',
      taskShow: true
    }
  },
  methods: {
    agreepageChange(val) {
      this.agreepage = val
      this.agreepageShow = false
    },
    Enter() {
      this.valueData.task_type = this.Invalue
    },
    selectFn(e, selectItem) {
      console.log(e, selectItem, 9999)
      this.Invalue = selectItem
      this.valueData.task_type = selectItem
    },
    // 筛选
    onSelect(item) {
      console.log(item)
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.show = false
      this.invalue = item.name
      // this.valueData.task_type_id = item.id
    },
    // input框筛选
    changedata(val) {
      this.show = true
      // this.$refs.typeinput.readOnly = true  //input框为只读
    },
    // input时间框筛选
    popup() {
      this.disabled = true
      this.$refs.timeinput.readOnly = true // input时间框为只读
    },
    // 时间筛选chang事件 返回当前选定的值
    timeSelect(e) {
      this.disabled = true
      return this.valueData.end_date
    },
    // 取消 返回当前选定的值
    cancel(value) {
      this.disabled = false
      return this.valueData.end_date
    },
    // 时间格式转换
    timeFormat(timer) {
      let date = new Date(timer)
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      let hour = date.getHours()
      let minutes = date.getMinutes()
      let seconds = date.getSeconds()
      month = month < 10 ? '0' + month : month
      day = day < 10 ? '0' + day : day
      hour = hour < 10 ? '0' + hour : hour
      minutes = minutes < 10 ? '0' + minutes : minutes
      seconds = seconds < 10 ? '0' + seconds : seconds
      return (
        year +
        '-' +
        month +
        '-' +
        day +
        ' ' +
        hour +
        ':' +
        minutes +
        ':' +
        seconds
      )
    },
    // 确定 确定最终的时间
    confirm(value) {
      this.valueData.end_date = this.timeFormat(value)
      this.disabled = false
    },
    // tab设计选择
    hanleclick(data, index) {
      console.log(data.value, 9999)
      this.maplist.map(res => {
        res.disable = false
      })
      this.maplist[index].disable = true
      this.valueData.design_id = data.value
      // this.desctab = this.maplist[index].name
      // this.$refs.tabBtn.style.background = this.maplist[index].color
    },
    // 获取选择类型
    getType() {
      let params = {
        resource_type: 1
      }
      gettype(params).then(response => {
        if (response.data.success === ERR_OK) {
          this.inputList = response.data.data.results
          this.inputList.map(res => {
            let obj = {
              name: res.title,
              id: res.id
            }
            this.actions.push(obj)
          })
        }
      })
    },
    // 获取设计类型
    getDesign() {
      let params = {
        resource_type: 3
      }
      let iconList = ['official', 'design', 'code', 'hand', 'ppt']
      let index = 0
      gettype(params).then(response => {
        if (response.data.success === ERR_OK) {
          this.maplist = []
          response.data.data.results.forEach(res => {
            let obj = {
              name: res.title,
              value: res.id,
              disable: false,
              icons: iconList[index]
            }
            this.maplist.push(obj)
            index = index === iconList.length - 1 ? 0 : index + 1
          })
        }
      })
    },
    softwareChange(val) {
      if (!val) {
        return
      }
      let arr = val
      arr.splice(parseInt(arr.length / 2), 0, '+')
      this.softwareLists = [...new Set(arr)]
      this.valueData.tool_list = this.remove(this.softwareLists, '+')
    },
    // 不改变原来的数组获取新数组
    remove(arr, item) {
      var result = []
      arr.forEach(function(element) {
        if (element !== item) {
          result.push(element)
        }
      })
      return result
    },
    // 发布任务
    publish() {
      if (!this.valueData.task_type) {
        this.$toast({
          message: '请选择类型'
        })
        return
      }
      if (!this.valueData.title) {
        this.$toast({
          message: '请输入标题'
        })
        return
      }
      if (!this.valueData.desc) {
        this.$toast({
          message: '请输入内容'
        })
        return
      }
      if (!this.valueData.design_id) {
        this.$toast({
          message: '选择设计'
        })
        return
      }
      if (this.valueData.tool_list.length === 0) {
        this.$toast({
          message: '请发布软件'
        })
        return
      }
      var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
      if (!this.valueData.payment) {
        this.$toast({
          message: '请输入报酬正确格式'
        })
        return
      } else if (!reg.test(this.valueData.payment)) {
        this.$toast({
          message: '报酬保留两位小数,不能以0开头'
        })
        return
      }
      if (!this.valueData.end_date) {
        this.$toast({
          message: '请选择时间'
        })
        return
      }
      if (!this.agreepage) {
        this.$toast('请同意协议')
        this.agreepageShow = true
        return
      }
      if (this.$route.params.id === 'create') {
        publishtask(this.valueData).then(res => {
          if (res.data.success === ERR_OK) {
            // this.$router.push('/pay/' + res.data.data.id)
            this.$router.push({
              path: `/pay/${res.data.data.id}`,
              query: { pay: this.valueData }
            })
          } else {
            this.$toast(res.data.msg)
            this.$router.push('/error')
          }
        })
      } else {
        // 编辑任务
        edittask(this.taskId, this.valueData).then(res => {
          if (res.data.success === ERR_OK) {
            this.$router.push('/pay/' + res.data.data.id)
          } else {
            this.$toast(res.data.msg)
            this.$router.push('/error')
          }
        })
      }
    },
    // 编辑任务
    edit() {
      taskDetails(this.taskId).then(res => {
        this.valueData.tool_list = res.data.data.tool_list
        let arr = res.data.data.tool_list
        arr.splice(parseInt(arr.length / 2), 0, '+')
        this.softwareLists = [...new Set(arr)]
        this.valueData.tool_list = this.remove(this.softwareLists, '+')
        this.valueData.desc = res.data.data.desc
        this.valueData.payment = res.data.data.payment
        this.valueData.title = res.data.data.title
        this.valueData.end_date = this.timeFormat(res.data.data.end_date)
        this.valueData.design_id = res.data.data.design_id
        this.maplist.map((item, index) => {
          item.disable = false
          if (Number(item.value) === res.data.data.design_id) {
            this.desctab = item.name
            this.$refs.tabBtn.style.background = item.color
            item.disable = true
          }
        })
        this.valueData.task_type = res.data.data.task_type
        this.Invalue = res.data.data.task_type
        this.inputList.map(item => {
          if (item.title === res.data.data.task_type) {
            this.Invalue = item.title
          }
        })
      })
    },
    resetFileList() {}
  },
  mounted() {
    if (/Android/gi.test(navigator.userAgent)) {
      window.addEventListener('resize', function() {
        if (
          document.activeElement.tagName === 'INPUT' ||
          document.activeElement.tagName === 'TEXTAREA'
        ) {
          window.setTimeout(function() {
            document.activeElement.scrollIntoViewIfNeeded()
          }, 0)
        }
      })
    }
    let url = this.$route.path
    this.taskId = url.substring(url.lastIndexOf('/') + 1, url.length)
    if (this.taskId !== 'create') {
      this.edit()
    }
    this.getType()
    this.getDesign()
  },
  watch: {
    agreepage(val) {
      if (val) {
        this.publish()
      }
    }
  }
}
</script>
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.task-editor {
  // * {
  //   touch-action: pan-y;
  // }
  background-color: #fff;
  .task-editor--select {
    position: relative;
    .margin(40, 20, 40, 20);
    .padding(5, 20, 5, 20);
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .b-radius(50);
    background-color: rgb(245, 245, 245);
    .task-editor--input {
      flex: 1;
      background: none;
      outline: none;
    }
    .task-editor-secicon {
      .fs(30);
      color: gray;
    }
  }
  .task-editor--con {
    flex: 1;
    // height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .task-editor--describe {
    .task--describe__title {
      display: flex;
      box-sizing: border-box;
      background-color: transparent;
      border-bottom: 3px solid #d8d8d8;
      width: 100%;
      .padding(0, 20, 20, 20);
      .fs(24);
    }
  }
  .task--describe__con {
    width: 100%;
    display: flex;
    box-sizing: border-box;
    background-color: transparent;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    border-bottom: 3px solid #d8d8d8;
    .h(250);
    .padding(20, 20, 0, 20);
    .fs(24);
  }
  .task-editor--filed {
    color: #898798;
    .mt(40);
    .evaluate-footer--btn {
      .ml(20);
      display: flex;
      background-color: #1b9ea7;
      color: white;
      .fs(25);
      .padding(10, 30, 10, 30);
      border: none;
      .b-radius(10);
    }
    .page-map--ul {
      .mt(30);
      .pl(10);
      .pr(10);
      display: -webkit-box;
      overflow-x: scroll;
      -webkit-overflow-scrolling: touch;
      li {
        text-align: center;
      }
      // img {
      //   box-sizing: border-box;
      //   width: 80%;
      // }
      .page-map--p {
        .fs(25);
        color: #898798;
        font-weight: bold;
        // text-align: center;
      }
    }
  }
  .task-editor--tool {
    .margin(40, 20, 40, 20);
    display: flex;
    text-align: left;
    box-sizing: border-box;
    .task-editor--tool__left {
      flex: 1;
      .skill-user {
        flex: 1;
      }
    }
    .task-editor--tool__right {
      flex: 1;
      .tool-input {
        width: 100%;
        .mt(25);
        .b-radius(50);
        background-color: #e7e7e7;
        .padding(10, 30, 10, 30);
      }
    }
    .tool-input--time {
      .mt(20);
      .mb(20);
    }
    .task-tool__input {
      .padding(5, 15, 5, 15);
      display: flex;
      // flex: 1;
      // justify-content: space-between;
      // align-items: center;
      .b-radius(50);
      background-color: #e7e7e7;
      .task-editor--input {
        background: none;
        outline: none;
      }
      .task-editor-secicon {
        .fs(30);
        color: gray;
      }
    }
  }
  .task-editor--upload {
    .margin(0, 20, 40, 20);
  }
  .evaluate-footer {
    .pt(30);
    .pb(30);
    background-color: #f5f5f5;
    position: sticky;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    .evaluate-footer--btn {
      flex: 1;
      background-color: #c54f8b;
      color: white;
      .fs(25);
      font-weight: bold;
      border: none;
      .b-radius(50);
      .pt(10);
      .pb(10);
      .ml(20);
      .mr(20);
    }
  }

  .active {
    color: #c54f8b;
  }
  /deep/.popup .btn[data-v-92496f84] {
    margin-top: 0.53333333rem;
    text-align: center;
  }
  .van-action-sheet {
    max-height: 30%;
    color: #323233;
  }
}
.agreepage_box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
}
</style>
