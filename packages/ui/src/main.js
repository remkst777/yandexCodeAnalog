import Vue from 'vue';
import VueSocketIO from 'vue-socket.io';
import router from '@/router';
import vmodal from 'vue-js-modal';
import store from '@/store';

import App from './App.vue';

import './styles/reset.css';
import './styles/global.css';

Vue.config.productionTip = false;

Vue.use(vmodal, { dynamicDefault: { draggable: true, resizable: true } });

Vue.use(
  new VueSocketIO({
    connection: 'http://localhost:9998',
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_',
    },
  }),
);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
