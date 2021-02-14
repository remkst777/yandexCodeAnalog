import Vue from "vue";
import VueSocketIO from "vue-socket.io";
import router from "@/router";
import store from "@/store";

import App from "./App.vue";

Vue.config.productionTip = false;

Vue.use(
  new VueSocketIO({
    connection: "http://localhost:9998",
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_",
    },
  })
);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
