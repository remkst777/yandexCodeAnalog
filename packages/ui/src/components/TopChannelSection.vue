<template>
  <div class="top-section">
    <button @click="showHistory" class="show-history" v-if="$parent.prebuiltContent.length">
      +
    </button>

    <button @click="openInviteUserModal" class="invite-user" v-if="$parent.isAdmin">+</button>
  </div>
</template>

<script>
import { MODAL_WINDOWS } from '@/common/constants';

export default {
  name: 'TopChannelSection',
  methods: {
    showHistory: function (e) {
      this.$parent.isHistoryShown = !this.$parent.isHistoryShown;
      this.$parent.stepHistory = [];
      this.$parent.historyRanger = 100;

      this.$parent.fetchChannel();
    },
    openInviteUserModal: function (e) {
      this.$modal.show(MODAL_WINDOWS.INVITE_USER);
    },
  },
};
</script>

<style scoped lang="scss">
.top-section {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 20px 80px;

  button {
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 37px;
    padding: 0;
    width: 40px;
    height: 40px;

    &:hover {
      background: rgba(0, 0, 0, 0.16);
      border-radius: 50%;
    }

    &.show-history {
      transform: rotate(45deg);
      margin-right: 10px;
    }
  }
}
</style>
