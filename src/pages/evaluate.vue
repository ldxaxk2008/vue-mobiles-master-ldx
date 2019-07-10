<template>
    <div class="evaluate">
       <div class="evaluate-header">
            <common-header :tittle="tittle" :showback="true" :showmore='false'></common-header>
       </div>
       <div class="evaluate-content">
           <p class="evaluate-content--serve">请问你如何评价这次服务</p>
           <ul class="evaluate-content--img">
               <li v-for="(item,index) in evaluatelist" :key="index" :class="{'active':item.disable,'disables':!item.disable}"  @click="handelClick(index,item.disable)">
                   <!-- <img :src="item.img" alt=""> -->
                   <!-- <svg-icon :name="item.img" size="100" :fill="{'active':item.disable,'disables':!item.disable}"></svg-icon> -->
                   <svg-icon :name="item.img" size="100" class="aaa"></svg-icon>
                   <p>{{item.name}}</p>
               </li>
           </ul>
           <p class="evaluate-content--serve">请为该学生添加标签</p>
           <div class="evaluate-content--input">
              <input class="evaluate--input" type="text">
           </div>
            <div class="evaluate-content--iocn">
                 <van-icon class="evaluate--iocn" name="clock-o" /><p>效率高&nbsp;&nbsp; 质量过关</p>
            </div>
            <p class="evaluate-content--serve">请为您对本次服务做出点评价(选填)</p>
            <div class="evaluate-content--textarea">
                <textarea class="evaluate--input" name="" id="" cols="30" rows="10"></textarea>
            </div>
       </div>
        <div class="evaluate-footer">
                 <button  class="evaluate-footer--btn" @click="addlevel">提交评价</button>
             </div>
       </div>
</template>
<script>
import commonHeader from 'common/common-header'
export default {
  components: {
    commonHeader
  },
  data() {
    return {
      showIndex: -1,
      tittle: '',
      evaluatelist: [
        {
          img: 'facered0',
          // img: 'chart_retract',
          name: '符合要求',
          disable: false
        },
        {
          img: 'facered1',
          // img: 'chart_retract',
          name: '比较满意',
          disable: false
        },
        {
          img: 'facered2',
          // img: 'chart_retract',
          name: '远超预期',
          disable: false
        }
      ]
    }
  },
  methods: {
    addlevel() {

    },
    handelClick(index, bol) {
      // if (!bol) {
      //   console.log(this.evaluatelist[index], 888)
      //   this.evaluatelist[index].disable = true
      // } else {
      //   this.evaluatelist[index].disable = false
      // }
      // ev.className = ev.className === 'info' ? 'active' : 'info'
      // ev.children[0].src = ev.className === 'info' ? index.active : index.info
      // this.evaluatelist.forEach((item, index) => {
      //   item.img = require(`@/assets/imgs/face${index}.png`)
      // })
      // if (index !== this.showIndex) { // 当点击一次的时候
      //   this.evaluatelist[index].disable = true
      //   this.evaluatelist[index].img = require(`@/assets/imgs/facered${index}.svg`)
      // } else if (index === this.showIndex) {
      //   this.evaluatelist[index].disable = !this.evaluatelist[index].disable
      //   if (this.evaluatelist[index].disable) { // 当点击多次的时候
      //     this.evaluatelist[index].img = require(`@/assets/imgs/facered${index}.svg`)
      //   }
      // }
      // this.showIndex = index
    }
  }
}
</script>
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.evaluate{
   * { touch-action: pan-y; }
    background-color: #fff;
    .evaluate-content{
       flex: 1;
       overflow-y: auto;
       overflow-x: hidden;
      background: #f5f5f5;
      .b-radius(15);
      .margin(30,40,50,40);
      .padding(30,40,0,40);
      .evaluate-content--serve{
        .fs(26);
        text-align: left;
      }
      .evaluate-content--img{
        .pt(50);
        .pb(50);
        // width: 100%;
        display: flex;
        justify-content: space-between;

        // img{
        //     // width: 100%;
        //     .w(150);
        //     .h(150);
        //     .pb(10);
        // }
      }
      .evaluate--input{
          border: 1px solid;
          .b-radius(15);
          width:100%;
          .padding(13,20,13,20);
          box-sizing: border-box;
          background: none;
          outline: none;
        }
      .evaluate-content--input{
          .pt(20);
          .pb(20);
      }
      .evaluate-content--iocn{
          display: flex;
          justify-content: flex-start;
          .mb(40);
          .evaluate--iocn{
            .fs(30);
            .mr(10);
          }
      }
      .evaluate-content--textarea{
          .pt(20);
          .pb(20);
      }
    }
    .evaluate-footer{
        .pt(30);
        .pb(30);
        background-color:#f5f5f5;
        position: sticky;
        bottom: 0;
        left:0;
        display: flex;
        .evaluate-footer--btn{
            flex:1;
            margin:0 auto;
            background-color:#c54f8b;
            color:white;
            .fs(25);
            .pt(10);
            .pb(10);
            .ml(20);
            .mr(20);
            font-weight: bold;
            border:none;
            .b-radius(50);
          }
        }
        .active{
          color: red
        }
        .disables{
          color: gray
        }
}
</style>
