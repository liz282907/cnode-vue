<template>
  <div id="app">
    <i class="iconfont icon-menu" 
      @click='show=true'>
    </i>
   <div id="demo">
    <button @click="isshow=!isshow">
      Toggle
    </button>
    <transition name="fade">
      <p v-if="isshow">hello</p>
    </transition>
  </div>
    <SlideCard :show='show' :cancel='handleModal.bind(this,false)'></SlideCard>
    <router-view></router-view>
  </div>
</template>

<script>
import SlideCard from './components/slide-card.vue'
export default {
  name: 'app',
  components: {
    SlideCard
  },
  data() {
    return {
      show: false,
      isshow: false
    }
  },
  methods: {
    handleModal(value) {
      this.show = value;
    }
  }

};
</script>

<style lang='scss'>
@import './assets/styles/common/index.scss';
@import './assets/styles/components/index.scss';
@import './assets/styles/fonts/iconfont.css';
@import './assets/styles/pages/index.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
