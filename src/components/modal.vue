<template>
  <div v-show="show">
    <div class="layer-shade" @click="cancel"></div>
    <div class="modal">
      <p>需要登录账户，是否现在登录？</p>
      <div>
        <button @click="cancelLogin">取消</button>
        <button @click="login">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal',
  props:{
    show:{
      type: Boolean,
      default: false
    },
    cancel:{
      type: Function
    }
  },
  data() {
    return {
      // show,
    };
  },
  methods:{
    login:()=>{

    },
    cancelLogin:()=> this.cancel(),
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
.modal{
  position: absolute;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 80%;
  padding: 5% 10%;
  border-radius: 4px;
  background-color: white;
}

</style>
