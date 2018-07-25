// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from "bootstrap-vue"
import "bootstrap-vue/dist/bootstrap-vue.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import VeeValidate from 'vee-validate'


Vue.config.productionTip = false
Vue.use(VeeValidate);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
