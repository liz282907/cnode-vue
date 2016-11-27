<template>
  <div class="">
      <div class="header-bar clearfix" @click="backToPrev">
          <i class="iconfont icon-back"></i>{{title}}</div>
          <div class="right">
            <slot></slot>
          </div>
    <div>

    </div>
  </div>
</template>

<script>

import router from '../route.config'

export default {
  name: 'HeaderBar',
  props:{
    title:{
      type: String,
      default:''
    }
  },
  data() {
    return {

    };
  },
  methods:{
    backToPrev(){
      router.go(-1);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
.header-bar{
  position: fixed;
  top: 0;
  width: 100%;
  height: 54px;
  display: block;
  vertical-align: middle;
  line-height: 54px;
  padding-left: 5%;
  background-color: #424242;
  font-family: "Microsoft Yahei";
  color: #fff;
  .icon-back{

      margin-right: 10px;
  }

}
</style>
