<template>
  <div>
      <nav-head></nav-head>
      <div class="nav-bar">
        <span><i class="iconfont nav-img">&#xe745;</i></span>
        <h1>{{category}}</h1>

      </div>
      <ul>
        <li v-for="item in postList">
          <card :title="item.title" :tagName="item.tagName" :isTop="item.isTop" :imgSrc="item.imgSrc"
                :commentCount.number="item.commentCount"
                :clickCount.number="item.clickCount"
                :creator="item.creator"
                :createTime="item.createTime"
                :updateTime="item.updateTime"

          ></card>
        </li>
      </ul>
  </div>

</template>
<script>
import NavHead from '../components/header';
import Card from '../components/card';

const postList = [
  {
    // customStyle:,
    title: "光棍节程序员闯关",
    tagName: "置顶",
    // imgSrc: "./assets/images/logo.png",
    commentCount: 3552,
    clickCount: 26,
    creator: "Hanggi",
    createTime: "2016-09-27 15:53:31",
    updateTime: "1天前",
    isTop: false
  }
]

export default {
  name: 'app',
  components: {
    'nav-head': NavHead,
    'card': Card
  },
  created(){

  },
  data(){
    return {
      postList,
      category: "问答"

    }
  }

};
</script>

<style>

</style>
