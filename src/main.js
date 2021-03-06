import Vue from 'vue'
import App from './App.vue'
import './assets/main.scss'
import router from './router'
// import VueBootstrapTypeahead from './vue-bootstrap-typeahead'
// import 'bootstrap/scss/bootstrap.scss'

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
