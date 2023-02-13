import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import ZoomOnHover from "vue-zoom-on-hover";

Vue.config.productionTip = false

//import templates
import LoginLayout from './layout/LoginLayout.vue'
import DashboardLayout from './layout/DashboardLayout.vue'
import PayLayout from './layout/PayLayout.vue'
import axios from 'axios'

Vue.component('login-layout', LoginLayout);
Vue.component('dashboard-layout', DashboardLayout);
Vue.component('pay-layout',PayLayout);
Vue.use(ZoomOnHover);

new Vue({
  vuetify,
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
