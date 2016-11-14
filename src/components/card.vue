<template>
  <div class="card">
    <h3>
      <span :class="tagClassName">{{tagName}}</span>
      <span class="title">{{title}}</span>
    </h3>
    <div class="info">
      <img class="avatar" :src="imgSrc" alt="avatar">
      <div class="status">
         <p class="clearfix">
           <span class="creator fl">{{creator}}</span>
           <span class="stats fr">
              <em>{{commentCount}} /</em>
              {{clickCount}}
            </span>
         </p>
         <p class="clearfix">
           <time class="fl">创建于: {{createTime}}</time>
           <time class="fr">{{updateTime}}</time>
         </p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'card',
  props:{
    isTop: {
      type: Boolean,
      default: false
    },
    tagName: "",
    title:"",
    customStyle:{
      type: Object,
      default:()=>{} //type为object的需要在function中返回
    },
    imgSrc: "",
    commentCount: {
      type: Number,
      default: 0
    },
    clickCount: {
      type: Number,
      default: 0
    },
    creator: "",
    createTime: "",
    updateTime: "",

  },
  data() {
    return {
    }
  },
  computed:{
    tagClassName(){
      return ['tag',{'tag-highlight':this.isTop}]
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
