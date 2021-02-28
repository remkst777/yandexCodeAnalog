<template>
  <div class="home">
    <div />
    <div />
    <div @click="openCreateChannelModal">
      <PokemonBall />
    </div>

    <CreateChannelModal />
  </div>
</template>

<script>
import { MODAL_WINDOWS } from '@/common/constants';

import PokemonBall from '@/components/PokemonBall.vue';
import CreateChannelModal from '@/components/CreateChannelModal.vue';

export default {
  name: 'home',
  data: function () {
    return {
      channelName: '',
      userName: '',
    };
  },
  components: {
    PokemonBall,
    CreateChannelModal,
  },
  methods: {
    openCreateChannelModal: function () {
      this.$modal.show(MODAL_WINDOWS.CREATE_CHANNEL);
    },
  },
};
</script>

<style scoped lang="scss">
.home {
  position: relative;

  > div:nth-child(1),
  > div:nth-child(2) {
    height: 50vh;
    width: 100vw;
    background-color: #262626;
  }

  > div:nth-child(1) {
    border-bottom: 6px solid #ccc;
  }

  > div:nth-child(3) {
    position: absolute;
    top: calc(50% - 100px);
    left: calc(50% - 100px);
    cursor: pointer;
  }
}
</style>
