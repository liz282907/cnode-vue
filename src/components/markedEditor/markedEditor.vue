<template>
  <section v-if="showReply">
    <div class="layer-shade" ></div>
    <div class="reply-box">
          <div v-if="isPreview" class="toolbar">
            <span class="icon-left"><i class="iconfont icon-fanhui"></i></span>
            <div class="middle"></div>
            <span class="icon-right"><i class="iconfont icon-fasong"></i></span>
          </div>
          <div v-else class="toolbar toolbar-pre">
            <span class="icon-left"><i class="iconfont icon-guanbi"></i></span>
            <div class="middle"><slot name="tool-ctr"></slot></div>
            <span class="icon-right"><i class="iconfont icon-fasong"></i></span>
          </div>
        <div><span class="reply-info">回复：{{replyInfo.index+1}}楼 </span></div>
        <textarea class="textarea" v-model="reply" @input="">

        </textarea>
    </div>

    <!-- <div v-html="compiledReply"></div> -->
  </section>

</template>

<script>

import { mapGetters } from 'vuex'
import { debounce } from '../../utils/util'

export default {
  name: 'reply-box',
  // props:['show'],
  // data(){
  //   return {
  //     showEditor: this.show
  //   }
  // },
  computed:{
    ...mapGetters(['compiledReply','showReply','replyInfo']),
    reply:{
      get(){
        return `@${this.replyInfo.name}:
          ${this.$store.state.reply.reply}
        `;
      },
      set(value){
        const match = value.match(/:(.+)/);

        if(match.length>=2){
           (debounce(()=>{
              this.$store.dispatch('updateTempReply',{reply:match[1]});
            },300))();
        }


      }
    }
  },
  watch:{
    // show(val){
    //   this.showEditor = val;
    // }
  },
  methods:{

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
.layer-shade {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.3;
}
.reply-info,.textarea{
  display: inline-block;
  padding: 5px 20px;
  font-family: 'Microsoft Yahei';
  width: 100%;
}
.reply-box{
  width: 100%;
  height: 40%;
  box-sizing: border-box;
  position: fixed;
  z-index: 100;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 4px;
  background-color: white;
  .toolbar{
    display: flex;
    line-height: 1;
    .middle{
      flex: 1;
      border-right: 1px solid rgba(208, 201, 201, 0.54);
      border-left: 1px solid rgba(208, 201, 201, 0.54);
    }
    .iconfont{
      display: inline-block;
      font-size: 24px;
      padding: 12px 20px;
      cursor: pointer;
    }

  }
  .reply-info{
    background-color: #93f174;
    color: white;
    font-size: 12px;
  }
  textarea{
    height: 100%;
    border: none;
  }
}

</style>
