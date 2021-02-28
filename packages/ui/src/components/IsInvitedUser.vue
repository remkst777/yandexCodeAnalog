<template>
  <modal
    :name="MODAL_WINDOWS.FINISH_USER_REGISTRATION"
    height="auto"
    width="380"
    :clickToClose="false"
  >
    <form @submit.prevent="finishRegistration" class="finish-registration-modal">
      <div>
        <label>User name</label>
        <input v-model="userName" type="text" required />
      </div>

      <div>
        <input type="submit" value="Finish" />
      </div>
    </form>
  </modal>
</template>

<script>
import { USER_ROLES, MODAL_WINDOWS } from '@/common/constants';

export default {
  name: 'is-invited-user',
  data: function () {
    return {
      MODAL_WINDOWS,
      userName: '',
    };
  },
  methods: {
    finishRegistration: async function () {
      await fetch('/users', {
        method: 'post',
        body: JSON.stringify({
          userName: this.userName,
          id: this.$parent.userId,
        }),
        headers: { 'content-type': 'application/json' },
      })
        .then(() =>
          this.$parent.$socket.emit('newRoomUser', {
            channelId: this.$parent.channelId,
            userId: this.$parent.userId,
          }),
        )
        .then(() => this.$modal.hide(MODAL_WINDOWS.FINISH_USER_REGISTRATION));
    },
  },
  mounted: function () {
    this.$modal.show(MODAL_WINDOWS.FINISH_USER_REGISTRATION);
  },
};
</script>


<style scoped lang="scss">
.finish-registration-modal {
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

    input,
    select {
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
