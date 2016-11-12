<template>
  <div class="">
    <div class="left">
      <span :class="tagClassName"></span>
    </div>
    <div class="right">

    </div>
  </div>
</template>

<script>
export default {
  name: 'card',
  props:{
    customStyle:{
      type: Object,
      default:()=>{} //type为object的需要在function中返回
    }
  },
  computed:{
    tagClassName:['tag',{'tag-highlight':isTop}]
  },
  data() {
    return {
      isTop: false
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
