<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  },
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
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
