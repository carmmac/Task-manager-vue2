import Vue from "vue";
import App from "./App.vue";
import Store from "./store/index";
import { BootstrapVue } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.min.css";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

new Vue({
  render: (h) => h(App),
  el: "#app",
  store: Store,
});
