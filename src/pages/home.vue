<template>
  <nav-head></nav-head>

</template>

<script>
import NavHead from './components/header';
import Card from './components/card';

export default {
  name: 'app',
  components: {
    'nav-head': NavHead,
    'card': Card
  },
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
