<template>
  <modal :name="MODAL_WINDOWS.INVITE_USER" height="auto" width="380">
    <form @submit.prevent="inviteUser" class="invite-user-modal">
      <div>
        <label>User role</label>
        <select v-model="role">
          <option v-for="option in options" :value="option.value" :key="option.value">
            {{ option.text }}
          </option>
        </select>
      </div>

      <div>
        <input type="submit" value="Invite" />
      </div>
    </form>
  </modal>
</template>

<script>
import { USER_ROLES, MODAL_WINDOWS } from '@/common/constants';

export default {
  name: 'invite-user-modal',
  data: function () {
    return {
      MODAL_WINDOWS,
      role: USER_ROLES.ACTIVE,
      options: [
        { text: 'Active', value: USER_ROLES.ACTIVE },
        { text: 'Passive', value: USER_ROLES.PASSIVE },
      ],
    };
  },
  methods: {
    inviteUser: async function () {
      await fetch('/users', {
        method: 'post',
        body: JSON.stringify({ role: this.role, channelId: this.$parent.channelId }),
        headers: { 'content-type': 'application/json' },
      })
        .then((x) => x.json())
        .then(({ userId }) => {
          alert(`${window.location.origin}/channel/${this.$parent.channelId}/user/${userId}`);
          this.$modal.hide(MODAL_WINDOWS.INVITE_USER);
        });
    },
  },
};
</script>


<style scoped lang="scss">
.invite-user-modal {
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

      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;

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
