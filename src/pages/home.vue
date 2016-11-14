<template>
  <div>
      <nav-head></nav-head>
      <div class="nav-bar">
        <span><i class="iconfont nav-img">&#xe745;</i></span>
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
  </div>

</template>
<script>
import moment from 'moment';
import NavHead from '../components/header';
import Card from '../components/card';
import { throtte } from '../utils/util';

moment.locale("zh-cn");

const limit = 10;

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
    'card': Card
  },
  beforeCreate(){
    window.addEventListener("scroll",this.infiniteScroll);
  },
  created(){
    this.fetchServerList(this.page);

  },
  beforeDestroy(){
    window.removeEventListener("scroll",this.infiniteScroll);
  },
  props:['tab'],
  data(){
    return {
      postList: [],
      page: 1
    }
  },
  methods:{
    infiniteScroll(){
      console.log("-----------inscroll",this.page);
      return ()=>{
        throtte(this.fetchServerList.bind(this,this.page),1000);
      }
    },
    getTransformedResponse(prevResponse){
      return prevResponse.data.map(item=>{
        item.last_reply_at = moment(item.last_reply_at).fromNow();
        return item;
      })
    },
    fetchServerList(page){
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
            this.postList = [...this.postList,...appendedList];
            console.log("this page",this.page);
            this.page++;
          }

      })
      .catch(err=> console.log(err));
    }
  }

};
</script>

<style>

</style>
