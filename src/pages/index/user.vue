<template>
  <div class="content-box">
    <common-header :tittle="tittle" :showback="true" :showmore="true"></common-header>
    <div class="user-main">
      <h4 class="user-nick-name" @click="reset(nickName,'nickName', '昵称')">{{nickName}}</h4>
      <div class="user-label-name" @click="reset(labelName,'labelName', '标签')">{{labelName}}</div>
    </div>
    <div class="user-list">
      <img class="user-img" :src="userImg" alt srcset />
      <ul>
        <li
          v-for="(item,index) in userList"
          :key="index"
          @click="handelClick(item)"
        >
          <div
            class="divTips"
            v-if="!item.hide"
            :style="{backgroundColor:item.bg}"
          >
            <span :style="{color:item.color}" class="text">{{item.label}}</span>
            <span v-if="item.tips" class="tips">{{item.tips}}</span>
          </div>
        </li>
      </ul>
    </div>
    <dialogBox ref="dialog" :rules="rules" :data="textData" @close="resetContent"/>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapState } from 'vuex'
import commonHeader from 'common/common-header'
import dialogBox from 'common/dialog'
import {studentinfor, studentData} from 'api/student-api'
import cookie from 'vue-cookies'
export default {
  data() {
    return {
      textData: {},
      modifylabel: '',
      show: false,
      hide: true,
      tittle: '',
      num: 0,
      nickName: '你的昵称',
      labelName: '炫酷的标签名称',
      userImg: require('@/assets/imgs/user-img.png'),
      userList: [
        {
          bg: '#f9ce20',
          color: '#fff',
          path: '/User/Student',
          id: true,
          hide: false,
          label: '个人简介'
        },
        {
          bg: '#f9ce20',
          color: '#fff',
          path: '/User/taskList',
          id: true,
          hide: true,
          label: '公司简介'
        },
        {
          bg: '#b92671',
          color: '#fff',
          path: '/mine',
          label: '我的任务'
        },
        {
          bg: '#f9ce20',
          color: '#fff',
          path: '/message',
          label: '消息',
          tips: 6
        },
        {
          bg: '#b92671',
          color: '#fff',
          // path: '/User/taskList',
          label: '客服'
        }
      ],
      rules: {
        nickName: [{
          message: '昵称不能大于8个字符',
          valid: function(data) {
            if (data && data.length > 8) {
              return false
            } else {
              return true
            }
          },
          require: true
        },
        {
          message: '昵称不能小于3个字符',
          valid: function(data) {
            if (data && data.length < 3) {
              return false
            } else {
              return true
            }
          }
        }],
        labelName: [{
          message: '个性签名不能大于8个字符',
          valid: function(data) {
            if (data && data.length > 8) {
              return false
            } else {
              return true
            }
          },
          require: true
        }]
      }
    }
  },
  methods: {
    ...mapMutations({
      setNum: 'SET_NUM'
    }),
    resetContent(val, item) {
      console.log(val, item, 2222222222)
      // let id = sessionStorage.getItem('user_id')
      let id = cookie.get('user_id')
      let data
      if (item === 'nickName') {
        data = {
          nick_name: val
        }
      } else if (item === 'labelName') {
        data = {
          label: val
        }
      }
      studentinfor(id, data).then(res => {
        this.getStudentData()
      })
    },
    todetail() {
      this.$router.togo('/Home/Detail')
    },
    handelClick(val) {
      if (val.id) {
        this.$router.push(val.path + '/' + cookie.get('user_id'))
      } else {
        this.$router.push(val.path)
      }
    },
    reset(event, item, label) {
      this.textData = {
        defaultVal: event,
        prop: item,
        label: label
      }
      this.$refs['dialog'].open()
    },
    getStudentData() {
      studentData().then(res => {
        this.nickName = res.data.data.nick_name ? res.data.data.nick_name : this.nickName
        this.labelName = res.data.data.label ? res.data.data.label : this.labelName
        this.userImg = res.data.data.image ? res.data.data.image : this.userImg
      })
    }
  },
  components: {
    commonHeader,
    dialogBox
  },
  computed: {
    ...mapGetters(['number']),
    ...mapState({
      number: state => state.home.number
    })
  },
  mounted() {
    let usertype = cookie.get('user_type')
    // let usertype = sessionStorage.getItem('user_type')
    if (usertype === '1') {
      this.userList[1].hide = false
      this.userList[0].hide = true
    }
    this.getStudentData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import "~styles/index.less";
  @import "~styles/variable.less";
  .page-content {
    .mb(98);
    * {
      touch-action: pan-y;
    }
  }
  .user-main {
    .h(300);
    .pt(20);
    background: #f5f5f5;
    .user-nick-name {
      .fs(@base-header-size);
      color: @base-font-color;
    }
    .user-label-name {
      .fs(18);
      color: #000;
      .margin(20, 100, 20, 100);
      .pt(10);
      .pb(10);
      .b-radius(50);
      background: #bfbfbf;
    }
  }
  .user-list {
    .user-img {
      .w(260);
      .h(260);
      .mt(-100);
      .mb(40);
      .b-radius(500);
      border: 10px solid #f5f5f5;
    }
    li {
      .divTips{
        position: relative;
        .mt(30);
        .mr(60);
        .ml(60);
        .pt(20);
        .pb(20);
        .b-radius(30);
        text-align: center;
        .tips {
          position: absolute;
          .right(20);
          .top(-10);
          color: #fff;
          background: #14a5ae;
          .w(40);
          .h(40);
          .lh(40);
          .b-radius(100);
        }
      }
    }
  }
</style>
