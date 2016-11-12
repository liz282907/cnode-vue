<template>
  <div class="">
    <h3>
      <span :class="tagClassName"></span>
      {{title}}
    </h3>
    <div class="info">
      <img class="avatar" :src="imgSrc" alt="avatar">
      <div class="status">
         <p>
           <span class="creator">{{creator}}</span>
           <span class="stats">
              <em>{{clickCount}}/</em>
              {{commentCount}}
            </span>
         </p>
         <p class="">
           <time>{{createTime}}</time>
           <time>{{updateTime}}</time>
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
