import Vue from 'vue';
import App from './App';
import router from './route.config'
import store from './store/index'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App></App>',
  components: { App },
  router
});
