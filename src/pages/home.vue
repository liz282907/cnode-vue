<template>
  <div>
      <nav-head></nav-head>
      <ul>
        <li v-for="item in postList">
          <card :title="item.title" :isTop="item.isTop" :imgSrc="item.imgSrc"
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
      postList: postList
    }
  }

};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
