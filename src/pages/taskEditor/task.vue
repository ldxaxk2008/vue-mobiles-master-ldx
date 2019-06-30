<template>
    <div class="task-editor">
       <common-header :headerColor="headerColor" :tittle="tittle" :showback="true" ></common-header>
       <div class="task-editor--select">
          <input class="task-editor--input" type="text" placeholder="请选择任务类型">
       </div>
       <div class="task-editor--describe">
          <input class="task--describe__title" v-model="inputTitle" type="text"  name="" id="" placeholder="标题 输入吸引热度的标题">
          <textarea class="task--describe__con"  v-model="inputContent" ref="inputContent" value="inputContent" placeholder="详细内容 可以简略的概括所需情况和资料"></textarea>
       </div>
       <div class="task-editor--filed">
          <p>知识领域</p>
            <ul>
                <li v-for="(item,index) in filedlist " :key="item" :style="{background:item.bg,color:item.color}" @click="change(index,item.disable)">
                   {{item.name}}
                </li>
            </ul>
       </div>
       <div class="task-editor--tool">
           <div class="task-editor--tool__left">
               <div class="task-editor__top">
                   <p>适合工具</p><van-icon name="add-o"/>
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
           <van-icon name="send-gift-o"/>
           <p class="task-editor--ft">上传相关文件</p>
           <p class="task-editor--ft">详细需求文档</p>
           <p class="task-editor--ft">风格示例</p>
       </div>
       <div class="task-foot">发布</div>
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
      tittle: '返回首页',
      headerColor: '#222230',
      inputTitle: '',
      inputContent: '',
      arr: [],
      brr: [],
      filedlist: [
        {
          bg: '#182A38',
          name: '文案',
          disable: false,
          color: '#1E7685'
        },
        {
          bg: '#17282D',
          name: '设计',
          disable: false,
          color: '#267B56'
        },
        {
          bg: '#182A38',
          name: '代码',
          disable: false,
          color: '#1E7685'
        },
        {
          bg: '#17282D',
          name: '手绘',
          disable: false,
          color: '#267B56'
        },
        {
          bg: '#321E28',
          name: 'PPT',
          disable: false,
          color: '#BA762E'
        }
      ]
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
    }
  }
}
</script>
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.task-editor{
    * { touch-action: pan-y; }
    background-color: #191927;
    .task-editor--select{
        .mt(40);
        .mb(40);
      .task-editor--input{
        .w(500);
        .pl(30);
        .pr(30);
        .pt(15);
        .pb(15);
        .b-radius(50);
        background-color: rgb(21,40,54);
      }
    }
    .task-editor--describe{
        width: 100%;
    }
    .task--describe__title{
        display: block;
        background-color:transparent;
        border-bottom: 3px solid #4F4F57;
        .w(650);
        .pt(20);
        .pb(10);
        .pl(50);
        .pr(45);
        .fs(24);
        font-weight: bold;
    }
    .task--describe__con{
        display:block;
        background-color:transparent;
        border-top:0px;
        border-left:0px;
        border-right:0px;
        border-bottom: 3px solid #4F4F57;
        .w(650);
        .h(250);
        .pt(20);
        .pb(10);
        .pl(50);
        .pr(45);
        .fs(24);
        font-weight: bold;
    }
    .task-editor--filed{
      color:#898798;
      .ml(50);
      .mt(40);
      text-align: left;
      p{
        .fs(28);
         font-weight: bold;
      }
      ul{
         .mt(25);
         .mb(25);
      }
      li{
          display: inline;
          .pl(20);
          .pr(20);
          .pt(10);
          .pb(10);
          .mr(20);
          .fs(25);
          font-weight: bold;
      }
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
          .van-icon{
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
            background-color: #1A2A2F;
            .pl(30);
            .pr(30);
            .pt(15);
            .pb(15);
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
        color: #ffffff;
        .ml(80);
        .fs(20);
      }
    }
    .van-icon{
        .mt(20);
        .fs(60);
        color: white;
      }
      .task-foot{
        color: #ffffff;
      }
}
</style>
