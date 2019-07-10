<template>
    <div class="task-editor">
       <common-header :tittle="tittle" :showback="true" ></common-header>
       <div class="task-editor--con">
       <div class="task-editor--select">
          <input class="task-editor--input" v-model="invalue" type="text" placeholder="请输入选择类型" @focus="changedata"><van-icon class="task-editor-secicon" name="arrow-down"/>
          <van-action-sheet
            v-model="show"
            :actions="actions"
            @select="onSelect"
          />
       </div>
       <div class="task-editor--describe">
          <input class="task--describe__title" v-model="inputTitle" type="text"  name="" id="" placeholder="标题 输入吸引热度的标题">
          <textarea class="task--describe__con"  v-model="inputContent" ref="inputContent" value="inputContent" placeholder="详细内容 可以简略的概括所需情况和资料"></textarea>
       </div>
       <div class="task-editor--filed">
          <button class="evaluate-footer--btn">设计</button>
            <!-- <ul>
                <li v-for="(item,index) in filedlist " :key="item" :style="{background:item.bg,color:item.color}" @click="change(index,item.disable)">
                   {{item.name}}
                </li>
            </ul> -->
            <ul class="page-map--ul">
          <li v-for="item in maplist" :key="item">
            <img :src="item.img" alt="">
            <p class="page-map--p">{{item.name}}</p>
          </li>
        </ul>
       </div>
    </div>
       <!-- <div class="task-editor--tool">
           <div class="task-editor--tool__left">
               <div class="task-editor__top">
                   <p>适合工具</p><van-icon class="task-editor-toolicon" name="add-o"/>
               </div>
               <div class="task-editor__t">
                  <span>1</span><span>1</span><span>1</span>
               </div>
               <div class="task-editor__b">
                  <span>1</span><span>1</span>
               </div>
            </div>
           <div class="task-editor--tool__right">
               <p>报酬 RMB</p>
               <input class="tool-input" type="text">
            </div>
       </div>
        <div class="task-editor--time">
          <p>截止日期</p>
           <van-icon class="task-editor-timeicon" name="send-gift-o"/>
           <p class="task-editor--ft">上传相关文件</p>
           <p class="task-editor--ft">详细需求文档</p>
           <p class="task-editor--ft">风格示例</p>
       </div> -->
       <!-- <div class="task-foot">发布</div> -->
        <div class="evaluate-footer">
                 <button  class="evaluate-footer--btn">发布</button>
       </div>
    </div>
</template>
<script>
import commonHeader from 'common/common-header'
export default {
  components: {
    commonHeader
    // type
  },
  data() {
    return {
      invalue: '',
      show: false,
      actions: [
        { name: '选项1' },
        { name: '选项2' },
        { name: '选项3' }
      ],
      tittle: '返回首页',
      inputTitle: '',
      inputContent: '',
      arr: [],
      brr: [],
      maplist: [
        {
          img: require('@/assets/imgs/copy1.png'),
          name: '文案'
        },
        {
          img: require('@/assets/imgs/copy2.png'),
          name: '设计'
        },
        {
          img: require('@/assets/imgs/copy3.png'),
          name: '代码'
        },
        {
          img: require('@/assets/imgs/copy4.png'),
          name: '手绘'
        },
        {
          img: require('@/assets/imgs/copy5.png'),
          name: 'PPT'
        }
      ]
      // filedlist: [
      //   {
      //     bg: '#182A38',
      //     name: '文案',
      //     disable: false,
      //     color: '#1E7685'
      //   },
      //   {
      //     bg: '#17282D',
      //     name: '设计',
      //     disable: false,
      //     color: '#267B56'
      //   },
      //   {
      //     bg: '#182A38',
      //     name: '代码',
      //     disable: false,
      //     color: '#1E7685'
      //   },
      //   {
      //     bg: '#17282D',
      //     name: '手绘',
      //     disable: false,
      //     color: '#267B56'
      //   },
      //   {
      //     bg: '#321E28',
      //     name: 'PPT',
      //     disable: false,
      //     color: '#BA762E'
      //   }
      // ]
    }
  },
  methods: {
    //  知识领域颜色改变
    change(index, bol) {
      this.filedlist.forEach(item => {
        console.log(item.bg)
        this.arr.push(item.bg)
        this.brr.push(item.color)
        if (!bol) {
          this.filedlist[index].bg = '#FFB400'
          this.filedlist[index].color = 'white'
          this.filedlist[index].disable = true
        } else if (bol) {
          this.filedlist[index].bg = this.arr[index]
          this.filedlist[index].color = this.brr[index]
          this.filedlist[index].disable = false
        }
      })
    },
    onSelect(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.show = false
      this.invalue = item.name
    },
    changedata(val) {
      this.show = true
    }
  }
}
</script>
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.task-editor{
    * { touch-action: pan-y; }
    background-color: #fff;
    .task-editor--select{
        .margin(40,50,40,50);
        .padding(5,20,5,20);
        height: 30px;
        display: flex;
        justify-content:space-between;
        align-items: center;
        .b-radius(50);
        background-color: rgb(245,245,245);
        .task-editor--input{
          background: none;
          outline: none;
        }
      .task-editor-secicon{
        .fs(30);
        color: gray;
      }
    }
    .task-editor--con{
      flex: 1;
      overflow-x: hidden;
      overflow-y: auto;
    }
    .task-editor--describe{
        .task--describe__title{
        display: flex;
        box-sizing: border-box;
        background-color:transparent;
        border-bottom: 3px solid #d8d8d8;
        width: 100%;
        .padding(0,50,20,20);
        .fs(24);
      }
    }
    .task--describe__con{
        width: 100%;
        display: flex;
        box-sizing: border-box;
        background-color:transparent;
        border-top:0px;
        border-left:0px;
        border-right:0px;
        border-bottom: 3px solid #d8d8d8;
        .h(250);
        .padding(20,50,0,50);
        .fs(24);
    }
    .task-editor--filed{
      color:#898798;
      .mt(40);
       .evaluate-footer--btn{
          .ml(40);
         display: flex;
            background-color:#c54f8b;
            color:white;
            .fs(25);
            .padding(10,30,10,30);
            font-weight: bold;
            border:none;
            .b-radius(10);
          }
       .page-map--ul{
      .mt(30);
      .pl(20);
      .pr(20);
      display: flex;
      justify-content: space-between;
        img{
          box-sizing: border-box;
          width: 80%;
        }
        .page-map--p{
          .fs(25);
          color:#898798;
          font-weight: bold;
          text-align: center
        }
    }
      // p{
      //   .fs(28);
      //    font-weight: bold;
      // }
      // ul{
      //    .mt(25);
      //    .mb(25);
      // }
      // li{
      //   display: inline;
      //   .padding(10,20,10,20);
      //   .mr(20);
      //   .fs(25);
      //   font-weight: bold;
      // }
    }
    .task-editor--tool{
      .mt(40);
      .ml(50);
      display: flex;
      justify-content: flex-start;
      text-align: left;
      p{
        .fs(28);
         font-weight: bold;
        color:#898798;
      }
      .task-editor--tool__left{
          width: 50%;
          .task-editor__top{
             display: flex;
          }
          .task-editor-toolicon{
            .mt(5);
            .fs(30);
            color: #2CA2A9;
        }
        .task-editor__t{
            .ml(20);
            .mt(30);
        }
        .task-editor__b{
            .ml(60);
        }
        span{
            display: inline-block;
            .w(60);
            .h(60);
            color:gray;
            border: 1px solid;
        }
      }
      .task-editor--tool__right{
          width: 50%;
          .tool-input{
            color:#898798;
            .mt(25);
            .b-radius(50);
            background-color: #e7e7e7;
            .padding(15,30,15,30);
          }
      }
    }
    .task-editor--time{
     .mt(40);
     .mb(30);
      color:#898798;
      .ml(50);
      text-align: left;
      p{
        .fs(28);
         font-weight: bold;
      }
      .task-editor--ft{
        .ml(80);
        .fs(20);
      }
    }
    .task-editor-timeicon{
        .mt(20);
        .fs(60);
      }
      .task-foot{
        @base-font-color:#000;
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
            background-color:#c54f8b;
            color:white;
            .fs(25);
            font-weight: bold;
            border:none;
            .b-radius(50);
            .pt(10);
            .pb(10);
            .ml(20);
            .mr(20);
          }
        }
}
</style>
