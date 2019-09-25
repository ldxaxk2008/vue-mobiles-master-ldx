<template>
  <div class="content-box">
    <common-header @search="search" :showinput="true" :headerColor="headerColor" :showback="false"></common-header>
    <div class="page-content">
      <!-- <mt-button @click="todetail">home</mt-button> -->
      <div class="page-map">
        <div class="page-map--van">
          <!-- <van-icon name="clock-o" /> -->
          <van-tag style="padding:2px 4px;" plain v-for="item in 1" :key="item" @click="hotClick('kkkk')">kkkk</van-tag>
        </div>
        <ul class="page-map--ul">
          <li v-for="(item,index) in maplist" :key="index" @click="handelclick(item,index)">
            <svg-icon :name="item.icons" size="60"  ref="svg_icon"></svg-icon>
            <div class="page-map--p">
              <p :class="{'active':item.disable}">{{item.name}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="page-map-vantabs">
        <div class="page-map--search">
          <van-tabs v-model="active" @click="onClick">
            <van-tab title="价格">
              <div class="page-map--tab">
                <currentList :currentList="currentList" :dmore="dmore" @more="more()" />
              </div>
            </van-tab>
            <van-tab title="发布日期">
              <div class="page-map--tab" >
                <currentList :currentList="currentList" :dmore="dmore" @more="more" />
              </div>
            </van-tab>
            <van-tab title="截止日期">
              <div class="page-map--tab">
                <currentList :currentList="currentList" :dmore="dmore" @more="more" />
              </div>
            </van-tab>
          </van-tabs>
        </div>
        <!-- <span class="page-map__p">筛选</span> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapState } from 'vuex'
import commonHeader from 'common/common-header'
import currentList from '@/pages/taskList/currentTaskList'
import {gettype} from 'api/task-api'
import {taskList} from 'api/home-api'
import { ERR_OK } from 'config/index'
export default {
  data() {
    return {
      headerColor: '#fff',
      currentList: [],
      count: 0,
      dmore: false,
      active: 0,
      num: 0,
      limit: 10,
      offset: 0,
      type: '',
      searchVal: '',
      maplist: [
        {
          name: '文案',
          disable: false,
          type: '7',
          icons: 'official'
        },
        {
          name: '设计',
          disable: false,
          type: '8',
          icons: 'design'
        },
        {
          name: '代码',
          disable: false,
          type: '9',
          icons: 'code'
        },
        {
          name: '手绘',
          disable: false,
          type: '10',
          icons: 'hand'
        },
        {
          name: 'PPT',
          disable: false,
          type: '11',
          icons: 'ppt'
        }
      ]
    }
  },
  created() {},
  methods: {
    ...mapMutations({
      setNum: 'SET_NUM'
    }),
    hotClick(val) {
      this.search(val)
    },
    orderingType() {
      return this.active === 0 ? '-payment' : this.active === 1 ? '-created_time' : '-end_date'
    },
    // 获取选择类型
    getType() {
      let params = {
        resource_type: 3
      }
      let iconList = ['official', 'design', 'code', 'hand', 'ppt']
      let index = 0
      gettype(params).then(response => {
        if (response.data.success === ERR_OK) {
          this.maplist = []
          this.maplist.push({
            'name': '全部',
            'type': '',
            'icons': iconList[3],
            'disable': false
          })
          this.inputList = response.data.data.results
          this.inputList.forEach((res) => {
            // if (index >= iconList.length) index = 0
            let obj = {
              'name': res.title,
              'type': res.id,
              'icons': iconList[index],
              'disable': false
            }
            this.maplist.push(obj)
            index = index === iconList.length - 1 ? 0 : index + 1
          })
          this.handelclick({type: ''}, 0)
        }
      })
    },
    search(val) {
      // if (val === '') return false
      this.searchVal = val
      this.offset = 0
      let params = {
        search: val,
        design_id: this.type,
        ordering: this.orderingType(),
        limit: this.limit,
        offset: this.offset
      }
      taskList(params).then((res) => {
        if (res.data.success === ERR_OK) {
          this.currentList = res.data.data.results
        } else {
        }
      }).catch(() => {
      })
    },
    todetail() {
      this.$router.togo('/Home/Detail')
    },
    handelclick(item, index) {
      this.type = item.type
      this.offset = 0
      let data = {
        search: this.searchVal || '',
        design_id: this.type,
        ordering: '-payment',
        limit: this.limit,
        offset: 0
      }
      this.getData(data)
      this.maplist.map(res => {
        res.disable = false
      })
      this.maplist[index].disable = true
    },
    onClick(sort) {
      this.offset = 0
      if (sort === 0) {
        sort = this.sort === '-payment' ? 'payment' : '-payment'
      } else if (sort === 1) {
        sort = this.sort === '-created_time' ? 'created_time' : '-created_time'
      } else {
        sort = this.sort === '-end_date' ? 'end_date' : '-end_date'
      }
      this.sort = sort
      let data = {
        search: this.searchVal,
        ordering: this.sort,
        design_id: this.type,
        limit: 10,
        offset: 0
      }
      this.getData(data)
    },
    more() {
      this.offset = this.offset + this.limit
      let params = {
        search: this.searchVal,
        design_id: this.type,
        ordering: this.sort,
        limit: this.limit,
        offset: this.offset
      }
      this.getData(params, 'more')
    },
    getData(params, type) {
      taskList(params).then((res) => {
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
        } else {
        }
      }).catch(() => {
      })
    }
  },
  mounted() {
    this.getType()
  },
  components: {
    commonHeader,
    currentList
  },
  computed: {
    ...mapGetters(['number']),
    ...mapState({
      number: state => state.home.number
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
// .content-box{
//   * {
//     touch-action: pan-y;
//   }
// }
.page-content {
  .mb(98);
  .page-map {
    // .ml(80);
    .page-map--van {
      .ml(80);
      display: flex;
      p {
        .fs(20);
        color: #898798;
      }
      .van-icon {
        .fs(30);
        .mr(10);
      }
    }
    .page-map--ul {
      .mt(30);
      .pl(20);
      .pr(20);
      display: -webkit-box;
      overflow-x: scroll;
      -webkit-overflow-scrolling: touch;
      // -ms-overflow-style: none;
      // overflow: -moz-scrollbars-none;
      // white-space: nowrap;
      // overflow:auto;
      li{
        // width: 20%;
        text-align: center;
        // display:inline-block;
      }
      // display: flex;
      // justify-content: space-between;
      img {
        box-sizing: border-box;
        width: 80%;
      }
      .page-map--p {
        .fs(25);
        color: #898798;
        font-weight: bold;
      }
    }
    // .page-map--ul::-webkit-scrollbar {
    //   background-color: transparent;
    // }
  }
  .page-map-vantabs {
    display: flex;
    justify-content: space-between;
    border-top: 5px solid #f5f5f5;
    border-bottom: 2px solid #f5f5f5;
    margin: 10px 0;
  }
  .page-map--search {
    flex: 5;
    .page-map--tab {
      position: absolute;
      width: calc(100vw - 10px);
      box-sizing: border-box;
      background: #fff;
      color: #fff;
      .mt(10);
      .padding(20, 40, 0, 20);
      text-align: left;
      h4 {
        color: #0f7f9b;
        .mb(20);
      }
    }
  }
  .page-map__p {
    flex: 4;
    line-height: 44px;
    color: #7d7e80;
    text-align: right;
    .pr(40);
  }
  .active {
    color: #c54f8b;
  }
}
</style>
<style>
.van-tabs__line {
  background-color: #bdbebe;
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
  color: #7d7e80;
  font-weight: 500;
}
</style>
