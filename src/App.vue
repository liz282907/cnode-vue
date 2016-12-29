<template>
  <div id="app">
   <div id="demo">
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {

  },
  methods: {

  }

};
</script>

<style lang='scss'>
@import './assets/styles/common/index.scss';
@import './assets/styles/components/index.scss';
@import './assets/styles/fonts/iconfont.css';
@import './assets/styles/pages/index.scss';
#app {
  overflow-x: hidden;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

</style>
