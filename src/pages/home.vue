<template>
  <div>
      <nav-head></nav-head>
      <div class="nav-bar">
        <span><i class="iconfont nav-img" @click='show=true'>&#xe745;</i></span>
        <h1>{{tab}}</h1>

      </div>
      <ul>
        <li v-for="item in postList">
          <card :title="item.title" :tagName="item.tagName" :isTop="item.top" :imgSrc="item.author.avatar_url"
                :commentCount.number="item.reply_count"
                :clickCount.number="item.visit_count"
                :creator="item.author.loginname"
                :createTime="item.create_at"
                :updateTime="item.last_reply_at"

          ></card>
        </li>
      </ul>
      <slide-card :show='show' :cancel='handleModal.bind(this,false)'></slide-card>
  </div>

</template>
<script>
import moment from 'moment';
import NavHead from '../components/header';
import Card from '../components/card';
import { throtte,isScrollDown,check_if_needs_more_content } from '../utils/util';
import SlideCard from '../components/slide-card.vue'

moment.locale("zh-cn");

const limit = 10;
let responseDict = {};

// const postList = [
//   {
//     // customStyle:,
//     top: false,
//     title: "光棍节程序员闯关",
//     tagName: "置顶",
//     // imgSrc: "./assets/images/logo.png",
//     reply_count: 26,
//     visit_count: 2552,
//     good: false,
//     author: {
//       loginname:"nswbmw",
//       avatar_url: "https://avatars.githubusercontent.com/u/4279697?v=3&s=120"
//     },
//     create_at: "2016-09-27 15:53:31",
//     last_reply_at: moment("2016-11-12T07:12:05.514Z").fromNow(),
//     isTop: false
//   }
// ]

export default {
  components: {
    'nav-head': NavHead,
    'card': Card,
    'slide-card': SlideCard
  },
  props:['tab'],
  data(){
    return {
      postList: [],
      page: 1,
      initTop: document.scrollTop,
      show: false
    }
  },

  beforeCreate(){
    // console.log("---------",this.infiniteScroll);
    // this.infiniteScroll = this.infiniteScroll.bind(this);
    // window.addEventListener("scroll",this.infiniteScroll);
  },
  created(){

    this.fetchPage(1);
    this.infiniteScroll = this.infiniteScroll.bind(this);
    window.addEventListener("scroll",this.infiniteScroll());

  },
  mounted(){
  },
  beforeDestroy(){
    window.removeEventListener("scroll",this.infiniteScroll());
  },

  methods:{
    infiniteScroll(e){
        return throtte(this.fetchWhenScroll.bind(this),1000);
    },
    getTransformedResponse(prevResponse){
      return prevResponse.data.map(item=>{
        // debugger;
        item.create_at = moment(item.create_at).format("YYYY-MM-DD HH:mm");
        item.last_reply_at = moment(item.last_reply_at).fromNow();

        return item;
      })
    },


    fetchWhenScroll(){
      // let isDown = isScrollDown(this.initTop,(curTop)=>{
      //   this.initTop = curTop;
      // });
      // isDown? this.page++ : this.page--;
      if(check_if_needs_more_content()){
        console.log("--------------page-----------",this.page);
        this.fetchPage(this.page);
        this.page++;
      }
    },

    fetchPage(page){
      if(responseDict[page]) return;

      axios.get('https://cnodejs.org/api/v1/topics',{
          params:{
            page,
            tab: 'good',
            limit
          }
        })
      .then(response=>{
          if(response.data){
            const appendedList = this.getTransformedResponse(response.data);
            responseDict[page] = appendedList;
            this.postList = [...this.postList,...appendedList];
          }

      })
      .catch(err=> console.log(err));
    },
    handleModal(value) {
      this.show = value;
    }
  }

};
</script>

<style>

</style>
