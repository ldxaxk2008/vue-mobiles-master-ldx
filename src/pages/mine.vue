<template>
  <div class="mine-pagell">
    <common-header :tittle="tittle"></common-header>
    <div class="mine-page--content">
      <van-tabs v-model="active" @click="onClick">
        <van-tab title="已完成">
          <div class="page-map--tab">
            <currentList :currentList="currentList" :done="true" @more="more('currentList')" />
          </div>
        </van-tab>
        <van-tab title="未完成">
          <div class="page-map--tab">
            <currentList :currentList="currentprice" @more="more" />
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import currentList from '@/pages/taskList/currentTaskList'
import commonHeader from 'common/common-header'

export default {
  components: {
    currentList,
    commonHeader
  },
  data() {
    return {
      tittle: '',
      active: 0,
      currentList: [
        {
          name: '设计',
          people: 18,
          money: 500,
          days: 3,
          ask: '任务要求任务要求任务要求任务要求任务要求',
          label: ['设计', '教育培训'],
          data: '2019年10月20日'
        },
        {
          name: '代码',
          people: 118,
          money: 30000,
          days: 30,
          ask: '大是大非路上看见法律上的看了看',
          label: ['设计', '教育培训'],
          data: '2019年1月20日'
        }
      ],
      currentprice: [
        {
          name: '代码',
          people: 118,
          money: 30000,
          days: 30,
          ask: '大是大非路上看见法律上的看了看',
          label: ['设计', '教育培训'],
          data: '2019年1月20日'
        },
        {
          name: '设计',
          people: 18,
          money: 500,
          days: 3,
          ask: '任务要求任务要求任务要求任务要求任务要求',
          label: ['设计', '教育培训'],
          data: '2019年10月20日'
        }
      ]
    }
  },
  methods: {
    onClick(index) {
      console.log(index)
    },
    more(val) {
      if (val === 'currentList') {
        let obj = this.currentList[0]
        for (let i = 0; i < 3; i++) {
          this.currentList.push(obj)
        }
      } else {
        let obj = this.currentprice[0]
        for (let i = 0; i < 3; i++) {
          this.currentprice.push(obj)
        }
      }
    }
  }
}
</script>
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.mine-pagell {
  background: #fff;
  .mine-page--content {
    overflow-x: hidden;
    overflow-y: auto;
    flex: 1;
  }
  .mine-page--content {
    .page-map--tab {
      background: #fff;
      color: #fff;
      .padding(30, 20, 30, 20);
      text-align: left;
      h4 {
        color: #000;
        .mb(20);
      }
    }
  }
}
</style>
<style>
.van-tabs__line {
    background-color: #BDBEBE;
}
  .van-tabs__wrap {
    position: relative;
    top: 0;
    right: 0;
    left: 0;
    z-index: 99;
  }

  /* .van-tabs--line .van-tabs__wrap {
    height: 37px;
  } */
   .van-tab {
    font-size: 14px;
  }
  .van-tabs__nav {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    background-color: #fff;
    -webkit-user-select: none;
    user-select: none;
}
.van-tab--active {
    /* color: #7d7e80; */
    font-weight: 500;
}
</style>
