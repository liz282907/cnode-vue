import Vue from 'vue';
import App from './App';
import router from './route.config'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App></App>',
  components: { App },
  router
});
