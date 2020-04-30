import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import BootstrapVue from "bootstrap-vue";
import VCalendar from "v-calendar";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VCalendar);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
