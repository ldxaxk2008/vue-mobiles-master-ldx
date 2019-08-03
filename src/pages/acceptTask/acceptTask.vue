<template>
  <div class="accept">
    <common-header :tittle="tittle"></common-header>
    <div class="accept-main">
      <div class="accept-main-box" v-for="(item,index) in acceptList" :key="index">
        <introduce :information="item.information" :imgShow="true"/>
        <comment :commentList="item.commentList"/>
      </div>
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
import { getacceptuserlist } from 'api/task-api'
export default {
  components: {
    commonHeader,
    introduce,
    comment
  },
  data() {
    return {
      tittle: '任务接受者确认',
      task_id: '',
      navList: [
        {
          label: '确认选择',
          fun: data => {
            return this.cancel(data)
          }
        }
      ],
      acceptList: [
        {
          information: {
            name: '深圳益康电子',
            industry: '人工智能',
            logoImg: require('@/assets/imgs/user-img.png'),
            aboutUs: '公司介绍多看看出席第公司介绍多看介绍多看看出席第',
            lv: 'LV13',
            checked: true
          },
          commentList: [
            {
              imgUrl: require('@/assets/imgs/verySatisfied.svg'),
              num: 99,
              ask: '符合要求'
            },
            {
              imgUrl: require('@/assets/imgs/Satisfied.svg'),
              num: 88,
              ask: '比较满意'
            },
            {
              imgUrl: require('@/assets/imgs/Dissatisfied.svg'),
              num: 11,
              ask: '远超预期'
            }
          ]
        },
        {
          information: {
            name: '深圳益康电子',
            industry: '人工智能',
            logoImg: require('@/assets/imgs/img0.png'),
            aboutUs: '公司介绍多看看出席第公司介绍多看介绍多看看出席第',
            lv: 'LV13',
            checked: false
          },
          commentList: [
            {
              imgUrl: require('@/assets/imgs/verySatisfied.svg'),
              num: 33,
              ask: '符合要求'
            },
            {
              imgUrl: require('@/assets/imgs/Satisfied.svg'),
              num: 22,
              ask: '比较满意'
            },
            {
              imgUrl: require('@/assets/imgs/Dissatisfied.svg'),
              num: 11,
              ask: '远超预期'
            }
          ]
        },
        {
          information: {
            name: '深圳益康电子',
            industry: '人工智能',
            logoImg: require('@/assets/imgs/img5.png'),
            aboutUs: '公司介绍多看看出席第公司介绍多看介绍多看看出席第',
            lv: 'LV13',
            checked: false
          },
          commentList: [
            {
              imgUrl: require('@/assets/imgs/verySatisfied.svg'),
              num: 11,
              ask: '符合要求'
            },
            {
              imgUrl: require('@/assets/imgs/Satisfied.svg'),
              num: 22,
              ask: '比较满意'
            },
            {
              imgUrl: require('@/assets/imgs/Dissatisfied.svg'),
              num: 0,
              ask: '远超预期'
            }
          ]
        }
      ]

    }
  },
  methods: {
    cancel(data) {
      console.log(data, 666)
      this.$router.push('/User/Task')
    },
    getList () {
      let taskid = this.task_id
      getacceptuserlist(taskid).then(res => {
        console.log(res)
      })
    }
  },
  mounted () {
<<<<<<< HEAD
    console.log(this.$route.params)
    this.task_id = this.$route.params.id.id
=======
    this.task_id = this.$router.params.id.id
>>>>>>> f103661051bbb7a4cbc5734024e5017abf6bb108
    this.getList()
  }
}
</script>

<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.accept{
  background: #fff;
  .accept-main{
    overflow-x: hidden;
    overflow-y: auto;
    .padding(30,20,30,20);
    flex:1;
    .accept-main-box{
      background:#f5f5f5;
      .b-radius(10);
      .padding(20,20,20,20);
      .mb(30);
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
</style>
