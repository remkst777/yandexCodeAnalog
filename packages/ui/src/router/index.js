import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import Channel from '@/views/Channel.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/channel/:channelId/user/:userId',
      name: 'channel',
      component: Channel,
    },
  ],
});
