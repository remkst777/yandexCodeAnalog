<template>
  <div class="about">
    <LeftChannelSection />

    <div class="right-section">
      <template v-if="isWrongUser">
        <h1>FORBIDDEN</h1>
      </template>

      <template v-if="!isWrongUser">
        <TopChannelSection />

        <h1>
          <div>SPEAK LOUDLY</div>
          <div>SPEAK VISUALLY</div>
        </h1>

        <p>Receive practical tips on how to communicate visually, right in your inbox.</p>

        <InviteUserModal />

        <ChannelTextarea />

        <HistoryInfoTool v-if="isHistoryShown" />
      </template>
    </div>

    <IsInvitedUser v-if="isInvitedUser" />

    <History v-if="isHistoryShown" />

    <ChannelInfo />
  </div>
</template>

<script>
import _ from 'lodash';
import { USER_ROLES, CHANNEL_TEXTAREA_ID, SOCKET_METHODS } from '@/common/constants';
import InviteUserModal from '@/components/InviteUserModal';
import IsInvitedUser from '@/components/IsInvitedUser';
import History from '@/components/History';
import ChannelInfo from '@/components/ChannelInfo';
import HistoryInfoTool from '@/components/HistoryInfoTool';
import LeftChannelSection from '@/components/LeftChannelSection';
import TopChannelSection from '@/components/TopChannelSection';
import ChannelTextarea from '@/components/ChannelTextarea';

import { buildTree } from '@/utils/common';

export default {
  name: 'channel',
  components: {
    InviteUserModal,
    IsInvitedUser,
    History,
    ChannelInfo,
    HistoryInfoTool,
    LeftChannelSection,
    TopChannelSection,
    ChannelTextarea,
  },
  data: function () {
    return {
      user: [],
      channel: {},
      usersOnline: {},
      channelId: this.$router.history.current.params.channelId,
      userId: this.$router.history.current.params.userId,
      isHistoryShown: false,
      stepHistory: [],
      historyRanger: 100,
      prebuiltContent: [],
      userTyping: null,
    };
  },
  computed: {
    isAdmin: function () {
      return this.user[0] === USER_ROLES.ADMIN;
    },
    isWrongUser: function () {
      return this.user[0] === USER_ROLES.WRONG;
    },
    isInvitedUser: function () {
      return this.user[1] === null;
    },
    isTextareaDisabled: function () {
      return ![USER_ROLES.ADMIN, USER_ROLES.ACTIVE].includes(this.user[0]) || this.isHistoryShown;
    },
  },
  methods: {
    fetchChannel: function () {
      fetch(`/channel/${this.channelId}/user/${this.userId}`)
        .then((x) => x.json())
        .then((channel) => {
          this.channel = { ...channel, content: buildTree('', channel.content) };
          this.prebuiltContent = channel.content;
        });
    },
    fetchUser: function () {
      fetch(`/users/${this.userId}`)
        .then((x) => x.json())
        .then((user) => (this.user = user));
    },
  },
  mounted: function () {
    this.fetchChannel();

    this.fetchUser();

    this.$socket.emit(SOCKET_METHODS.JOIN_ROOM, { channelId: this.channelId, userId: this.userId });

    this.sockets.subscribe(
      SOCKET_METHODS.USERS_ONLINE,
      (usersOnline) => (this.usersOnline = usersOnline),
    );

    this.sockets.subscribe(SOCKET_METHODS.NEW_USER_ROOM, this.fetchChannel);

    this.sockets.subscribe(
      SOCKET_METHODS.SENT_MESSAGE,
      _.debounce(() => {
        this.userTyping = null;
      }, 2500),
    );

    this.sockets.subscribe(SOCKET_METHODS.SENT_MESSAGE, (message) => {
      this.channel = { ...this.channel, content: buildTree(this.channel.content, message) };
      this.prebuiltContent = [...this.prebuiltContent, ...message];

      this.userTyping = message[0][5];

      setTimeout(
        () =>
          document
            .getElementById(CHANNEL_TEXTAREA_ID)
            .setSelectionRange(message[0][1], message[0][1]),
        0,
      );
    });
  },
  beforeRouteLeave(to, from, next) {
    this.$socket.emit(SOCKET_METHODS.LEAVE_ROOM, {
      channelId: this.channelId,
      userId: this.userId,
    });
    next();
  },
};
</script>

<style scoped lang="scss">
.about {
  display: flex;
  align-items: center;
  min-height: 100vh;
  background-image: linear-gradient(to bottom, #ffbd54 0%, #fec458 50%, #ffbc3a 100%);
  position: relative;

  .right-section {
    width: 40%;
    display: flex;
    flex-direction: column;
    padding: 80px;

    h1 {
      font-weight: 700;
      font-size: 55px;
      line-height: 60px;
      text-transform: uppercase;
      margin-bottom: 25px;
      text-align: right;
    }

    p {
      font-weight: 300;
      font-size: 27px;
      margin-bottom: 30px;
      padding-left: 70px;
      text-align: right;
    }
  }
}
</style>
