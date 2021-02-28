<template>
  <modal :name="MODAL_WINDOWS.CREATE_CHANNEL" height="auto" width="380">
    <form @submit.prevent="createChannel" class="create-channel-modal">
      <div>
        <label>Channel name</label>
        <input v-model="channelName" type="text" required />
      </div>

      <div>
        <label>User name</label>
        <input v-model="userName" type="text" required />
      </div>

      <div>
        <input type="submit" value="Create" />
      </div>
    </form>
  </modal>
</template>

<script>
import { MODAL_WINDOWS } from '@/common/constants';

export default {
  name: 'create-channel-modal',
  data: function () {
    return {
      MODAL_WINDOWS,
    };
  },
  methods: {
    createChannel: async function () {
      await fetch('/channel', {
        method: 'post',
        body: JSON.stringify({ userName: this.userName, channelName: this.channelName }),
        headers: { 'content-type': 'application/json' },
      })
        .then((x) => x.json())
        .then(({ channelId, userId }) => this.$router.push(`/channel/${channelId}/user/${userId}`));
    },
  },
};
</script>


<style scoped lang="scss">
.create-channel-modal {
  display: flex;
  flex-direction: column;
  padding: 40px;

  > * {
    label {
      text-transform: uppercase;
      font-size: 11px;
      margin-bottom: 5px;
      display: block;
      font-weight: 600;
    }

    input {
      width: 100%;
      height: 44px;
      box-sizing: border-box;
      padding: 12px;

      &[type='submit'] {
        cursor: pointer;
        text-transform: uppercase;
        border: none;
        color: #fff;
        background-color: #31a177;
        font-weight: 600;
        font-size: 12px;
      }
    }

    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }
}
</style>
