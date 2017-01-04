<template>
  <div>
      <nav-head></nav-head>
      <div class="nav-bar">
        <span><i class="iconfont nav-img" @click='toggleSlide'>&#xe745;</i></span>
        <h1>{{title}}</h1>

      </div>
      <ul>
        <li v-for="item in postList" :key="item.id">
          <router-link :to="{ name: 'topic', params: { id: item.id }}">
          <card :title="item.title" :tagName="item.tagName" :isTop="item.top" :imgSrc="item.author.avatar_url"
                :commentCount.number="item.reply_count"
                :clickCount.number="item.visit_count"
                :creator="item.author.loginname"
                :createTime="item.create_at"
                :updateTime="item.last_reply_at"

          ></card>
          </router-link>
        </li>
      </ul>
      <slide-card :show='showSlide' :cancel='handleModal.bind(null,false)'></slide-card>


  </div>

</template>
<script>
import moment from 'moment';
import NavHead from '../components/header';
import Card from '../components/card';
import SlideCard from '../components/slide-card'

import { throtte,isScrollDown,check_if_needs_more_content,isObjEmpty } from '../utils/util';
import { getTabName } from '../constants/config';

import { mapGetters,mapActions,mapMutations } from 'vuex'
import * as types from '../store/mutation-types'


moment.locale("zh-cn");

// const limit = 10;
// let responseDict = {};

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
    name:'Home',
    components: {
        'nav-head': NavHead,
        'card': Card,
        'slide-card': SlideCard,

    },
    // props: ['tab'],
    // data() {
    //     return {
    //         postList: [],
    //         page: 1,
    //         // initTop: document.documentElement.scrollTop,
    //         show: false,
    //         showModal: false,
    //         // fromRoute:'',
    //         tab: 'all'
    //     }
    // },
    computed:{
      ...mapGetters(['tabName','postList','showSlide']),
      ...mapGetters({
        page: 'postPage'
      }),
      title(){
        // console.log("----------",this.tab);
        return this.tabName;
      },
    },
    watch: {
        '$route'(to,from) {
            //监听tab导致的路由变动
            if(to.query && to.query.tab){
              this.$store.dispatch('changeTab',to.query.tab).then(()=>{
                this.reset();
                this.scrollToPage(1);
              })
            }
        }
    },

    //在route里面赋值，为create里面的数据到底是获取还是用缓存数据做区分
    beforeRouteEnter(to, from, next) {
        //从详情页回来
        if (from.fullPath.indexOf('topic') !== -1) {
            next(vm=>{
                vm.fromRoute = from.fullPath;
            });
          }
        else
          next(vm=> vm.fromRoute = '');

    },
    // beforeRouteLeave(to,from,next){
    //   //记录上次的scrollTop
    //   if(to.name==='topic'){
    //     const scrollTop = document.body.scrollTop||document.documentElement.scrollTop;
    //     this.$store.dispatch('setStorage',{
    //       scrollTop: JSON.stringify(scrollTop)
    //     })
    //   }
    //   next();
    // },


    beforeCreate() {
    },

    created() {


    },
    mounted() {
        //从详情页返回
        // debugger
        // // localStorage.removeItem('postList');
        // localStorage.removeItem('scrollTop');
        // console.log(" home mounted ")
        // if(!localStorage.getItem('postList')) this.scrollToPage(1);
        // else
        //   this.recover();
        if(!this.postList.length) this.scrollToPage(1);

        this.infiniteScroll = throtte(this.fetchWhenScroll.bind(this), 300);
          // this.infiniteScroll = this.infiniteScroll.bind(this);
        window.addEventListener("scroll", this.infiniteScroll);
    },
    beforeUpdate(){
      console.log(arguments);
    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.infiniteScroll);
    },
    destroyed() {
        console.log("destroyed");
    },

    methods: {
        ...mapActions([
          'scrollToPage',
          'recover',
          'reset'
        ]),
        ...mapMutations([
          types.INCRE_POSTPAGE,
          types.TOGGLE_SLIDE
        ]),
        toggleSlide(){
          this[types.TOGGLE_SLIDE]();
        },
        // infiniteScroll(e){
        //     return throtte(this.fetchWhenScroll.bind(this),1000);
        // },
        fetchWhenScroll() {
            /*
                  let isDown = isScrollDown(this.initTop,(curTop)=>{
                    this.initTop = curTop;
                  });
                  isDown? this.page++ : this.page--;
                  this.fetchPage(this.page);
            */
            if (check_if_needs_more_content()) {
                this.scrollToPage(this.page);
                this[types.INCRE_POSTPAGE]();
            }
        },
        handleModal(value) {
          this[types.TOGGLE_SLIDE](value);
        }
    }

};
</script>

<style>

</style>
