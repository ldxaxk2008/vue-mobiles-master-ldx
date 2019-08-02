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
import {taskList} from 'api/home-api'
import { ERR_OK } from 'config/index'

export default {
  components: {
    currentList,
    commonHeader
  },
  data() {
    return {
      tittle: '任务列表',
      active: 0,
      currentList: [],
      currentprice: []
    }
  },
  methods: {
    onClick(index) {
      this.getData()
    },
    getData() {
      this.currentList = []
      this.currentprice = []
      taskList().then((res) => {
        if (res.data.success === ERR_OK) {
          if (this.active === 0) {
            this.currentList = res.data.data.results
          } else {
            this.currentprice = res.data.data.results
          }
        } else {
        }
      }).catch(() => {
      })
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
  },
  mounted() {
    this.getData()
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
