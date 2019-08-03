<template>
  <div class="task-editor">
    <common-header :tittle="tittle" :showback="true"></common-header>
    <div class="task-editor--con">
      <div class="task-editor--select">
        <input
          class="task-editor--input"
          v-model="invalue"
          type="text"
          placeholder="请输入选择类型"
          @focus="changedata"
        />
        <van-icon class="task-editor-secicon" name="arrow-down" />
        <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
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
        <button class="evaluate-footer--btn" ref="tabBtn">{{desctab}}</button>
        <ul class="page-map--ul">
          <li
            v-for="(item,index) in maplist"
            :key="index"
            @click="hanleclick(item,index)"
          >
            <img :src="item.img" alt />
            <p :class="{'active':item.disable===true}">{{item.name}}</p>
          </li>
        </ul>
      </div>
      <div class="task-editor--tool">
        <div class="task-editor--tool__left">
          <div class="task-editor__top">
            <software class="skill-user" />
          </div>
        </div>
        <div>
          <div class="task-editor--tool__right">
            <p>报酬 RMB</p>
            <input class="tool-input" v-model="valueData.payment" type="number" pattern="[0-9]"/>
          </div>
          <div>
            <p class="tool-input--time">截止日期</p>
            <div class="task-tool__input">
              <input
                class="task-editor--input"
                v-model="valueData.end_date"
                type="text"
                @focus="popup"
              />
              <van-icon class="task-editor-secicon" name="arrow-down" />
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
    </div>
    <div class="evaluate-footer">
      <button class="evaluate-footer--btn" @click="publish">发布</button>
    </div>
  </div>
</template>
<script>
import commonHeader from 'common/common-header'
import software from '@/pages/skillCommon/software'
import { publishtask, gettype } from 'api/task-api'
import { ERR_OK } from 'config/index'

export default {
  components: {
    commonHeader,
    software
  },
  data() {
    return {
      desctab: '文案',
      valueData: {
        task_type_id: '',
        design_id: '7',
        title: '',
        desc: '',
        payment: null,
        end_date: '',
        tool_list: [4, 5, 6]
      },
      invalue: '',
      minDate: new Date(),
      currentDate: new Date(),
      show: false,
      disabled: false,
      inputList: [],
      actions: [],
      tittle: '返回首页',
      maplist: [
        {
          img: require('@/assets/imgs/copy1.png'),
          name: '',
          value: '',
          disable: true,
          color: '#1B9EA7'
        },
        {
          img: require('@/assets/imgs/copy2.png'),
          name: '',
          value: '',
          disable: false,
          color: '#F79D33'
        },
        {
          img: require('@/assets/imgs/copy3.png'),
          name: '',
          value: '',
          disable: false,
          color: '#1B9EA7'
        },
        {
          img: require('@/assets/imgs/copy4.png'),
          name: '',
          value: '',
          disable: false,
          color: '#3BDA8A'
        },
        {
          img: require('@/assets/imgs/copy5.png'),
          name: '',
          value: '',
          disable: false,
          color: '#F79D33'
        }
      ]
    }
  },
  methods: {
    // 筛选
    onSelect(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.show = false
      this.invalue = item.name
      this.valueData.task_type_id = item.id
    },
    // input框筛选
    changedata(val) {
      this.show = true
    },
    // input框筛选
    popup() {
      this.disabled = true
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
    timeFormat (timer) {
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
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds
    },
    // 确定 确定最终的时间
    confirm(value) {
      this.valueData.end_date = this.timeFormat(value)
      this.disabled = false
    },
    // tab设计选择
    hanleclick(data, index) {
      this.maplist.map(res => {
        res.disable = false
      })
      this.maplist[index].disable = true
      this.valueData.design_id = data.value
      this.desctab = this.maplist[index].name
      this.$refs.tabBtn.style.background = this.maplist[index].color
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
    getTypes() {
      let params = {
        resource_type: 3
      }
      gettype(params).then(response => {
        if (response.data.success === ERR_OK) {
          response.data.data.results.map((res, index) => {
            this.maplist[index].name = res.title
            this.maplist[index].value = res.id
          })
        }
      })
    },
    // 获取工具
    // getTool() {
    //   let params = {
    //     resource_type: 2
    //   }
    //   gettype(params).then(response => {
    //     console.log(response)
    //     if (response.data.success === true) {
    //       console.log(response.data.data.results)
    //     }
    //   })
    // },
    // 发布任务
    publish() {
      if (!this.valueData.task_type_id) {
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
      publishtask(this.valueData).then(res => {
        if (res.data.success === ERR_OK) {
          this.$router.push({name: 'success', params: {id: res.data.data}})
        } else {
          this.$toast(res.data.msg)
          this.$router.push('/error')
        }
      })
    }
  },
  mounted() {
    this.getType()
    this.getTypes()
  }
}
</script>
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.task-editor {
  * {
    touch-action: pan-y;
  }
  background-color: #fff;
  .task-editor--select {
    .margin(40, 50, 40, 50);
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
      .padding(0, 50, 20, 20);
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
    .padding(20, 50, 0, 50);
    .fs(24);
  }
  .task-editor--filed {
    color: #898798;
    .mt(40);
    .evaluate-footer--btn {
      .ml(40);
      display: flex;
      background-color: #1B9EA7;
      color: white;
      .fs(25);
      .padding(10, 30, 10, 30);
      // font-weight: bold;
      border: none;
      .b-radius(10);
    }
    .page-map--ul {
      .mt(30);
      .pl(20);
      .pr(20);
      display: flex;
      justify-content: space-between;
      img {
        box-sizing: border-box;
        width: 80%;
      }
      .page-map--p {
        .fs(25);
        color: #898798;
        font-weight: bold;
        text-align: center;
      }
    }
  }
  .task-editor--tool {
    .margin(50, 50, 0, 50);
    display: flex;
    justify-content: flex-start;
    text-align: left;
    box-sizing: border-box;
    p {
      .fs(28);
      color: #363636;
    }
    .task-editor--tool__left {
      width: 50%;
      .task-editor__top {
        display: flex;
      }
      .task-editor-toolicon {
        .mt(5);
        .fs(30);
        color: #2ca2a9;
      }
    }
    .task-editor--tool__right {
      width: 50%;
      .tool-input {
        .mt(25);
        .b-radius(50);
        background-color: #e7e7e7;
        .padding(10, 30, 10, 30);
      }
    }
    .tool-input--time {
      .mt(20);
      .mb(10);
      color: #363636;
    }
    .task-tool__input {
      .padding(10, 20, 10, 10);
      display: flex;
      flex: 1;
      justify-content: space-between;
      align-items: center;
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
  .evaluate-footer {
    .pt(30);
    .pb(30);
    background-color: #f5f5f5;
    position: sticky;
    bottom: 0;
    left: 0;
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
  .skill-user{
    flex:1;
    .mr(20);
  }
  .active {
    color: #c54f8b;
  }
}
</style>
