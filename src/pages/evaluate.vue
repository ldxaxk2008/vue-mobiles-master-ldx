<template>
  <div class="evaluate">
    <div class="evaluate-header">
      <common-header :tittle="tittle" :showback="true" :showmore="false"></common-header>
    </div>
    <div class="evaluate-content">
      <p class="evaluate-content--serve">请问你如何评价这次服务</p>
      <ul class="evaluate-content--img">
        <li v-for="(item,index) in evaluatelist" :key="index" @click="handelClick(index,item)">
          <svg-icon :name="item.img" size="80" :fill="item.disable?'#c54f8b':''" ref="svg_icon"></svg-icon>
          <p :class="{'active':item.disable===true}">{{item.name}}</p>
        </li>
      </ul>
      <p class="evaluate-content--serve">请为该学生添加标签</p>
      <div class="evaluate-content--input">
        <span v-for="(item,index) in brr" :key="index" @click="del(index)">
          {{item}}
        </span>
      </div>
      <div class="evaluate-content--iocn">
        <div
          class="evaluate-icon--p"
          v-for="(item,index) in evaluatedata"
          :key="index"
          @click="handelEav(index,item)"
        >{{item.name}}</div>
      </div>
      <p class="evaluate-content--serve">请为您对本次服务做出点评价(选填)</p>
      <div class="evaluate-content--textarea">
        <textarea class="evaluate--input" v-model="evaluaObj.company_comment" name id cols="30" rows="10"></textarea>
      </div>
    </div>
    <div class="evaluate-footer">
      <button class="evaluate-footer--btn" @click="addlevel">提交评价</button>
    </div>
  </div>
</template>
<script>
import commonHeader from 'common/common-header'
// import { subevaluate } from 'api/evaluate-api'
// import { ERR_OK } from 'config/index'
export default {
  components: {
    commonHeader
  },
  data() {
    return {
      arr: [],
      brr: [],
      showIndex: -1,
      tittle: '',
      evaluaObj: {
        task_user_id: 1,
        company_comment: '',
        user_tag_list: [],
        user_service: ''
      },
      evaluatelist: [
        {
          img: 'angry',
          name: '符合要求',
          disable: false,
          value: 1
        },
        {
          img: 'smile',
          name: '比较满意',
          disable: false,
          value: 2
        },
        {
          img: 'laugh',
          name: '远超预期',
          disable: true,
          value: 3
        }
      ],
      evaluatedata: [
        {
          name: '效率高'
        },
        {
          name: '质量过关'
        },
        {
          name: '速度快'
        }
      ]
    }
  },
  methods: {
    // 提交评价
    addlevel() {
      // 接口报错500
      // subevaluate(this.evaluaObj).then(res => {
      //   console.log(res, 7564)
      // }).catch(() => {
      // })
    },
    handelClick(index, item) {
      this.evaluatelist.forEach(element => {
        element.disable = false
      })
      this.evaluatelist[index].disable = true
      this.evaluaObj.user_service = item.value
    },
    // 数组去重
    unique(arr) {
      return Array.from(new Set(arr))
    },
    handelEav(index, item) {
      this.arr.push(item.name)
      this.brr = this.unique(this.arr)
      this.evaluaObj.user_tag_list = this.brr
    },
    del(index) {
      this.brr.splice(index, 1)
      this.arr = []
    }
  },
  mounted() {}
}
</script>
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.evaluate {
  * {
    touch-action: pan-y;
  }
  background-color: #fff;
  .evaluate-content {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    background: #f5f5f5;
    .b-radius(15);
    .margin(30, 40, 50, 40);
    .padding(30, 40, 0, 40);
    .evaluate-content--serve {
      .fs(26);
      text-align: left;
    }
    .evaluate-content--img {
      .pt(50);
      .pb(50);
      display: flex;
      justify-content: space-between;
    }
    .evaluate--input {
      border: 1px solid;
      .b-radius(15);
      width: 100%;
      .padding(13, 20, 13, 20);
      box-sizing: border-box;
      background: none;
      outline: none;
    }
    .evaluate-content--input {
      text-align: left;
      .h(50);
      height: 30px;
      line-height: 30px;
      .mt(20);
      .mb(20);
      border: 1px solid;
      span {
        .mr(10);
        color:#c54f8b;
        // border: 1px solid #c54f8b;
        // background-color: #c54f8b;
      }
    }
    .evaluate-content--iocn {
      display: flex;
      justify-content: flex-start;
      .mb(40);
      .evaluate-icon--p {
        border: 1px solid #c54f8b;
        // background-color: #c54f8b;
        .padding(5, 10, 5, 10);
        .mr(10);
      }
    }
    .evaluate-content--textarea {
      .pt(20);
      .pb(20);
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
      .pt(10);
      .pb(10);
      .ml(20);
      .mr(20);
      font-weight: bold;
      border: none;
      .b-radius(50);
    }
  }
  .active {
    color: #c54f8b;
  }
}
</style>
